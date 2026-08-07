import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Adding Valves category...");

  const cat = await prisma.category.create({
    data: {
      name: "Valves",
      slug: "valves",
      short: "Fluid control mechanisms",
      description: "A valve is a mechanical device that regulates, directs, or controls the flow of a fluid by opening, closing, or partially obstructing passageways.",
      image: "/images/valves_category.png",
      priority: 10,
    }
  });

  console.log("Valves category added:", cat.id);

  const products = [
    {
      name: "Flange End Ball Valve",
      slug: "flange-end-ball-valve",
      tagline: "Utilize a rotating ball with a bore to control flow.",
      description: "A reliable flange end ball valve designed for secure, leak-proof fluid regulation in industrial environments.",
      image: "",
      priority: 1,
    },
    {
      name: "Ball Valve",
      slug: "ball-valve",
      tagline: "Utilize a rotating ball with a bore to control flow.",
      description: "High-performance ball valve offering rapid shutoff and durable operation across various pressure ranges.",
      image: "",
      priority: 2,
    },
    {
      name: "Gate Valve",
      slug: "gate-valve",
      tagline: "Use a sliding gate to start/stop flow.",
      description: "Robust gate valve ensuring straight-line fluid flow with minimal restriction and pressure drop when fully open.",
      image: "",
      priority: 3,
    }
  ];

  for (const p of products) {
    const prod = await prisma.product.create({
      data: {
        categoryId: cat.id,
        ...p
      }
    });
    console.log("Product added:", prod.name);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
