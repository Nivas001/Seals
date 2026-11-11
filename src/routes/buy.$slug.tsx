import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CreativeNotFound } from "@/components/site/CreativeNotFound";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCategories, getCategoryWithProducts } from "@/lib/catalog";
import { CATEGORIES, COMPANY } from "@/data/catalog";
import { HOSUR_AREAS, SEO_PAGES, getSeoPage } from "@/data/seoPages";

const SITE_URL = "https://www.aarrkkaa.com";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=AARRKKAA+International+Arasanatti+Hosur";

type Group = {
  slug: string;
  name: string;
  materials?: string[];
  brands?: string[];
  items: Array<{ name: string; slug?: string }>;
};

// Live products from the admin database, falling back to the static catalog if the DB is unreachable.
async function loadGroup(slug: string): Promise<Group | null> {
  const fallback = CATEGORIES.find((c) => c.slug === slug);
  try {
    const cat: any = await getCategoryWithProducts({ data: { slug } });
    if (cat?.products?.length) {
      return {
        slug: cat.slug,
        name: cat.name,
        materials: fallback?.materials,
        brands: fallback?.brands,
        items: cat.products.map((p: any) => ({ name: p.name, slug: p.slug })),
      };
    }
  } catch (err) {
    console.error("[buy] category load failed", slug, err);
  }
  if (!fallback) return null;
  return { slug, name: fallback.name, materials: fallback.materials, brands: fallback.brands, items: fallback.items.map((name) => ({ name })) };
}

async function loadHubGroups(): Promise<Group[]> {
  try {
    const cats: any[] = await getCategories();
    if (cats?.length) return cats.map((c) => ({ slug: c.slug, name: c.name, items: [] }));
  } catch (err) {
    console.error("[buy] categories load failed", err);
  }
  return CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, items: [] }));
}

export const Route = createFileRoute("/buy/$slug")({
  loader: async ({ params }) => {
    const page = getSeoPage(params.slug);
    if (!page) throw notFound();
    const groups = page.category
      ? (await Promise.all([page.category, ...(page.alsoCategories ?? [])].map(loadGroup))).filter((g): g is Group => !!g)
      : await loadHubGroups();
    return { page, groups };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found — AARRKKAA International" }, { name: "robots", content: "noindex" }] };
    }
    const { page } = loaderData;
    const url = `${SITE_URL}/buy/${page.slug}`;
    const crumbs = [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Products", item: `${SITE_URL}/products` },
      ...(page.category ? [{ name: page.product, item: `${SITE_URL}/products/${page.category}` }] : []),
      { name: `${page.product} in Hosur`, item: url },
    ];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.title,
          description: page.description,
          inLanguage: "en-IN",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#localbusiness` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
        },
        {
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
      ],
    };
    return {
      meta: [
        { title: page.title },
        { name: "description", content: page.description },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { name: "geo.region", content: "IN-TN" },
        { name: "geo.placename", content: "Hosur" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: BuyPage,
  notFoundComponent: CreativeNotFound,
});

function BuyPage() {
  const { page, groups } = Route.useLoaderData();
  const phone = COMPANY.phones[0];
  const a = COMPANY.address;
  const others = SEO_PAGES.filter((p) => p.slug !== page.slug);
  const whatsapp = `https://wa.me/917806936475?text=${encodeURIComponent(`Hi, I want to buy ${page.product.toLowerCase()} in Hosur.`)}`;

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground">
            <Link to="/" className="inline-block py-2 hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="inline-block py-2 hover:text-ink">Products</Link>
            {page.category && (
              <>
                <span className="mx-1.5">/</span>
                <Link to="/products/$category" params={{ category: page.category }} className="inline-block py-2 hover:text-ink">
                  {page.product}
                </Link>
              </>
            )}
            <span className="mx-1.5">/</span>
            <span className="text-ink">Hosur</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-brass" aria-hidden />
                Hosur · Krishnagiri · Bengaluru
              </div>
              <h1
                className="mt-3 font-display font-black leading-[1.02] tracking-[-0.03em] text-ink text-balance"
                style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)" }}
              >
                {page.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85"
                >
                  <Phone className="h-4 w-4" aria-hidden /> Call {phone}
                </a>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
                </a>
                <Link
                  to="/contact"
                  className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                >
                  Send an enquiry <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Visit / contact card (same NAP as the Contact page and Google Business Profile) */}
            <aside className="h-fit rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight">AARRKKAA International</h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
                {a.line1}, {a.line2},<br />
                {a.city}, {a.district}, {a.state} {a.pincode}, {a.country}
              </address>
              <ul className="mt-4 space-y-1 text-sm">
                {COMPANY.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="inline-block py-1 font-semibold text-ink hover:text-brass">{p}</a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${COMPANY.emails[1]}`} className="inline-block break-all py-1 text-ink/70 hover:text-ink">{COMPANY.emails[1]}</a>
                </li>
              </ul>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass underline-offset-4 hover:underline"
              >
                Get directions on Google Maps <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </aside>
          </div>
        </section>

        {/* What you can buy */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            {page.category ? `${page.product} you can buy from us` : "What you can buy from us in Hosur"}
          </h2>
          {page.category ? (
            <div className="mt-8 space-y-10">
              {groups.map((g) => (
                <div key={g.slug}>
                  {groups.length > 1 && <h3 className="font-display text-xl font-bold tracking-tight">{g.name}</h3>}
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((it) => (
                      <li key={it.name}>
                        {it.slug ? (
                          <Link
                            to="/products/$category/$item"
                            params={{ category: g.slug, item: it.slug }}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
                          >
                            {it.name} <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                          </Link>
                        ) : (
                          <span className="block rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm font-semibold text-ink">{it.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {!!(g.materials?.length || g.brands?.length) && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {g.brands?.length ? <>Brands: <span className="font-semibold text-ink">{g.brands.join(", ")}</span>. </> : null}
                      {g.materials?.length ? <>Materials: <span className="font-semibold text-ink">{g.materials.join(", ")}</span>.</> : null}
                    </p>
                  )}
                  <Link
                    to="/products/$category"
                    params={{ category: g.slug }}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brass underline-offset-4 hover:underline"
                  >
                    See the full {g.name.toLowerCase()} range <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <li key={g.slug}>
                  <Link
                    to="/products/$category"
                    params={{ category: g.slug }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
                  >
                    {g.name} <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Why buy here + delivery areas */}
        <section className="mx-auto mt-16 grid max-w-7xl gap-6 px-5 sm:mt-24 sm:px-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-black tracking-tight">Why plants in Hosur buy from us</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li><span className="font-semibold text-ink">Local office in Hosur.</span> Talk to someone nearby who can see the part and the problem.</li>
              <li><span className="font-semibold text-ink">Lower cost.</span> As a trading company we compare prices across manufacturers and sellers and pass the saving on.</li>
              <li><span className="font-semibold text-ink">Quote within one working day.</span> Send a part number, drawing or photo of the old part.</li>
              <li><span className="font-semibold text-ink">Genuine parts.</span> Genuine SKF, FAG, INA and NTN bearings, certified elastomers and traceable stainless steel.</li>
              <li><span className="font-semibold text-ink">Easy payment.</span> Bank transfer, UPI and cards.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-black tracking-tight">Areas we supply</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Fast-moving lines ship from our Hosur stock. We dispatch by road across India, by air for urgent orders and by sea for export.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {HOSUR_AREAS.map((area) => (
                <li key={area} className="rounded-full border border-hairline bg-background px-3 py-1.5 text-xs font-semibold text-ink/80">{area}</li>
              ))}
              <li className="rounded-full border border-hairline bg-background px-3 py-1.5 text-xs font-semibold text-ink/80">All of India & export</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight text-ink sm:text-4xl">
                Buying {page.product.toLowerCase()} in Hosur: questions
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Also searched as: {page.alsoKnownAs.join(" · ")}
              </p>
            </div>
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {page.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-hairline">
                  <AccordionTrigger className="py-5 text-left font-display text-lg font-bold tracking-tight text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Other local pages (internal links help Google find and rank each page) */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <h2 className="font-display text-2xl font-black tracking-tight text-ink">Also buy in Hosur</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/buy/$slug"
                  params={{ slug: p.slug }}
                  className="inline-block rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
                >
                  {p.product} in Hosur
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
