import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const artifactsDir = 'C:\\Users\\nivas\\.gemini\\antigravity-ide\\brain\\648d7768-546c-4953-a5d4-8c0b17720efe';
const publicImagesDir = path.join(process.cwd(), 'public', 'images');

const productUpdates = [
  { slug: 'ss-rod', imageFile: 'ss_rod_1786101993648.png', newName: 'ss-rod.png' },
  { slug: 'ss-shaft', imageFile: 'ss_shaft_1786102064843.png', newName: 'ss-shaft.png' },
  { slug: 'ss-sleeve', imageFile: 'ss_sleeve_1786102080043.png', newName: 'ss-sleeve.png' },
  { slug: 'ss-flanges', imageFile: 'ss_flanges_1786102102397.png', newName: 'ss-flanges.png' },
  { slug: 'ss-c-clip', imageFile: 'ss_c_clip_1786102113280.png', newName: 'ss-c-clip.png' },
  { slug: 'ss-clamps', imageFile: 'ss_clamps_1786102125657.png', newName: 'ss-clamps.png' },
  { slug: 'tri-clover-clamps', imageFile: 'tri_clover_clamps_1786102147104.png', newName: 'tri-clover-clamps.png' },
  { slug: 'ss-impeller', imageFile: 'ss_impeller_1786102161543.png', newName: 'ss-impeller.png' },
  { slug: 'ss-pump-spare-parts', imageFile: 'ss_pump_spare_parts_1786102173725.png', newName: 'ss-pump-spare-parts.png' }
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
