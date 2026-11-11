import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getCategoryWithProducts, getCategories, getContactInfo } from "@/lib/catalog";
import { ProductItemCard } from "@/components/site/ProductItemCard";
import { CreativeNotFound } from "@/components/site/CreativeNotFound";
import { CreativePoster } from "@/components/ui/CreativePoster";
import { motion } from "framer-motion";
import { Reveal, WordReveal, SPRING_SOFT, EASE_OUT } from "@/lib/motion";
import { PartIllustration } from "@/components/illustrations/PartIllustration";

export const Route = createFileRoute("/products/$category")({
  loader: async ({ params }) => {
    const [cat, categories, contactInfo] = await Promise.all([
      getCategoryWithProducts({ data: { slug: params.category } }),
      getCategories(),
      getContactInfo()
    ]);
    if (!cat) throw notFound();
    return { category: cat, allCategories: categories, contactInfo };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — AARRKKAA International" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.category;
    // Location in the title and description targets searches like "mechanical seals supplier in Hosur / Tamil Nadu / India".
    const title = `${c.name} Supplier in Hosur, Tamil Nadu, India | AARRKKAA International`;
    const description = `${c.description ? c.description.replace(/\.?\s*$/, ". ") : ""}${c.name} supplied by AARRKKAA International, Hosur, Tamil Nadu, to plants across India and worldwide.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: CreativeNotFound,
});

function CategoryPage() {
  const { category: c, allCategories, contactInfo } = Route.useLoaderData();
  const others = allCategories.filter((x: any) => x.slug !== c.slug).slice(0, 4);
  const phone = contactInfo?.phones?.[0] || "+91 78069 36475";


  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-28 sm:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground">
            <Link to="/" className="inline-block py-2 hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="inline-block py-2 hover:text-ink">Products</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{c.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                <PartIllustration slug={c.slug} animated className="h-7 w-7 text-ink/70" />
                Category · {String(c.products?.length || 0).padStart(2, "0")} items
              </motion.div>
              <h1
                className="mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
              >
                <WordReveal key={c.slug} text={c.name} delay={0.05} />
              </h1>
              <motion.p
                key={`d-${c.slug}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
                className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                {c.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/contact"
                  search={{ category: c.name }}
                  className="press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85"
                >
                  Request this product <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="press inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
                >
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </motion.div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-lift">
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  style={{ viewTransitionName: `cat-${c.slug}` }}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <CreativePoster title={c.name} slug={c.slug} />
              )}
            </div>
          </div>
        </section>

        {/* Bento list of items */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              In this range
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {c.products?.length || 0} products
            </span>
          </Reveal>
          <ul className={`mt-8 grid gap-3 md:gap-4 items-stretch ${
             c.slug === "additional-products" 
               ? "grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] grid-flow-dense" 
               : "sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {c.products?.map((item: any, i: number) => {
               let bentoClass = "h-full";
               if (c.slug === "additional-products") {
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
                  // Handle responsive spans if necessary, but tailwind doesn't support dynamic arbitrary variants easily.
                  // For simplicity, we apply base spans which will look like a bento grid on mobile and desktop.
                  // For a truly responsive bento, we would need md:col-span-X.
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
                  bentoClass = `${bentoClass} ${pattern[i % pattern.length]} ${mdPattern[i % mdPattern.length]}`;
               }
               
               return (
                 <motion.li
                   key={item.id}
                   className={bentoClass}
                   initial={{ opacity: 0, y: 28, scale: 0.97 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   viewport={{ once: true, margin: "-40px" }}
                   transition={{ ...SPRING_SOFT, delay: (i % 3) * 0.06, opacity: { duration: 0.45, delay: (i % 3) * 0.06 } }}
                 >
                   <ProductItemCard category={c} product={item} index={i} variant={c.slug === "additional-products" ? "bento" : "default"} />
                 </motion.li>
               );
            })}
          </ul>
        </section>

        {/* Related */}
        <section className="mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
              Explore other categories
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/products/$category"
                params={{ category: o.slug }}
                className="press group overflow-hidden rounded-2xl border border-hairline bg-surface transition-shadow duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  {o.image ? (
                    <img src={o.image} alt={o.name} loading="lazy" decoding="async" style={{ viewTransitionName: `cat-${o.slug}` }} className="media-zoom h-full w-full object-cover group-hover:scale-[1.06]" />
                  ) : (
                    <CreativePoster title={o.name} slug={o.slug} />
                  )}
                </div>
                <div className="flex items-center gap-2.5 p-4">
                  <PartIllustration slug={o.slug} className="h-7 w-7 shrink-0 text-ink/70" />
                  <div className="font-display text-base font-bold tracking-tight text-ink">
                    {o.name}
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
