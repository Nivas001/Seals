import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/data/catalog";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AARRKKAA International" },
      { name: "description", content: "AARRKKAA International is a Hosur-based supplier and distributor of pumps, mechanical seals, elastomers and precision components worldwide with service available globally." },
      { property: "og:title", content: "About AARRKKAA International" },
      { property: "og:description", content: "Head office in Hosur, Tamil Nadu with service available globally — delivering quality parts with a timely approach." },
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
            head office in Hosur, Tamil Nadu and service available globally.
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
            Trusted by industry leaders worldwide
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
                    className="inline-flex items-center gap-2 rounded-full bg-brass text-ink px-6 py-3 text-xs font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-105"
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
                Global reach
              </div>
              <div className="mt-3 font-display text-xl font-bold text-ink">
                Service available globally
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Headquarters in Hosur, Tamil Nadu — dispatching precision components and engineered seals worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
