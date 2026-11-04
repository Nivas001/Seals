import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();
const out = process.argv[2];

async function main() {
  const [categories, products, industries, hero] = await Promise.all([
    prisma.category.findMany({ select: { id: true, name: true, image: true } }),
    prisma.product.findMany({ select: { id: true, name: true, image: true } }),
    prisma.industry.findMany({ select: { id: true, image: true } }),
    prisma.heroCarouselImage.findMany(),
  ]);
  fs.writeFileSync(out, JSON.stringify({ categories, products, industries, hero }));
  const kb = (rows: { image?: string | null }[]) =>
    Math.round(rows.reduce((n, r) => n + (r.image?.length ?? 0), 0) / 1024);
  const n = (rows: { image?: string | null }[]) => rows.filter((r) => r.image?.startsWith("data:")).length;
  console.log("categories", categories.length, "data:", n(categories), kb(categories), "KB");
  console.log("products", products.length, "data:", n(products), kb(products), "KB");
  console.log("industries", industries.length, "data:", n(industries), kb(industries), "KB");
  console.log("hero", hero.length, JSON.stringify(Object.keys(hero[0] ?? {})));
}
main().finally(() => prisma.$disconnect());
