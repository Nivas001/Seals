import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Adding Additional Products category...");

  const cat = await prisma.category.create({
    data: {
      name: "Additional Products",
      slug: "additional-products",
      short: "Various industrial tools and instruments",
      description: "In addition, few more products on the list were mentioned below:",
      image: "",
      priority: 13,
    }
  });

  console.log("Category added:", cat.id);

  const products = [
    { name: "Bush hammer roller with Bearing", slug: "bush-hammer-roller", priority: 1 },
    { name: "Non-Sparking Tools", slug: "non-sparking-tools", priority: 2 },
    { name: "Lithium Battery", slug: "lithium-battery", priority: 3 },
    { name: "Level Indicator", slug: "level-indicator", priority: 4 },
    { name: "Rotameter", slug: "rotameter", priority: 5 },
    { name: "Pressure Gauge", slug: "pressure-gauge", priority: 6 },
    { name: "Thermosyphon", slug: "thermosyphon", priority: 7 },
    { name: "Brass Products", slug: "brass-products", priority: 8 },
    { name: "Thread Protector", slug: "thread-protector", priority: 9 },
    { name: "Flange Bearing Safety Cover", slug: "flange-bearing-safety-cover", priority: 10 }
  ];

  for (const p of products) {
    const prod = await prisma.product.create({
      data: {
        categoryId: cat.id,
        name: p.name,
        slug: p.slug,
        priority: p.priority,
        tagline: p.name,
        description: p.name,
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
