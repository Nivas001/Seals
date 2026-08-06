import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from "vinxi/http";

// Helper for client components
export function createClient() {
  return createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );
}

// Helper for TanStack server functions
export function createServerSupabase() {
  return createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieStr = getCookie("sb-auth-token") || "";
          // Parse a simple JSON string if needed, or just handle raw values
          try {
            return JSON.parse(decodeURIComponent(cookieStr));
          } catch {
            return [];
          }
        },
        setAll(cookiesToSet) {
          try {
            setCookie("sb-auth-token", encodeURIComponent(JSON.stringify(cookiesToSet)), {
              path: "/",
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            });
          } catch {
            // Ignore error in server function context if headers already sent
          }
        },
      },
    }
  );
}
