import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

function getBase64Image(filePath: string): string | null {
  const absolutePath = path.join(process.cwd(), 'public', filePath);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }
  const fileData = fs.readFileSync(absolutePath);
  const base64 = fileData.toString('base64');
  const mimeType = getMimeType(absolutePath);
  return `data:${mimeType};base64,${base64}`;
}

async function main() {
  console.log("Starting image migration to Base64...");

  // 1. Migrate Categories
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    if (cat.image && !cat.image.startsWith('data:') && !cat.image.startsWith('http')) {
      let absolutePath = cat.image;
      if (cat.image.startsWith('/')) {
        absolutePath = path.join(process.cwd(), 'public', cat.image);
      }
      
      if (fs.existsSync(absolutePath)) {
        const fileData = fs.readFileSync(absolutePath);
        const base64 = fileData.toString('base64');
        const mimeType = getMimeType(absolutePath);
        const base64Str = `data:${mimeType};base64,${base64}`;
        
        await prisma.category.update({
          where: { id: cat.id },
          data: { image: base64Str }
        });
        console.log(`Migrated image for category: ${cat.name}`);
      } else {
        console.log(`Could not find image for category: ${cat.name} (${cat.image})`);
        await prisma.category.update({
          where: { id: cat.id },
          data: { image: "" }
        });
      }
    }
  }

  // 2. Migrate Products
  const products = await prisma.product.findMany();
  for (const prod of products) {
    if (prod.image && prod.image.startsWith('/') && !prod.image.startsWith('data:')) {
      const base64 = getBase64Image(prod.image);
      if (base64) {
        await prisma.product.update({
          where: { id: prod.id },
          data: { image: base64 }
        });
        console.log(`Migrated image for product: ${prod.name}`);
      } else {
        console.log(`Could not find image for product: ${prod.name} (${prod.image})`);
        // Set to null so the placeholder shows instead of broken path
        await prisma.product.update({
          where: { id: prod.id },
          data: { image: null }
        });
      }
    } else if (prod.image && !prod.image.startsWith('data:') && !prod.image.startsWith('http') && !prod.image.startsWith('/')) {
        // e.g. [object Object] or weird vite things
        console.log(`Invalid image format for product: ${prod.name} (${prod.image}), setting to null`);
        await prisma.product.update({
          where: { id: prod.id },
          data: { image: null }
        });
    }
  }

  console.log("Image migration complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
