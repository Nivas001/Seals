import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const origin = "https://www.aarrkkaa.com";
const failures = [];
const report = [];
const paths = new Set(["/", "/products", "/catalog", "/industries", "/about", "/about/payments", "/contact", "/wizard", "/admin"]);
await mkdir("ui-artifacts", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await context.newPage();

// Await the UI revision, rather than auditing a previous production deployment.
await page.goto(origin, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.locator(".arka-hero").waitFor({ timeout: 180000 });
await page.locator(".arka-header").waitFor({ timeout: 30000 });

for (const path of ["/products", "/catalog"]) {
  await page.goto(origin + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator("main").waitFor();
  const links = await page.locator('main a[href^="/products/"]').evaluateAll((elements) => elements.map((a) => new URL(a.href).pathname));
  links.forEach((link) => paths.add(link));
}

async function audit(path, width) {
  await page.setViewportSize({ width, height: 1000 });
  const response = await page.goto(origin + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  if (!response || response.status() >= 400) throw new Error("HTTP " + response?.status());
  await page.locator("main").first().waitFor({ timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  const heading = await page.locator("h1").first().textContent();
  if (!heading || /page didn't load|could not be located|404/i.test(heading)) throw new Error("Missing page content");
  const result = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const overflowing = [...document.querySelectorAll("main h1, main h2, main p, main input, main textarea, main select, main article")]
      .filter((element) => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && (box.left < -2 || box.right > width + 2);
      }).slice(0, 6).map((element) => ({ tag: element.tagName, text: element.textContent?.slice(0, 100) }));
    const brokenImages = [...document.querySelectorAll("main img")].filter((img) => {
      const box = img.getBoundingClientRect();
      return box.top < innerHeight && box.bottom > 0 && img.complete && img.naturalWidth === 0;
    }).map((img) => img.getAttribute("src")?.slice(0, 100));
    return { overflowing, brokenImages };
  });
  if (result.overflowing.length || result.brokenImages.length) {
    failures.push({ path, width, ...result });
  }
  report.push({ path, width, status: response.status(), heading: heading.trim(), ...result });
}

const screenshotPaths = new Set(["/", "/products", "/products/mechanical-seals", "/contact", "/about", "/about/payments", "/wizard", "/industries", "/catalog", "/products/mechanical-seals/conical-spring"]);
for (const path of paths) {
  for (const width of [1440, 390]) {
    try {
      await audit(path, width);
      if (screenshotPaths.has(path)) {
        const name = (path === "/" ? "home" : path.slice(1).replaceAll("/", "-")) + "-" + width;
        // Capture the settled layout after existing entrance animations finish.
        await page.waitForTimeout(700);
        await page.screenshot({ path: "ui-artifacts/" + name + ".png", fullPage: true });
        if (screenshotPaths.has(path)) {
          const preview = await page.screenshot({ type: "jpeg", quality: 45 });
          console.log("VISUAL_REVIEW:" + name + ":" + preview.toString("base64"));
        }
      }
    } catch (error) {
      failures.push({ path, width, error: error.message });
    }
  }
  console.log("AUDITED " + path);
}

// Mobile navigation must support keyboard dismissal and retain focus.
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(origin, { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Open navigation" }).click();
await page.getByRole("dialog").waitFor();
await page.keyboard.press("Escape");
await page.getByRole("dialog").waitFor({ state: "hidden" });
const focused = await page.getByRole("button", { name: "Open navigation" }).evaluate((element) => element === document.activeElement);
if (!focused) failures.push({ flow: "Mobile menu focus restoration" });

// Quote context must survive navigation into the existing form. No messages are submitted.
await page.goto(origin + "/contact?category=Mechanical%20Seals&product=Conical%20Spring", { waitUntil: "domcontentloaded" });
const subject = await page.locator('input[name="subject"]').inputValue();
if (!subject.includes("Conical Spring")) failures.push({ flow: "Product quote prefill", subject });

// Text enlargement must keep the main navigation and headings usable.
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(origin, { waitUntil: "domcontentloaded" });
await page.evaluate(() => document.documentElement.style.fontSize = "200%");
const headingOverflow = await page.locator("h1").evaluate((element) => element.scrollWidth > element.clientWidth + 2);
if (headingOverflow) failures.push({ flow: "200% text enlargement", error: "Heading clips" });
await page.screenshot({ path: "ui-artifacts/home-200-percent.png", fullPage: true });
await writeFile("ui-artifacts/report.json", JSON.stringify({ checkedPages: paths.size, viewportChecks: report.length, failures, report }, null, 2));
console.log("UI_AUDIT_SUMMARY:" + JSON.stringify({ checkedPages: paths.size, viewportChecks: report.length, failures }));
await browser.close();
if (failures.length) process.exitCode = 1;
