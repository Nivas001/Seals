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
  Zap,
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
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 p-6 ${
        isExpanded
          ? "border-brass/50 bg-gradient-to-br from-[#18181B] via-[#121214] to-[#0D0D0F] shadow-[0_12px_40px_rgb(0,0,0,0.7)] ring-1 ring-brass/20"
          : "border-white/[0.08] bg-gradient-to-br from-[#141416] via-[#101012] to-[#0B0B0D] hover:border-brass/40 hover:shadow-[0_8px_30px_rgb(217,119,6,0.12)]"
      } before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-r-full before:bg-brass/0 hover:before:bg-brass before:transition-all before:duration-300 overflow-hidden`}
    >
      <div>
        {/* Top bar: Item number and telemetry status */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3.5 mb-4">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-brass/10 border border-brass/25 text-brass font-mono text-xs font-bold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brass animate-pulse" />
            ITEM // {String(index + 1).padStart(2, "0")}
          </span>
          {detail && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-400 font-mono text-[11px] font-medium tracking-wide">
              <Cpu className="h-3 w-3 text-zinc-400" />
              <span>{detail.specs.length} ENG SPECS</span>
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
          <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-brass transition-colors flex items-center justify-between">
            <span>{itemName}</span>
            <span className="text-xs font-mono font-normal text-zinc-500 group-hover:text-brass transition-colors flex items-center gap-1">
              {isExpanded ? "COLLAPSE" : "EXPAND"}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          </h3>
          {detail && (
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400 font-normal line-clamp-2 group-hover:text-zinc-300 transition-colors">
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-mono text-zinc-300 shadow-inner group-hover:border-white/20 transition-colors"
              >
                <span className="text-zinc-500">{spec.label}:</span>
                <span className="font-semibold text-zinc-100">{spec.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Expanded View Section — High-End Schematic Telemetry Dashboard */}
        <AnimatePresence>
          {isExpanded && detail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-t border-white/10 pt-6 space-y-6">
                {/* Technical Specifications Bento Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brass">
                      <Cpu className="h-4 w-4 text-brass animate-pulse" /> Technical Profile // Verified Telemetry
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {detail.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/50 p-3.5 hover:border-brass/30 transition-all group/spec"
                      >
                        <dt className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400 group-hover/spec:text-zinc-300">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 font-sans text-sm font-bold text-white tracking-tight">
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
                          className="flex items-start gap-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 text-xs text-zinc-300 leading-relaxed hover:border-white/15 transition-colors"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass shadow-sm" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Typical Applications */}
                {detail.applications.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2.5">
                      <Layers className="h-4 w-4 text-zinc-400" /> Typical Industry Duty
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {detail.applications.map((app) => (
                        <span
                          key={app}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-[11px] font-mono font-semibold tracking-wider uppercase text-zinc-300 hover:border-brass/50 hover:text-white transition-colors"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* High-Impact Express Quotation Request Dispatch Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-brass/50 bg-gradient-to-r from-brass/20 via-brass/10 to-transparent p-5 sm:p-6 shadow-[0_4px_25px_rgb(217,119,6,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="flex items-center gap-2 text-base font-display font-bold text-white">
                      <Sparkles className="h-5 w-5 text-brass animate-spin-slow" />
                      <span>Need an immediate quotation for this {itemName}?</span>
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed max-w-xl font-normal">
                      Click below — we automatically attach all technical profile specifications and duty parameters into the priority RFQ form.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    search={{ category: category.name, product: itemName }}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brass to-[#F59E0B] px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-lg shadow-brass/25 transition-all hover:scale-[1.02] hover:shadow-brass/40 active:scale-95 cursor-pointer font-sans tracking-wide"
                  >
                    <Zap className="h-4 w-4 fill-black text-black" />
                    <span>Express Quote Request</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Inside Expanded Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono">
                  <a
                    href="tel:+917806936475"
                    className="inline-flex items-center gap-1.5 font-semibold text-zinc-300 transition-colors hover:text-brass"
                  >
                    <Phone className="h-3.5 w-3.5 text-brass" />
                    <span>+91 78069 36475 (Engineering Support Desk)</span>
                  </a>
                  <Link
                    to="/contact"
                    search={{ category: category.name, product: itemName }}
                    className="group/link inline-flex items-center gap-1 font-bold text-brass hover:underline cursor-pointer"
                  >
                    <span>Request CAD drawing &amp; duty certification</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-mono font-semibold text-zinc-300 transition-all hover:border-brass/40 hover:bg-white/[0.08] hover:text-white active:scale-95 cursor-pointer shadow-sm"
        >
          <span>{isExpanded ? "CLOSE SPECS" : "QUICK SPECS & DETAILS"}</span>
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-brass" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-brass" />
          )}
        </button>

        <Link
          to="/contact"
          search={{ category: category.name, product: itemName }}
          className="inline-flex items-center gap-2 rounded-xl bg-brass px-5 py-2 text-xs font-bold text-black shadow-md shadow-brass/20 transition-all hover:bg-brass/90 hover:shadow-brass/30 active:scale-95 cursor-pointer tracking-wide"
        >
          <Sparkles className="h-3.5 w-3.5 text-black" />
          <span>Get Quote</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
