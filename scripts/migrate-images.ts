/**
 * One-off: move inline base64 images out of the database into the public Supabase Storage
 * bucket "media" and store the URL instead.
 *
 *   1. npx tsx scripts/backup-images.ts backup.json     (keep this file)
 *   2. npx tsx scripts/convert-images.ts backup.json <dir>
 *      (writes <dir>/<table>/<id>.webp + <dir>/manifest.json,
 *       entries: { kind: "categories"|"products"|"hero", id, path })
 *   3. SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/migrate-images.ts <dir> [--apply]
 *
 * Without --apply it only prints what it would do. Idempotent: rows that no longer hold a
 * data: URL are skipped.
 */
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const dir = process.argv[2];
const apply = process.argv.includes("--apply");
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!dir || !url || !key) throw new Error("usage: SUPABASE_SERVICE_ROLE_KEY=... tsx scripts/migrate-images.ts <dir> [--apply]");

const prisma = new PrismaClient();
const supabase = createClient(url, key);
const BUCKET = "media";

type Entry = { kind: "categories" | "products" | "hero"; id: string; path: string };

async function currentValue(e: Entry): Promise<string | null | undefined> {
  if (e.kind === "categories") return (await prisma.category.findUnique({ where: { id: e.id }, select: { image: true } }))?.image;
  if (e.kind === "products") return (await prisma.product.findUnique({ where: { id: e.id }, select: { image: true } }))?.image;
  return (await prisma.heroCarouselImage.findUnique({ where: { id: e.id }, select: { url: true } }))?.url;
}

async function save(e: Entry, publicUrl: string) {
  if (e.kind === "categories") await prisma.category.update({ where: { id: e.id }, data: { image: publicUrl } });
  else if (e.kind === "products") await prisma.product.update({ where: { id: e.id }, data: { image: publicUrl } });
  else await prisma.heroCarouselImage.update({ where: { id: e.id }, data: { url: publicUrl } });
}

async function main() {
  if (apply) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ["image/webp", "image/jpeg", "image/png"],
    });
    if (error && !/already exists/i.test(error.message)) throw error;
  }
  const manifest: Entry[] = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
  let done = 0;
  for (const e of manifest) {
    const value = await currentValue(e);
    if (!value?.startsWith("data:")) continue;
    const objectPath = e.path;
    console.log(`${apply ? "migrate" : "would migrate"} ${e.kind}/${e.id}`);
    if (!apply) continue;
    const body = fs.readFileSync(path.join(dir, e.path));
    const { error } = await supabase.storage.from(BUCKET).upload(objectPath, body, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: true,
    });
    if (error) throw error;
    await save(e, supabase.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl);
    done++;
  }
  console.log(apply ? `migrated ${done} images` : "dry run complete, pass --apply to write");
}
main().finally(() => prisma.$disconnect());
