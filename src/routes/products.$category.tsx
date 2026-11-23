import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getCategoryWithProducts, getCategories, getContactInfo } from "@/lib/catalog";
import { ProductItemCard } from "@/components/site/ProductItemCard";
import { CreativeNotFound } from "@/components/site/CreativeNotFound";
import { CreativePoster } from "@/components/ui/CreativePoster";
import { motion } from "framer-motion";
import { Reveal, WordReveal, SPRING_SOFT, EASE_OUT, morphCategoryPhoto, CATEGORY_MORPH } from "@/lib/motion";
import { PartIllustration } from "@/components/illustrations/PartIllustration";
import { getSeoPageForCategory } from "@/data/seoPages";
import { HowItWorksPanel } from "@/components/site/HowItWorksPanel";
import { TOPIC_FOR_CATEGORY } from "@/components/illustrations/HowItWorks";
import { SealAssembly } from "@/components/illustrations/SealAssembly";

const SITE_URL = "https://www.aarrkkaa.com";

const MECHANICAL_SEAL_FAQS = [
  {
    q: "Are you a mechanical seal manufacturer?",
    a: "AARRKKAA International is an independent mechanical seal supplier and sourcing partner, not a manufacturer. We compare suitable seals from established manufacturers and sellers so buyers are not limited to one make or design.",
  },
  {
    q: "Do you supply mechanical seals across India and internationally?",
    a: "Yes. We supply from Hosur to customers across Tamil Nadu, South India and the rest of India, and arrange export dispatch by air or sea for international orders.",
  },
  {
    q: "What details are needed to identify a replacement mechanical seal?",
    a: "Send the shaft diameter, equipment or pump make and model, operating liquid, temperature and pressure, plus a clear photo, drawing or sample of the old seal. These details help us match the correct design and materials.",
  },
  {
    q: "Which mechanical seal types can you source?",
    a: "Our range includes single spring, conical spring, wave spring, multi spring, rubber bellow, PTFE bellow, metal bellow, single and double cartridge, agitator and reactor seals, rotary unions and rotary joints.",
  },
];

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
    const isMechanicalSeals = c.slug === "mechanical-seals";
    const title = isMechanicalSeals
      ? "Mechanical Seal Supplier in India | Hosur, Tamil Nadu | AARRKKAA"
      : `${c.name} Supplier in Hosur, Tamil Nadu, India | AARRKKAA International`;
    const description = isMechanicalSeals
      ? "Mechanical seal supplier in Hosur, Tamil Nadu. Pump, cartridge, agitator, rubber, PTFE and metal-bellow seals supplied across India and worldwide."
      : `${c.description ? c.description.replace(/\.?\s*$/, ". ") : ""}${c.name} supplied by AARRKKAA International, Hosur, Tamil Nadu, to plants across India and worldwide.`;
    const url = `${SITE_URL}/products/${c.slug}`;
    const breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: c.name, item: url },
      ],
    };
    const structuredData = isMechanicalSeals
      ? {
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb,
            {
              "@type": "CollectionPage",
              "@id": `${url}#webpage`,
              url,
              name: title,
              description,
              inLanguage: "en-IN",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              about: { "@id": `${SITE_URL}/#localbusiness` },
              breadcrumb: { "@id": `${url}#breadcrumb` },
              mainEntity: { "@id": `${url}#seal-range` },
            },
            {
              "@type": "ItemList",
              "@id": `${url}#seal-range`,
              name: "Mechanical seal range supplied by AARRKKAA International",
              itemListElement: (c.products ?? []).map((product: any, index: number) => ({
                "@type": "ListItem",
                position: index + 1,
                name: product.name,
                url: `${url}/${product.slug}`,
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: MECHANICAL_SEAL_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ],
        }
      : { "@context": "https://schema.org", ...breadcrumb };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(structuredData),
        },
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
  const localPage = getSeoPageForCategory(c.slug);


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
              {localPage && (
                <p className="mt-5 text-sm text-muted-foreground">
                  Buying near Hosur, Krishnagiri or Bengaluru?{" "}
                  <Link to="/buy/$slug" params={{ slug: localPage.slug }} className="font-semibold text-brass underline-offset-4 hover:underline">
                    Buy {localPage.product.toLowerCase()} in Hosur
                  </Link>
                </p>
              )}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-lift">
              {c.image ? (
                <img
                  key={c.slug}
                  src={c.image}
                  alt={c.name}
                  data-morph-target=""
                  style={{ viewTransitionName: CATEGORY_MORPH }}
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

        {c.slug === "mechanical-seals" && <MechanicalSealSeoSection />}

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

        {/* How it works: an animated explainer for categories that have one */}
        {TOPIC_FOR_CATEGORY[c.slug] && <HowItWorksPanel topic={TOPIC_FOR_CATEGORY[c.slug]} />}
        {c.slug === "mechanical-seals" && <SealAssembly />}

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
                onClick={morphCategoryPhoto}
                className="press group overflow-hidden rounded-2xl border border-hairline bg-surface transition-shadow duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  {o.image ? (
                    <img src={o.image} alt={o.name} loading="lazy" decoding="async" className="media-zoom h-full w-full object-cover group-hover:scale-[1.06]" />
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

function MechanicalSealSeoSection() {
  return (
    <section aria-labelledby="mechanical-seal-supply" className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
      <div className="rounded-[1.75rem] border border-hairline bg-surface p-6 shadow-soft sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">India and international supply</p>
            <h2 id="mechanical-seal-supply" className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Mechanical seal sourcing from Hosur for plants across India
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              If your procurement team is searching for a mechanical seal manufacturer in India, AARRKKAA can help compare and source the right seal without limiting the recommendation to one make. We are an independent mechanical seal supplier based in Hosur, Tamil Nadu, serving the Hosur–Bengaluru industrial belt, South India, customers throughout India and international buyers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We supply replacement and new-duty seals for pumps, agitators, reactors and rotating equipment. Available designs include single and multi spring seals, rubber, PTFE and metal bellows, cartridge seals, agitator seals, rotary unions and rotary joints. Share the old seal, a drawing, dimensions or the equipment model and our team will identify suitable options from established manufacturers and sellers.
            </p>
          </div>

          <div className="rounded-2xl border border-hairline bg-background p-5 sm:p-6">
            <h3 className="font-display text-xl font-black tracking-tight text-ink">Send these details for an accurate match</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {[
                "Shaft diameter and available installation dimensions",
                "Pump, agitator or equipment make and model",
                "Liquid, temperature, pressure and running speed",
                "Seal-face and elastomer material requirements",
                "A clear photo, drawing or sample of the old seal",
              ].map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              search={{ category: "Mechanical Seals" }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition hover:bg-ink/85"
            >
              Request a seal quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Hosur & Tamil Nadu", "Local support for factories in Hosur, Krishnagiri, Chennai and Coimbatore."],
            ["South India", "Supply to industrial buyers across Tamil Nadu, Karnataka and neighbouring states."],
            ["Pan-India", "Road and air dispatch for maintenance, project and OEM procurement requirements."],
            ["International", "Export order support with air or sea dispatch for buyers outside India."],
          ].map(([region, copy]) => (
            <div key={region} className="rounded-2xl border border-hairline bg-background p-5">
              <h3 className="font-display text-base font-black tracking-tight text-ink">{region}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-hairline pt-10">
          <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Mechanical seal supplier questions</h2>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {MECHANICAL_SEAL_FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-hairline bg-background p-5 open:shadow-soft">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-ink marker:content-none">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            For nearby purchasing and directions, see our{" "}
            <Link to="/buy/$slug" params={{ slug: "mechanical-seals-in-hosur" }} className="font-semibold text-brass underline-offset-4 hover:underline">
              mechanical seals in Hosur page
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
