import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CATEGORIES } from "@/data/catalog";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Product Catalog — AARRKKAA International" },
      { name: "description", content: "Explore the full AARRKKAA product catalog: pumps, mechanical seals, elastomers, silicone, hoses, stainless steel, bearings, springs, valves, couplings and more." },
      { property: "og:title", content: "Product Catalog — AARRKKAA International" },
      { property: "og:description", content: "Pumps, seals, elastomers, stainless steel, hoses and precision components — organised into 12 categories." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-32 sm:pt-40">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6 flex-col sm:flex-row">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                Full catalog
              </div>
              <h1
                className="mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Every part. One
                <span className="italic text-brass"> supplier.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Twelve categories, {total}+ line items — pumps, seals,
                elastomers, stainless steel, hoses, springs and precision
                components sourced for process reliability.
              </p>
            </div>
            <div className="rounded-2xl border border-hairline bg-surface px-5 py-4 text-right">
              <div className="font-display text-3xl font-black text-ink">
                {CATEGORIES.length}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Categories
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <Link
                  to="/products/$category"
                  params={{ category: cat.slug }}
                  className="group block overflow-hidden rounded-2xl border border-hairline bg-surface transition hover:shadow-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                      {String(cat.count).padStart(2, "0")} items
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <h2 className="font-display text-xl font-black tracking-tight text-ink">
                        {cat.name}
                      </h2>
                      <p className="mt-1 text-sm leading-snug text-muted-foreground">
                        {cat.short}
                      </p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/[0.04] text-ink transition group-hover:bg-ink group-hover:text-background">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
