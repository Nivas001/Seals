import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";

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
    map.set(p.slug, p);
  }
  allProductsMap = map;
  allProductsCacheExpiresAt = now + CACHE_TTL_MS;
  return map;
}

export const getCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("categories", () =>
      db.category.findMany({
        where: { 
          isDeleted: false,
          isHidden: false 
        },
        orderBy: { priority: "asc" },
      })
    );
  });

const categorySlugSchema = z.object({
  slug: z.string(),
});

export const getHeroImages = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("heroImages", () =>
      db.heroCarouselImage.findMany({
        orderBy: { order: "asc" }
      })
    );
  });

export const getIndustries = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("industries", async () => {
      return await db.industry.findMany({
        orderBy: { priority: "asc" },
      });
    });
  });

export const getCategoryWithProducts = createServerFn({ method: "GET" })
  .validator(categorySlugSchema.parse)
  .handler(async ({ data }) => {
    return await getCached(`category_${data.slug}`, () =>
      db.category.findUnique({
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
      })
    );
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

export const getAllCategoriesWithProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getCached("allCategoriesWithProducts", () =>
      db.category.findMany({
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
      })
    );
  });
