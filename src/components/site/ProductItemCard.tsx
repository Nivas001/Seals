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
  Layers,
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
      className={`group relative flex flex-col justify-between rounded-[1.5rem] border transition-all duration-300 p-6 ${
        isExpanded
          ? "border-ink/25 bg-surface shadow-lift ring-1 ring-ink/5"
          : "border-hairline bg-surface hover:border-ink/25 hover:shadow-soft"
      } overflow-hidden`}
    >
      <div>
        {/* Top bar: Item number and spec count */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline/60 pb-3.5 mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/10 border border-brass/25 text-brass font-mono text-xs font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            Item · {String(index + 1).padStart(2, "0")}
          </span>
          {detail && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-hairline text-muted-foreground font-mono text-xs font-semibold uppercase tracking-wider">
              <Cpu className="h-3 w-3 text-muted-foreground" />
              <span>{detail.specs.length} specs available</span>
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
          <h3 className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-brass transition-colors flex items-center justify-between">
            <span>{itemName}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-ink transition-colors">
              <span>{isExpanded ? "Close specs" : "View technical specs"}</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-brass" />
              ) : (
                <ChevronDown className="h-4 w-4 text-brass" />
              )}
            </span>
          </h3>
          {detail && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-normal line-clamp-2 group-hover:text-ink/80 transition-colors">
              {detail.description}
            </p>
          )}
        </div>

        {/* Quick Preview Spec Badges (Pills when collapsed) */}
        {previewSpecs.length > 0 && !isExpanded && (
          <div className="mt-4 flex flex-wrap gap-2 pt-1">
            {previewSpecs.map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-background/80 px-3 py-1 text-xs font-medium text-ink/80 shadow-2xs group-hover:border-ink/15 transition-all"
              >
                <span className="text-muted-foreground">{spec.label}:</span>
                <span className="font-semibold text-ink">{spec.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Expanded View Section — Harmonized Light Industrial Schematic */}
        <AnimatePresence>
          {isExpanded && detail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-t border-hairline pt-6 space-y-6">
                {/* Technical Specifications Bento Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brass">
                      <Cpu className="h-4 w-4 text-brass" /> Technical Profile Specifications
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detail.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-xl border border-hairline bg-background/80 p-3.5 hover:border-ink/20 transition-all shadow-2xs group/spec flex flex-col justify-between"
                      >
                        <dt className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground group-hover/spec:text-ink">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 font-sans text-sm font-bold text-ink">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Industrial Benefits Grid */}
                {detail.benefits.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brass mb-3">
                      <ShieldCheck className="h-4 w-4 text-brass" /> Engineered Advantages
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {detail.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 rounded-xl border border-hairline bg-background/50 p-3.5 text-xs sm:text-sm font-medium text-ink/90 leading-relaxed shadow-2xs hover:border-ink/15 transition-all"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Typical Applications */}
                {detail.applications.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                      <Layers className="h-4 w-4 text-muted-foreground" /> Typical Duty &amp; Applications
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {detail.applications.map((app) => (
                        <span
                          key={app}
                          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-2xs hover:border-brass/50 transition-colors"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Harmonized Instant Quote Request Banner */}
                <div className="rounded-2xl border border-brass/40 bg-gradient-to-br from-brass/15 via-brass/5 to-surface p-5 sm:p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                      <Sparkles className="h-5 w-5 text-brass" />
                      <span>Need an instant quotation for this {itemName}?</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl font-normal">
                      Click below — we will automatically attach all technical specifications and duty parameters into your priority quotation request form.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    search={{ category: category.name, product: itemName }}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-xs sm:text-sm font-bold text-background shadow-md transition-all hover:bg-ink/90 hover:shadow-lg active:scale-95 cursor-pointer tracking-wide"
                  >
                    <span>Request Quote Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Inside Expanded Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-4 text-xs font-medium">
                  <a
                    href="tel:+917806936475"
                    className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-brass font-semibold"
                  >
                    <Phone className="h-3.5 w-3.5 text-brass" />
                    <span>+91 78069 36475 (Engineering Support Desk)</span>
                  </a>
                  <Link
                    to="/contact"
                    search={{ category: category.name, product: itemName }}
                    className="group/link inline-flex items-center gap-1 font-bold text-brass hover:underline cursor-pointer"
                  >
                    <span>Request formal CAD drawing &amp; duty specs</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-background px-4 py-2.5 text-xs font-semibold text-ink transition-all hover:border-ink/20 hover:bg-surface active:scale-95 cursor-pointer shadow-2xs"
        >
          <span>{isExpanded ? "Close specs" : "Quick specs & details"}</span>
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-brass" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-brass" />
          )}
        </button>

        <Link
          to="/contact"
          search={{ category: category.name, product: itemName }}
          className="inline-flex items-center gap-2 rounded-xl bg-brass px-5 py-2.5 text-xs font-bold text-ink shadow-sm transition-all hover:bg-brass/90 hover:shadow active:scale-95 cursor-pointer tracking-wide"
        >
          <Sparkles className="h-3.5 w-3.5 text-ink" />
          <span>Get Quote</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
