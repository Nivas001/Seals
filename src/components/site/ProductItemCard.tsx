import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronUp, CheckCircle2, Phone, Sparkles } from "lucide-react";
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
          ? "border-ink/25 bg-surface shadow-lift ring-1 ring-ink/5"
          : "border-hairline bg-surface hover:border-ink/25 hover:shadow-soft"
      }`}
    >
      <div>
        {/* Top bar: Item number and spec count */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brass">
            {String(index + 1).padStart(2, "0")}
          </span>
          {detail && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {detail.specs.length} specs available
            </span>
          )}
        </div>

        {/* Item Title & Tagline/Description */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 block cursor-pointer focus:outline-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <h3 className="font-display text-lg font-bold tracking-tight text-ink group-hover:text-brass transition-colors flex items-center justify-between">
            <span>{itemName}</span>
          </h3>
          {detail && (
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {detail.description}
            </p>
          )}
        </div>

        {/* Quick Preview Spec Badges (Pills) */}
        {previewSpecs.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {previewSpecs.map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center gap-1 rounded-md border border-hairline bg-background/80 px-2 py-0.5 text-[11px] font-medium text-ink/80 shadow-2xs"
              >
                <span className="text-muted-foreground">{spec.label}:</span>
                <span className="font-semibold text-ink">{spec.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Expanded View Section */}
        <AnimatePresence>
          {isExpanded && detail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-hairline pt-4">
                {/* Technical Specifications Box */}
                <div className="rounded-xl border border-hairline bg-background/90 p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">
                    <Sparkles className="h-3 w-3" /> Technical Specifications
                  </div>
                  <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                    {detail.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="border-b border-hairline/40 pb-1.5 last:border-0 sm:border-0 sm:pb-0"
                      >
                        <dt className="text-[11px] font-medium text-muted-foreground">{spec.label}</dt>
                        <dd className="mt-0.5 font-semibold text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Key Benefits */}
                {detail.benefits.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Key Industrial Benefits
                    </div>
                    <ul className="mt-2.5 grid grid-cols-1 gap-2 text-xs text-ink/90 sm:grid-cols-2">
                      {detail.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {detail.applications.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="mr-1 text-[11px] font-medium text-muted-foreground">Typical duty:</span>
                    {detail.applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-full border border-hairline bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/80"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                )}

                {/* Instant Quote Request Banner in Expanded View */}
                <div className="mt-4 rounded-xl border border-brass/40 bg-gradient-to-br from-brass/15 via-brass/5 to-transparent p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                      <Sparkles className="h-3.5 w-3.5 text-brass" />
                      <span>Need a quote for this {itemName}?</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                      Click below — we&rsquo;ll auto-fill category &amp; product details into the quote request form.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    search={{ category: category.name, product: itemName }}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-brass px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm transition-all hover:bg-brass/90 hover:shadow active:scale-95 cursor-pointer"
                  >
                    <span>Request Quote Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* Inside Expanded Action Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3">
                  <a
                    href="tel:+917806936475"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition-colors hover:text-brass"
                  >
                    <Phone className="h-3.5 w-3.5 text-brass" /> +91 78069 36475 (Engg. Support)
                  </a>
                  <Link
                    to="/contact"
                    search={{ category: category.name, product: itemName }}
                    className="group/link inline-flex items-center gap-1 text-xs font-bold text-brass hover:underline cursor-pointer"
                  >
                    <span>Request formal quotation &amp; drawing</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
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
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3.5 py-1.5 text-[11px] font-semibold text-ink transition-all hover:border-ink/30 hover:bg-surface active:scale-95 cursor-pointer"
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
          className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-1.5 text-[11px] font-bold text-ink shadow-2xs transition-all hover:bg-brass/90 hover:shadow active:scale-95 cursor-pointer"
        >
          <Sparkles className="h-3 w-3 text-ink" />
          <span>Get Quote</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
