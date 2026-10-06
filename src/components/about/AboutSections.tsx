import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe2, Package, PackageCheck, Play, Search, Warehouse } from "lucide-react";
import { CATEGORIES } from "@/data/catalog";
import inventoryImg from "@/assets/industries-inventory.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const SECTOR_LINKS = [
  { name: "Food Processing", anchor: "sector-food-processing" },
  { name: "Chemical", anchor: "sector-chemical" },
  { name: "Beverages", anchor: "sector-beverages" },
  { name: "Breweries", anchor: "sector-breweries" },
  { name: "Plastics", anchor: "sector-plastics" },
  { name: "Pharma", anchor: "sector-pharma" },
  { name: "Oil & Gas", anchor: "sector-oil-gas" },
  { name: "Dye Manufacturing", anchor: "sector-dye-manufacturing" },
];

/* Quick facts, all derived from data already on the site. */
export type AboutCategory = { slug: string; name: string; image?: string | null };

export function AboutFacts({ categoryCount = CATEGORIES.length }: { categoryCount?: number }) {
  const facts = [
    { k: String(categoryCount), v: "product families" },
    { k: String(SECTOR_LINKS.length), v: "industries served" },
    { k: "Hosur", v: "head office, Tamil Nadu" },
    { k: "Global", v: "service and dispatch" },
  ];
  return (
    <section className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-8">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.v} className="bg-surface px-5 py-6 sm:px-8 sm:py-8">
            <dt className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">{f.k}</dt>
            <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// Column span for the closing tile so it exactly fills the last row at 2, 3 and 4 columns.
const BASE_SPAN = ["col-span-2", "col-span-1"];
const SM_SPAN = ["sm:col-span-3", "sm:col-span-2", "sm:col-span-1"];
const LG_SPAN = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-2", "lg:col-span-1"];
const fillSpan = (n: number) => `${BASE_SPAN[n % 2]} ${SM_SPAN[n % 3]} ${LG_SPAN[n % 4]}`;

/* What we supply: every live product family (from the admin), with a photo. */
export function WhatWeDo({ categories }: { categories?: AboutCategory[] | null }) {
  const list: AboutCategory[] = categories?.length ? categories : CATEGORIES;
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
          What we do.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          We source and supply spares and components for process plants: pumps and pump spares, mechanical seals, bearings, elastomers, silicone products, hoses, stainless steel fittings, valves, rods and more. One trading partner for the parts your line depends on.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {list.map((c, i) => (
          <motion.li
            key={c.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease }}
          >
            <Link
              to="/products/$category"
              params={{ category: c.slug }}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-ink"
            >
              {c.image ? (
                <img src={c.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
                <span className="font-display text-base font-black leading-tight text-white sm:text-lg">{c.name}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </motion.li>
        ))}
        {/* closing tile fills the last row so the grid never ends on a lonely card */}
        <li className={fillSpan(list.length)}>
          <Link
            to="/contact"
            className="group flex h-full min-h-[8rem] flex-col justify-between rounded-2xl border border-dashed border-brass/40 bg-brass/5 p-4 transition hover:border-brass hover:bg-brass/10 sm:p-5"
          >
            <span className="font-display text-lg font-black leading-tight text-ink">Need something not listed?</span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brass">
              Send us the part <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

/* How the business runs, from sourcing to delivery. */
export function BusinessFlow() {
  const steps = [
    { icon: Globe2, t: "Source", d: "We buy genuine parts from manufacturers and trusted sellers in India and abroad, comparing prices so quality and cost are right from the start." },
    { icon: Warehouse, t: "Stock", d: "Fast-moving lines are held at our Hosur head office, checked, labelled and ready to pick." },
    { icon: Search, t: "Match", d: "Send a spec, a drawing or a photo of the worn part. We identify it and recommend the correct grade, material or brand." },
    { icon: PackageCheck, t: "Deliver", d: "We pack and dispatch from Hosur or a regional branch, to plants worldwide, on the timeline you need." },
  ];

  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            How our business works.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            We are traders: we buy parts where they are made best and priced right, and sell them to plants that cannot afford downtime, for less than the market.
          </p>
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-hairline">
            <img src={inventoryImg} alt="Warehouse of organised industrial parts" width={1200} height={900} loading="lazy" decoding="async" className="h-56 w-full object-cover sm:h-72" />
          </div>
        </div>

        <ol className="relative space-y-4">
          <div aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-brass via-brass/40 to-transparent" />
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="relative flex gap-5 rounded-3xl border border-hairline bg-surface p-5 sm:p-6"
            >
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brass/10 text-brass">
                <s.icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <div className="font-display text-2xl font-black tracking-tight text-ink">
                  <span className="mr-2 text-brass">{i + 1}.</span>
                  {s.t}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Who we serve: links into the industries page. */
export function WhoWeServe() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface p-7 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
              Who we serve.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Process plants where hygiene, chemistry and uptime matter. Pick your industry to see the duty window and the parts we recommend.
            </p>
            <Link to="/industries" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-background transition hover:bg-ink/85">
              Explore industries <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {SECTOR_LINKS.map((s) => (
              <li key={s.name}>
                <Link
                  to="/industries"
                  hash={s.anchor}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-5 py-3 text-sm font-semibold text-ink/85 transition hover:border-ink/25 hover:bg-white hover:text-ink"
                >
                  <Package className="h-4 w-4 text-brass" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* "How we work" explainer videos (rendered from video/explainer and video/explainer-v1). */
const VIDEOS = [
  {
    id: "cinematic",
    label: "Cinematic",
    tag: "New",
    file: "how-we-work",
    lines: [
      "Meet AARRKKAA International. Industrial trading, done right.",
      "One worn seal. One seized bearing. And the whole line stops. That's where we come in.",
      "Step one. Tell us what you need. Send a part number, a drawing, or just a photo on WhatsApp. You'll have a quote within one working day.",
      "Step two. We find the best source. Genuine parts from manufacturers and trusted sellers, in India and abroad. SKF from Sweden. FAG and INA from Germany. NTN from Japan.",
      "Step three. Trading is what we do. We compare sellers, buy in volume, and pass the saving on to you. So you pay less than the market.",
      "Step four. Every part is matched to your spec, quality checked, and packed with care, right here in Hosur.",
      "Step five. It's on the move. By road across India, by air when it's urgent, and by sea for export. Delivered. On time.",
      "AARRKKAA International. Genuine parts, lower cost, on time. Send us your part, and we'll match it.",
    ],
  },
  {
    id: "classic",
    label: "Classic",
    tag: "Calm",
    file: "how-we-work-classic",
    lines: [
      "This is AARRKKAA International. Industrial trading, done right.",
      "When one part fails, the whole line stops. And every hour of downtime costs money. That's where we come in.",
      "Step one. Tell us what you need. Send a part number, a drawing, or just a photo, on WhatsApp, phone or email. You'll get a quote within one working day.",
      "Step two. We find the best source. We buy genuine parts from manufacturers and trusted sellers, in India and abroad. Like SKF from Sweden, FAG and INA from Germany, and NTN from Japan.",
      "Step three. Trading is what we do. We compare sellers and buy in volume, so you pay less than the market price.",
      "Step four. Every part is matched to your spec, checked for quality, and packed safely at our Hosur office.",
      "Step five. We deliver by road across India, by air for urgent orders, and by sea for exports. Right to your plant, on time.",
      "Genuine parts. Lower cost. Delivered on time. AARRKKAA International. Send us your part, and we'll match it.",
    ],
  },
] as const;

const VIDEO_JSON_LD = JSON.stringify(
  VIDEOS.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.id === "cinematic" ? "How AARRKKAA International works" : "How AARRKKAA International works (classic)",
    description:
      "A 90-second look at how AARRKKAA International, an industrial trading company in Hosur, Tamil Nadu, sources genuine industrial parts and delivers them to plants at a lower cost.",
    thumbnailUrl: `https://www.aarrkkaa.com/videos/${v.file}-poster.jpg`,
    contentUrl: `https://www.aarrkkaa.com/videos/${v.file}.mp4`,
    uploadDate: "2026-10-07",
    duration: "PT1M30S",
    publisher: { "@id": "https://www.aarrkkaa.com/#organization" },
    transcript: v.lines.join(" "),
  })),
);

export function HowWeWorkVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const v = VIDEOS[active];

  const play = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
  };
  const choose = (i: number) => {
    if (i === active) return;
    videoRef.current?.pause();
    setStarted(false);
    setActive(i);
  };

  return (
    <section id="how-we-work-video" className="scroll-mt-28 mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: VIDEO_JSON_LD }} />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">See how we work.</h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            From your enquiry to delivery at your plant, in 90 seconds. Pick a version.
          </p>
        </div>
        <div role="tablist" aria-label="Video version" className="inline-flex w-fit rounded-full border border-hairline bg-surface p-1 shadow-soft">
          {VIDEOS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => choose(i)}
              className={`relative rounded-full px-4 py-2 text-sm font-bold transition ${active === i ? "text-white" : "text-ink/70 hover:text-ink"}`}
            >
              {active === i && (
                <motion.span layoutId="video-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">
                {item.label}
                <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${active === i ? "bg-white/15" : "bg-brass/10 text-brass"}`}>
                  {item.tag}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-hairline bg-ink shadow-lift">
        <video
          key={v.id}
          ref={videoRef}
          className="block aspect-video w-full"
          poster={`/videos/${v.file}-poster.jpg`}
          controls={started}
          preload="none"
          playsInline
          aria-label={`How AARRKKAA International works, ${v.label.toLowerCase()} version, 90-second video`}
        >
          <source src={`/videos/${v.file}.webm`} type="video/webm" />
          <source src={`/videos/${v.file}.mp4`} type="video/mp4" />
          <track kind="captions" src={`/videos/${v.file}.en.vtt`} srcLang="en" label="English" />
        </video>
        {!started && (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/20 via-transparent to-transparent p-4 transition hover:from-ink/10 sm:p-7"
            aria-label={`Play the ${v.label.toLowerCase()} video: how we work`}
          >
            <span className="flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-6 text-sm font-bold text-ink shadow-lift transition group-hover:scale-105 sm:text-base">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brass text-white sm:h-12 sm:w-12">
                <span className="absolute inset-0 animate-ping rounded-full bg-brass/40 motion-reduce:animate-none" />
                <Play className="relative ml-0.5 h-5 w-5 fill-current" />
              </span>
              Watch · 1:30 · with sound
            </span>
          </button>
        )}
      </div>

      <details className="group mt-4 rounded-2xl border border-hairline bg-surface px-5 py-4 text-sm">
        <summary className="cursor-pointer font-semibold text-ink">Read the video transcript</summary>
        <div className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
          {v.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </details>
    </section>
  );
}

/* Hero photo collage: three of the site's own product photos, gently floating. */
export function AboutHeroCollage() {
  const tiles = [
    { src: "/images/cat-seals.jpg", cls: "left-[8%] top-0 w-[58%] -rotate-[4deg]", d: 0 },
    { src: "/images/cat-bearings.jpg", cls: "right-0 top-[24%] w-[52%] rotate-[5deg]", d: 0.12 },
    { src: "/images/cat-pumps.jpg", cls: "left-0 bottom-[2%] w-[54%] rotate-[3deg]", d: 0.24 },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden>
      <div className="absolute inset-[12%] rounded-full bg-brass/15 blur-3xl" />
      {tiles.map((t) => (
        <motion.div
          key={t.src}
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 + t.d, ease }}
          className={`absolute ${t.cls}`}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, delay: t.d * 8, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lift"
          >
            <img src={t.src} alt="" className="aspect-[4/3] w-full object-cover" decoding="async" />
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="absolute bottom-[16%] right-[2%] flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
          <PackageCheck className="h-5 w-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-black text-ink">Genuine parts</span>
          <span className="block text-xs text-muted-foreground">Lower than market</span>
        </span>
      </motion.div>
    </div>
  );
}
