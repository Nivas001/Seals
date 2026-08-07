import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const artifactsDir = 'C:\\Users\\nivas\\.gemini\\antigravity-ide\\brain\\648d7768-546c-4953-a5d4-8c0b17720efe';
const publicImagesDir = path.join(process.cwd(), 'public', 'images');

const productUpdates = [
  { slug: 'oil-seal', imageFile: 'oil_seal_1786102771342.png', newName: 'oil-seal.png' },
  { slug: 'o-rings', imageFile: 'o_rings_1786102786383.png', newName: 'o-rings.png' },
  { slug: 'ptfe-envelope-gasket', imageFile: 'ptfe_envelope_gasket_1786102797169.png', newName: 'ptfe-envelope-gasket.png' },
  { slug: 'champion-gasket', imageFile: 'champion_gasket_1786102821082.png', newName: 'champion-gasket.png' },
];

async function main() {
  for (const item of productUpdates) {
    const srcPath = path.join(artifactsDir, item.imageFile);
    const destPath = path.join(publicImagesDir, item.newName);

    if (fs.existsSync(srcPath)) {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${item.imageFile} to ${destPath}`);

      // Update DB
      const imageDbPath = `/images/${item.newName}`;
      try {
        await prisma.product.update({
          where: { slug: item.slug },
          data: { image: imageDbPath }
        });
        console.log(`Updated product ${item.slug} in DB to ${imageDbPath}`);
      } catch (err) {
        console.error(`Error updating product ${item.slug}:`, err.message);
      }
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
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
