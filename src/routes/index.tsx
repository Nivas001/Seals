import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import {
  ArrowUpRight, Phone, Mail, MapPin, ArrowRight,
  CheckCircle2, Sparkles, Truck, MessagesSquare, ShieldCheck,
  ChevronUp, Star,
} from "lucide-react";
import heroImg from "@/assets/hero-pump.jpg";
import factoryImg from "@/assets/factory.jpg";
import { CATEGORIES, SECTORS, COMPANY } from "@/data/catalog";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { LineSidebar } from "@/components/ui/LineSidebar";

export const Route = createFileRoute("/")({
  component: Home,
});

const BENTO_LAYOUT: Record<string, string> = {
  pumps: "sm:col-span-4 sm:row-span-2",
  "mechanical-seals": "sm:col-span-2 sm:row-span-2",
  elastomers: "sm:col-span-2",
  silicone: "sm:col-span-2",
  hoses: "sm:col-span-2",
  "stainless-steel": "sm:col-span-4",
  bearings: "sm:col-span-2",
  couplings: "sm:col-span-2",
  nozzles: "sm:col-span-2",
  valves: "sm:col-span-2",
  springs: "sm:col-span-2",
  other: "sm:col-span-2",
};

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return { count, ref };
}

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="relative">
      <div className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
        {count}{suffix}
      </div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Home() {
  const featured = CATEGORIES.slice(0, 8);
  const sidebarSections = [
    { id: "hero", label: "Overview" },
    { id: "about", label: "About Us" },
    { id: "catalog", label: "Products" },
    { id: "industries", label: "Industries" },
    { id: "why-us", label: "Why AARRKKAA" },
    { id: "testimonials", label: "Reviews" },
    { id: "process", label: "How We Work" },
    { id: "find-us", label: "Location" },
  ];

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <LineSidebar sections={sidebarSections} />
      <main>
        <Hero />
        <TrustStrip />
        <AboutPreview />
        <ProductsBento featured={featured} />
        <Industries />
        <WhyUs />
        <Testimonials />
        <Process />
        <CTABand />
        <ContactPreview />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

/* ─── Floating WhatsApp + Scroll-to-top ─── */
function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-4 z-30 flex flex-col items-end gap-3 sm:right-6">
      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-background shadow-lift text-ink/70 transition hover:text-ink hover:-translate-y-0.5"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917806936475"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-2 overflow-hidden rounded-full shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(37,211,102,0.4)]"
        style={{ background: "#25D366" }}
      >
        {/* Expanded label on hover */}
        <span className="max-w-0 overflow-hidden pl-0 text-[12px] sm:text-[13px] font-semibold text-white transition-all duration-300 group-hover:max-w-[140px] group-hover:pl-3 sm:group-hover:pl-4 whitespace-nowrap">
          Chat with us
        </span>
        <span className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center">
          <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </span>
      </a>
    </div>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-[0.35]">
        <div className="grid-lines absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.985 0.005 85 / 0) 55%, oklch(0.985 0.005 85) 82%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              Integrated technology support
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-balance font-display font-black leading-[0.95] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(2.5rem, 6.2vw, 5.25rem)" }}
            >
              Precision parts for
              <br />
              industry that
              <span
                className="inline-block bg-clip-text px-2 italic text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                can&rsquo;t stop.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              AARRKKAA International supplies pumps, mechanical seals,
              stainless steel, elastomers and specialty components to food,
              pharma, chemical and process plants worldwide with service available globally — matched
              accurately, shipped on time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition hover:bg-ink/85"
              >
                Explore the catalog
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white"
              >
                Request a quote
              </Link>
            </motion.div>

            {/* Animated stats */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-6">
              <StatItem target={12} suffix="+" label="Product categories" />
              <StatItem target={8} suffix="" label="Sectors served" />
              <StatItem target={100} suffix="+" label="SKU lines stocked" />
            </div>
          </div>

          {/* Hero bento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-hairline bg-surface shadow-lift">
              <img
                src={heroImg}
                alt="Precision industrial centrifugal pump assembly with brushed stainless steel housing and polished brass fittings"
                width={1600}
                height={1400}
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, oklch(0.14 0.02 260 / 0.35) 100%)",
                }}
              />

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-strong absolute left-4 top-4 max-w-[62%] rounded-2xl p-3.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded-lg text-primary-foreground"
                    style={{ background: "var(--gradient-brass)" }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Process Equipment Spares
                    </div>
                    <div className="text-sm font-bold text-ink">Pumps · Seals · Valves · Hoses</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="glass-strong absolute bottom-4 left-4 right-4 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Head office
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-ink">
                      Hosur, Tamil Nadu
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Service available globally
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-background transition hover:bg-ink/85"
                    aria-label="Contact us"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ─── */
function TrustStrip() {
  const items = [
    "Tata Electronics",
    "Thermax Onsite Energy Solutions",
    "Anthem Biosciences",
    "Werner Finley",
    "Astral Coatings",
    "Ecovinal International",
    "Yashaswi Fish Meal & Oil",
    "Zenfold Sustainable Technology",
    "H&V Advanced Materials",
    "Eco Edge Solutions",
    "Mukka Proteins",
    "Megha Fruit Processing",
    "RMZ Oilfield Engineering",
    "Ingex Botanicals",
    "Ovobel Foods",
    "Essae Gears & Transmissions",
  ];
  return (
    <section className="mt-20 border-y border-hairline bg-surface py-6 sm:mt-28">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-5 sm:px-8">
        <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">
          Trusted by industry leaders
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track flex w-max gap-10">
            {[...items, ...items].map((x, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap text-[13px] font-bold tracking-tight text-ink/75"
              >
                <span>{x}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-brass/60" />
              </span>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16"
            style={{ background: "linear-gradient(to right, var(--surface), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
            style={{ background: "linear-gradient(to left, var(--surface), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT PREVIEW ─── */
function AboutPreview() {
  return (
    <section id="about" className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>About the company</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            A trusted partner for
            <br />
            plants that
            <span className="italic text-brass"> keep running.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            AARRKKAA International is a supplier and distributor of pumps,
            pump spares, stainless steel flanges, clamps, silicone products,
            gaskets, seals, hoses, non-sparking tools and precision springs.
            Our head office is in Hosur, Tamil Nadu, with service available
            globally — enabling fast response and worldwide delivery for
            plants that can&rsquo;t afford downtime.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white"
            >
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-hairline p-8 sm:p-10"
            style={{ background: "var(--gradient-brand)" }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Our motto
            </span>
            <p className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              &ldquo;{COMPANY.motto}&rdquo;
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { k: "Improve", v: "Response time on every query" },
                { k: "Accuracy", v: "Right part, first time" },
                { k: "Feedback", v: "Loop that builds trust" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-sm font-bold text-white">{x.k}</div>
                  <div className="mt-1 text-xs leading-snug text-white/70">{x.v}</div>
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40"
              style={{ background: "var(--gradient-brass)", filter: "blur(60px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCTS BENTO ─── */
function ProductsBento({ featured }: { featured: typeof CATEGORIES }) {
  return (
    <section id="catalog" className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>What we supply</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            A catalog built for
            <br />
            process reliability.
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden sm:inline-flex items-center gap-2 self-start rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur hover:bg-white sm:self-end"
        >
          View all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-6 lg:auto-rows-[240px] sm:gap-4">
        {featured.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className={`bento-tile bento-tile-hover ${i >= 4 ? "hidden sm:block" : ""} ${BENTO_LAYOUT[cat.slug] ?? "sm:col-span-2"}`}
          >
            <Link
              to="/products/$category"
              params={{ category: cat.slug }}
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden p-5"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(1 0 0 / 0.05) 0%, oklch(0.14 0.02 260 / 0.55) 100%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <span className="glass rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                  {String(cat.count).padStart(2, "0")} items
                </span>
                <span className="glass-strong grid h-8 w-8 place-items-center rounded-full text-ink transition group-hover:bg-ink group-hover:text-background">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="relative">
                <h3 className="font-display text-lg font-black tracking-tight text-white sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-1 hidden max-w-xs text-[13px] leading-snug text-white/85 sm:block">
                  {cat.short}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur hover:bg-white"
        >
          View all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ─── INDUSTRIES ─── */
function Industries() {
  return (
    <section id="industries" className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Industries we serve</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Eight sectors.
            <br />
            One reliable
            <span className="italic text-brass"> partner.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Our components meet the hygienic, chemical and mechanical demands
            of some of India&rsquo;s most process-critical industries.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-4 transition hover:border-ink/25 hover:shadow-soft ${i >= 4 ? "hidden sm:block" : ""}`}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brass">
                Sector 0{i + 1}
              </div>
              <div className="mt-2 font-display text-lg font-black tracking-tight text-ink">
                {s.name}
              </div>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {s.desc}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-2 flex justify-center sm:hidden">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white"
          >
            View all industries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US — redesigned with large accent numbers ─── */
function WhyUs() {
  const pillars = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Quality first",
      body: "Genuine bearings, certified elastomers and traceable stainless steel — no compromises on materials or sourcing.",
      accent: "oklch(0.5 0.15 245)",
    },
    {
      num: "02",
      icon: Truck,
      title: "Timely delivery",
      body: "Regional stock and disciplined logistics keep your production line running when critical parts run out.",
      accent: "oklch(0.74 0.14 75)",
    },
    {
      num: "03",
      icon: MessagesSquare,
      title: "Fast response",
      body: "Improved response time on every technical query, quote request and follow-up — no long wait times.",
      accent: "oklch(0.5 0.15 245)",
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "Feedback loop",
      body: "We collect customer feedback to continuously sharpen matching accuracy and order reliability.",
      accent: "oklch(0.74 0.14 75)",
    },
  ];
  return (
    <section id="why-us" className="relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="grid-background pointer-events-none opacity-40" />
      <div className="relative z-10">
        <Eyebrow>Why AARRKKAA</Eyebrow>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Committed to convenience,
            <br />
            accuracy and delivery.
          </h2>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="h-full"
          >
            <GlowCard className="h-full">
              {/* Large background number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-3 font-display text-[4rem] font-black leading-none tracking-tighter select-none transition-transform duration-500 group-hover:scale-110 sm:-right-3 sm:-top-4 sm:text-[5.5rem]"
                style={{ color: p.accent, opacity: 0.07 }}
              >
                {p.num}
              </span>

              <span
                aria-hidden
                className="relative grid h-9 w-9 place-items-center rounded-xl text-primary-foreground shadow-soft sm:h-11 sm:w-11"
                style={{ background: "var(--gradient-brand)" }}
              >
                <p.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <h3 className="relative mt-4 font-display text-[15px] font-bold leading-tight tracking-tight text-ink sm:mt-5 sm:text-lg">
                {p.title}
              </h3>
              <p className="relative mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                {p.body}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    quote: "AARRKKAA consistently delivers the right mechanical seals on time. Their matching accuracy and fast response have kept our production lines running without interruption.",
    name: "Production Manager",
    role: "Food Processing Plant, Tamil Nadu",
  },
  {
    quote: "We rely on AARRKKAA for all our pump spares and stainless steel fittings. Their team responds quickly to urgent requests and their components are always genuine.",
    name: "Maintenance Engineer",
    role: "Pharmaceutical Facility, Karnataka",
  },
  {
    quote: "Sourcing PTFE and elastomeric components used to take weeks. With AARRKKAA, we get accurate quotes and fast dispatch from their regional stock. Outstanding service.",
    name: "Procurement Head",
    role: "Chemical Process Industry, Andhra Pradesh",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 300;
    const index = Math.round(scrollLeft / (itemWidth + 16)); // 16px gap
    setActiveIndex(Math.min(Math.max(index, 0), TESTIMONIALS.length - 1));
  };

  return (
    <section id="testimonials" className="relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-64 rounded-[3rem] opacity-5"
        style={{ background: "var(--gradient-brand)", filter: "blur(48px)" }}
      />

      <div className="relative">
        <Eyebrow>What our customers say</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
          Trusted by process plants
          <br />
          <span className="italic text-brass">and available globally.</span>
        </h2>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-10 flex snap-x snap-mandatory scroll-pl-5 sm:scroll-pl-0 overflow-x-auto pb-4 gap-4 sm:grid sm:grid-cols-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-5 px-5 sm:mx-0 sm:px-0 sm:pb-0"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="snap-start shrink-0 w-[80%] sm:w-auto flex"
            >
              <GlowCard className="flex w-full flex-col justify-between">
                <div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-brass text-brass" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-ink/80 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-5 border-t border-hairline pt-4">
                  <div className="text-sm font-bold text-ink">{t.name}</div>
                  <div className="mt-0.5 text-[12px] text-muted-foreground">{t.role}</div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-4 bg-brass" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS — redesigned with gradient step indicators ─── */
function Process() {
  const steps = [
    {
      k: "01",
      t: "Enquire",
      d: "Send a spec, a drawing, or even a photograph of the worn part. We identify it accurately.",
      icon: MessagesSquare,
    },
    {
      k: "02",
      t: "Match",
      d: "We recommend the correct grade, material or brand — from our stocked programme or sourced direct.",
      icon: ShieldCheck,
    },
    {
      k: "03",
      t: "Deliver",
      d: "Dispatched from our Hosur HQ or regional branch, on the timeline you need. No delays.",
      icon: Truck,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 300;
    const index = Math.round(scrollLeft / (itemWidth + 16));
    setActiveIndex(Math.min(Math.max(index, 0), steps.length - 1));
  };

  return (
    <section id="process" className="relative mx-auto mt-24 max-w-7xl overflow-hidden px-5 sm:mt-32 sm:px-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface p-6 sm:p-10 lg:p-14"
      >
        <div className="grid-background-bottom pointer-events-none opacity-50" />
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              How we work
            </div>
            <h2 className="mt-3 font-display text-3xl font-black leading-[1.02] tracking-tight text-ink sm:text-4xl">
              Assist &amp; deliver — in three steps.
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            From first query to dispatched crate.
          </span>
        </div>

        <ol
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative z-10 mt-10 flex snap-x snap-mandatory scroll-pl-5 overflow-x-auto pb-4 gap-4 md:grid md:gap-px md:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-5 px-5 md:mx-0 md:px-0"
        >
          {steps.map((s, i) => (
            <motion.li
              key={s.k}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="snap-start shrink-0 w-[80%] md:w-auto relative flex flex-col rounded-2xl border border-hairline bg-background p-6 md:rounded-none md:border-0 md:border-r md:last:border-r-0 md:bg-transparent md:border-hairline"
            >
              {/* Large step number */}
              <span
                className="font-display text-5xl font-black italic leading-none"
                style={{ backgroundImage: "var(--gradient-brass)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {s.k}
              </span>
              <div className="mt-3 flex items-center gap-2">
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-lg border border-hairline bg-surface"
                >
                  <s.icon className="h-4 w-4 text-ink" />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                  {s.t}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:pr-8">
                {s.d}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* Mobile Indicator Dots */}
        <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-4 bg-brass" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BAND ─── */
function CTABand() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div
        className="relative overflow-hidden rounded-[2rem] p-8 sm:p-14"
        style={{ background: "var(--gradient-brand)" }}
      >
        <img
          src={factoryImg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity"
          loading="lazy"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Need a specific spare?
            </span>
            <h2 className="mt-3 font-display text-3xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl">
              Tell us the part.
              <br />
              We&rsquo;ll match it.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Share a drawing, a model number or a picture. Our team responds
              with the exact grade, brand and delivery timeline.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col">
            <a
              href="tel:+917806936475"
              className="glass-strong col-span-1 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-4"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Call sales
                </div>
                <div className="mt-1 font-display text-sm font-bold text-ink sm:mt-0 sm:text-lg">
                  +91 78069 36475
                </div>
              </div>
              <Phone className="h-5 w-5 self-end text-brass sm:self-auto" />
            </a>
            <a
              href="https://wa.me/917806936475"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong col-span-1 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-4"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  WhatsApp
                </div>
                <div className="mt-1 font-display text-sm font-bold text-ink sm:mt-0 sm:text-lg">
                  Chat instantly
                </div>
              </div>
              <svg className="h-5 w-5 self-end text-[#25D366] sm:self-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href="mailto:aarrkkaainternational@gmail.com"
              className="glass-strong col-span-2 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-4"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Email
                </div>
                <div className="mt-1 truncate font-display text-sm font-bold text-ink sm:mt-0 sm:text-lg">
                  aarrkkaainternational@gmail.com
                </div>
              </div>
              <Mail className="h-5 w-5 shrink-0 self-end text-brass sm:self-auto" />
            </a>
            
            {/* Address card - Mobile only */}
            <div className="glass-strong col-span-2 flex flex-col items-start justify-between gap-3 rounded-2xl p-4 sm:hidden">
              <div className="flex w-full items-start justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Head Office</div>
                  <div className="mt-1 font-display text-lg font-bold text-ink">Hosur, Tamil Nadu</div>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-brass" />
              </div>
              <p className="text-[13px] leading-relaxed text-ink/75">
                {COMPANY.address.line1}, {COMPANY.address.line2},<br />
                {COMPANY.address.city}, {COMPANY.address.state} — {COMPANY.address.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT PREVIEW — polished cards, no amateur SVG art ─── */
function ContactPreview() {
  return (
    <section id="find-us" className="mx-auto mt-24 max-w-7xl px-5 sm:px-8 hidden sm:block">
      <Eyebrow>Find us</Eyebrow>
      <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Get in touch.
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Head office — full-width on mobile, spans 2 cols on lg */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lift"
        >
          <div className="grid-background pointer-events-none opacity-[0.15]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full opacity-40"
            style={{ background: "var(--gradient-brand)", filter: "blur(48px)" }}
          />
          <div className="relative z-10">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              <MapPin className="h-5 w-5" />
            </span>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Head office</div>
            <div className="mt-2 font-display text-2xl font-black tracking-tight text-ink">Hosur, Tamil Nadu</div>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              {COMPANY.address.line1}, {COMPANY.address.line2},<br />
              {COMPANY.address.city}, {COMPANY.address.state} — {COMPANY.address.pincode}
            </p>
            <div className="mt-4 text-[12px] text-muted-foreground">
              Service available globally · Rapid dispatch worldwide
            </div>
          </div>
        </motion.div>

        {/* Phones */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <div className="flex-1 rounded-2xl border border-hairline bg-surface p-6 transition-shadow duration-300 hover:shadow-lift">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "var(--gradient-brass)" }}
            >
              <Phone className="h-5 w-5 text-white" />
            </span>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Phone</div>
            <div className="mt-2 space-y-1">
              {COMPANY.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block font-display text-lg font-bold text-ink hover:text-brass transition-colors">
                  {p}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-hairline bg-surface p-6 transition-shadow duration-300 hover:shadow-lift">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Mail className="h-5 w-5 text-white" />
            </span>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Email</div>
            <div className="mt-2 space-y-1">
              {COMPANY.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block break-all text-sm font-semibold text-ink hover:text-brass transition-colors">
                  {e}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Link to full contact page */}
      <div className="mt-6 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white"
        >
          Full contact details & enquiry form <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ─── UTIL ─── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brass" />
      {children}
    </div>
  );
}
