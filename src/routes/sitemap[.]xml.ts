import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/db";

// Live sitemap built from the admin database, so every product and category
// added, renamed or hidden in the admin is reflected without a redeploy.
// (A static public/sitemap.xml drifted out of sync and listed 404 pages.)
const BASE_URL = "https://www.aarrkkaa.com";

const STATIC_PAGES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/products", priority: "0.9", changefreq: "weekly" },
  { path: "/industries", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/catalog", priority: "0.6", changefreq: "monthly" },
  { path: "/about/payments", priority: "0.4", changefreq: "yearly" },
];

type Entry = { path: string; priority: string; changefreq: string; lastmod?: Date };

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function render(entries: Entry[]) {
  const urls = entries
    .map((e) => {
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod.toISOString().slice(0, 10)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(BASE_URL + e.path)}</loc>${lastmod}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function catalogEntries(): Promise<Entry[]> {
  const categories = await db.category.findMany({
    where: { isDeleted: false, isHidden: false },
    orderBy: { priority: "asc" },
    select: {
      slug: true,
      updatedAt: true,
      products: {
        where: { isDeleted: false, isHidden: false },
        orderBy: { priority: "asc" },
        select: { slug: true, updatedAt: true },
      },
    },
  });
  const entries: Entry[] = [];
  for (const c of categories) {
    entries.push({ path: `/products/${c.slug}`, priority: "0.8", changefreq: "weekly", lastmod: c.updatedAt });
    for (const p of c.products) {
      entries.push({ path: `/products/${c.slug}/${p.slug}`, priority: "0.7", changefreq: "monthly", lastmod: p.updatedAt });
    }
  }
  return entries;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let products: Entry[] = [];
        let cache = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";
        try {
          products = await catalogEntries();
        } catch (err) {
          // Database unreachable: still serve the core pages, but don't let the CDN keep this short list.
          console.error("[sitemap] catalog query failed", err);
          cache = "public, max-age=300, s-maxage=300";
        }
        return new Response(render([...STATIC_PAGES, ...products]), {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": cache },
        });
      },
    },
  },
});
