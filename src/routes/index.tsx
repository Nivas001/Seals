import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ArrowUpRight, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Sparkles, Truck, MessagesSquare, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-mechanical.jpg";
import factoryImg from "@/assets/factory.jpg";
import { CATEGORIES, SECTORS, COMPANY } from "@/data/catalog";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

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

function Home() {
  const featured = CATEGORIES.slice(0, 8);
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <AboutPreview />
        <ProductsBento featured={featured} />
        <Industries />
        <WhyUs />
        <Process />
        <CTABand />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  );
}

/* --------------------------------- HERO --------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
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
              pharma, chemical and process plants across South India — matched
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

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-6">
              {[
                { k: "12+", v: "Product categories" },
                { k: "8", v: "Sectors served" },
                { k: "100+", v: "SKU lines stocked" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
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
                alt="Precision machined mechanical assembly with polished steel and brass components"
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
                      Authorised
                    </div>
                    <div className="text-sm font-bold text-ink">SKF · FAG · NTN · INA</div>
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
                      Branches across South India
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

/* ------------------------------- TRUST STRIP ------------------------------ */
function TrustStrip() {
  const items = [
    "SKF", "FAG", "NTN", "INA", "Schneider Electric",
    "PTFE", "Werner Finley", "FFKM", "EPDM", "HNBR", "Tata Electronis",
    "Enterprise Partner", "RMZ Oil & Gas", "SS 316", "NYLATRON",
  ];
  return (
    <section className="mt-20 border-y border-hairline bg-surface py-6 sm:mt-28">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-5 sm:px-8">
        <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">
          Brands & materials we stock
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track flex w-max gap-10">
            {[...items, ...items].map((x, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-ink/60"
              >
                {x}
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

/* ------------------------------ ABOUT PREVIEW ----------------------------- */
function AboutPreview() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
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
            Our head office is in Hosur, Tamil Nadu, with branches across
            South India — enabling fast response and consistent delivery for
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
            <p
              className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
            >
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

/* ----------------------------- PRODUCT BENTO ----------------------------- */
function ProductsBento({ featured }: { featured: typeof CATEGORIES }) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
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
          className="inline-flex items-center gap-2 self-start rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur hover:bg-white sm:self-end"
        >
          View all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-6 lg:auto-rows-[240px]">
        {featured.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className={`bento-tile bento-tile-hover ${BENTO_LAYOUT[cat.slug] ?? "sm:col-span-2"}`}
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
                <h3 className="font-display text-xl font-black tracking-tight text-white sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-1 max-w-xs text-[13px] leading-snug text-white/85">
                  {cat.short}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- INDUSTRIES ------------------------------ */
function Industries() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
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
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-4 transition hover:border-ink/25"
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
      </div>
    </section>
  );
}

/* ---------------------------------- WHY US -------------------------------- */
function WhyUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Quality first",
      body: "Genuine bearings, certified elastomers and traceable stainless steel — no compromises.",
    },
    {
      icon: Truck,
      title: "Timely delivery",
      body: "Regional stock and disciplined logistics keep your line running when parts run out.",
    },
    {
      icon: MessagesSquare,
      title: "Fast response",
      body: "Improved response time on every technical query and quote request.",
    },
    {
      icon: CheckCircle2,
      title: "Feedback loop",
      body: "We collect customer feedback to sharpen accuracy, order after order.",
    },
  ];
  return (
    <section className="relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <Eyebrow>Why AARRKKAA</Eyebrow>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h2 className="max-w-xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
          Committed to convenience,
          <br />
          accuracy and delivery.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6"
          >
            <span
              aria-hidden
              className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground shadow-soft"
              style={{ background: "var(--gradient-brand)" }}
            >
              <p.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- PROCESS -------------------------------- */
function Process() {
  const steps = [
    {
      k: "01",
      t: "Enquire",
      d: "Send a spec, a drawing, or even a photograph of the worn part. We identify it accurately.",
    },
    {
      k: "02",
      t: "Match",
      d: "We recommend the correct grade, material or brand — from our stocked programme or sourced direct.",
    },
    {
      k: "03",
      t: "Deliver",
      d: "Assist & Deliver — dispatched from our Hosur HQ or regional branch, on the timeline you need.",
    },
  ];
  return (
    <section className="relative mx-auto mt-24 max-w-7xl overflow-hidden px-5 sm:mt-32 sm:px-8">
      <div className="rounded-[2rem] border border-hairline bg-surface p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black leading-[1.02] tracking-tight text-ink sm:text-4xl">
              Assist &amp; deliver — in three steps.
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            From first query to dispatched crate.
          </span>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.k} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-black italic leading-none text-brass">
                  {s.k}
                </span>
                <span className="h-px flex-1 bg-hairline" />
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="hidden h-4 w-4 shrink-0 -translate-x-1 text-hairline md:block"
                  />
                )}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">
                {s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </li>

          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------- CTA BAND ------------------------------- */
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
          <div className="flex flex-col gap-3">
            <a
              href="tel:+917806936475"
              className="glass-strong flex items-center justify-between rounded-2xl px-5 py-4"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Call sales
                </div>
                <div className="font-display text-lg font-bold text-ink">
                  +91 78069 36475
                </div>
              </div>
              <Phone className="h-5 w-5 text-brass" />
            </a>
            <a
              href="mailto:aarrkkaainternational@gmail.com"
              className="glass-strong flex items-center justify-between rounded-2xl px-5 py-4"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Email
                </div>
                <div className="truncate font-display text-sm font-bold text-ink">
                  aarrkkaainternational@gmail.com
                </div>
              </div>
              <Mail className="h-5 w-5 shrink-0 text-brass" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CONTACT PREVIEW --------------------------- */
function ContactPreview() {
  const cards = [
    {
      icon: MapPin,
      title: "Head office",
      // Mobile: full row. Desktop bento: large tile (2 cols wide, 2 rows tall).
      span: "col-span-2 lg:col-span-2 lg:row-span-2",
      artSize: "h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72",
      body: (
        <>
          {COMPANY.address.line1}<br />
          {COMPANY.address.line2}<br />
          {COMPANY.address.city}, {COMPANY.address.state}<br />
          {COMPANY.address.pincode}
        </>
      ),
    },
    {
      icon: Phone,
      title: "Phones",
      span: "col-span-1 lg:col-span-1 lg:row-span-1",
      artSize: "h-28 w-28 sm:h-40 sm:w-40",
      body: (
        <>
          {COMPANY.phones.map((p) => (
            <div key={p}>
              <a className="hover:text-ink" href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
            </div>
          ))}
        </>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      span: "col-span-1 lg:col-span-1 lg:row-span-1",
      artSize: "h-28 w-28 sm:h-40 sm:w-40",
      body: (
        <>
          {COMPANY.emails.map((e) => (
            <div key={e} className="break-all">
              <a className="hover:text-ink" href={`mailto:${e}`}>{e}</a>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:auto-rows-fr">
        {cards.map((c, i) => (
          <ContactBentoCard key={c.title} {...c} index={i} />
        ))}
      </div>
    </section>
  );
}

function ContactBentoCard({
  icon: Icon,
  title,
  span,
  artSize,
  body,
  index,
}: {
  icon: typeof MapPin;
  title: string;
  span: string;
  artSize: string;
  body: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle scroll parallax: art drifts across its own viewport window.
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -6 : 6, index % 2 === 0 ? 6 : -6]);

  return (
    <div
      ref={ref}
      className={`${span} group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-4 sm:p-6 transition-shadow duration-500 hover:shadow-lift`}
    >
      <motion.div
        style={{ y, x }}
        className="pointer-events-none absolute -right-4 -bottom-4 sm:-right-6 sm:-bottom-6 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.06]"
      >
        <ContactCardArt kind={title} sizeClass={artSize} />
      </motion.div>
      <div className="relative">
        <span
          aria-hidden
          className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl text-brass-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
          style={{ background: "var(--gradient-brass)" }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </div>
        <div className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm leading-relaxed text-ink/85">{body}</div>
      </div>
    </div>
  );
}


/* ------------------------- CONTACT CARD ART ------------------------------- */
function ContactCardArt({ kind, sizeClass = "h-28 w-28 sm:h-40 sm:w-40" }: { kind: string; sizeClass?: string }) {
  const base = `pointer-events-none ${sizeClass} text-brass/25`;
  if (kind === "Head office") {
    return (
      <svg viewBox="0 0 160 160" fill="none" className={base} aria-hidden>
        <g stroke="currentColor" strokeWidth="1.2" className="art-drift" style={{ transformOrigin: "80px 80px" }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={20 + i * 15} y1="20" x2={20 + i * 15} y2="140" strokeDasharray="2 4" opacity="0.5" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={20 + i * 15} x2="140" y2={20 + i * 15} strokeDasharray="2 4" opacity="0.5" />
          ))}
        </g>
        <g stroke="currentColor" strokeWidth="1.6" fill="none" className="art-float" style={{ transformOrigin: "80px 90px" }}>
          <path d="M40 110 L40 70 L80 45 L120 70 L120 110 Z" />
          <path d="M55 110 L55 85 L75 85 L75 110" />
          <rect x="88" y="82" width="20" height="16" />
          <path d="M40 70 L80 45 L120 70" />
        </g>
        <circle cx="80" cy="45" r="3" fill="currentColor" className="art-float" />
      </svg>
    );
  }
  if (kind === "Phones") {
    return (
      <svg viewBox="0 0 160 160" fill="none" className={base} aria-hidden>
        <g stroke="currentColor" strokeWidth="1.4" fill="none" className="art-float" style={{ transformOrigin: "85px 90px" }}>
          <path d="M70 60 Q60 60 60 70 L60 110 Q60 120 70 120 L100 120 Q110 120 110 110 L110 70 Q110 60 100 60 Z" />
          <line x1="60" y1="72" x2="110" y2="72" />
          <line x1="60" y1="108" x2="110" y2="108" />
          <circle cx="85" cy="114" r="2" fill="currentColor" />
        </g>
        <g stroke="currentColor" strokeWidth="1.4" fill="none" className="art-float-slow" style={{ transformOrigin: "85px 90px" }}>
          <path d="M120 55 Q135 70 135 90 Q135 110 120 125" strokeLinecap="round" />
          <path d="M126 62 Q138 75 138 90 Q138 105 126 118" strokeLinecap="round" opacity="0.6" />
          <path d="M50 55 Q35 70 35 90 Q35 110 50 125" strokeLinecap="round" />
          <path d="M44 62 Q32 75 32 90 Q32 105 44 118" strokeLinecap="round" opacity="0.6" />
        </g>
      </svg>
    );
  }
  if (kind === "Email") {
    return (
      <svg viewBox="0 0 160 160" fill="none" className={base} aria-hidden>
        <g stroke="currentColor" strokeWidth="1.4" fill="none" className="art-float" style={{ transformOrigin: "80px 85px" }}>
          <rect x="35" y="55" width="90" height="60" rx="4" />
          <path d="M35 60 L80 95 L125 60" />
          <path d="M35 115 L70 85" opacity="0.5" />
          <path d="M125 115 L90 85" opacity="0.5" />
        </g>
        <g stroke="currentColor" strokeWidth="1.4" fill="none" className="art-drift" style={{ transformOrigin: "130px 50px" }}>
          <circle cx="130" cy="50" r="6" opacity="0.7" />
          <circle cx="130" cy="50" r="10" opacity="0.35" />
        </g>
      </svg>
    );
  }
  return null;
}


/* --------------------------------- UTIL ----------------------------------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brass" />
      {children}
    </div>
  );
}
