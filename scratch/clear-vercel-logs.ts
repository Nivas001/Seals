import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDummyLogs() {
  console.log("Clearing dummy Vercel traffic logs...");

  await prisma.vercelTrafficLog.deleteMany({});

  console.log("Successfully cleared all Vercel traffic logs! Database is clean.");
}

clearDummyLogs()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
