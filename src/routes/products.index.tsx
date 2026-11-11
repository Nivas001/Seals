import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getCategories } from "@/lib/catalog";
import { CreativePoster } from "@/components/ui/CreativePoster";
import { PartIllustration } from "@/components/illustrations/PartIllustration";
import { Reveal, WordReveal, CountUp, SPRING_SOFT, EASE_OUT } from "@/lib/motion";

// The hero line-up of parts, drawn in one after another.
const HERO_PARTS = ["mechanical-seals", "pumps", "bearings", "valves", "springs", "hoses"];

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Product Catalog — AARRKKAA International" },
      { name: "description", content: "Explore the full AARRKKAA product catalog: pumps, mechanical seals, elastomers, silicone, hoses, stainless steel, bearings, springs, valves, couplings and more." },
      { property: "og:title", content: "Product Catalog — AARRKKAA International" },
      { property: "og:description", content: "Pumps, seals, elastomers, stainless steel, hoses and precision components — organised into 12 categories." },
    ],
  }),
  loader: async () => {
    return await getCategories();
  },
  component: ProductsPage,
});

function ProductsPage() {
  const categories = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-32 sm:pt-40">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-start sm:items-end justify-between gap-6 flex-col sm:flex-row">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                Full catalog
              </motion.div>
              <h1
                className="mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                <WordReveal text="Every part. One" delay={0.05} />{" "}
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ ...SPRING_SOFT, delay: 0.3, opacity: { duration: 0.5, delay: 0.3 }, filter: { duration: 0.6, delay: 0.3 } }}
                  className="inline-block italic text-brass"
                >
                  supplier.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
                className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                Multiple categories, thousands of line items — pumps, seals,
                elastomers, stainless steel, hoses, springs and precision
                components sourced for process reliability.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...SPRING_SOFT, delay: 0.25 }}
              className="w-full rounded-3xl border border-hairline bg-surface p-5 shadow-soft sm:w-auto"
            >
              <div className="grid grid-cols-6 gap-3 text-ink/80 sm:grid-cols-3 sm:gap-4">
                {HERO_PARTS.map((slug, i) => (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING_SOFT, delay: 0.35 + i * 0.07 }}
                    className="grid aspect-square place-items-center rounded-2xl bg-background/80 p-2 sm:h-16 sm:w-16"
                  >
                    <PartIllustration slug={slug} animated className="h-full w-full" />
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-hairline pt-3">
                <CountUp target={categories.length} className="font-display text-3xl font-black tabular-nums text-ink" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Categories</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...SPRING_SOFT, delay: (i % 3) * 0.07, opacity: { duration: 0.45, delay: (i % 3) * 0.07 } }}
                whileHover={{ y: -6 }}
              >
                <Link
                  to="/products/$category"
                  params={{ category: cat.slug }}
                  className="press group block overflow-hidden rounded-2xl border border-hairline bg-surface transition-shadow duration-500 hover:shadow-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading={i < 4 ? "eager" : "lazy"}
                        fetchPriority={i < 4 ? "high" : "auto"}
                        decoding="async"
                        style={{ viewTransitionName: `cat-${cat.slug}` }}
                        className="media-zoom h-full w-full object-cover group-hover:scale-[1.06]"
                      />
                    ) : (
                      <CreativePoster title={cat.name} slug={cat.slug} />
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-3 p-5">
                    <PartIllustration slug={cat.slug} className="mt-0.5 h-10 w-10 shrink-0 text-ink/70 transition-colors duration-300 group-hover:text-ink" />
                    <div className="min-w-0 flex-1">
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

        <section className="mx-auto mt-20 mb-20 max-w-4xl px-5 sm:px-8 text-center">
          <Reveal className="rounded-3xl border border-hairline bg-surface p-6 sm:p-10 md:p-14 flex flex-col items-center shadow-soft">
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-ink mb-4">
              Looking for our complete inventory?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Explore every single product across all categories organized on one convenient page.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs sm:px-8 sm:py-4 sm:text-sm font-bold uppercase tracking-wider text-background hover:bg-ink/90 press shadow-md hover:shadow-lg"
            >
              View Full Catalog
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
