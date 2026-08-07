import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.update({
    where: { slug: "additional-products" },
    data: { image: "/images/additional_products_category.png" }
  });
  console.log("Category image updated.");
}

main().finally(() => prisma.$disconnect());
