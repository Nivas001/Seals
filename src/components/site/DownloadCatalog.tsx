import { useState } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from "@/lib/catalog-download";

export type DownloadCatalogVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "pill"
  | "navbar-pill"
  | "mobile-menu";

export function DownloadCatalog({
  variant = "outline",
  label = "Download catalog",
  className = "",
  onDownload,
}: {
  variant?: DownloadCatalogVariant;
  label?: string;
  className?: string;
  onDownload?: () => void;
}) {
  const [state, setState] = useState<"idle" | "downloading" | "downloaded">("idle");

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state !== "idle") return;

    setState("downloading");
    if (onDownload) onDownload();

    // Trigger real browser file download via temporary invisible link
    const link = document.createElement("a");
    link.href = CATALOG_PDF_URL;
    link.download = CATALOG_PDF_FILENAME;
    link.target = "_blank";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Transition to downloaded state after 1.2s animation
    setTimeout(() => {
      setState("downloaded");
      toast.success("AARRKKAA Product Catalog downloaded!", {
        description: "10 major industrial pump & seal categories saved to your device.",
        icon: <CheckCircle2 className="h-4 w-4 text-brass" />,
        duration: 4000,
      });
    }, 1200);

    // Reset back to idle after 4.5 seconds
    setTimeout(() => {
      setState("idle");
    }, 4500);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 tracking-tight transition-all duration-300 select-none cursor-pointer overflow-hidden";

  const styles: Record<DownloadCatalogVariant, string> = {
    solid:
      "rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-background hover:bg-ink/85 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "rounded-full border border-ink/15 bg-background px-5 py-2.5 text-[13px] font-semibold text-ink hover:border-ink/30 hover:bg-surface shadow-xs hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "rounded-full px-3 py-1.5 text-[13px] font-semibold text-ink/80 hover:bg-white/70 hover:text-ink",
    pill:
      "rounded-full bg-brass/15 px-4 py-2 text-[12px] font-semibold text-ink border border-brass/30 hover:bg-brass/25 shadow-xs hover:-translate-y-0.5 active:translate-y-0",
    "navbar-pill":
      "glass-shimmer relative items-center gap-1.5 overflow-hidden rounded-full border border-ink/10 px-3.5 py-2 text-[12px] font-semibold text-ink shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset] transition-all duration-300 hover:border-ink/25 hover:-translate-y-0.5 active:translate-y-0 inline-flex",
    "mobile-menu":
      "flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-background px-6 py-3.5 text-sm font-semibold text-ink hover:bg-surface shadow-xs active:scale-[0.99]",
  };

  const activeStyles =
    state === "downloaded"
      ? "!border-brass/60 !shadow-[0_0_15px_rgba(217,119,6,0.15)] scale-[1.02]"
      : state === "downloading"
      ? "!border-brass/60 !shadow-[0_0_15px_rgba(217,119,6,0.15)]"
      : "";

  const inlineStyle =
    variant === "navbar-pill"
      ? {
          background:
            "linear-gradient(180deg, color-mix(in oklab, white 85%, transparent) 0%, color-mix(in oklab, white 55%, transparent) 100%)",
        }
      : undefined;

  let displayLabel = label;
  if (state === "downloading") {
    displayLabel = variant === "navbar-pill" ? "Fetching..." : "Downloading...";
  } else if (state === "downloaded") {
    displayLabel = variant === "navbar-pill" ? "Saved!" : "Downloaded!";
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={state === "downloading"}
      className={`${base} ${styles[variant]} ${activeStyles} ${className}`}
      style={inlineStyle}
      aria-label="Download AARRKKAA product catalog (PDF)"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            <Download
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
            <span>{displayLabel}</span>
          </motion.span>
        )}

        {state === "downloading" && (
          <motion.span
            key="downloading"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 font-semibold"
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin text-brass" strokeWidth={2.5} />
            <span>{displayLabel}</span>
          </motion.span>
        )}

        {state === "downloaded" && (
          <motion.span
            key="downloaded"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1, 1.15, 1] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="flex items-center gap-1.5 font-bold"
          >
            <CheckCircle2 className="h-4 w-4 animate-bounce text-brass" strokeWidth={2.5} />
            <span>{displayLabel}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
