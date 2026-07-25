import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/data/catalog";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AARRKKAA International" },
      { name: "description", content: "AARRKKAA International is a Hosur-based supplier and distributor of pumps, mechanical seals, elastomers and precision components for process industries across South India." },
      { property: "og:title", content: "About AARRKKAA International" },
      { property: "og:description", content: "Head office in Hosur, Tamil Nadu with branches across South India — delivering quality parts with a timely approach." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-32 sm:pt-40">
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
            head office in Hosur, Tamil Nadu and branches across the
            southern region.
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-hairline">
            <img src={factoryImg} alt="Industrial processing plant with stainless steel tanks and piping" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-5 sm:mt-24 sm:px-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
              Our motto
            </div>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-ink">
              &ldquo;{COMPANY.motto}&rdquo;
            </h2>
          </div>
          <div className="grid gap-4 lg:col-span-2 sm:grid-cols-3">
            {[
              { k: "Response", d: "Improve response time on every customer query." },
              { k: "Convenience", d: "Convenient ordering with accurate matching, first time." },
              { k: "Feedback", d: "Continuous feedback creates a strong long-term bond." },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-hairline bg-surface p-6">
                <div className="font-display text-lg font-bold text-ink">{x.k}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
            Our Clients &amp; Partners
          </div>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
            Trusted by industry leaders across South India
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            We are proud to supply and support premier organizations across pharmaceuticals, biotechnology, food processing, chemicals, energy, and precision engineering.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {[
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
            ].map((client) => (
              <div
                key={client}
                className="flex items-center justify-center rounded-xl border border-hairline bg-surface p-4 text-center text-xs font-bold tracking-tight text-ink/85 transition hover:border-ink/25 hover:bg-white hover:shadow-2xs"
              >
                {client}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Where we are
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Head office
              </div>
              <div className="mt-3 font-display text-xl font-bold text-ink">
                Hosur, Tamil Nadu
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {COMPANY.address.line1}, {COMPANY.address.line2},<br />
                {COMPANY.address.city}, {COMPANY.address.district},<br />
                {COMPANY.address.state} — {COMPANY.address.pincode}
              </p>
            </div>
            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Regional reach
              </div>
              <div className="mt-3 font-display text-xl font-bold text-ink">
                Branches across South India
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Tamil Nadu · Karnataka · Andhra Pradesh · Telangana · Kerala —
                servicing food, pharma, chemical and process industries.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
