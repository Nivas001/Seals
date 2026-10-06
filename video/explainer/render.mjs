// Renders explainer.html to video, frame by frame.
//   python video/explainer/voiceover.py && python video/explainer/mix.py   (narration + soundtrack -> audio/mix.wav)
//   node video/explainer/render.mjs                -> public/videos/how-we-work.mp4 + .webm + poster
//   node video/explainer/render.mjs stills 5 25 40 -> PNG stills in video/explainer/stills/ (for review)
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// EXPLAINER_DIR picks which version to render (default: this folder); OUT_NAME sets the output file name.
const here = process.env.EXPLAINER_DIR ? path.resolve(process.env.EXPLAINER_DIR) : path.dirname(fileURLToPath(import.meta.url));
const OUT_NAME = process.env.OUT_NAME || "how-we-work";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/videos");
const DURATION = 90;
const FPS = 30;

const [mode, ...times] = process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 }); // 1920x1080 frames
await page.goto(pathToFileURL(path.join(here, "explainer.html")).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

if (mode === "stills") {
  const dir = path.join(here, "stills");
  fs.mkdirSync(dir, { recursive: true });
  for (const t of times.map(Number)) {
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: path.join(dir, `t${String(t).padStart(5, "0")}.png`), scale: "css" });
  }
  console.log("stills:", times.join(", "));
  await browser.close();
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });
const mp4 = path.join(outDir, `${OUT_NAME}.mp4`);
const mixWav = path.join(here, "audio/mix.wav");
const audioArgs = fs.existsSync(mixWav)
  ? ["-i", mixWav, "-map", "0:v", "-map", "1:a", "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "192k", "-ar", "48000"]
  : [];
const ff = spawn("ffmpeg", [
  "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-", ...audioArgs,
  "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-t", String(DURATION), mp4,
], { stdio: ["pipe", "inherit", "inherit"] });

const total = DURATION * FPS;
const started = Date.now();
for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.seek(t), f / FPS);
  const buf = await page.screenshot({ type: "jpeg", quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % 150 === 0) console.log(`frame ${f}/${total} (${Math.round((Date.now() - started) / 1000)}s)`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));

// Poster: the intro frame (logo and tagline), with room bottom-left for the play button.
await page.evaluate((t) => window.seek(t), 7);
await page.screenshot({ path: path.join(outDir, `${OUT_NAME}-poster.jpg`), type: "jpeg", quality: 85 });
await browser.close();

// WebM (VP9) as a smaller alternative source.
await new Promise((r) => spawn("ffmpeg", ["-y", "-i", mp4, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-c:a", "libopus", "-b:a", "128k", path.join(outDir, `${OUT_NAME}.webm`)], { stdio: "inherit" }).on("close", r));
console.log("done in", Math.round((Date.now() - started) / 1000), "s");
