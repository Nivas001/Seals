import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedVercelLogs() {
  console.log("Seeding dummy Vercel traffic logs...");

  const logs = [];
  const paths = ["/", "/about", "/contact", "/products", "/categories"];
  const countries = ["IN", "US", "AE", "GB", "SG"];
  const osList = ["Windows", "MacOS", "iOS", "Android", "Linux"];
  const referrers = ["Direct", "https://google.com", "https://linkedin.com"];

  // Generate 150 random logs over the past 7 days
  for (let i = 0; i < 150; i++) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 7));
    
    logs.push({
      path: paths[Math.floor(Math.random() * paths.length)],
      userAgent: `Mozilla/5.0 (${osList[Math.floor(Math.random() * osList.length)]})`,
      referrer: referrers[Math.floor(Math.random() * referrers.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      timestamp: pastDate
    });
  }

  await prisma.vercelTrafficLog.createMany({
    data: logs
  });

  console.log("Successfully seeded 150 Vercel traffic logs!");
}

seedVercelLogs()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
