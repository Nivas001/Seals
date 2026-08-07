import { createFileRoute, Link } from "@tanstack/react-router";
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
  const categories = Route.useLoaderData();

  return (
    <div className="bg-background min-h-screen text-ink">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 mb-20 text-center relative">
          <div className="absolute left-5 sm:left-8 top-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-ink backdrop-blur-md transition-all hover:bg-surface hover:shadow-soft"
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

        {/* Categories Loop */}
        <div className="space-y-32">
          {categories.map((category) => {
            if (!category.products || category.products.length === 0) return null;
            return (
              <section key={category.id} className="mx-auto max-w-7xl px-5 sm:px-8">
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
                      className="text-xs font-bold uppercase tracking-wider text-brass hover:text-brass/80 transition-colors"
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
