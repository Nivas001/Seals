import { createServerFn } from "@tanstack/react-start";
import { db } from "./db";
import { createServerSupabase } from "./supabase";

export const getAdminData = createServerFn({ method: "GET" })
  .handler(async () => {
    // 1. Verify Authentication
    const supabase = createServerSupabase();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      throw new Error("Unauthorized");
    }

    // 2. Fetch Data from Prisma
    const [inquiries, subscribers] = await Promise.all([
      db.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
      db.subscriber.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    return { inquiries, subscribers };
  });
