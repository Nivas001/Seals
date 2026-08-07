import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  console.log("Categories:");
  categories.forEach(c => console.log(c.slug, c.image));

  const products = await prisma.product.findMany();
  console.log("\nProducts:");
  products.forEach(p => console.log(p.slug, p.image));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
