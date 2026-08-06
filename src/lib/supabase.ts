import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Helper for client components
export function createClient() {
  const url = import.meta.env.VITE_SUPABASE_URL || (typeof process !== "undefined" ? process.env.VITE_SUPABASE_URL : "");
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== "undefined" ? process.env.VITE_SUPABASE_ANON_KEY : "");
  
  if (!url || !key) {
    console.warn("Missing Supabase Env Keys");
  }

  return createBrowserClient(url || "missing-url", key || "missing-key");
}

// Helper for TanStack server functions (using standard supabase-js)
export function createServerSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL || (typeof process !== "undefined" ? process.env.VITE_SUPABASE_URL : "");
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== "undefined" ? process.env.VITE_SUPABASE_ANON_KEY : "");

  return createSupabaseClient(url || "missing-url", key || "missing-key");
}
