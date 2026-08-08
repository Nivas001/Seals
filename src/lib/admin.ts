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
    const [inquiries, subscribers, categories, products, contactInfo, heroImages] = await Promise.all([
      db.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
      db.subscriber.findMany({ orderBy: { createdAt: 'desc' } }),
      db.category.findMany({ 
        select: { id: true, slug: true, name: true, short: true, description: true, image: true, priority: true, createdAt: true, updatedAt: true },
        orderBy: { priority: 'asc' } 
      }),
      db.product.findMany({ 
        select: { id: true, categoryId: true, name: true, slug: true, tagline: true, description: true, image: true, priority: true, createdAt: true, updatedAt: true, category: true, specs: true, benefits: true, applications: true },
        orderBy: { createdAt: 'desc' } 
      }),
      db.contactInfo.findUnique({ where: { id: 'singleton' } }),
      db.heroCarouselImage.findMany({ orderBy: { order: 'asc' } })
    ]);

    return { inquiries, subscribers, categories, products, contactInfo, heroImages };
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

    return await db.category.update({ where: { id }, data: { isDeleted: true } });
  });

export const restoreCategory = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }).parse)
  .handler(async ({ data }) => {
    const { token, id } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    return await db.category.update({ where: { id }, data: { isDeleted: false } });
  });

export const updateCategoryPriorities = createServerFn({ method: "POST" })
  .validator(z.object({
    token: z.string(),
    updates: z.array(z.object({ id: z.string(), priority: z.number() }))
  }).parse)
  .handler(async ({ data }) => {
    const { token, updates } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    await db.$transaction(
      updates.map(u => db.category.update({ where: { id: u.id }, data: { priority: u.priority } }))
    );
    return { success: true };
  });

export const updateProductPriorities = createServerFn({ method: "POST" })
  .validator(z.object({
    token: z.string(),
    updates: z.array(z.object({ id: z.string(), priority: z.number() }))
  }).parse)
  .handler(async ({ data }) => {
    const { token, updates } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    await db.$transaction(
      updates.map(u => db.product.update({ where: { id: u.id }, data: { priority: u.priority } }))
    );
    return { success: true };
  });

// ----------------------------------------------------
// HERO CAROUSEL MANAGEMENT
// ----------------------------------------------------

const heroImageSchema = z.object({
  token: z.string(),
  id: z.string().optional(),
  url: z.string(),
  order: z.number(),
});

export const upsertHeroImage = createServerFn({ method: "POST" })
  .validator(heroImageSchema.parse)
  .handler(async ({ data }) => {
    const { token, id, ...rest } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    if (id) {
      return await db.heroCarouselImage.update({ where: { id }, data: rest });
    }
    return await db.heroCarouselImage.create({ data: rest });
  });

export const deleteHeroImage = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }).parse)
  .handler(async ({ data }) => {
    const { token, id } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    return await db.heroCarouselImage.delete({ where: { id } });
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
  priority: z.number().optional(),
  specs: z.array(specSchema),
  benefits: z.array(textItemSchema),
  applications: z.array(textItemSchema),
});

export const upsertProduct = createServerFn({ method: "POST" })
  .validator(productSchema.parse)
  .handler(async ({ data }) => {
    const { token, id, specs, benefits, applications, priority, ...rest } = data;
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
          ...(priority !== undefined ? { priority } : {}),
          specs: { create: specs.map(s => ({ label: s.label, value: s.value })) },
          benefits: { create: benefits.map(b => ({ text: b.text })) },
          applications: { create: applications.map(a => ({ text: a.text })) },
        }
      });
    }

      return await db.product.create({
        data: {
          ...(rest as any),
          ...(priority !== undefined ? { priority } : {}),
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

    return await db.product.update({ where: { id }, data: { isDeleted: true } });
  });

export const restoreProduct = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }).parse)
  .handler(async ({ data }) => {
    const { token, id } = data;
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Unauthorized");

    return await db.product.update({ where: { id }, data: { isDeleted: false } });
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

// ----------------------------------------------------
// PER-SECTION LAZY FETCH FUNCTIONS
// ----------------------------------------------------

const tokenSchema = z.object({ token: z.string() });

export const getInquiries = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    return await db.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  });

export const getSubscribers = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    return await db.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
  });

export const getAdminProducts = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    const [categories, products] = await Promise.all([
      db.category.findMany({ select: { id: true, slug: true, name: true, short: true, description: true, image: true, priority: true, isDeleted: true, isHidden: true, createdAt: true, updatedAt: true }, orderBy: { priority: 'asc' } }),
      db.product.findMany({ select: { id: true, categoryId: true, name: true, slug: true, tagline: true, description: true, image: true, priority: true, isDeleted: true, isHidden: true, createdAt: true, updatedAt: true, category: true, specs: true, benefits: true, applications: true }, orderBy: { priority: 'asc' } }),
    ]);
    return { categories, products };
  });

export const getAdminCategories = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    return await db.category.findMany({ select: { id: true, slug: true, name: true, short: true, description: true, image: true, priority: true, isDeleted: true, isHidden: true, createdAt: true, updatedAt: true }, orderBy: { priority: 'asc' } });
  });

export const getAdminHero = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    return await db.heroCarouselImage.findMany({ orderBy: { order: 'asc' } });
  });

export const getAdminContact = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    return await db.contactInfo.findUnique({ where: { id: 'singleton' } });
  });

export const getDashboardStats = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");
    const [inquiryCount, subscriberCount, categoryCount, productCount, recentInquiries] = await Promise.all([
      db.inquiry.count(),
      db.subscriber.count(),
      db.category.count({ where: { isDeleted: false } }),
      db.product.count({ where: { isDeleted: false } }),
      db.inquiry.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentInquiriesAll = await db.inquiry.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true }
    });

    const vercelStats = await db.vercelTrafficLog.count();
    const vercelLogsAll = await db.vercelTrafficLog.findMany({
      where: { timestamp: { gte: thirtyDaysAgo } },
      select: { timestamp: true }
    });

    const chartData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      chartData.push({
        name: dateString,
        Inquiries: recentInquiriesAll.filter(inq => new Date(inq.createdAt).toDateString() === d.toDateString()).length,
        Views: vercelLogsAll.filter(log => new Date(log.timestamp).toDateString() === d.toDateString()).length
      });
    }

    return { 
      inquiryCount, 
      subscriberCount, 
      categoryCount, 
      productCount, 
      recentInquiries, 
      chartData,
      analytics: {
        totalViews: vercelStats,
        totalInteractions: inquiryCount + subscriberCount, // Dummy calculation for now
        chartData: chartData // We will rely on Vercel data properly in getVercelAnalytics
      }
    };
  });

export const getVercelAnalytics = createServerFn({ method: "POST" })
  .validator(tokenSchema.parse)
  .handler(async ({ data }) => {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(data.token);
    if (error || !user) throw new Error("Unauthorized");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await db.vercelTrafficLog.findMany({
      where: { timestamp: { gte: thirtyDaysAgo } },
      select: { path: true, country: true, userAgent: true, timestamp: true, referrer: true }
    });

    const totalViews = logs.length;

    // Aggregate by page
    const topPagesMap = logs.reduce((acc, log) => {
      acc[log.path] = (acc[log.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topPages = Object.entries(topPagesMap).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, views]) => ({ name, views }));

    // Aggregate by Country
    const topCountriesMap = logs.reduce((acc, log) => {
      acc[log.country] = (acc[log.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topCountries = Object.entries(topCountriesMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, views]) => ({ name, views }));
    
    // Aggregate by OS
    const topOsMap = logs.reduce((acc, log) => {
      let os = "Other";
      const ua = log.userAgent.toLowerCase();
      if (ua.includes("win")) os = "Windows";
      else if (ua.includes("mac")) os = "MacOS";
      else if (ua.includes("linux")) os = "Linux";
      else if (ua.includes("android")) os = "Android";
      else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
      
      acc[os] = (acc[os] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topOs = Object.entries(topOsMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, views]) => ({ name, views }));

    // Chart Data
    const chartData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      chartData.push({
        name: dateString,
        Views: logs.filter(log => new Date(log.timestamp).toDateString() === d.toDateString()).length
      });
    }

    return { totalViews, topPages, topCountries, topOs, chartData };
  });

const logTrafficSchema = z.object({
  path: z.string(),
  userAgent: z.string(),
  referrer: z.string().optional()
});

export const logTraffic = createServerFn({ method: "POST" })
  .validator(logTrafficSchema.parse)
  .handler(async ({ data }) => {
    // In production, we'd extract IP and country from request headers
    // For now, we'll store basic tracking data
    try {
      await db.vercelTrafficLog.create({
        data: {
          path: data.path,
          userAgent: data.userAgent,
          referrer: data.referrer || "Direct",
          country: "Unknown", // Can be extended with real header parsing if context allows
          ip: "0.0.0.0",
          timestamp: new Date()
        }
      });
      return { success: true };
    } catch (error) {
      console.error("Failed to log traffic", error);
      return { success: false };
    }
  });

