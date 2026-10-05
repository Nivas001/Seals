import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe2, Package, PackageCheck, Search, Warehouse } from "lucide-react";
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
export function AboutFacts() {
  const facts = [
    { k: String(CATEGORIES.length), v: "product families" },
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

/* What we supply: every product family, with a photo. */
export function WhatWeDo() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
          What we do.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          We supply and distribute spares and components for process plants: pumps and pump spares, mechanical seals, bearings, elastomers, silicone products, hoses, stainless steel fittings, valves, springs and more. One supplier for the parts your line depends on.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
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
              <img src={c.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
                <span className="font-display text-base font-black leading-tight text-white sm:text-lg">{c.name}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* How the business runs, from sourcing to delivery. */
export function BusinessFlow() {
  const steps = [
    { icon: Globe2, t: "Source", d: "We buy genuine parts from leading brands in their home countries, so quality and price are right from the start." },
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
            We trade parts from the countries that make them best and sell them to plants that cannot afford downtime, at competitive prices.
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
