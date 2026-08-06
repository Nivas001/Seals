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
    const [inquiries, subscribers] = await Promise.all([
      db.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
      db.subscriber.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    return { inquiries, subscribers };
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
