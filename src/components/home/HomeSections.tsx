import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessagesSquare,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SECTORS } from "@/data/catalog";
import { TradeLanes } from "@/components/site/TradeLanes";
import { BRANDS, CLIENTS } from "@/data/clients";
import { ClientLogo } from "@/components/site/ClientLogo";

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

/* ───────────────────────── SEAL FINDER BAND ───────────────────────── */
// Shows a real question from the /wizard finder; each answer opens the finder with it preselected.
const FINDER_OPTIONS = [
  { id: "chemical", label: "Chemical processing" },
  { id: "food", label: "Food, dairy & beverage" },
  { id: "water", label: "Water & wastewater" },
  { id: "general", label: "General engineering" },
];

export function FinderBand() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] p-7 text-white sm:p-12 lg:p-14" style={{ background: "var(--gradient-brand)" }}>
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
              Not sure which seal you need?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              Answer six quick questions about your equipment and duty. Get the seal type, materials and arrangement that fit, ready to quote.
            </p>
            <Link
              to="/wizard"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              Find my seal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-5 text-ink shadow-lift sm:p-7">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Find my seal · 6 questions</div>
            <div className="mt-2 font-display text-2xl font-black tracking-tight">Which industry is it for?</div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {FINDER_OPTIONS.map((o) => (
                <li key={o.id}>
                  <Link
                    to="/wizard"
                    search={{ industry: o.id }}
                    className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-hairline bg-background px-4 py-3 text-sm font-semibold transition hover:border-brass hover:bg-brass/5"
                  >
                    {o.label}
                    <ArrowRight className="h-4 w-4 text-brass" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

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

/* ───────────────────────── GLOBAL REACH (trade network map) ───────────────────────── */
const SOURCE_BRANDS = [
  { country: "Sweden", code: "SE", brands: ["SKF"] },
  { country: "Germany", code: "DE", brands: ["FAG", "INA"] },
  { country: "Japan", code: "JP", brands: ["NTN"] },
];

export function GlobalReach() {
  const reduce = useReducedMotion();
  const [focus, setFocus] = useState<string | null>(null);
  const logoFor = (name: string) => BRANDS.find((b) => b.name === name);
  const brandCount = SOURCE_BRANDS.reduce((n, s) => n + s.brands.length, 0);
  const facts = [
    { value: String(SOURCE_BRANDS.length), label: "Source countries" },
    { value: String(brandCount), label: "Global brands" },
    { value: "1", label: "Dispatch hub" },
  ];

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.6, ease, delay },
        };

  return (
    <section id="global" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      {/* This panel stays dark in light and dark mode so the map reads clearly. */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1020] px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 72% 0%, rgba(14,165,233,0.20), transparent 70%), radial-gradient(40% 35% at 10% 100%, rgba(251,191,36,0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <motion.span
              {...fadeUp()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
              </span>
              Global supply network
            </motion.span>
            <motion.h2 {...fadeUp(0.05)} className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
              Sourced from the best.
              <br />
              Delivered to <span className="italic text-sky-300">every market.</span>
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.1)} className="lg:justify-self-end">
            <p className="max-w-md text-base leading-relaxed text-slate-300">
              We buy genuine parts from leading brands in their home countries and ship them to process plants around the world at competitive prices.
            </p>
            <dl className="mt-6 grid max-w-md grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
              {facts.map((f) => (
                <div key={f.label} className="px-4 py-3">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-2xl font-black tracking-tight text-white">{f.value}</dd>
                  <dd className="mt-0.5 text-[11px] font-medium leading-tight text-slate-400">{f.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Map, framed, with edges fading into the panel */}
        <div className="relative z-10 mt-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b1324]">
          <div className="relative overflow-hidden">
            <TradeLanes focus={focus} onFocus={setFocus} />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_60%_45%,transparent_55%,#0b1324_100%)]" />
          </div>

          {/* Legend: under the map on phones, overlaid on its lower edge from tablet up */}
          <div className="relative flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-white/[0.06] px-4 py-3 text-[11px] text-slate-300 sm:absolute sm:inset-x-0 sm:bottom-0 sm:border-0 sm:bg-gradient-to-t sm:from-[#0b1324] sm:via-[#0b1324]/80 sm:to-transparent sm:px-6 sm:pb-4 sm:pt-8 sm:text-xs">
            <span className="inline-flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-gradient-to-r from-amber-300 to-amber-300/20" /> Sourced from brand home countries
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-gradient-to-r from-sky-300 to-sky-300/20" /> Delivered from Hosur worldwide
            </span>
            <span className="text-slate-500 sm:ml-auto">Routes shown are illustrative</span>
          </div>
        </div>

        {/* Supply chain: source countries and their brands, flowing into the Hosur hub */}
        <ul className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCE_BRANDS.map((s, i) => (
            <motion.li
              key={s.country}
              {...fadeUp(0.05 * i)}
              tabIndex={0}
              onMouseEnter={() => setFocus(s.country)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(s.country)}
              onBlur={() => setFocus(null)}
              className={`group relative flex flex-col rounded-2xl border p-5 outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-amber-300/60 ${focus === s.country ? "-translate-y-0.5 border-amber-300/50 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-300/10 font-mono text-[10px] font-bold text-amber-300 ring-1 ring-amber-300/25">
                    {s.code}
                  </span>
                  <span className="text-sm font-semibold text-white">{s.country}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 transition group-hover:text-amber-200">
                  to Hosur <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              <div className="mt-5 flex flex-1 items-end gap-2.5">
                {s.brands.map((b) => {
                  const logo = logoFor(b);
                  return logo?.logo ? (
                    <span key={b} className="grid h-12 min-w-[5.5rem] place-items-center rounded-xl bg-white px-4 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]">
                      <img src={logo.logo} alt={b} loading="lazy" className={`w-auto max-w-[6.5rem] object-contain ${logo.square ? "h-8" : "h-6"}`} />
                    </span>
                  ) : (
                    <span key={b} className="text-sm font-bold">{b}</span>
                  );
                })}
              </div>
            </motion.li>
          ))}

          <motion.li
            {...fadeUp(0.15)}
            tabIndex={0}
            onMouseEnter={() => setFocus("Hosur")}
            onMouseLeave={() => setFocus(null)}
            onFocus={() => setFocus("Hosur")}
            onBlur={() => setFocus(null)}
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-sky-400/15 to-sky-400/[0.03] p-5 outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-sky-300/60 ${focus === "Hosur" ? "-translate-y-0.5 border-sky-300/60" : "border-sky-300/25"}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-sky-300/15 text-sky-200 ring-1 ring-sky-300/30">
                <Truck className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-white">Hosur, India</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Our head office brings every order together and ships it to your plant, wherever it is.
            </p>
            <p className="mt-auto hidden pt-3 text-[11px] font-medium text-sky-200/70 lg:block">Hover a card to trace its route</p>
          </motion.li>
        </ul>
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

/* ───────────────────────── CLIENT MARQUEE (companies we supply) ───────────────────────── */
// Two rows of client companies drifting in opposite directions. Each row's list is rendered twice
// so the -50% CSS loop is seamless; hovering pauses it, and reduced motion stops it (styles.css).
export function ClientMarquee() {
  const half = Math.ceil(CLIENTS.length / 2);
  const rows = [CLIENTS.slice(0, half), CLIENTS.slice(half)];

  return (
    <section aria-labelledby="clients-heading" className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">Trusted across industries</span>
          <h2 id="clients-heading" className="mt-3 max-w-2xl font-display text-3xl font-black leading-[1.05] tracking-tight text-ink sm:text-4xl">
            {CLIENTS.length}+ companies keep their plants running with our parts.
          </h2>
        </div>
      </div>

      <div className="relative mt-10 space-y-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] sm:space-y-4">
        {rows.map((row, r) => (
          <div key={r} className="group flex overflow-hidden">
            <ul
              className={`flex w-max shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] sm:gap-4 sm:pr-4 ${r === 0 ? "marquee-track" : "marquee-track-reverse"}`}
              style={{ animationDuration: `${row.length * 5}s` }}
            >
              {[...row, ...row].map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= row.length || undefined}
                  className="flex h-16 shrink-0 items-center rounded-2xl border border-hairline bg-surface px-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:h-20 sm:px-8"
                >
                  <ClientLogo client={c} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
