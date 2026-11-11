import { FinderBand, IndustriesShowcase, GlobalReach, WhyUsBento, ProcessTimeline } from "@/components/home/HomeSections";
import { CLIENTS, BRANDS } from "@/data/clients";
import { FaqSection } from "@/components/site/FaqSection";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Reveal, WordReveal, CountUp, SPRING_SOFT, EASE_OUT } from "@/lib/motion";
import { SealAssembly } from "@/components/illustrations/SealAssembly";
import { PartIllustration } from "@/components/illustrations/PartIllustration";
import { useRef, useEffect, useState } from "react";

import {
  ArrowUpRight, Phone, Mail, MapPin, ArrowRight,
  Sparkles,
  ChevronUp, Star, ChevronLeft, ChevronRight, CheckCircle2
} from "lucide-react";
import heroImg from "@/assets/hero-pump.jpg";
import factoryImg from "@/assets/factory.jpg";
import { CATEGORIES, COMPANY } from "@/data/catalog";
import { getHeroImages, getHomeCategories } from "@/lib/catalog";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { LineSidebar } from "@/components/ui/LineSidebar";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const [heroImages, dbCategories] = await Promise.all([
      getHeroImages(),
      getHomeCategories(),
    ]);
    return { heroImages, dbCategories };
  }
});

// Client logos shown in the hero trust row (only clients with a real logo file).
const HERO_CLIENTS = CLIENTS.filter((c): c is { name: string; logo: string } => Boolean(c.logo));

const BENTO_SLOT_CLASSES: string[] = [
  "sm:col-span-4 sm:row-span-2", // Slot 0: Top Left Large
  "sm:col-span-2 sm:row-span-2", // Slot 1: Top Right Tall
  "sm:col-span-2",               // Slot 2: Middle Row 1
  "sm:col-span-2",               // Slot 3: Middle Row 2
  "sm:col-span-2",               // Slot 4: Middle Row 3
  "sm:col-span-4",               // Slot 5: Bottom Row Wide
  "sm:col-span-2",               // Slot 6: Bottom Row Right
  "sm:col-span-6",               // Slot 7: Extra
];

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

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  return (
    <div className="relative">
      <CountUp target={target} suffix={suffix} className="block font-display text-2xl font-black tabular-nums tracking-tight text-ink sm:text-3xl" />
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Home() {
  const { heroImages, dbCategories } = Route.useLoaderData();
  const featured = (dbCategories && dbCategories.length > 0)
    ? dbCategories.slice(0, 8).map((cat) => {
        const staticMatch = CATEGORIES.find((c) => c.slug === cat.slug);
        return {
          slug: cat.slug,
          name: cat.name,
          short: cat.short || staticMatch?.short || "",
          description: cat.description || staticMatch?.description || "",
          image: cat.image || staticMatch?.image || "",
          count: cat._count?.products || staticMatch?.count || 0,
        };
      })
    : CATEGORIES.slice(0, 8);

  const sidebarSections = [
    { id: "hero", label: "Overview" },
    { id: "about", label: "About Us" },
    { id: "catalog", label: "Products" },
    { id: "anatomy", label: "Inside a seal" },
    { id: "industries", label: "Industries" },
    { id: "global", label: "Global Reach" },
    { id: "why-us", label: "Why AARRKKAA" },
    { id: "testimonials", label: "Reviews" },
    { id: "process", label: "How We Work" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <LineSidebar sections={sidebarSections} />
      <main>
        <Hero images={heroImages} />
        <StatsBand categoryCount={dbCategories?.length || CATEGORIES.length} />
        <AboutPreview />
        <ProductsBento featured={featured} />
        <SealAssembly />
        <FinderBand />
        <IndustriesShowcase />
        <GlobalReach />
        <WhyUsBento />
        <Testimonials />
        <ProcessTimeline />
        <LocalSupplier />
        <FaqSection className="mt-24 sm:mt-32" />
        <CTABand />
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
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-background shadow-lift text-ink/70 transition hover:text-ink hover:-translate-y-0.5"
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
        <span className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center">
          <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </span>
      </a>
    </div>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

function Hero({ images }: { images: { id: string, url: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mediaScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const mediaY = useTransform(heroProgress, [0, 1], [0, 40]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section ref={heroRef} id="hero" className="scroll-mt-28 relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
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
              className="inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AARRKKAA International · Hosur, India
            </motion.div>

            <h1
              className="mt-5 text-balance font-display font-black leading-[0.98] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.75rem)" }}
            >
              <WordReveal text="Precision parts for plants that" delay={0.05} />{" "}
              <motion.span
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ ...SPRING_SOFT, delay: 0.45, opacity: { duration: 0.5, delay: 0.45 }, filter: { duration: 0.6, delay: 0.45 } }}
                className="inline-block bg-clip-text pr-1 italic text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                can&rsquo;t stop.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Genuine pumps, mechanical seals, bearings, elastomers and stainless steel for process plants. Send us a part number, drawing or photo, and we match it accurately and ship it on time, anywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="press group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background shadow-lift hover:bg-ink/85"
              >
                Get a quote
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/products"
                className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-sm font-semibold text-ink backdrop-blur hover:bg-white"
              >
                Explore the catalog
              </Link>
              <Link
                to="/wizard"
                className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-bold text-brass underline-offset-4 transition hover:underline"
              >
                Find my seal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-ink/75"
            >
              {["Genuine, traceable parts", "Quote within one working day", "Dispatch worldwide"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE_OUT }}
              className="mt-8 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-2 sm:gap-6"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Trusted by</div>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {HERO_CLIENTS.map((c) => (
                    <img key={c.name} src={c.logo} alt={c.name} decoding="async" className="h-5 w-auto max-w-[8.5rem] object-contain sm:h-6" />
                  ))}
                  <span className="text-xs font-semibold text-muted-foreground">+{CLIENTS.length - HERO_CLIENTS.length} more plants</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Genuine brands we supply</div>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {BRANDS.map((b) => (
                    <img key={b.name} src={b.logo} alt={b.name} decoding="async" className={`w-auto max-w-[4.5rem] object-contain ${b.square ? "h-8 sm:h-9" : "h-5 sm:h-6"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero bento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING_SOFT, delay: 0.15, opacity: { duration: 0.6, delay: 0.15 } }}
            style={{ y: mediaY }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(34rem,calc(100dvh-11rem))] border border-hairline bg-surface shadow-lift">
              {images.length > 0 ? (
                <div className="relative h-full w-full">
                  <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                    <div className="flex h-full touch-pan-y touch-pinch-zoom">
                      {images.map((img, idx) => (
                        <div className="flex-[0_0_100%] min-w-0 relative h-full" key={img.id}>
                          <motion.img
                            style={{ scale: mediaScale }}
                            src={img.url}
                            alt="Hero product showcase"
                            loading={idx === 0 ? "eager" : "lazy"}
                            fetchPriority={idx === 0 ? "high" : "auto"}
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300">
                    <button onClick={scrollPrev} aria-label="Previous slide" className="pointer-events-auto bg-background/80 backdrop-blur border border-hairline text-ink hover:bg-brass hover:text-white p-2.5 rounded-full transition-colors shadow-sm">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={scrollNext} aria-label="Next slide" className="pointer-events-auto bg-background/80 backdrop-blur border border-hairline text-ink hover:bg-brass hover:text-white p-2.5 rounded-full transition-colors shadow-sm">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Indicators */}
                  <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollTo(idx)}
                        className={`relative after:absolute after:-inset-x-1 after:-inset-y-3 after:content-[''] transition-all duration-300 rounded-full ${
                          idx === selectedIndex 
                            ? "w-6 h-1.5 bg-brass" 
                            : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={heroImg}
                  alt="Precision industrial centrifugal pump assembly with brushed stainless steel housing and polished brass fittings"
                  width={1600}
                  height={1400}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              )}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, oklch(0.14 0.02 260 / 0.35) 100%)",
                }}
              />

              {/* Head office card */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...SPRING_SOFT, delay: 0.75 }}
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

/* ─── STATS BAND ─── */
function StatsBand({ categoryCount }: { categoryCount: number }) {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-5 sm:mt-14 sm:px-8">
      <div className="grid grid-cols-3 gap-4 rounded-3xl border border-hairline bg-surface px-5 py-6 sm:gap-8 sm:px-10 sm:py-8">
        <StatItem target={categoryCount} suffix="" label="Product categories" />
        <StatItem target={8} suffix="" label="Sectors served" />
        <StatItem target={100} suffix="+" label="SKU lines stocked" />
      </div>
    </section>
  );
}

/* ─── ABOUT PREVIEW ─── */
function AboutPreview() {
  return (
    <section id="about" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            A trusted partner for
            <br />
            plants that
            <span className="italic text-brass"> keep running.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            AARRKKAA International is an industrial trading company in Hosur,
            Tamil Nadu. We buy from manufacturers and trusted sellers, compare
            prices for you, and deliver the parts your plant needs at a lower
            cost than the market.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white"
            >
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.12}>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-hairline p-8 sm:p-10"
            style={{ background: "var(--gradient-brand)" }}
          >
            <img src={factoryImg} alt="" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Our motto
            </span>
            <p className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              &ldquo;{COMPANY.motto}&rdquo;
            </p>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40"
              style={{ background: "var(--gradient-brass)", filter: "blur(60px)" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PRODUCTS BENTO ─── */
function ProductsBento({ featured }: { featured: Array<{ slug: string; name: string; short: string; description: string; image: string; count: number }> }) {
  return (
    <section id="catalog" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <Reveal>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            A catalog built for
            <br />
            process reliability.
          </h2>
        </Reveal>
        <Link
          to="/products"
          className="hidden sm:inline-flex items-center gap-2 self-start rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur hover:bg-white sm:self-end"
        >
          View all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-6 lg:auto-rows-[240px] sm:gap-4">
        {featured.map((cat, i) => {
          const slotClass = BENTO_SLOT_CLASSES[i] ?? BENTO_LAYOUT[cat.slug] ?? "sm:col-span-2";
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...SPRING_SOFT, delay: i * 0.06, opacity: { duration: 0.5, delay: i * 0.06 } }}
              className={`bento-tile bento-tile-hover ${i >= 4 ? "hidden sm:block" : ""} ${slotClass}`}
            >
              <Link
                to="/products/$category"
                params={{ category: cat.slug }}
                className="group relative flex h-full w-full flex-col justify-between overflow-hidden p-4 sm:p-5"
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority={i < 2 ? "high" : "auto"}
                    decoding="async"
                    style={{ viewTransitionName: `cat-${cat.slug}` }}
                    className="media-zoom pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="pointer-events-none absolute inset-0 bg-neutral-900" />
                )}
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
                  <PartIllustration slug={cat.slug} className="mb-2 hidden h-9 w-9 text-white/90 transition-transform duration-500 group-hover:-translate-y-0.5 sm:block [&_*]:[stroke:currentColor]" />
                  <h3 className="font-display text-base font-black tracking-tight text-white sm:text-2xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 hidden max-w-xs text-[13px] leading-snug text-white/85 sm:block">
                    {cat.short}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
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
    <section id="testimonials" className="scroll-mt-28 relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-64 rounded-[3rem] opacity-5"
        style={{ background: "var(--gradient-brand)", filter: "blur(48px)" }}
      />

      <div className="relative">
        <Reveal>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            What plant teams
            <br />
            <span className="italic text-brass">say about us.</span>
          </h2>
        </Reveal>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-10 flex snap-x snap-mandatory scroll-pl-5 lg:scroll-pl-0 overflow-x-auto pb-4 gap-4 lg:grid lg:grid-cols-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-5 px-5 pt-2 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="snap-start shrink-0 w-[80%] md:w-[45%] lg:w-auto flex"
            >
              <GlowCard className="flex w-full flex-col justify-between" containerClassName="hover:-translate-y-1">
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
        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
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

/* ─── LOCAL SUPPLIER (who we are, where we serve — plain text for search engines and buyers) ─── */
const SERVICE_AREAS = ["Hosur", "Krishnagiri", "Bengaluru", "Chennai", "Coimbatore", "Tamil Nadu", "Karnataka", "Across India", "Worldwide"];

function LocalSupplier() {
  return (
    <section id="local" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <Reveal className="grid gap-8 rounded-[2rem] border border-hairline bg-surface p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight text-ink sm:text-4xl">
            Mechanical seal and pump spares supplier in Hosur, Tamil Nadu.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Single-spring, cartridge, agitator and rotary union seals, plus the O-rings, gaskets, oil seals and
            pump spares that go with them. Plants in the Hosur&ndash;Bengaluru industrial belt can get fast-moving
            lines straight from our stock; the rest of India and export orders ship by road, air or sea.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products/$category" params={{ category: "mechanical-seals" }} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition hover:bg-ink/85">
              Mechanical seals <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
              Get a quote
            </Link>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Areas we serve</div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((a) => (
              <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-4 py-2 text-sm font-semibold text-ink/80">
                <MapPin className="h-3.5 w-3.5 text-brass" /> {a}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Head office: {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.pincode}.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── CTA BAND ─── */
function CTABand() {
  return (
    <section id="contact" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <Reveal className="relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
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
              className="press glass-strong col-span-2 sm:col-span-1 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-4"
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
              className="press glass-strong col-span-2 sm:col-span-1 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-4"
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
              className="press glass-strong col-span-2 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-4"
            >
              <div className="w-full min-w-0">
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
      </Reveal>
    </section>
  );
}
