/**
 * Step 2 of the image migration (see migrate-images.ts): turn the data: URLs in a
 * backup-images.ts dump into WebP files plus the manifest migrate-images.ts reads.
 *
 *   npx tsx scripts/convert-images.ts backup.json <dir>
 *
 * Needs ImageMagick (`magick`) on the PATH. Only writes into <dir>.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const [backupFile, dir] = process.argv.slice(2);
if (!backupFile || !dir) throw new Error("usage: tsx scripts/convert-images.ts backup.json <dir>");

type Kind = "categories" | "products" | "hero";
// Same sizes the admin upload uses (image-utils uploadImage callers).
const SIZE: Record<Kind, { width: number; quality: number }> = {
  categories: { width: 1600, quality: 82 },
  products: { width: 1600, quality: 82 },
  hero: { width: 1920, quality: 88 },
};

const backup = JSON.parse(fs.readFileSync(backupFile, "utf8"));
const rows: { kind: Kind; id: string; value?: string | null }[] = [
  ...backup.categories.map((r: any) => ({ kind: "categories", id: r.id, value: r.image })),
  ...backup.products.map((r: any) => ({ kind: "products", id: r.id, value: r.image })),
  ...backup.hero.map((r: any) => ({ kind: "hero", id: r.id, value: r.url })),
];

const manifest: { kind: Kind; id: string; path: string }[] = [];
let before = 0;
let after = 0;
for (const r of rows) {
  if (!r.value?.startsWith("data:")) continue;
  const input = Buffer.from(r.value.slice(r.value.indexOf(",") + 1), "base64");
  const rel = `${r.kind}/${r.id}.webp`;
  fs.mkdirSync(path.join(dir, r.kind), { recursive: true });
  const { width, quality } = SIZE[r.kind];
  execFileSync("magick", ["-", "-auto-orient", "-strip", "-resize", `${width}x>`, "-quality", String(quality), `webp:${path.join(dir, rel)}`], {
    input,
  });
  before += input.length;
  after += fs.statSync(path.join(dir, rel)).size;
  manifest.push({ kind: r.kind, id: r.id, path: rel });
}
fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`converted ${manifest.length} images: ${Math.round(before / 1024)} KB jpeg -> ${Math.round(after / 1024)} KB webp`);
