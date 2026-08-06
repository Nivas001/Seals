import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const catCount = await prisma.category.count();
  const prodCount = await prisma.product.count();
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: "singleton" } });
  console.log(`Categories: ${catCount}`);
  console.log(`Products: ${prodCount}`);
  console.log(`Contact Info: ${contactInfo ? 'exists' : 'missing'}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
