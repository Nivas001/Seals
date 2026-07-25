import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CATEGORIES, getCategory } from "@/data/catalog";
import { slugify } from "@/data/items";
import { ProductItemCard } from "@/components/site/ProductItemCard";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — AARRKKAA International" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.category;
    return {
      meta: [
        { title: `${c.name} — AARRKKAA International` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — AARRKKAA International` },
        { property: "og:description", content: c.description },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-40 text-center">
        <h1 className="font-display text-4xl font-black tracking-tight text-ink">Category not found</h1>
        <p className="mt-3 text-muted-foreground">The catalog page you are looking for doesn&rsquo;t exist.</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background">
          <ArrowLeft className="h-4 w-4" /> Back to catalog
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function CategoryPage() {
  const { category: c } = Route.useLoaderData();
  const others = CATEGORIES.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-28 sm:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="hover:text-ink">Products</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{c.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                Category · {String(c.count).padStart(2, "0")} items
              </div>
              <h1
                className="mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
              >
                {c.name}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                {c.description}
              </p>

              {(c.materials || c.brands) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {(c.brands ?? c.materials ?? []).map((m: string) => (
                    <span
                      key={m}
                      className="rounded-full border border-hairline bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  search={{ category: c.name }}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85"
                >
                  Request this product <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+917806936475"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                >
                  <Phone className="h-4 w-4" /> +91 78069 36475
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-lift">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover" width={1200} height={900} />
            </div>
          </div>
        </section>

        {/* Bento list of items */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              In this range
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {c.items.length} products
            </span>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {c.items.map((item: string, i: number) => (
              <li key={item} className="h-full">
                <ProductItemCard category={c} itemName={item} index={i} />
              </li>
            ))}
          </ul>
        </section>

        {/* Related */}
        <section className="mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8">
          <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            Explore other categories
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/products/$category"
                params={{ category: o.slug }}
                className="group overflow-hidden rounded-2xl border border-hairline bg-surface"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="font-display text-base font-bold tracking-tight text-ink">
                    {o.name}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {String(o.count).padStart(2, "0")} items
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
