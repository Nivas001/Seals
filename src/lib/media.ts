// Images uploaded through the admin used to be stored in the database as base64 data URLs.
// Sending those inside the page HTML made pages 2–10 MB (Googlebot stops reading HTML after
// 2 MB, and every visitor downloaded every photo twice: once in <img> and once in the
// hydration data). Public loaders now swap each data URL for a short /media/... link that
// serves the same picture as a real, cacheable image file.

export type MediaKind = "category" | "product" | "hero" | "industry";

export const MEDIA_KINDS: readonly MediaKind[] = ["category", "product", "hero", "industry"];

/** Short, stable fingerprint of the image so the URL changes whenever the image is replaced. */
function fingerprint(value: string): string {
  let h = 5381;
  // Sampling keeps this cheap on multi-megabyte strings while still catching any replacement.
  const step = Math.max(1, Math.floor(value.length / 4096));
  for (let i = 0; i < value.length; i += step) h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  return `${(h >>> 0).toString(36)}${value.length.toString(36)}`;
}

/** Returns a /media/... URL for an inline data URL; any other value (http URL, /path, empty) is returned unchanged. */
export function mediaSrc<T extends string | null | undefined>(kind: MediaKind, id: string, value: T): T | string {
  if (typeof value !== "string" || !value.startsWith("data:")) return value;
  return `/media/${kind}/${encodeURIComponent(id)}?v=${fingerprint(value)}`;
}

/** Same as mediaSrc, applied to the `image` field of a row that has an `id`. */
export function withMedia<T extends { id: string; image?: string | null }>(kind: MediaKind, row: T): T {
  return { ...row, image: mediaSrc(kind, row.id, row.image) } as T;
}

/** Absolute URL for structured data and social tags (relative paths get the site origin). */
export function absoluteImage(src: string | null | undefined, origin = "https://www.aarrkkaa.com"): string | undefined {
  if (!src || src.startsWith("data:")) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return origin + (src.startsWith("/") ? src : `/${src}`);
}

/** Decodes a base64 data URL into bytes and its content type. */
export function decodeDataUrl(value: string): { type: string; bytes: Uint8Array } | null {
  const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(value);
  if (!m) return null;
  const type = m[1] || "application/octet-stream";
  if (!type.startsWith("image/")) return null;
  if (!m[2]) return { type, bytes: new TextEncoder().encode(decodeURIComponent(m[3])) };
  const bin = atob(m[3]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { type, bytes };
}
