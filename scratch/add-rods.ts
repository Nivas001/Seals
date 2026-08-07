import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Adding Rods category...");

  const cat = await prisma.category.create({
    data: {
      name: "Rod - CFT, Nylatron, MS",
      slug: "rods",
      short: "Solid structural and bearing rods",
      description: "A rod is essentially a long, solid piece of material with a circular or round cross-section.",
      image: "/images/rods_category.png",
      priority: 12,
    }
  });

  console.log("Rods category added:", cat.id);

  const products = [
    {
      name: "Nylatron Rod",
      slug: "nylatron-rod",
      tagline: "High load bearing and self-lubricating.",
      description: "Nylatron is used in rotary lever actuators where unusual shapes are required, heavy-duty caster wheels, normally as a replacement for cast iron or forged steel. Plain bearing material, especially in screw conveyor applications. Nylatron comes in multiple grades designed with added properties, including load bearing, self-lubrication, and wear resistance characteristics.",
      image: "",
      priority: 1,
    },
    {
      name: "Carbon Filled Teflon Rod",
      slug: "carbon-filled-teflon-rod",
      tagline: "Enhanced thermal conductivity and wear life.",
      description: "Carbon filled PTFE is primarily used in applications where higher thermal or electrical conductivity is required, over and above conventional PTFE. This grade also exhibits improved wear life and has very good compression properties, for loading applications.",
      image: "",
      priority: 2,
    },
    {
      name: "Mild Steel Rod",
      slug: "mild-steel-rod",
      tagline: "Strong, ductile, and easily fabricated.",
      description: "MS rods are made from mild steel, which has a low carbon content (typically between 0.05% and 0.25%). This low carbon content contributes to its ductility and ease of fabrication. Advantages: The main advantages of using MS rods include their strength, durability, flexibility, weldability, and cost-effectiveness.",
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
