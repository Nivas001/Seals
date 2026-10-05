import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CATEGORIES, COMPANY } from "@/data/catalog";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Gauge, Thermometer, Ruler, ShieldCheck, Camera, Phone, MessageCircle } from "lucide-react";

import heroImg from "@/assets/industries-hero.jpg";
import qualityImg from "@/assets/industries-quality.jpg";
import inventoryImg from "@/assets/industries-inventory.jpg";

import pumps from "@/assets/cat-pumps.jpg";
import seals from "@/assets/cat-seals.jpg";
import elastomers from "@/assets/cat-elastomers.jpg";
import hoses from "@/assets/cat-hoses.jpg";
import steel from "@/assets/cat-steel.jpg";
import nozzles from "@/assets/cat-nozzles.jpg";
import silicone from "@/assets/cat-silicone.jpg";
import valves from "@/assets/cat-valves.jpg";

import { getIndustries } from "@/lib/catalog";

export const Route = createFileRoute("/industries")({
  loader: async () => {
    try {
      const dbIndustries = await getIndustries();
      return {
        industries: dbIndustries && dbIndustries.length > 0 ? dbIndustries : null,
      };
    } catch {
      return { industries: null };
    }
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

type Sector = {
  name: string;
  tagline: string;
  desc: string;
  image: string;
  duty: string;
  applications: string[];
  products: { name: string; slug: string }[];
  compliance?: string;
};

const SECTORS: Sector[] = [
  {
    name: "Food Processing",
    tagline: "Hygienic. Traceable. Food-safe.",
    desc: "From dairy lines to bakery and edible-oil plants, we supply sanitary pumps, gaskets and tubing that meet strict food-contact norms and clean-in-place routines.",
    image: silicone,
    duty: "CIP / SIP · 80 – 140 °C",
    applications: ["Dairy transfer", "Edible oil dosing", "CIP/SIP loops", "Ingredient blending"],
    products: [
      { name: "SS Milk Pump", slug: "pumps" },
      { name: "Tri-clover Gaskets", slug: "elastomers" },
      { name: "Silicone Tubing", slug: "silicone" },
    ],
    compliance: "Food-grade FDA / 3A style compliant components",
  },
  {
    name: "Chemical",
    tagline: "Aggressive media. Zero compromise.",
    desc: "FFKM, PTFE and metal-bellow assemblies built to survive acids, solvents and thermal cycling across reactor and transfer duty.",
    image: elastomers,
    duty: "Up to 250 °C · abrasive & corrosive",
    applications: ["Reactor sealing", "Solvent transfer", "Acid dosing", "Filtration skids"],
    products: [
      { name: "Agitator Reactor Seal", slug: "mechanical-seals" },
      { name: "PTFE Envelope Gasket", slug: "elastomers" },
      { name: "Metal Bellow Seal", slug: "mechanical-seals" },
    ],
    compliance: "Chemical-resistant elastomers and PTFE-lined parts",
  },
  {
    name: "Beverages",
    tagline: "Clean fill. Consistent flavour.",
    desc: "Sanitary tri-clover fittings, platinum-cured silicone tubing and hygienic pump packages tuned for carbonated drinks, juices and dairy beverages.",
    image: hoses,
    duty: "Sanitary · low-shear",
    applications: ["Bottling lines", "Juice pasteurisation", "Syrup dosing", "Carbonation loops"],
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
    image: pumps,
    duty: "Sanitary · 4 – 95 °C",
    applications: ["Wort transfer", "Fermenter recirculation", "CIP loops", "Bottling / kegging"],
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
    image: nozzles,
    duty: "High-abrasion · 24×7 duty",
    applications: ["Injection moulding", "Extrusion", "Masterbatch dosing", "Pellet handling"],
    products: [
      { name: "Tungsten Carbide Nozzle", slug: "nozzles" },
      { name: "Nylatron Rod", slug: "other" },
      { name: "Wave Spring", slug: "springs" },
    ],
  },
  {
    name: "Pharma",
    tagline: "Cleanroom-ready components.",
    desc: "Diaphragms, o-rings and silicone parts validated for API manufacturing, formulation and sterile processing environments.",
    image: seals,
    duty: "USP Class VI style materials",
    applications: ["API reactors", "Formulation vessels", "Sterile fill", "Autoclave gaskets"],
    products: [
      { name: "Silicone Diaphragms", slug: "silicone" },
      { name: "FFKM O-Rings", slug: "elastomers" },
      { name: "Double Cartridge Seal", slug: "mechanical-seals" },
    ],
    compliance: "USP Class VI style silicone & FFKM available",
  },
  {
    name: "Oil & Gas",
    tagline: "Built for pressure. Safe by design.",
    desc: "HNBR seals, non-sparking safety tools and metal bellows for upstream, midstream and refinery service where failure is not an option.",
    image: valves,
    duty: "Sour service · ATEX-conscious",
    applications: ["Wellhead sealing", "Refinery valves", "Pipeline maintenance", "Explosive zones"],
    products: [
      { name: "Metal Bellow Seal", slug: "mechanical-seals" },
      { name: "Non-Sparking Tools", slug: "other" },
      { name: "Flange End Ball Valve", slug: "valves" },
    ],
    compliance: "Non-sparking tools & HNBR / FFKM elastomers",
  },
  {
    name: "Dye Manufacturing",
    tagline: "Chemistry-grade sealing.",
    desc: "Rotary joints, chemical-grade elastomers and rugged pumps engineered for pigment slurries, solvents and reactive dye chemistries.",
    image: steel,
    duty: "Corrosive slurries · high solids",
    applications: ["Pigment slurry transfer", "Reactor sealing", "Solvent recovery", "Drum unloading"],
    products: [
      { name: "Rotary Joint", slug: "mechanical-seals" },
      { name: "Lime Slurry Pump", slug: "pumps" },
      { name: "SS Impeller", slug: "stainless-steel" },
    ],
  },
];

function IndustriesPage() {
  const { industries } = Route.useLoaderData();
  const [active, setActive] = useState(0);

  const displaySectors: Sector[] = SECTORS.map((defaultSec) => {
    const slug = defaultSec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const matched = industries?.find((ind: any) => ind.slug === slug || ind.name.toLowerCase() === defaultSec.name.toLowerCase());
    if (!matched) return defaultSec;
    return {
      ...defaultSec,
      name: matched.name || defaultSec.name,
      tagline: matched.tagline || defaultSec.tagline,
      desc: matched.desc || defaultSec.desc,
      image: matched.image || defaultSec.image,
      duty: matched.duty || defaultSec.duty,
      compliance: matched.compliance !== undefined ? (matched.compliance || undefined) : defaultSec.compliance,
      applications: matched.applications && matched.applications.length > 0 ? matched.applications : defaultSec.applications,
    };
  });

  // Keep the active sector in sync with #sector-... links (home page, chips).
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#sector-", "");
      const i = displaySectors.findIndex((x) => slugOf(x.name) === h);
      if (i >= 0) {
        setActive(i);
        document.getElementById("sectors")?.scrollIntoView({ block: "start" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = (i: number) => {
    setActive(i);
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Which product categories fit which sector, built from the sector data.
  const matrixSlugs = Array.from(new Set(displaySectors.flatMap((x) => x.products.map((p) => p.slug))));
  const matrixRows = matrixSlugs.map((slug) => ({ slug, name: CATEGORIES.find((c) => c.slug === slug)?.name ?? slug }));
  const short = (n: string) => (n === "Oil & Gas" ? n : n.split(" ")[0]);

  const checklist = [
    { icon: Thermometer, t: "Fluid and temperature", d: "What runs through the line, and how hot it gets." },
    { icon: Gauge, t: "Pressure and speed", d: "Working pressure and shaft speed." },
    { icon: Ruler, t: "Size and standard", d: "Shaft or port size, plus any DIN or brand reference." },
    { icon: ShieldCheck, t: "Industry and compliance", d: "Food contact, hygiene or chemical resistance needs." },
    { icon: Camera, t: "A photo or drawing", d: "Even a picture of the worn part is enough to start." },
  ];

  const steps = [
    { t: "Share the duty", d: "Send us the drawing, fluid, temperature, pressure and speed, or just a photo of the failed part." },
    { t: "We spec the part", d: "We recommend the correct material class, brand and geometry." },
    { t: "Quote and confirm", d: "Clear pricing with lead time, usually ex-stock for fast-moving items." },
    { t: "Dispatch and support", d: "Packed, dispatched and backed by after-sales support if anything needs adjusting." },
  ];

  return (
    <div className="min-h-screen bg-background text-ink font-sans">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1020] text-white">
            <img src={heroImg} alt="" width={1600} height={900} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1020] via-[#0a1020]/80 to-[#0a1020]/20" />
            <div className="relative px-6 py-14 sm:px-12 sm:py-20 lg:py-24">
              <h1 className="max-w-3xl text-balance font-display font-black leading-[0.97] tracking-[-0.035em]" style={{ fontSize: "clamp(2.25rem, 5.6vw, 4.5rem)" }}>
                Eight industries.
                <br />
                Every part matched to <span className="italic text-sky-300">the duty.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                From hygienic food lines to abrasive chemical service, we supply pumps, seals, elastomers and precision components specified for the temperatures, pressures and compliance your plant runs on.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/wizard" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0a1020] transition hover:bg-slate-100">
                  Find my seal <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                  Request a quote
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {displaySectors.map((x, i) => (
                  <button key={x.name} type="button" onClick={() => pick(i)} className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#0a1020]">
                    {short(x.name)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to send us */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
                The right part starts with the duty.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                A seal or elastomer that suits one line can fail on another. Share these five things and we will recommend a part that survives your conditions.
              </p>
              <Link to="/contact" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-background transition hover:bg-ink/85">
                Send your duty details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ol className="divide-y divide-hairline rounded-3xl border border-hairline bg-surface">
              {checklist.map((c, i) => (
                <li key={c.t} className="flex items-start gap-4 p-5 sm:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brass/10 text-brass">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-lg font-bold tracking-tight text-ink">
                      <span className="mr-2 text-brass">{i + 1}.</span>
                      {c.t}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sector explorer */}
        <section id="sectors" className="mx-auto mt-20 max-w-7xl scroll-mt-24 px-4 sm:mt-28 sm:px-8">
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
            Pick your industry.
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            See the duty window, typical applications and the parts we recommend for each sector.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
            {/* Selector: chips on phones, list on desktop */}
            <div role="tablist" aria-label="Industries" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:gap-1 lg:self-start lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {displaySectors.map((x, i) => {
                const on = i === active;
                return (
                  <button
                    key={x.name}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={`group shrink-0 whitespace-nowrap rounded-full border px-4 py-3 text-left text-sm font-semibold transition lg:flex lg:items-center lg:justify-between lg:gap-3 lg:whitespace-normal lg:rounded-2xl lg:px-4 lg:py-3.5 ${on ? "border-brass bg-brass text-white lg:shadow-soft" : "border-hairline bg-surface text-ink/80 hover:border-ink/25 hover:text-ink"}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`hidden font-mono text-xs lg:inline ${on ? "text-white/70" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                      {x.name}
                    </span>
                    <ArrowRight className={`hidden h-4 w-4 transition lg:block ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} />
                  </button>
                );
              })}
            </div>

            {/* Panels (all in the page, one visible) */}
            <div className="min-w-0">
              {displaySectors.map((x, i) => (
                <article
                  key={x.name}
                  id={`sector-${slugOf(x.name)}`}
                  role="tabpanel"
                  hidden={i !== active}
                  className="overflow-hidden rounded-3xl border border-hairline bg-surface [animation:sector-in_0.5s_ease-out]"
                >
                  <div className="relative h-56 sm:h-72">
                    <img src={x.image} alt={`${x.name} industry application`} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <h3 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">{x.name}</h3>
                      <p className="mt-1 text-sm font-medium text-white/85 sm:text-base">{x.tagline}</p>
                    </div>
                  </div>

                  <div className="space-y-7 p-6 sm:p-8">
                    <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{x.desc}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-hairline bg-background p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Duty window</div>
                        <div className="mt-1.5 font-display text-lg font-bold text-ink">{x.duty}</div>
                      </div>
                      {x.compliance && (
                        <div className="rounded-2xl border border-hairline bg-background p-4">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Compliance</div>
                          <div className="mt-1.5 font-display text-lg font-bold text-ink">{x.compliance}</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Typical applications</div>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {x.applications.map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-sm text-ink/85">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-hairline pt-6">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Recommended products</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {x.products.map((p) => {
                          const exists = CATEGORIES.some((c) => c.slug === p.slug);
                          return (
                            <Link key={p.name} to={exists ? "/products/$category" : "/products"} params={exists ? { category: p.slug } : undefined} className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-4 py-2.5 text-sm font-medium text-ink/85 transition hover:border-ink/25 hover:text-ink">
                              {p.name}
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          );
                        })}
                      </div>
                      <Link to="/contact" search={{ category: x.name }} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-background transition hover:bg-ink/85">
                        Get a quote for {short(x.name)} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Which parts fit which industry */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8">
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
            Which parts fit which industry.
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            A quick view of the product families we recommend for each sector.
          </p>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-hairline bg-surface [scrollbar-width:thin]">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline text-left">
                  <th className="sticky left-0 z-10 bg-surface px-5 py-4 font-display text-base font-black">Product family</th>
                  {displaySectors.map((x) => (
                    <th key={x.name} className="px-3 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{short(x.name)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((r) => (
                  <tr key={r.slug} className="border-b border-hairline/70 last:border-0">
                    <th scope="row" className="sticky left-0 z-10 bg-surface px-5 py-3.5 text-left font-semibold text-ink">
                      <Link to={CATEGORIES.some((c) => c.slug === r.slug) ? "/products/$category" : "/products"} params={CATEGORIES.some((c) => c.slug === r.slug) ? { category: r.slug } : undefined} className="hover:text-brass">{r.name}</Link>
                    </th>
                    {displaySectors.map((x) => {
                      const hit = x.products.some((p) => p.slug === r.slug);
                      return (
                        <td key={x.name} className="px-3 py-3.5 text-center">
                          {hit ? <CheckCircle2 className="mx-auto h-5 w-5 text-brass" aria-label="Recommended" /> : <span className="text-hairline" aria-hidden>-</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How we work */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
            <div className="relative overflow-hidden rounded-3xl border border-hairline">
              <img src={inventoryImg} alt="Warehouse of organised industrial parts" width={1200} height={900} loading="lazy" decoding="async" className="h-64 w-full object-cover sm:h-[26rem]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
                From enquiry to line-ready in four steps.
              </h2>
              <ol className="mt-8 space-y-5">
                {steps.map((st, i) => (
                  <li key={st.t} className="flex gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-black text-background">{i + 1}</div>
                    <div className="min-w-0">
                      <div className="font-display text-lg font-bold text-ink">{st.t}</div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{st.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-20 max-w-7xl px-4 pb-20 sm:mt-28 sm:px-8 sm:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1020] p-8 text-white sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">Not sure which part fits your line?</h2>
                <p className="mt-4 max-w-lg text-base text-slate-300">
                  Share your duty conditions and we will come back with the right specification, brand options and delivery timeline.
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const slugOf = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");
