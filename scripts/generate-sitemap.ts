import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES } from '../src/data/catalog';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.aarrkkaa.com';

const staticRoutes = [
  '/',
  '/products',
  '/industries',
  '/about',
  '/contact',
];

const dynamicRoutes: string[] = [];

// Generate routes for categories and items
CATEGORIES.forEach((category) => {
  dynamicRoutes.push(`/products/${category.slug}`);
  
  category.items.forEach((item) => {
    // Generate URL-friendly slug for item
    const itemSlug = item
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    dynamicRoutes.push(`/products/${category.slug}/${itemSlug}`);
  });
});

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/products/') ? '0.8' : '0.7'}</priority>
  </url>`
    )
    .join('')}
</urlset>
`;

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap successfully generated at ${sitemapPath}`);
console.log(`Total URLs: ${allRoutes.length}`);
