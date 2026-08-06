import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";
import { createServerSupabase } from "./supabase";

const adminDataSchema = z.object({
  token: z.string(),
});

export const getAdminData = createServerFn({ method: "POST" })
  .validator(adminDataSchema.parse)
  .handler(async ({ data }) => {
    const { token } = data;
    
    // 1. Verify Authentication using the provided JWT token
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new Error("Unauthorized");
    }

    // 2. Fetch Data from Prisma
    const [inquiries, subscribers, categories, products, contactInfo] = await Promise.all([
      db.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
      db.subscriber.findMany({ orderBy: { createdAt: 'desc' } }),
      db.category.findMany({ 
        select: { id: true, slug: true, name: true, short: true, description: true, priority: true, createdAt: true, updatedAt: true },
        orderBy: { priority: 'asc' } 
      }),
      db.product.findMany({ 
        select: { id: true, categoryId: true, name: true, slug: true, tagline: true, description: true, createdAt: true, updatedAt: true, category: true, specs: true, benefits: true, applications: true },
        orderBy: { createdAt: 'desc' } 
      }),
      db.contactInfo.findUnique({ where: { id: 'singleton' } })
    ]);

    return { inquiries, subscribers, categories, products, contactInfo };
  });

const toggleStatusSchema = z.object({
  token: z.string(),
  id: z.string(),
  status: z.string(),
});

export const toggleInquiryStatus = createServerFn({ method: "POST" })
  .validator(toggleStatusSchema.parse)
  .handler(async ({ data }) => {
    const { token, id, status } = data;
    
    // Verify Authentication
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new Error("Unauthorized");
    }

    // Update in Database
    const updated = await db.inquiry.update({
      where: { id },
      data: { status }
    });

    return updated;
  });

// ----------------------------------------------------
// CATALOG MANAGEMENT (Categories)
// ----------------------------------------------------

const categorySchema = z.object({
  token: z.string(),
  id: z.string().optional(),
  slug: z.string(),
  name: z.string(),
  short: z.string(),
  description: z.string(),
  image: z.string().optional(),
  priority: z.number(),
});

export const upsertCategory = createServerFn({ method: "POST" })
  .validator(categorySchema.parse)
  .handler(async ({ data }) => {
    const { token, id, ...rest } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    if (id) {
      if (rest.image === undefined) delete rest.image;
      return await db.category.update({ where: { id }, data: rest as any });
    }
    return await db.category.create({ data: { ...rest, image: rest.image || "" } as any });
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }).parse)
  .handler(async ({ data }) => {
    const { token, id } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    return await db.category.delete({ where: { id } });
  });

// ----------------------------------------------------
// CATALOG MANAGEMENT (Products)
// ----------------------------------------------------

const specSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  value: z.string(),
});

const textItemSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
});

const productSchema = z.object({
  token: z.string(),
  id: z.string().optional(),
  categoryId: z.string(),
  name: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  image: z.string().optional(),
  specs: z.array(specSchema),
  benefits: z.array(textItemSchema),
  applications: z.array(textItemSchema),
});

export const upsertProduct = createServerFn({ method: "POST" })
  .validator(productSchema.parse)
  .handler(async ({ data }) => {
    const { token, id, specs, benefits, applications, ...rest } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    if (id) {
      // Delete old relations and recreate
      await db.productSpec.deleteMany({ where: { productId: id } });
      await db.productBenefit.deleteMany({ where: { productId: id } });
      await db.productApplication.deleteMany({ where: { productId: id } });

      if (rest.image === undefined) delete rest.image;

      return await db.product.update({
        where: { id },
        data: {
          ...(rest as any),
          specs: { create: specs.map(s => ({ label: s.label, value: s.value })) },
          benefits: { create: benefits.map(b => ({ text: b.text })) },
          applications: { create: applications.map(a => ({ text: a.text })) },
        }
      });
    }

    return await db.product.create({
      data: {
        ...(rest as any),
        specs: { create: specs.map(s => ({ label: s.label, value: s.value })) },
        benefits: { create: benefits.map(b => ({ text: b.text })) },
        applications: { create: applications.map(a => ({ text: a.text })) },
      }
    });
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }).parse)
  .handler(async ({ data }) => {
    const { token, id } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    return await db.product.delete({ where: { id } });
  });

// ----------------------------------------------------
// CONTACT INFO MANAGEMENT
// ----------------------------------------------------

const contactInfoSchema = z.object({
  token: z.string(),
  tagline: z.string(),
  motto: z.string(),
  phones: z.array(z.string()),
  emails: z.array(z.string()),
  address: z.any(),
});

export const updateContactInfo = createServerFn({ method: "POST" })
  .validator(contactInfoSchema.parse)
  .handler(async ({ data }) => {
    const { token, ...rest } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    return await db.contactInfo.upsert({
      where: { id: "singleton" },
      update: rest,
      create: { id: "singleton", ...rest },
    });
  });
