import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// Note: TanStackRouterVite is already included inside tanstackStart — do NOT add it separately.
// vite-tsconfig-paths is replaced by Vite's native resolve.tsconfigPaths below.
export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
      // Public pages are cached at the Vercel edge for a minute and revalidated in the background.
      routeRules: Object.fromEntries(
        ["/", "/about", "/catalog", "/contact", "/industries", "/products", "/products/**"].map((path) => [
          path,
          { headers: { "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=600" } },
        ]),
      ),
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
