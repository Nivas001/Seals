import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/db";
import { decodeDataUrl, MEDIA_KINDS, type MediaKind } from "@/lib/media";

// Serves admin-uploaded images that are stored as base64 in the database as real image files,
// so pages link to them instead of embedding megabytes of text. See src/lib/media.ts.

async function loadImage(kind: MediaKind, id: string): Promise<string | null | undefined> {
  switch (kind) {
    case "category":
      return (await db.category.findFirst({ where: { id, isDeleted: false }, select: { image: true } }))?.image;
    case "product":
      return (await db.product.findFirst({ where: { id, isDeleted: false }, select: { image: true } }))?.image;
    case "hero":
      return (await db.heroCarouselImage.findUnique({ where: { id }, select: { url: true } }))?.url;
    case "industry":
      return (await db.industry.findUnique({ where: { id }, select: { image: true } }))?.image;
  }
}

function edgeCache(): Cache | undefined {
  // Cloudflare Workers expose a shared edge cache; elsewhere this is undefined and we just rely on headers.
  return typeof caches !== "undefined" ? (caches as unknown as { default?: Cache }).default : undefined;
}

export const Route = createFileRoute("/media/$kind/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const kind = params.kind as MediaKind;
        if (!MEDIA_KINDS.includes(kind) || !params.id || params.id.length > 64) {
          return new Response("Not found", { status: 404 });
        }

        const cache = edgeCache();
        const cached = await cache?.match(request).catch(() => undefined);
        if (cached) return cached;

        let value: string | null | undefined;
        try {
          value = await loadImage(kind, params.id);
        } catch (err) {
          console.error("[media] lookup failed", err);
          return new Response("Unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
        }

        if (value && /^https?:\/\//.test(value)) {
          return Response.redirect(value, 302);
        }
        const decoded = value ? decodeDataUrl(value) : null;
        if (!decoded) return new Response("Not found", { status: 404, headers: { "Cache-Control": "public, max-age=300" } });

        // The ?v= fingerprint changes whenever the image is replaced, so the URL itself is immutable.
        const versioned = new URL(request.url).searchParams.has("v");
        const response = new Response(decoded.bytes as unknown as BodyInit, {
          headers: {
            "Content-Type": decoded.type,
            "Content-Length": String(decoded.bytes.byteLength),
            "Cache-Control": versioned ? "public, max-age=31536000, immutable" : "public, max-age=3600",
            "X-Content-Type-Options": "nosniff",
          },
        });
        if (cache && versioned) await cache.put(request, response.clone()).catch(() => {});
        return response;
      },
    },
  },
});
