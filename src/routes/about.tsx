import { AboutFacts, WhyTrader, BrandsAndClients, WorkingWithUs, HowWeWorkVideo, AboutHeroCollage } from "@/components/about/AboutSections";
import { WhereWeAre } from "@/components/about/AboutExtras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getContactInfo, getCategories } from "@/lib/catalog";

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
            We do the sourcing.
            <br />
            <span className="italic text-brass">You keep running.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AARRKKAA International is an industrial trading company in Hosur,
            Tamil Nadu. We don&rsquo;t manufacture. We buy genuine pumps, seals,
            bearings and process spares from manufacturers and trusted sellers
            in India and abroad, and get them to your plant on time, for less
            than the market price.
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

        <WhyTrader />

        <HowWeWorkVideo />

        <BrandsAndClients />

        <WorkingWithUs motto={motto} />

        <WhereWeAre address={address as { line1: string; line2: string; city: string; district?: string; state: string; pincode: string }} phones={contactInfo?.phones} emails={contactInfo?.emails} />

        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
          <div
            className="relative overflow-hidden rounded-[2rem] p-8 text-white sm:p-12"
            style={{ background: "var(--gradient-brand)" }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
                  Have a part to replace?
                </h2>
                <p className="mt-3 text-base text-white/80">
                  Tell us what you need. You&rsquo;ll get a price, a brand and a dispatch date within one working day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-ink shadow-lift transition hover:bg-white/90">
                  Get a quote
                </Link>
                <Link to="/catalog" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                  Browse {categories?.length ?? 13} product families
                </Link>
              </div>
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
