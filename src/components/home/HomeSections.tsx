import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessagesSquare,
  PackageCheck,
  ShieldCheck,
  Truck,
  Warehouse,
  Globe2,
} from "lucide-react";
import { SECTORS } from "@/data/catalog";
import { TradeLanes } from "@/components/site/TradeLanes";
import { PortScene } from "@/components/site/PortScene";

import silicone from "@/assets/cat-silicone.jpg";
import elastomers from "@/assets/cat-elastomers.jpg";
import hoses from "@/assets/cat-hoses.jpg";
import pumps from "@/assets/cat-pumps.jpg";
import nozzles from "@/assets/cat-nozzles.jpg";
import seals from "@/assets/cat-seals.jpg";
import valves from "@/assets/cat-valves.jpg";
import steel from "@/assets/cat-steel.jpg";
import qualityImg from "@/assets/industries-quality.jpg";
import inventoryImg from "@/assets/industries-inventory.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────── INDUSTRIES (photo accordion) ───────────────────────── */
const SECTOR_IMAGES: Record<string, string> = {
  Food: silicone,
  Chemical: elastomers,
  Beverages: hoses,
  Breweries: pumps,
  Plastics: nozzles,
  Pharma: seals,
  "Oil & Gas": valves,
  "Dye Manufacturing": steel,
};

// Anchor ids on /industries are built from the full sector names.
const SECTOR_ANCHORS: Record<string, string> = {
  Food: "sector-food-processing",
  Chemical: "sector-chemical",
  Beverages: "sector-beverages",
  Breweries: "sector-breweries",
  Plastics: "sector-plastics",
  Pharma: "sector-pharma",
  "Oil & Gas": "sector-oil-gas",
  "Dye Manufacturing": "sector-dye-manufacturing",
};

export function IndustriesShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section id="industries" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
          Eight sectors.
          <br />
          One reliable <span className="italic text-brass">partner.</span>
        </h2>
        <Link
          to="/industries"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
        >
          All industries
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        Components built for the hygienic, chemical and mechanical demands of process-critical plants.
      </p>

      {/* Desktop: expanding photo panels */}
      <ul className="mt-10 hidden h-[480px] gap-3 lg:flex">
        {SECTORS.map((s, i) => {
          const open = active === i;
          return (
            <li
              key={s.name}
              className="min-w-0 transition-[flex-grow] duration-500 ease-out"
              style={{ flexGrow: open ? 5 : 1, flexBasis: 0 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <Link
                to="/industries"
                hash={SECTOR_ANCHORS[s.name]}
                className="group relative block h-full w-full overflow-hidden rounded-3xl border border-hairline bg-ink"
                aria-label={`${s.name}: ${s.desc}`}
              >
                <img
                  src={SECTOR_IMAGES[s.name]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${open ? "scale-105 opacity-100" : "scale-100 opacity-70"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                {/* Collapsed label */}
                <span
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-lg font-black tracking-tight text-white transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${open ? "opacity-0" : "opacity-100"}`}
                >
                  {s.name}
                </span>
                {/* Expanded content */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-7 transition duration-500 ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
                >
                  <div className="font-display text-3xl font-black tracking-tight text-white">{s.name}</div>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-ink">
                    See products <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile and tablet: swipeable photo cards */}
      <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
        {SECTORS.map((s) => (
          <li key={s.name} className="w-[72%] shrink-0 snap-start sm:w-[44%]">
            <Link
              to="/industries"
              hash={SECTOR_ANCHORS[s.name]}
              className="relative block aspect-[4/5] overflow-hidden rounded-3xl border border-hairline bg-ink"
            >
              <img src={SECTOR_IMAGES[s.name]} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-display text-2xl font-black tracking-tight text-white">{s.name}</div>
                <p className="mt-1.5 text-sm leading-snug text-white/80">{s.desc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────────────────── GLOBAL REACH (animated trade lanes) ───────────────────────── */
export function GlobalReach() {
  const reduce = useReducedMotion();
  const facts = [
    { icon: Warehouse, title: "Stocked in Hosur", body: "Fast-moving lines held at head office, ready to pick." },
    { icon: PackageCheck, title: "Packed to travel", body: "Parts checked, labelled and crated for export." },
    { icon: Globe2, title: "Dispatched worldwide", body: "Service available globally, on the timeline you need." },
  ];

  return (
    <section id="global" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      {/* This panel stays dark in light and dark mode so the map and sea read clearly. */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1020] px-5 pt-10 text-white sm:px-10 sm:pt-14 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(60% 50% at 70% 10%, rgba(14,165,233,0.22), transparent 70%)" }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl"
          >
            From Hosur
            <br />
            to your <span className="italic text-sky-300">plant floor.</span>
          </motion.h2>
          <p className="max-w-md text-base leading-relaxed text-slate-300 lg:justify-self-end">
            We hold stock, match the part and ship it to process plants around the world.
          </p>
        </div>

        <div className="relative z-10 mt-8 overflow-hidden sm:mt-12">
          <TradeLanes />
          <p className="mt-1 text-right text-[11px] text-slate-500">Illustrative trade lanes</p>
        </div>

        <ul className="relative z-10 mt-8 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          {facts.map((f) => (
            <li key={f.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-sky-300">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-lg font-bold tracking-tight">{f.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Port scene bleeds off the bottom edge of the panel */}
        <div className="relative z-10 -mx-5 mt-8 sm:-mx-10 lg:-mx-14">
          <PortScene />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── WHY US (bento with photos) ───────────────────────── */
export function WhyUsBento() {
  const base = "relative overflow-hidden rounded-3xl p-6 sm:p-8";
  const items = [
    {
      key: "quality",
      icon: ShieldCheck,
      title: "Quality first",
      body: "Genuine bearings, certified elastomers and traceable stainless steel. No compromises on materials or sourcing.",
      cls: "lg:col-span-2 min-h-[260px] text-white",
      bg: <img src={qualityImg} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />,
      scrim: "bg-gradient-to-t from-black/85 via-black/45 to-black/20",
    },
    {
      key: "delivery",
      icon: Truck,
      title: "Timely delivery",
      body: "Regional stock and disciplined logistics keep your line running when critical parts run out.",
      cls: "text-white",
      bg: <div className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />,
      scrim: "",
    },
    {
      key: "response",
      icon: MessagesSquare,
      title: "Fast response",
      body: "Quick answers on every technical query and quote request. No long waits.",
      cls: "border border-hairline bg-surface text-ink",
      bg: null,
      scrim: "",
    },
    {
      key: "feedback",
      icon: CheckCircle2,
      title: "Feedback loop",
      body: "Customer feedback keeps sharpening our matching accuracy and order reliability.",
      cls: "lg:col-span-2 min-h-[220px] text-white",
      bg: <img src={inventoryImg} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />,
      scrim: "bg-gradient-to-r from-black/85 via-black/55 to-black/20",
    },
  ];

  return (
    <section id="why-us" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <h2 className="max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Committed to convenience, accuracy and delivery.
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease }}
            className={`${base} flex flex-col justify-end ${it.cls}`}
          >
            {it.bg}
            {it.scrim && <div className={`absolute inset-0 ${it.scrim}`} />}
            <div className="relative">
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${it.key === "response" ? "bg-brass/10 text-brass" : "bg-white/15 text-white backdrop-blur"}`}
              >
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-black tracking-tight">{it.title}</h3>
              <p className={`mt-2 max-w-md text-sm leading-relaxed ${it.key === "response" ? "text-muted-foreground" : "text-white/80"}`}>{it.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── PROCESS (connected timeline) ───────────────────────── */
export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const steps = [
    { icon: MessagesSquare, t: "Enquire", d: "Send a spec, a drawing or a photo of the worn part. We identify it accurately." },
    { icon: ShieldCheck, t: "Match", d: "We recommend the right grade, material or brand from our stocked range or sourced direct." },
    { icon: Truck, t: "Deliver", d: "Dispatched from our Hosur head office or a regional branch, on the timeline you need." },
  ];

  return (
    <section id="process" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <h2 className="max-w-xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Three steps from query to crate.
      </h2>

      <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {/* Desktop connector line, drawn on scroll */}
        <motion.div
          aria-hidden
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease }}
          className="absolute left-[8%] right-[8%] top-7 hidden h-px origin-left bg-gradient-to-r from-brass via-brass/50 to-brass/10 md:block"
        />
        {/* Mobile connector line */}
        <div aria-hidden className="absolute bottom-6 left-7 top-7 w-px bg-gradient-to-b from-brass via-brass/40 to-transparent md:hidden" />

        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease }}
            className="relative flex gap-5 md:flex-col md:gap-6"
          >
            <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-brass/30 bg-surface text-brass shadow-soft">
              <s.icon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brass text-[11px] font-black text-white">{i + 1}</span>
            </span>
            <div>
              <h3 className="font-display text-2xl font-black tracking-tight text-ink">{s.t}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">{s.d}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
