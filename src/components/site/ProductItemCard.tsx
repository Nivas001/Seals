import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Phone,
  Sparkles,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getItem, slugify } from "@/data/items";
import type { ProductCategory } from "@/data/catalog";

export function ProductItemCard({
  category,
  itemName,
  index,
}: {
  category: ProductCategory;
  itemName: string;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemSlug = slugify(itemName);
  const detail = getItem(category.slug, itemSlug);

  // Filter out redundant header specs like "Type" or "Product" that just repeat the itemName
  const previewSpecs = detail
    ? detail.specs
        .filter(
          (s) =>
            !["Type", "Product", "Configuration", "Component", "Product Type"].includes(s.label) &&
            s.value.toLowerCase() !== itemName.toLowerCase()
        )
        .slice(0, 3)
    : [];

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 p-5 sm:p-6 ${
        isExpanded
          ? "border-ink/25 bg-surface shadow-soft ring-1 ring-ink/5"
          : "border-hairline bg-surface hover:border-ink/20 hover:shadow-soft"
      } overflow-hidden`}
    >
      <div>
        {/* Top bar: Item number and spec count */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline/60 pb-3 mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brass/10 border border-brass/25 text-brass font-mono text-[11px] font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            Item · {String(index + 1).padStart(2, "0")}
          </span>
          {detail && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-background border border-hairline text-muted-foreground font-mono text-[11px] font-semibold uppercase tracking-wider">
              <Cpu className="h-3 w-3 text-muted-foreground" />
              <span>{detail.specs.length} specs</span>
            </span>
          )}
        </div>

        {/* Item Title & Tagline/Description */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="block cursor-pointer focus:outline-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-brass transition-colors flex items-center justify-between">
            <span>{itemName}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-ink transition-colors shrink-0 ml-2">
              <span>{isExpanded ? "Close" : "Specs"}</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-brass" />
              ) : (
                <ChevronDown className="h-4 w-4 text-brass" />
              )}
            </span>
          </h3>
          {detail && (
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal line-clamp-2 group-hover:text-ink/80 transition-colors">
              {detail.description}
            </p>
          )}
        </div>

        {/* Quick Preview Spec Badges (Pills when collapsed) */}
        {previewSpecs.length > 0 && !isExpanded && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {previewSpecs.map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center gap-1 rounded-md border border-hairline bg-background/80 px-2.5 py-1 text-[11px] font-medium text-ink/80 shadow-2xs group-hover:border-ink/15 transition-all"
              >
                <span className="text-muted-foreground">{spec.label}:</span>
                <span className="font-semibold text-ink">{spec.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Compact, Highly Refined Expanded View Section */}
        <AnimatePresence>
          {isExpanded && detail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-hairline pt-4">
                {/* 2-Column Compact Dashboard: Top Specs + Key Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Left Column: Top 4 Critical Specifications */}
                  <div className="rounded-xl border border-hairline/80 bg-background/60 p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-brass mb-2 border-b border-hairline/60 pb-1.5">
                      <Cpu className="h-3.5 w-3.5" />
                      <span>Key Technical Specs</span>
                    </div>
                    <div className="divide-y divide-hairline/50">
                      {detail.specs.slice(0, 4).map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between py-1.5 first:pt-1 last:pb-0"
                        >
                          <span className="text-muted-foreground font-medium">{spec.label}</span>
                          <span className="font-semibold text-ink text-right ml-2">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Top Advantages & Duty Parameters */}
                  <div className="rounded-xl border border-hairline/80 bg-background/60 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-brass mb-2 border-b border-hairline/60 pb-1.5">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Key Advantages</span>
                      </div>
                      <ul className="space-y-1.5">
                        {detail.benefits.slice(0, 3).map((benefit) => (
                          <li key={benefit} className="flex items-start gap-1.5 text-ink/90 font-medium">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" />
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compact Duty Pills */}
                    {detail.applications.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-hairline/50 flex flex-wrap items-center gap-1">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground mr-1">Duty:</span>
                        {detail.applications.slice(0, 3).map((app) => (
                          <span
                            key={app}
                            className="rounded bg-surface border border-hairline/80 px-2 py-0.5 text-[10px] font-semibold text-ink/80 uppercase tracking-tight"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Streamlined Inline Quote & Drawing Bar */}
                <div className="mt-3.5 rounded-xl border border-brass/30 bg-gradient-to-r from-brass/10 via-brass/5 to-surface p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-2xs">
                  <div className="flex items-center gap-2 font-semibold text-ink">
                    <Sparkles className="h-4 w-4 text-brass shrink-0" />
                    <span>Need a formal quotation or CAD drawing?</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href="tel:+917806936475"
                      className="text-muted-foreground hover:text-ink font-medium transition-colors flex items-center gap-1 hidden sm:flex"
                    >
                      <Phone className="h-3 w-3 text-brass" /> +91 78069 36475
                    </a>
                    <Link
                      to="/contact"
                      search={{ category: category.name, product: itemName }}
                      className="inline-flex items-center gap-1 font-bold text-ink bg-brass px-3 py-1 rounded-lg shadow-2xs hover:bg-brass/90 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Request Quote →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-hairline/60 pt-3.5">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3.5 py-1.5 text-[11px] font-semibold text-ink transition-all hover:border-ink/20 hover:bg-surface active:scale-95 cursor-pointer shadow-2xs"
        >
          <span>{isExpanded ? "Close details" : "Quick specs & details"}</span>
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-brass" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-brass" />
          )}
        </button>

        <Link
          to="/contact"
          search={{ category: category.name, product: itemName }}
          className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-1.5 text-[11px] font-bold text-ink shadow-2xs transition-all hover:bg-brass/90 hover:shadow active:scale-95 cursor-pointer tracking-wide"
        >
          <Sparkles className="h-3 w-3 text-ink" />
          <span>Get Quote</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
