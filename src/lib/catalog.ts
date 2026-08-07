import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";

export const getCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    return await db.category.findMany({
      orderBy: { priority: 'asc' },
    });
  });

const categorySlugSchema = z.object({
  slug: z.string(),
});

export const getHeroImages = createServerFn({ method: "GET" })
  .handler(async () => {
    return await db.heroCarouselImage.findMany({
      orderBy: { order: "asc" }
    });
  });

export const getCategoryWithProducts = createServerFn({ method: "GET" })
  .validator(categorySlugSchema.parse)
  .handler(async ({ data }) => {
    return await db.category.findUnique({
      where: { slug: data.slug },
      include: {
        products: {
          orderBy: { createdAt: 'asc' },
          include: { specs: true },
        },
      },
    });
  });

const productSlugSchema = z.object({
  slug: z.string(),
});

export const getProductDetails = createServerFn({ method: "GET" })
  .validator(productSlugSchema.parse)
  .handler(async ({ data }) => {
    return await db.product.findUnique({
      where: { slug: data.slug },
      include: {
        category: true,
        specs: true,
        benefits: true,
        applications: true,
      },
    });
  });

export const getContactInfo = createServerFn({ method: "GET" })
  .handler(async () => {
    return await db.contactInfo.findUnique({
      where: { id: "singleton" },
    });
  });

export const getAllCategoriesWithProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    return await db.category.findMany({
      orderBy: { priority: "asc" },
      include: {
        products: {
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
  });
