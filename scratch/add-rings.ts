import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Adding Rings category...");

  const cat = await prisma.category.create({
    data: {
      name: "Ring - TC, PTFE, SS",
      slug: "rings",
      short: "Industrial sealing rings",
      description: "Various kind of rings used in different applications, mainly for high heat resistance, high resistance to chemical agents and solvents, anti-adhesiveness, dielectric properties, low friction coefficient, and non-toxicity.",
      image: "/images/rings_category.png",
      priority: 11,
    }
  });

  console.log("Rings category added:", cat.id);

  const products = [
    {
      name: "Tungsten Carbide Ring",
      slug: "tungsten-carbide-ring",
      tagline: "High durability and wear resistance.",
      description: "Premium tungsten carbide ring offering exceptional hardness and wear resistance for demanding mechanical seal applications.",
      image: "",
      priority: 1,
    },
    {
      name: "Teflon Ring",
      slug: "teflon-ring",
      tagline: "Chemical resistance and low friction.",
      description: "High-performance PTFE (Teflon) ring providing superior chemical inertness, excellent thermal stability, and low friction.",
      image: "",
      priority: 2,
    },
    {
      name: "SS Ring",
      slug: "ss-ring",
      tagline: "Corrosion resistant stainless steel.",
      description: "Durable stainless steel ring designed for robust mechanical performance and corrosion resistance in diverse fluid environments.",
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
