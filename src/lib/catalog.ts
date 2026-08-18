import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";

// High-Speed In-Memory Catalog Cache (5-minute TTL + instant Admin invalidation)
const catalogCache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function clearCatalogCache() {
  catalogCache.clear();
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
    return await getCached(`product_${data.slug}`, () =>
      db.product.findUnique({
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
      })
    );
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
