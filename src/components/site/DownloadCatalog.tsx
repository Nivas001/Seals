import { Download } from "lucide-react";
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from "@/lib/catalog-download";

type Variant = "solid" | "outline" | "ghost" | "pill";

export function DownloadCatalog({
  variant = "outline",
  label = "Download catalog",
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 font-semibold tracking-tight transition";
  const styles: Record<Variant, string> = {
    solid:
      "rounded-full bg-ink px-5 py-2.5 text-[13px] text-background hover:bg-ink/85",
    outline:
      "rounded-full border border-ink/15 bg-background px-5 py-2.5 text-[13px] text-ink hover:border-ink/30 hover:bg-surface",
    ghost:
      "rounded-full px-3 py-1.5 text-[13px] text-ink/80 hover:bg-white/70 hover:text-ink",
    pill:
      "rounded-full bg-brass/15 px-4 py-2 text-[12px] text-ink border border-brass/30 hover:bg-brass/25",
  };
  return (
    <a
      href={CATALOG_PDF_URL}
      download={CATALOG_PDF_FILENAME}
      target="_blank"
      rel="noopener"
      className={`${base} ${styles[variant]} ${className}`}
      aria-label="Download AARRKKAA product catalog (PDF)"
    >
      <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
      {label}
    </a>
  );
}
