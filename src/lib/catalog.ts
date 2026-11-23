import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";
import { mediaSrc, withMedia } from "./media";

// Product row with its category, with inline (base64) images swapped for /media links.
function productWithMedia<T extends { id: string; image?: string | null; category?: { id: string; image: string } | null }>(p: T): T {
  const out = withMedia("product", p);
  return p.category ? { ...out, category: withMedia("category", p.category) } : out;
}

// High-Speed In-Memory Catalog Cache (5-minute TTL + instant Admin invalidation)
const catalogCache = new Map<string, { data: any; expiresAt: number }>();
let allProductsMap: Map<string, any> | null = null;
let allProductsCacheExpiresAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function clearCatalogCache() {
  catalogCache.clear();
  allProductsMap = null;
  allProductsCacheExpiresAt = 0;
}

async function getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = catalogCache.get(key);
  if (entry && entry.expiresAt > now) {
    return entry.data as T;
  }
  const data = await fetcher();
  catalogCache.set(key, { data, expiresAt: now + CACHE_TTL_MS });
  return data;
}

async function getOrLoadAllProductsMap(): Promise<Map<string, any>> {
  const now = Date.now();
  if (allProductsMap && allProductsCacheExpiresAt > now) {
    return allProductsMap;
  }
  const products = await db.product.findMany({
    where: {
      isDeleted: false,
      isHidden: false,
    },
    include: {
      category: true,
      specs: true,
      benefits: true,
      applications: true,
    },
  });
  const map = new Map<string, any>();
  for (const p of products) {
    map.set(p.slug, productWithMedia(p));
  }
  allProductsMap = map;
  allProductsCacheExpiresAt = now + CACHE_TTL_MS;
  return map;
}

export const getCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("categories", async () => {
      const rows = await db.category.findMany({
        where: {
          isDeleted: false,
          isHidden: false
        },
        orderBy: { priority: "asc" },
      });
      return rows.map((c) => withMedia("category", c));
    });
  });

const categorySlugSchema = z.object({
  slug: z.string(),
});

export const getHeroImages = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("heroImages", async () => {
      const rows = await db.heroCarouselImage.findMany({
        orderBy: { order: "asc" }
      });
      return rows.map((h) => ({ ...h, url: mediaSrc("hero", h.id, h.url) }));
    });
  });

export const getIndustries = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("industries", async () => {
      const rows = await db.industry.findMany({
        orderBy: { priority: "asc" },
      });
      return rows.map((i) => withMedia("industry", i));
    });
  });

export const getCategoryWithProducts = createServerFn({ method: "GET" })
  .validator(categorySlugSchema.parse)
  .handler(async ({ data }) => {
    return await getCached(`category_${data.slug}`, async () => {
      const cat = await db.category.findUnique({
        where: { 
          slug: data.slug,
          isDeleted: false, 
          isHidden: false 
        },
        include: {
          products: {
            where: { isDeleted: false, isHidden: false },
            orderBy: { priority: 'asc' },
            include: { specs: true },
          },
        },
      });
      if (!cat) return cat;
      return { ...withMedia("category", cat), products: cat.products.map((p) => withMedia("product", p)) };
    });
  });

const productSlugSchema = z.object({
  slug: z.string(),
});

export const getProductDetails = createServerFn({ method: "GET" })
  .validator(productSlugSchema.parse)
  .handler(async ({ data }) => {
    const productsMap = await getOrLoadAllProductsMap();
    let product = productsMap.get(data.slug);
    if (!product) {
      product = await db.product.findUnique({
        where: { 
          slug: data.slug,
          isDeleted: false, 
          isHidden: false
        },
        include: {
          category: true,
          specs: true,
          benefits: true,
          applications: true,
        },
      });
      if (product) {
        product = productWithMedia(product);
        productsMap.set(data.slug, product);
      }
    }
    return product;
  });

export const getProductPageData = createServerFn({ method: "GET" })
  .validator(productSlugSchema.parse)
  .handler(async ({ data }) => {
    const productsMap = await getOrLoadAllProductsMap();
    let product = productsMap.get(data.slug);
    if (!product) {
      product = await db.product.findUnique({
        where: { 
          slug: data.slug,
          isDeleted: false, 
          isHidden: false
        },
        include: {
          category: true,
          specs: true,
          benefits: true,
          applications: true,
        },
      });
      if (product) {
        product = productWithMedia(product);
        productsMap.set(data.slug, product);
      }
    }
    if (!product) return null;

    const siblings = Array.from(productsMap.values())
      .filter((p) => p.categoryId === product.categoryId && p.slug !== product.slug)
      .slice(0, 4)
      .map((p) => ({ name: p.name, slug: p.slug }));

    return { product, siblings };
  });

export const getContactInfo = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("contactInfo", () =>
      db.contactInfo.findUnique({
        where: { id: "singleton" },
      })
    );
  });

// Lean list for the home page: no product rows, just the count per category.
export const getHomeCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("homeCategories", async () => {
      const rows = await db.category.findMany({
        where: { isDeleted: false, isHidden: false },
        orderBy: { priority: "asc" },
        select: {
          id: true,
          slug: true,
          name: true,
          short: true,
          description: true,
          image: true,
          _count: { select: { products: { where: { isDeleted: false, isHidden: false } } } },
        },
      });
      return rows.map((c) => withMedia("category", c));
    });
  });

export const getAllCategoriesWithProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("allCategoriesWithProducts", async () => {
      const rows = await db.category.findMany({
        where: { isDeleted: false, isHidden: false },
        orderBy: { priority: "asc" },
        include: {
          products: {
            where: { isDeleted: false, isHidden: false },
            orderBy: { priority: "asc" },
            select: {
              id: true,
              name: true,
              slug: true,
              image: true,
              priority: true,
              categoryId: true,
            }
          },
        },
      });
      return rows.map((c) => ({ ...withMedia("category", c), products: c.products.map((p) => withMedia("product", p)) }));
    });
  });

const finderSlugsSchema = z.object({
  slugs: z.array(z.string().max(120)).max(24),
});

/** Lightweight product cards for the seal finder results, in the order requested. Hidden or deleted products are left out. */
export const getFinderProducts = createServerFn({ method: "GET" })
  .validator(finderSlugsSchema.parse)
  .handler(async ({ data }) => {
    const productsMap = await getOrLoadAllProductsMap();
    return data.slugs
      .map((slug) => productsMap.get(slug))
      .filter(Boolean)
      .map((p: any) => ({
        slug: p.slug as string,
        name: p.name as string,
        tagline: p.tagline as string,
        image: (p.image || p.category?.image || null) as string | null,
        category: { slug: p.category?.slug as string, name: p.category?.name as string },
        specs: ((p.specs ?? []) as { label: string; value: string }[]).slice(0, 6),
      }));
  });
