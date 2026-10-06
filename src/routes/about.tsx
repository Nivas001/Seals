import { CLIENTS, BRANDS } from "@/data/clients";
import { ClientLogo } from "@/components/site/ClientLogo";
import { AboutFacts, WhatWeDo, BusinessFlow, WhoWeServe } from "@/components/about/AboutSections";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getContactInfo } from "@/lib/catalog";
import factoryImg from "@/assets/factory.jpg";
import { Clock, MousePointerClick, HeartHandshake, MapPin, Globe2 } from "lucide-react";
import { motion } from "framer-motion";



export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AARRKKAA International" },
      { name: "description", content: "AARRKKAA International is a Hosur-based supplier and distributor of pumps, mechanical seals, elastomers and precision components worldwide with service available globally." },
      { property: "og:title", content: "About AARRKKAA International" },
      { property: "og:description", content: "Head office in Hosur, Tamil Nadu with service available globally — delivering quality parts with a timely approach." },
    ],
  }),
  loader: async () => {
    return await getContactInfo();
  },
  component: AboutPage,
});

const VALUES = [
  { k: "Response", d: "Fast, clear answers on every enquiry, quote and technical query.", icon: Clock },
  { k: "Convenience", d: "Easy ordering, with the right part matched accurately the first time.", icon: MousePointerClick },
  { k: "Feedback", d: "We act on every customer's feedback to build long-term partnerships.", icon: HeartHandshake },
];

function AboutPage() {
  const contactInfo = Route.useLoaderData();
  const address = contactInfo?.address || { line1: "#3/334, 11C, Surya Nagar", line2: "5th Cross, Arasanatti", city: "Hosur", district: "Krishnagiri Dist.", state: "Tamil Nadu", pincode: "635 126" };
  const motto = contactInfo?.motto || "To provide quality products and support to our valuable customers with a timely approach.";

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-32 sm:pt-40">
        <section className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" /> About us
          </div>
          <h1
            className="mt-4 font-display font-black leading-[0.95] tracking-[-0.035em] text-ink text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          >
            Built to keep
            <br />
            process plants
            <span className="italic text-brass"> running.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AARRKKAA International is a supplier and distributor of pumps,
            pump spares, SS flanges, clamps, C-clips, silicone products,
            gaskets, oil seals, bellows, diaphragms, hoses, O-rings, PTFE
            envelope gaskets, mechanical seals, rotary joints, non-sparking
            tools, nozzles and precision springs (Inconel &amp; SS) — with
            head office in Hosur, Tamil Nadu and service available globally.
          </p>
        </section>

        <AboutFacts />

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-hairline">
            <img src={factoryImg} alt="Industrial processing plant with stainless steel tanks and piping" width={1600} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </section>

        <WhatWeDo />
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



        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <div className="group relative overflow-hidden rounded-[2rem] bg-ink text-background p-8 sm:p-12 shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brass via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-40" />
            
            <div className="relative z-10 grid gap-8 sm:grid-cols-2 items-center">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass mb-3">
                  Global Commerce
                </div>
                <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
                  Seamless Payments
                </h2>
                <p className="mt-4 text-sm sm:text-base text-background/80 leading-relaxed max-w-md">
                  We accept a wide range of secure international and domestic payment methods, including Wire Transfers, Credit Cards, and UPI, to ensure your procurement process is as smooth as possible.
                </p>
                <div className="mt-8">
                  <Link 
                    to="/about/payments"
                    className="inline-flex items-center gap-2 rounded-full bg-brass text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-105"
                  >
                    View Payment Options &rarr;
                  </Link>
                </div>
              </div>
              
              <div className="hidden sm:flex justify-end pr-8">
                {/* Decorative overlapping circles to represent payments/coins/global */}
                <div className="relative h-32 w-32">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full border border-brass/50 mix-blend-screen transition-transform duration-700 group-hover:-translate-x-4 group-hover:translate-y-4" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full border border-background/20 bg-background/5 backdrop-blur-md transition-transform duration-700 group-hover:translate-x-6 group-hover:-translate-y-2" />
                  <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brass to-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Where we are
          </h2>
          <div className="mt-6 grid gap-3 sm:gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-6">
              <div className="flex w-full items-start justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brass sm:text-[11px]">
                    Head office
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-ink sm:mt-3 sm:text-xl">
                    Hosur, Tamil Nadu
                  </div>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-brass sm:hidden" />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                {address.line1}, {address.line2},<br />
                {address.city}, {address.district},<br />
                {address.state} — {address.pincode}
              </p>
            </div>
            
            <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-6">
              <div className="flex w-full items-start justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brass sm:text-[11px]">
                    Global reach
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-ink sm:mt-3 sm:text-xl">
                    Service available globally
                  </div>
                </div>
                <Globe2 className="h-5 w-5 shrink-0 text-brass sm:hidden" />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                Headquarters in Hosur, Tamil Nadu — dispatching precision components and engineered seals worldwide.
              </p>
            </div>
          </div>
        </section>
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
