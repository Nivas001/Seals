import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { getAllCategoriesWithProducts } from "@/lib/catalog";
import { ProductItemCard } from "@/components/site/ProductItemCard";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/catalog")({
  component: CatalogPage,
  loader: async () => {
    return await getAllCategoriesWithProducts();
  },
  head: () => ({
    meta: [
      { title: "Product Catalog | AARRKKAA" },
      { name: "description", content: "Explore our complete range of industrial sealing solutions, pumps, tools, and accessories." }
    ],
  }),
});

function CatalogPage() {
  const allCategories = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Filter products by name; drop categories with no match.
  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCategories;
    return allCategories
      .map((c: any) => ({ ...c, products: (c.products || []).filter((p: any) => p.name.toLowerCase().includes(q)) }))
      .filter((c: any) => c.products.length > 0);
  }, [allCategories, query]);

  const visible = categories.filter((c: any) => c.products && c.products.length > 0);

  // Highlight the chip of the category currently in view.
  useEffect(() => {
    const els = visible.map((c: any) => document.getElementById(`cat-${c.slug}`)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActiveSlug(hit.target.id.replace("cat-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible.map((c: any) => c.slug).join("|")]);

  return (
    <div className="bg-background min-h-screen text-ink">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 mb-20 text-center relative">
          <div className="mb-5 text-left sm:mb-0 sm:absolute sm:left-8 sm:top-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink backdrop-blur-md transition-all hover:bg-surface hover:shadow-soft"
            >
              &larr; Back
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Complete Collection
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-ink mb-6">
            Product Catalog
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Explore our comprehensive range of high-quality industrial sealing solutions, 
            precision instruments, tools, and accessories tailored for demanding environments.
          </p>
        </section>

        {/* Sticky search and category chips */}
        <div className="sticky top-[78px] z-30 mb-12 border-y border-hairline bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center">
            <div className="relative lg:w-72 lg:shrink-0">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="h-11 w-full rounded-full border border-hairline bg-surface pl-10 pr-10 text-base text-ink outline-none transition placeholder:text-muted-foreground focus:border-brass focus:ring-2 focus:ring-brass/30 sm:text-sm"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:text-ink">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <nav aria-label="Categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0 lg:pb-0">
              {visible.map((c: any) => (
                <a
                  key={c.slug}
                  href={`#cat-${c.slug}`}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold transition ${activeSlug === c.slug ? "border-brass bg-brass text-white" : "border-hairline bg-surface text-ink/75 hover:border-ink/25 hover:text-ink"}`}
                >
                  {c.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {visible.length === 0 && (
          <div className="mx-auto max-w-xl px-5 py-20 text-center">
            <p className="font-display text-2xl font-black text-ink">No products match "{query}"</p>
            <p className="mt-2 text-muted-foreground">Try a shorter name, or send us the part details and we will match it.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setQuery("")} className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink hover:bg-surface">Clear search</button>
              <Link to="/contact" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85">Request a quote</Link>
            </div>
          </div>
        )}

        {/* Categories Loop */}
        <div className="space-y-20 sm:space-y-32">
          {categories.map((category) => {
            if (!category.products || category.products.length === 0) return null;
            return (
              <section key={category.id} id={`cat-${category.slug}`} className="scroll-mt-40 mx-auto max-w-7xl px-5 sm:px-8">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-hairline/50">
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-ink">
                      {category.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground bg-surface px-3 py-1 rounded-full border border-hairline">
                      {category.products.length} products
                    </span>
                    <Link
                      to="/products/$category"
                      params={{ category: category.slug }}
                      className="-my-2 py-2 text-xs font-bold uppercase tracking-wider text-brass hover:text-brass/80 transition-colors"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>

                {/* Bento Grid for Products */}
                <ul className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-3 md:gap-4 grid-flow-dense items-stretch">
                  {category.products.map((item: any, i: number) => {
                    const pattern = [
                      "col-span-2 row-span-2", 
                      "col-span-1 row-span-1", 
                      "col-span-1 row-span-2",
                      "col-span-2 row-span-1",
                      "col-span-1 row-span-1",
                      "col-span-2 row-span-2",
                      "col-span-1 row-span-2",
                      "col-span-1 row-span-1",
                      "col-span-2 row-span-1",
                      "col-span-1 row-span-1",
                    ];
                    
                    const mdPattern = [
                      "md:col-span-2 md:row-span-2", 
                      "md:col-span-1 md:row-span-1", 
                      "md:col-span-1 md:row-span-2",
                      "md:col-span-2 md:row-span-1",
                      "md:col-span-1 md:row-span-1",
                      "md:col-span-2 md:row-span-2",
                      "md:col-span-1 md:row-span-2",
                      "md:col-span-1 md:row-span-1",
                      "md:col-span-2 md:row-span-1",
                      "md:col-span-1 md:row-span-1",
                    ];
                    
                    const bentoClass = `h-full ${pattern[i % pattern.length]} ${mdPattern[i % mdPattern.length]}`;

                    return (
                      <li key={item.id} className={bentoClass}>
                        <ProductItemCard category={category} product={item} index={i} variant="bento" />
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
