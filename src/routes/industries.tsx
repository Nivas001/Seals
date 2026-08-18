import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CATEGORIES, COMPANY } from "@/data/catalog";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Factory, Gauge, Truck, Layers } from "lucide-react";

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

export const Route = createFileRoute("/industries")({
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
  return (
    <div className="min-h-screen bg-background text-ink font-sans">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-36">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Industries we serve
              </div>
              <h1
                className="mt-4 font-display font-black leading-[0.95] tracking-[-0.035em] text-ink text-balance"
                style={{ fontSize: "clamp(2.25rem, 6.2vw, 5rem)" }}
              >
                Eight sectors.
                <br />
                Every part matched to
                <span className="italic text-brass"> the duty.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                From hygienic food processing to abrasive chemical service, our
                components are specified for the pressures, temperatures and
                compliance each industry demands — and shipped from stock so your
                line stays running.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Food", "Chemical", "Beverages", "Breweries", "Plastics", "Pharma", "Oil & Gas", "Dye"].map((t) => (
                  <a
                    key={t}
                    href={`#sector-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[12px] font-medium text-ink/80 transition hover:bg-white hover:text-ink"
                  >
                    {t}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-hairline shadow-lift">
                <img
                  src={heroImg}
                  alt="Industrial processing facility with stainless steel piping and machinery"
                  width={1600}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[440px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 sm:p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                    Trusted supply chain
                  </div>
                  <p className="mt-1 text-sm font-medium text-white sm:text-base">
                    500+ SKUs across 12 categories — dispatched from Hosur, Tamil Nadu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About / Why us bento */}
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
              Why teams pick AARRKKAA
            </div>
            <h2
              className="mt-3 font-display font-black leading-[1] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              A supply partner, not just a supplier.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              We combine deep application know-how with a wide, ready-to-ship
              inventory so procurement and maintenance teams get the right part —
              specified correctly, on time, backed by service.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-6 md:grid-rows-2">
            {/* Big feature */}
            <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface md:col-span-3 md:row-span-2">
              <img
                src={qualityImg}
                alt="Engineer inspecting a precision stainless steel component"
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" /> Quality first
                </div>
                <h3 className="mt-4 font-display text-2xl font-black text-white sm:text-3xl">
                  Every part checked before it ships.
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/85">
                  Materials verified, geometries measured, brands authenticated — no
                  surprises when the part reaches your line.
                </p>
              </div>
            </div>

            <FeatureTile
              icon={<Layers className="h-5 w-5" />}
              title="12 categories in one PO"
              body="Pumps, seals, elastomers, hoses, bearings, valves, springs and more — consolidated to save procurement cycles."
              className="md:col-span-3"
            />
            <FeatureTile
              icon={<Gauge className="h-5 w-5" />}
              title="Application-matched sizing"
              body="Tell us the duty. We recommend the material, class and geometry that will actually survive it."
            />
            <FeatureTile
              icon={<Truck className="h-5 w-5" />}
              title="Ready to dispatch"
              body="Fast-moving SKUs stocked in Hosur — rapid pick and dispatch worldwide with service available globally."
              accent
            />
          </div>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-2 gap-3 rounded-3xl border border-hairline bg-surface p-4 sm:grid-cols-4 sm:gap-6 sm:p-8">
            {[
              { k: "12", v: "product categories" },
              { k: "500+", v: "line-ready SKUs" },
              { k: "8", v: "industries served" },
              { k: "20+", v: "trusted OEM brands" },
            ].map((s) => (
              <div key={s.v} className="min-w-0">
                <div className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sector cards */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
                Sector deep dive
              </div>
              <h2
                className="mt-3 font-display font-black leading-[1] tracking-[-0.03em]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              >
                Eight industries. One catalogue.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Each sector below lists the duty conditions, typical applications and
              the AARRKKAA parts that fit them — jump straight to the product page
              from any card.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {SECTORS.map((s, i) => (
              <SectorCard key={s.name} sector={s} index={i} />
            ))}
          </div>
        </section>

        {/* Process / How we work */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-hairline">
              <img
                src={inventoryImg}
                alt="Warehouse of neatly organised industrial parts and components"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-64 w-full object-cover sm:h-96"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
                How we work
              </div>
              <h2
                className="mt-3 font-display font-black leading-[1] tracking-[-0.03em]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              >
                From enquiry to line-ready — in four steps.
              </h2>
              <ol className="mt-6 space-y-4">
                {[
                  { t: "Share the duty", d: "Send us the drawing, fluid, temperature, pressure and speed — or just a photo of the failed part." },
                  { t: "We spec the part", d: "Our application engineers recommend the correct material class, brand and geometry." },
                  { t: "Quote & confirm", d: "Transparent pricing with lead-time — usually ex-stock for fast-moving items." },
                  { t: "Dispatch & support", d: "Packed, dispatched and backed by after-sales support if anything needs adjustment." },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-black text-background">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-ink">{step.t}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-20 max-w-7xl px-4 pb-20 sm:mt-28 sm:px-8 sm:pb-28">
          <div className="group relative overflow-hidden rounded-3xl border border-hairline bg-ink p-8 text-background transition-colors duration-500 lg:hover:bg-white lg:hover:text-ink lg:hover:border-ink/20 sm:p-12 lg:hover:shadow-xl">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass/25 blur-3xl transition-opacity duration-500 lg:group-hover:opacity-40" />
            <div className="relative grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-center">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-background/85 transition-colors duration-500 lg:group-hover:bg-ink/5 lg:group-hover:text-ink/80">
                  <Factory className="h-3.5 w-3.5" /> Talk to an application engineer
                </div>
                <h3 className="mt-4 font-display text-2xl font-black leading-tight sm:text-4xl transition-colors duration-500">
                  Not sure which part fits your line?
                </h3>
                <p className="mt-3 max-w-lg text-sm text-background/75 transition-colors duration-500 lg:group-hover:text-ink/75 sm:text-base">
                  Share your duty conditions and we'll come back with the right
                  specification, brand options and delivery timeline.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-all duration-500 lg:group-hover:bg-ink lg:group-hover:text-white"
                >
                  Request a quote <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phones[0].replace(/\s+/g, "")}`}
                  className="text-sm font-medium text-background/85 underline-offset-4 transition-colors duration-500 hover:underline lg:group-hover:text-ink/80"
                >
                  or call {COMPANY.phones[0]}
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

function FeatureTile({
  icon,
  title,
  body,
  className = "",
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-7 ${
        accent
          ? "border-brass/30 bg-gradient-to-br from-brass/15 via-surface to-surface text-ink"
          : "border-hairline bg-surface text-ink"
      } ${className}`}
    >
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brass/25 blur-3xl"
        />
      )}
      <div
        className={`relative inline-grid h-10 w-10 place-items-center rounded-xl ${
          accent ? "bg-brass text-ink" : "bg-ink text-background"
        }`}
      >
        {icon}
      </div>
      <h3 className="relative mt-4 font-display text-lg font-black tracking-tight sm:text-xl">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function SectorCard({ sector, index }: { sector: Sector; index: number }) {
  const anchor = `sector-${sector.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <article
      id={anchor}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition hover:shadow-lift"
    >
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        <img
          src={sector.image}
          alt={`${sector.name} industry application`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          Sector {String(index + 1).padStart(2, "0")}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">
            {sector.name}
          </h3>
          <p className="mt-1 text-[13px] font-medium text-white/85">
            {sector.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          {sector.desc}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-background p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Duty window
            </div>
            <div className="mt-1 text-sm font-semibold text-ink">{sector.duty}</div>
          </div>
          {sector.compliance && (
            <div className="rounded-2xl border border-hairline bg-background p-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Compliance
              </div>
              <div className="mt-1 text-sm font-semibold text-ink">
                {sector.compliance}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Typical applications
          </div>
          <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {sector.applications.map((a) => (
              <li key={a} className="flex items-start gap-2 text-[13px] text-ink/85">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-hairline pt-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Recommended products
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sector.products.map((p) => {
              const exists = CATEGORIES.some((c) => c.slug === p.slug);
              const href = exists ? `/products/${p.slug}` : "/products";
              return (
                <Link
                  key={p.name}
                  to={href}
                  className="inline-flex items-center gap-1 rounded-full border border-hairline bg-background px-3 py-1.5 text-[12px] font-medium text-ink/85 transition hover:border-ink hover:text-ink"
                >
                  {p.name}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
