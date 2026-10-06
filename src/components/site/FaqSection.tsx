import { Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Answers use only facts already stated elsewhere on the site.
const FAQS = [
  {
    q: "How do I get a quote?",
    a: "Send a spec sheet, drawing, model number or a photo of the worn part through the enquiry form, WhatsApp or phone. We reply with the exact grade, brand and dispatch timeline, within one working day.",
  },
  {
    q: "Can you identify a part from a photo?",
    a: "Yes. Share a photograph or drawing and we identify the part and match it accurately, from our stocked range or sourced direct.",
  },
  {
    q: "Do you deliver internationally?",
    a: "Yes. Service is available globally. We dispatch worldwide from our Hosur head office or a regional branch, on the timeline you need.",
  },
  {
    q: "Are the parts genuine?",
    a: "We supply genuine bearings, certified elastomers and traceable stainless steel, sourced from leading brands such as SKF, FAG, INA and NTN.",
  },
  {
    q: "Which industries do you supply?",
    a: "Food processing, chemical, beverages, breweries, plastics, pharma, oil and gas, and dye manufacturing.",
  },
  {
    q: "How can I pay?",
    a: "Our payments page lists the accepted methods. Contact us if you need a different arrangement for a larger order.",
    link: { to: "/about/payments", label: "See payment options" },
  },
] as const;

// FAQPage structured data lets Google show these answers directly in search results.
const FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export function FaqSection({ className = "" }: { className?: string }) {
  return (
    <section id="faq" className={`scroll-mt-28 mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }} />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Questions buyers ask.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
            Can't find your answer? Send us the part details and we'll reply within one working day.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-background transition hover:bg-ink/85"
          >
            Ask our team
          </Link>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-hairline">
              <AccordionTrigger className="py-5 font-display text-lg font-bold tracking-tight text-ink hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                {f.a}
                {"link" in f && (
                  <>
                    {" "}
                    <Link to={f.link.to} className="font-semibold text-brass underline-offset-4 hover:underline">
                      {f.link.label}
                    </Link>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
