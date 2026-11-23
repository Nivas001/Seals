import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CATEGORIES } from "@/data/catalog";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { IndustryIcon, PlantScene, industryKey } from "@/components/illustrations/IndustryArt";
import { Reveal } from "@/lib/motion";
import { getIndustries, getCategories } from "@/lib/catalog";

export const Route = createFileRoute("/industries")({
  loader: async () => {
    // Categories come from the admin so product links only point at pages that exist.
    const [dbIndustries, dbCategories] = await Promise.all([
      getIndustries().catch(() => null),
      getCategories().catch(() => null),
    ]);
    return {
      industries: dbIndustries && dbIndustries.length > 0 ? dbIndustries : null,
      categories: dbCategories && dbCategories.length > 0 ? dbCategories.map((c: any) => ({ slug: c.slug, name: c.name })) : null,
    };
  },
  head: () => ({
    meta: [
      { title: "Industries We Serve — AARRKKAA International" },
      { name: "description", content: "AARRKKAA supplies engineered pumps, seals, elastomers and precision components to food, chemical, beverages, breweries, plastics, pharma, oil & gas and dye manufacturing." },
      { property: "og:title", content: "Industries We Serve — AARRKKAA International" },
      { property: "og:description", content: "Eight sectors, one reliable supplier — engineered components for process-critical industries." },
    ],
  }),
  component: IndustriesPage,
});

// Short by design: each sector gets a line, a duty note and three key parts. Name, tagline,
// description and duty can be edited in the admin; the key parts live here.
type Sector = {
  name: string;
  tagline: string;
  desc: string;
  duty: string;
  products: { name: string; slug: string }[];
};

const SECTORS: Sector[] = [
  {
    name: "Food Processing",
    tagline: "Hygienic. Traceable. Food-safe.",
    desc: "From dairy lines to bakery and edible-oil plants, we supply sanitary pumps, gaskets and tubing that meet strict food-contact norms and clean-in-place routines.",
    duty: "CIP / SIP · 80 – 140 °C",
    products: [
      { name: "SS Milk Pump", slug: "pumps" },
      { name: "Tri-clover Gaskets", slug: "elastomers" },
      { name: "Silicone Tubing", slug: "silicone" },
    ],
  },
  {
    name: "Chemical",
    tagline: "Aggressive media. Zero compromise.",
    desc: "FFKM, PTFE and metal-bellow assemblies built to survive acids, solvents and thermal cycling across reactor and transfer duty.",
    duty: "Up to 250 °C · abrasive & corrosive",
    products: [
      { name: "Agitator Reactor Seal", slug: "mechanical-seals" },
      { name: "PTFE Envelope Gasket", slug: "elastomers" },
      { name: "Metal Bellow Seal", slug: "mechanical-seals" },
    ],
  },
  {
    name: "Beverages",
    tagline: "Clean fill. Consistent flavour.",
    desc: "Sanitary tri-clover fittings, platinum-cured silicone tubing and hygienic pump packages tuned for carbonated drinks, juices and dairy beverages.",
    duty: "Sanitary · low-shear",
    products: [
      { name: "Platinum-Cured Silicone Hose", slug: "hoses" },
      { name: "Tri-clover Clamps", slug: "stainless-steel" },
      { name: "Sanitary Butterfly Gasket", slug: "elastomers" },
    ],
  },
  {
    name: "Breweries",
    tagline: "Wort to bottle — sealed tight.",
    desc: "Process pumps, seals and hoses engineered for brewhouse temperature swings and cleaning cycles without loss of flavour compounds.",
    duty: "Sanitary · 4 – 95 °C",
    products: [
      { name: "Centrifugal Pump", slug: "pumps" },
      { name: "Cartridge Seal", slug: "mechanical-seals" },
      { name: "Silicone Bellows", slug: "silicone" },
    ],
  },
  {
    name: "Plastics",
    tagline: "Wear parts that outlast the shift.",
    desc: "Boron and tungsten carbide nozzles, Nylatron machining stock and abrasion-resistant seals for extrusion, moulding and masterbatch lines.",
    duty: "High-abrasion · 24×7 duty",
    products: [
      { name: "Tungsten Carbide Nozzle", slug: "nozzles" },
      { name: "Nylatron Rod", slug: "rods" },
      { name: "Wave Spring", slug: "springs" },
    ],
  },
  {
    name: "Pharma",
    tagline: "Cleanroom-ready components.",
    desc: "Diaphragms, o-rings and silicone parts validated for API manufacturing, formulation and sterile processing environments.",
    duty: "USP Class VI style materials",
    products: [
      { name: "Silicone Diaphragms", slug: "silicone" },
      { name: "FFKM O-Rings", slug: "elastomers" },
      { name: "Double Cartridge Seal", slug: "mechanical-seals" },
    ],
  },
  {
    name: "Oil & Gas",
    tagline: "Built for pressure. Safe by design.",
    desc: "HNBR seals, non-sparking safety tools and metal bellows for upstream, midstream and refinery service where failure is not an option.",
    duty: "Sour service · ATEX-conscious",
    products: [
      { name: "Metal Bellow Seal", slug: "mechanical-seals" },
      { name: "Non-Sparking Tools", slug: "additional-products" },
      { name: "Flange End Ball Valve", slug: "valves" },
    ],
  },
  {
    name: "Dye Manufacturing",
    tagline: "Chemistry-grade sealing.",
    desc: "Rotary joints, chemical-grade elastomers and rugged pumps engineered for pigment slurries, solvents and reactive dye chemistries.",
    duty: "Corrosive slurries · high solids",
    products: [
      { name: "Rotary Joint", slug: "mechanical-seals" },
      { name: "Lime Slurry Pump", slug: "pumps" },
      { name: "SS Impeller", slug: "stainless-steel" },
    ],
  },
];

function IndustriesPage() {
  const { industries, categories } = Route.useLoaderData();
  const liveCats: { slug: string; name: string }[] = categories ?? CATEGORIES;
  const catExists = (slug: string) => liveCats.some((c) => c.slug === slug);

  const sectors: Sector[] = SECTORS.map((d) => {
    const m = industries?.find((ind: any) => ind.slug === slugOf(d.name) || ind.name?.toLowerCase() === d.name.toLowerCase());
    if (!m) return d;
    return { ...d, name: m.name || d.name, tagline: m.tagline || d.tagline, desc: m.desc || d.desc, duty: m.duty || d.duty };
  });

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-32">
        {/* Hero: short intro beside an illustrated process line */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">Industries we serve</span>
              <h1 className="mt-4 text-balance font-display font-black leading-[0.98] tracking-[-0.035em]" style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.25rem)" }}>
                Eight industries.
                <br />
                One <span className="italic text-brass">parts partner.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Seals, pumps, valves and gaskets for the lines that can't stop. Pick your industry to see what we supply for it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#sectors" className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-background transition hover:bg-ink/85">
                  See industries <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/contact" className="inline-flex h-12 items-center rounded-full border border-ink/15 bg-surface px-6 text-sm font-semibold text-ink transition hover:bg-white">
                  Request a quote
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface p-4 sm:p-6">
              <div className="grid-background pointer-events-none opacity-50" />
              <PlantScene className="relative h-auto w-full" />
            </Reveal>
          </div>
        </section>

        {/* Sector cards */}
        <section id="sectors" className="mx-auto mt-20 max-w-7xl scroll-mt-28 px-5 sm:mt-28 sm:px-8">
          <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">Find your industry.</h2>
            <p className="max-w-sm text-sm text-muted-foreground sm:text-right">The key parts we supply for each. Tap a part to see the range.</p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((x, i) => (
              <li key={x.name}>
                <Reveal delay={(i % 4) * 0.05} className="h-full">
                  <article
                    id={`sector-${slugOf(x.name)}`}
                    className="group flex h-full scroll-mt-28 flex-col rounded-3xl border border-hairline bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] target:border-brass target:ring-4 target:ring-brass/15"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brass/[0.07] text-ink transition duration-300 group-hover:bg-brass/[0.12]">
                        <IndustryIcon kind={industryKey(x.name)} className="h-10 w-10 transition duration-500 group-hover:-translate-y-0.5 group-hover:scale-105" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-black tracking-tight">{x.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-brass">{x.tagline}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{x.desc}</p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {x.products.map((p) => {
                        const exists = catExists(p.slug);
                        return (
                          <li key={p.name}>
                            <Link
                              to={exists ? "/products/$category" : "/products"}
                              params={exists ? { category: p.slug } : undefined}
                              className="inline-flex items-center gap-1 rounded-full border border-hairline bg-background px-3 py-1.5 text-xs font-medium text-ink/80 transition hover:border-brass/50 hover:text-ink"
                            >
                              {p.name}
                              <ArrowUpRight className="h-3 w-3 opacity-60" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between gap-3 border-t border-hairline pt-4">
                      <span className="text-[11px] font-medium text-muted-foreground">{x.duty}</span>
                      <Link
                        to="/contact"
                        search={{ category: x.name }}
                        aria-label={`Get a quote for ${x.name}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-background transition group-hover:bg-brass"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* Short CTA */}
        <section className="mx-auto mt-20 max-w-7xl px-5 pb-20 sm:mt-28 sm:px-8 sm:pb-28">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-[#0a1020] p-8 text-white sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black leading-tight sm:text-4xl">Not sure which part fits your line?</h2>
                <p className="mt-4 max-w-lg text-base text-slate-300">
                  Tell us the fluid, temperature and size, or just send a photo of the worn part. We'll come back with the right match.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link to="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0a1020] transition hover:bg-slate-100">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://wa.me/917806936475" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <a href="tel:+917806936475" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                  <Phone className="h-4 w-4" /> +91 78069 36475
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const slugOf = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");
