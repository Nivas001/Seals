import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  CreditCard,
  MapPinned,
  MessageCircle,
  PackageCheck,
  Play,
  Scale,
  ScanSearch,
  Timer,
  Truck,
  Warehouse,
  Layers,
} from "lucide-react";
import { CATEGORIES, COMPANY, SECTORS } from "@/data/catalog";
import { BRANDS, CLIENTS } from "@/data/clients";
import { ClientLogo } from "@/components/site/ClientLogo";

const ease = [0.16, 1, 0.3, 1] as const;

/* Quick facts, every number counted from data already on the site. */
export function AboutFacts({ categoryCount = CATEGORIES.length }: { categoryCount?: number }) {
  const facts = [
    { k: String(categoryCount), v: "product families" },
    { k: String(SECTORS.length), v: "industries served" },
    { k: `${CLIENTS.length}+`, v: "client companies" },
    { k: String(BRANDS.length), v: "genuine bearing brands" },
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

/* Why a plant would buy through a trading company instead of from each manufacturer. */
export function WhyTrader() {
  const points = [
    {
      icon: Layers,
      t: "One supplier, many makers",
      d: "Seals, bearings, hoses, fittings and pump spares from different manufacturers on a single quote, instead of chasing a separate vendor for each.",
    },
    {
      icon: Scale,
      t: "Prices compared for you",
      d: "We check several manufacturers and sellers for each line and buy in volume, so the price you pay is below the market.",
    },
    {
      icon: ScanSearch,
      t: "No part number needed",
      d: "A drawing or a photo of the worn part is enough. We identify it and tell you the right size, grade and material.",
    },
    {
      icon: Boxes,
      t: "Advice that is brand-neutral",
      d: "We do not make the parts, so we are not pushing our own. We recommend the brand and material that suits your duty.",
    },
  ];
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <div className="max-w-2xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">Why a trading company</div>
        <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
          What you get by buying through us.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Going direct to every manufacturer means many vendors, many minimum orders and many follow-ups. We take that work off your purchase team.
        </p>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {points.map((p, i) => (
          <motion.li
            key={p.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08, ease }}
            className="flex gap-5 rounded-3xl border border-hairline bg-surface p-6 sm:p-7"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brass/10 text-brass">
              <p.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-black tracking-tight text-ink">{p.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{p.d}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* Where the brands come from, and the companies we deliver to. */
const BRAND_ORIGIN: Record<string, string> = { SKF: "Sweden", FAG: "Germany", INA: "Germany", NTN: "Japan" };

export function BrandsAndClients() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <h2 className="max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Brands we buy. <span className="italic text-brass">Companies we supply.</span>
      </h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Genuine bearings, from the source</div>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {BRANDS.map((b) => (
              <li key={b.name} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-hairline bg-background p-4">
                <span className="grid h-16 place-items-center">
                  <ClientLogo client={b} size="lg" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{BRAND_ORIGIN[b.name] ?? ""}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Some of the {CLIENTS.length} companies we supply
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {CLIENTS.map((c) => (
              <li key={c.name} className="rounded-full border border-hairline bg-background px-3.5 py-2 text-[13px] font-semibold text-ink/80">
                {c.name}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Electronics, energy, pharma, food, coatings, oilfield and engineering companies.
          </p>
        </div>
      </div>
    </section>
  );
}

/* The practical answers a buyer needs before placing an order. */
export function WorkingWithUs({ motto = COMPANY.motto }: { motto?: string }) {
  const items = [
    { icon: MessageCircle, t: "How to enquire", d: "WhatsApp, phone, email or the enquiry form. Whatever is quickest for you.", link: { to: "/contact", label: "Contact options" } },
    { icon: Timer, t: "When you get a quote", d: "Within one working day, with price, brand and dispatch date." },
    { icon: Warehouse, t: "What we keep in stock", d: "Fast-moving lines are held at our Hosur office, checked and labelled, ready to pick." },
    { icon: Truck, t: "How it ships", d: "By road across India, by air for urgent orders and by sea for export." },
    { icon: CreditCard, t: "How you pay", d: "Bank transfer or SWIFT, UPI, and Visa, MasterCard or Amex cards.", link: { to: "/about/payments", label: "Payment options" } },
    { icon: MapPinned, t: "Where we deliver", d: "The Hosur–Bengaluru belt, the rest of Tamil Nadu and Karnataka, all of India, and export." },
  ] as const;
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">Working with us</div>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            The practical details.
          </h2>
          <figure className="relative mt-8 overflow-hidden rounded-3xl p-7 text-white sm:p-8" style={{ background: "var(--gradient-brand)" }}>
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <figcaption className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">Our motto</figcaption>
            <blockquote className="relative mt-4 font-display text-2xl font-black leading-[1.15] tracking-tight">&ldquo;{motto}&rdquo;</blockquote>
          </figure>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((it, i) => (
            <motion.li
              key={it.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.06, ease }}
              className="flex flex-col rounded-3xl border border-hairline bg-surface p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass/10 text-brass">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-black tracking-tight text-ink">{it.t}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              {"link" in it && (
                <Link to={it.link.to} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brass hover:underline">
                  {it.link.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
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
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">Our process</div>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            See how we <span className="italic text-brass">work.</span>
          </h2>
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

      <div className="relative mt-8">
      <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[3rem] opacity-60 blur-3xl" style={{ background: "var(--gradient-brand)", opacity: 0.18 }} />
      <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-ink shadow-lift ring-1 ring-hairline">
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
            className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/35 via-transparent to-transparent p-4 transition hover:from-ink/20 sm:p-7"
            aria-label={`Play the ${v.label.toLowerCase()} video: how we work`}
          >
            <span className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-lift transition group-hover:scale-105">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brass text-white sm:h-12 sm:w-12">
                <span className="absolute inset-0 animate-ping rounded-full bg-brass/40 motion-reduce:animate-none" />
                <Play className="relative ml-0.5 h-5 w-5 fill-current" />
              </span>
              <span className="text-sm font-bold text-ink sm:text-base">
                Watch · 1:30 · with sound
              </span>
            </span>
          </button>
        )}
      </div>
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

/* Hero visual: one clean mechanical seal photo, gently floating. */
export function AboutHeroCollage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden>
      <div className="absolute inset-[8%] rounded-full bg-brass/20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="absolute inset-[4%]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-lift"
        >
          <img src="/images/about-cartridge-seals.jpg" alt="" className="h-full w-full object-cover" decoding="async" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="absolute bottom-[2%] right-[6%] z-10 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur"
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
