import { CLIENTS, BRANDS } from "@/data/clients";
import { ClientLogo } from "@/components/site/ClientLogo";
import { AboutFacts, WhatWeDo, BusinessFlow, WhoWeServe, HowWeWorkVideo, AboutHeroCollage } from "@/components/about/AboutSections";
import { WhereWeAre, PaymentsBand } from "@/components/about/AboutExtras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getContactInfo, getCategories } from "@/lib/catalog";
import { Clock, MousePointerClick, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";



export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AARRKKAA International" },
      { name: "description", content: "AARRKKAA International is an industrial trading company in Hosur, Tamil Nadu. We source genuine pumps, mechanical seals, bearings and spares from trusted sellers and supply plants worldwide at a lower cost." },
      { property: "og:title", content: "About AARRKKAA International" },
      { property: "og:description", content: "Head office in Hosur, Tamil Nadu with service available globally — delivering quality parts with a timely approach." },
    ],
  }),
  loader: async () => {
    const [contactInfo, categories] = await Promise.all([getContactInfo().catch(() => null), getCategories().catch(() => null)]);
    return {
      contactInfo,
      categories: categories?.length ? categories.map((c: any) => ({ slug: c.slug, name: c.name, image: c.image })) : null,
    };
  },
  component: AboutPage,
});

const VALUES = [
  { k: "Response", d: "Fast, clear answers on every enquiry, quote and technical query.", icon: Clock },
  { k: "Convenience", d: "Easy ordering, with the right part matched accurately the first time.", icon: MousePointerClick },
  { k: "Feedback", d: "We act on every customer's feedback to build long-term partnerships.", icon: HeartHandshake },
];

function AboutPage() {
  const { contactInfo, categories } = Route.useLoaderData();
  const address = contactInfo?.address || { line1: "#3/334, 11C, Surya Nagar", line2: "5th Cross, Arasanatti", city: "Hosur", district: "Krishnagiri Dist.", state: "Tamil Nadu", pincode: "635 126" };
  const motto = contactInfo?.motto || "To provide quality products and support to our valuable customers with a timely approach.";

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-32 sm:pt-40">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
          <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" /> About us
          </div>
          <h1
            className="mt-4 font-display font-black leading-[0.95] tracking-[-0.035em] text-ink text-balance"
            style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)" }}
          >
            Built to keep
            <br />
            process plants
            <span className="italic text-brass"> running.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AARRKKAA International is an industrial trading company based in
            Hosur, Tamil Nadu. We buy genuine pumps, pump spares, mechanical
            seals, bearings, gaskets, oil seals, O-rings, hoses, silicone
            products, SS flanges, clamps, nozzles, springs and more from
            trusted manufacturers and sellers, and supply them to plants
            exactly when they are needed, at a lower cost than the market.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-background shadow-lift transition hover:bg-ink/85">
              Get a quote
            </Link>
            <a href="#how-we-work-video" className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-6 text-sm font-semibold text-ink transition hover:bg-white">
              Watch how we work
            </a>
          </div>
          </div>
          <div className="hidden sm:block">
            <AboutHeroCollage />
          </div>
        </section>

        <AboutFacts categoryCount={categories?.length} />

        <HowWeWorkVideo />

        <WhatWeDo categories={categories} />
        <BusinessFlow />

        <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:gap-5">
            <div
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 text-white sm:p-10"
              style={{ background: "var(--gradient-brand)" }}
            >
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
              <div className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">Our motto</div>
              <blockquote className="relative mt-6 font-display text-[1.75rem] font-black leading-[1.12] tracking-tight sm:text-4xl">
                &ldquo;{motto}&rdquo;
              </blockquote>
              <div className="relative mt-8 text-sm font-semibold text-white/80">— AARRKKAA International</div>
            </div>
            <ul className="grid gap-4">
              {VALUES.map((x, i) => (
                <motion.li
                  key={x.k}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-5 rounded-3xl border border-hairline bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brass/40 hover:shadow-[0_16px_32px_-20px_rgba(2,132,199,0.45)] sm:p-7"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brass/10 text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-white">
                    <x.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-black tracking-tight text-ink">{x.k}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{x.d}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <WhoWeServe />

        <section className="mx-auto mt-16 max-w-7xl overflow-hidden px-5 sm:mt-24 sm:px-8">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
              Our clients
            </div>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              Companies we deliver to
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground">
              We supply and support plants across electronics, electrical equipment, pharmaceuticals, biotechnology, food processing, chemicals, energy and precision engineering.
            </p>
          </div>
          <div className="mt-12 relative flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track flex w-max gap-4 hover:[animation-play-state:paused]">
              {[...CLIENTS.slice(0, 8), ...CLIENTS.slice(0, 8)].map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="glass-shimmer flex items-center justify-center rounded-full border border-hairline bg-surface/50 px-6 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-soft cursor-pointer whitespace-nowrap"
                >
                  <ClientLogo client={client} />
                </div>
              ))}
            </div>
            <div className="marquee-track-reverse flex w-max gap-4 hover:[animation-play-state:paused]">
              {[...CLIENTS.slice(8), ...CLIENTS.slice(8)].map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="glass-shimmer flex items-center justify-center rounded-full border border-hairline bg-surface/50 px-6 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-soft cursor-pointer whitespace-nowrap"
                >
                  <ClientLogo client={client} />
                </div>
              ))}
            </div>
          </div>
        </section>



        <PaymentsBand />

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Brands we supply
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Genuine bearings from the manufacturers your plant already trusts, sourced and supplied by us.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {BRANDS.map((b) => (
              <li key={b.name} className="grid h-24 place-items-center rounded-2xl border border-hairline bg-surface p-4 transition hover:border-brass/40 hover:shadow-soft sm:h-28">
                <ClientLogo client={b} size="lg" />
              </li>
            ))}
          </ul>
        </section>

        <WhereWeAre address={address as { line1: string; line2: string; city: string; district?: string; state: string; pincode: string }} phones={contactInfo?.phones} emails={contactInfo?.emails} />

        <div className="mx-auto flex max-w-6xl justify-center px-5 pb-12 pt-14 sm:px-8">
          <Link to="/admin" rel="nofollow" className="text-xs font-medium text-muted-foreground/70 transition hover:text-ink">
            Staff login
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
