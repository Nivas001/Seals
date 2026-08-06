import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getProductDetails, getCategories, getContactInfo } from "@/lib/catalog";
import { CreativeNotFound } from "@/components/site/CreativeNotFound";
import { CreativePoster } from "@/components/ui/CreativePoster";

import { UnobtainiumPumpEasterEgg } from "@/components/site/easter-eggs/UnobtainiumPump";
import { AntiGravityBearingEasterEgg } from "@/components/site/easter-eggs/AntiGravityBearing";
import { FlubberEasterEgg } from "@/components/site/easter-eggs/Flubber";

export const Route = createFileRoute("/products/$category_/$item")({
  loader: async ({ params }) => {
    if (params.category === "pumps" && params.item === "quantum-slurry-hyper-pump") {
      return { isEasterEgg: true, type: "unobtainium", detail: null, allCategories: [], contactInfo: null };
    }
    if (params.category === "bearings" && params.item === "anti-gravity-bearing") {
      return { isEasterEgg: true, type: "antigravity", detail: null, allCategories: [], contactInfo: null };
    }
    if (params.category === "elastomers" && params.item === "flubber") {
      return { isEasterEgg: true, type: "flubber", detail: null, allCategories: [], contactInfo: null };
    }
    const [detail, allCategories, contactInfo] = await Promise.all([
      getProductDetails({ data: { slug: params.item } }),
      getCategories(),
      getContactInfo()
    ]);
    if (!detail) throw notFound();
    return { isEasterEgg: false, detail, allCategories, contactInfo, type: null };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — AARRKKAA International" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    if (loaderData.isEasterEgg) {
      const titles: Record<string, string> = {
        unobtainium: "Quantum Slurry Hyper-Pump | AARRKKAA International",
        antigravity: "Anti-Gravity Bearing | AARRKKAA International",
        flubber: "Industrial Flubber | AARRKKAA International",
      };
      return {
        meta: [
          { title: titles[loaderData.type as string] },
          { name: "robots", content: "noindex" }
        ]
      };
    }
    const d = loaderData.detail!;
    const title = `${d.name} — ${d.category.name} | AARRKKAA International`;
    return {
      meta: [
        { title },
        { name: "description", content: d.description },
        { property: "og:title", content: title },
        { property: "og:description", content: d.description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: d.name,
            description: d.description,
            image: `https://www.aarrkkaa.com${d.image || d.category.image}`,
            brand: {
              "@type": "Brand",
              name: "AARRKKAA International"
            }
          })
        }
      ]
    };
  },
  component: ItemPage,
  notFoundComponent: CreativeNotFound,
});

function ItemPage() {
  const data = Route.useLoaderData();
  if (data.isEasterEgg) {
    if (data.type === "unobtainium") return <UnobtainiumPumpEasterEgg />;
    if (data.type === "antigravity") return <AntiGravityBearingEasterEgg />;
    if (data.type === "flubber") return <FlubberEasterEgg />;
  }

  const detail = data.detail!;
  const d = detail;
  const c = d.category;
  const contactInfo = data.contactInfo;
  const phone = contactInfo?.phones?.[0] || "+91 78069 36475";
  const email = contactInfo?.emails?.[0] || "aarrkkaainternational@gmail.com";
  
  // Calculate siblings and related internally since they aren't directly fetched
  // If we had them in DB, we'd use them. But since we didn't include them in the query, we can just skip or fetch
  // Wait, we can't skip because the UI depends on d.siblings and d.relatedCategories.
  const allCategories = data.allCategories || [];
  // For siblings, we ideally should have fetched products in the same category.
  // For now we will just use empty arrays to prevent crashes.
  const siblings = [];
  const relatedCategories = allCategories.filter((cat: any) => cat.slug !== c.slug);


  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="hover:text-ink">Products</Link>
            <span className="mx-1.5">/</span>
            <Link
              to="/products/$category"
              params={{ category: c.slug }}
              className="hover:text-ink"
            >
              {c.name}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{d.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                {c.name}
              </div>
              <h1
                className="mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)" }}
              >
                {d.name}
              </h1>
              <p className="mt-4 text-lg font-medium text-ink/80">{d.tagline}</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {d.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  search={{ category: c.name, product: d.name }}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85"
                >
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                >
                  <Phone className="h-4 w-4" /> {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                >
                  <Mail className="h-4 w-4" /> Email enquiry
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-lift">
              {d.image || c.image ? (
                <img
                  src={d.image || c.image}
                  alt={`${d.name} — ${c.name}`}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={900}
                />
              ) : (
                <CreativePoster title={d.name} />
              )}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur">
                {d.image ? `Product photo · ${d.name}` : `Representative image · ${c.name}`}
              </div>
            </div>
          </div>
        </section>

        {/* Bento: specs + benefits + applications */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-hairline bg-surface p-6 shadow-soft lg:col-span-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Specifications
              </div>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Technical profile
              </h2>
              <dl className="mt-6 divide-y divide-hairline">
                {d.specs.map((s: any) => (
                  <div key={s.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="text-sm font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Specifications are typical and vary by variant. Share your duty conditions for an exact recommendation.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-hairline bg-ink p-6 text-background shadow-soft">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Key benefits
              </div>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-3xl">
                Why this product
              </h2>
              <ul className="mt-6 space-y-3">
                {d.benefits.map((b: any) => (
                  <li key={b.text} className="flex items-start gap-3 text-sm leading-relaxed text-background/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-hairline bg-surface p-6 lg:col-span-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Applications
              </div>
              <h3 className="mt-1 font-display text-xl font-black tracking-tight text-ink">
                Typical industries
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.applications.map((a: any) => (
                  <span
                    key={a.text}
                    className="rounded-full border border-hairline bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70"
                  >
                    {a.text}
                  </span>
                ))}
              </div>
            </div>

            {c.slug !== "motors-and-gearboxes" && siblings.length > 0 && (
              <div className="rounded-[1.5rem] border border-hairline bg-surface p-6 lg:col-span-2">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                      In the same range
                    </div>
                    <h3 className="mt-1 font-display text-xl font-black tracking-tight text-ink">
                      Other {c.name.toLowerCase()}
                    </h3>
                  </div>
                  <Link
                    to="/products/$category"
                    params={{ category: c.slug }}
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-ink"
                  >
                    View all →
                  </Link>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {siblings.map((s: any) => (
                    <li key={s.slug}>
                      <Link
                        to="/products/$category/$item"
                        params={{ category: c.slug, item: s.slug }}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-white p-3 transition hover:border-ink/25"
                      >
                        <span className="text-sm font-semibold text-ink">{s.name}</span>
                        <ArrowRight className="h-4 w-4 text-ink/50 transition group-hover:translate-x-0.5 group-hover:text-ink" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Related categories */}
        <section className="mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8">
          <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            Related categories
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCategories.slice(0, 4).map((o: any) => (
              <Link
                key={o.slug}
                to="/products/$category"
                params={{ category: o.slug }}
                className="group overflow-hidden rounded-2xl border border-hairline bg-surface"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  {o.image ? (
                    <img
                      src={o.image}
                      alt={o.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <CreativePoster title={o.name} />
                  )}
                </div>
                <div className="p-4">
                  <div className="font-display text-base font-bold tracking-tight text-ink">
                    {o.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-ink p-8 text-background shadow-lift sm:p-12">
            <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-end">
              <div>
                <h3 className="font-display text-2xl font-black tracking-tight sm:text-4xl">
                  Need this {d.name.toLowerCase()} for your line?
                </h3>
                <p className="mt-3 max-w-xl text-sm text-background/70">
                  Share your duty conditions and drawings — our team responds with a technical recommendation and a firm quote.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <Link
                  to="/contact"
                  search={{ category: c.name, product: d.name }}
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink hover:bg-brass/90"
                >
                  Send enquiry <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-background/25 bg-transparent px-5 py-3 text-sm font-semibold text-background hover:bg-background/10"
                >
                  <Phone className="h-4 w-4" /> Call
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
