import { PrismaClient } from '@prisma/client';
import { CATEGORIES } from '../src/data/catalog.js';
import { ITEM_SPECIFIC_DATA } from '../src/data/itemDetails.js';
import { slugify } from '../src/data/items.js';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting catalog seed...");

  // Seed Contact Info
  await prisma.contactInfo.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      tagline: "Integrated technology support",
      motto: "To provide quality products and support to our valuable customers with a timely approach.",
      phones: ["+91 78069 36475", "+91 91086 24470"],
      emails: ["aarrkkaainternational@gmail.com", "salesaarrkkaa@gmail.com"],
      address: {
        line1: "#3/334, 11C, Surya Nagar",
        line2: "5th Cross, Arasanatti",
        city: "Hosur",
        district: "Krishnagiri Dist.",
        state: "Tamil Nadu",
        pincode: "635 126",
        country: "India",
      }
    }
  });

  // Seed Categories and Products
  let priority = 0;
  for (const cat of CATEGORIES) {
    priority++;
    console.log(`Processing category: ${cat.name}`);
    
    // Some image imports are objects in vite or strings, but we will just store a generic string or their name
    const imageString = typeof cat.image === 'string' ? cat.image : `/images/cat-${cat.slug}.jpg`;
    
    const dbCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        short: cat.short,
        description: cat.description,
        image: imageString,
        priority: priority,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        short: cat.short,
        description: cat.description,
        image: imageString,
        priority: priority,
      }
    });

    for (const itemName of cat.items) {
      const slug = slugify(itemName);
      const specificData = ITEM_SPECIFIC_DATA[itemName] || {};
      
      const product = await prisma.product.upsert({
        where: { slug },
        update: {
          name: itemName,
          categoryId: dbCat.id,
          tagline: specificData.tagline || "",
          description: specificData.description || "",
          image: specificData.image || null,
        },
        create: {
          name: itemName,
          slug: slug,
          categoryId: dbCat.id,
          tagline: specificData.tagline || "",
          description: specificData.description || "",
          image: specificData.image || null,
        }
      });

      // Clear existing relations to prevent duplicates
      await prisma.productSpec.deleteMany({ where: { productId: product.id } });
      await prisma.productBenefit.deleteMany({ where: { productId: product.id } });
      await prisma.productApplication.deleteMany({ where: { productId: product.id } });

      if (specificData.specs) {
        for (const s of specificData.specs) {
          await prisma.productSpec.create({
            data: {
              productId: product.id,
              label: s.label,
              value: s.value
            }
          });
        }
      }

      if (specificData.benefits) {
        for (const b of specificData.benefits) {
          await prisma.productBenefit.create({
            data: {
              productId: product.id,
              text: b
            }
          });
        }
      }

      if (specificData.applications) {
        for (const a of specificData.applications) {
          await prisma.productApplication.create({
            data: {
              productId: product.id,
              text: a
            }
          });
        }
      }
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
