import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  
  for (const cat of categories) {
    let newImagePath = '';
    if (cat.slug === 'stainless-steel') {
      newImagePath = '/images/cat-steel.jpg';
    } else if (cat.slug === 'mechanical-seals') {
      newImagePath = '/images/cat-seals.jpg';
    } else {
      newImagePath = `/images/cat-${cat.slug}.jpg`;
    }
    
    await prisma.category.update({
      where: { id: cat.id },
      data: { image: newImagePath }
    });
    console.log(`Updated category ${cat.slug} to ${newImagePath}`);
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
