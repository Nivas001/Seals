import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SealAssembly } from "@/components/illustrations/SealAssembly";
import { PUMP, TOPICS_AFTER_SEAL, type Topic } from "@/components/illustrations/HowItWorks";
import { Reveal } from "@/lib/motion";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works: Pumps, Seals, Valves, O-rings & Bearings — AARRKKAA International" },
      {
        name: "description",
        content: "Scroll-through explainers of how a centrifugal pump, mechanical seal, ball valve, O-ring and ball bearing work, from AARRKKAA International, Hosur.",
      },
      { property: "og:title", content: "How It Works — AARRKKAA International" },
      { property: "og:description", content: "See how the pumps, seals, valves, O-rings and bearings in your plant actually work." },
    ],
  }),
  component: HowItWorksPage,
});

const NAV = [
  { id: "pump", label: "Pump" },
  { id: "anatomy", label: "Mechanical seal" },
  { id: "valve", label: "Ball valve" },
  { id: "o-ring", label: "O-ring" },
  { id: "bearing", label: "Ball bearing" },
];

function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-32">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">How it works</span>
            <h1 className="mt-4 text-balance font-display font-black leading-[0.98] tracking-[-0.035em]" style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.25rem)" }}>
              See how the parts in your plant <span className="italic text-brass">actually work.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Five parts we supply every day, explained in a scroll. Keep scrolling and each drawing moves.
            </p>
          </Reveal>
          <nav aria-label="Topics" className="mt-8 flex flex-wrap gap-2">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2.5 text-sm font-semibold text-ink/80 transition hover:border-brass/50 hover:text-ink">
                <span className="font-mono text-[11px] text-brass">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </a>
            ))}
          </nav>
        </section>

        <ScrollTopic topic={PUMP} index={1} />
        <div className="-mt-4 sm:-mt-10">
          <SealAssembly showMore={false} />
        </div>
        {TOPICS_AFTER_SEAL.map((t, i) => (
          <ScrollTopic key={t.id} topic={t} index={i + 3} />
        ))}

        <section className="mx-auto mt-20 max-w-7xl px-5 pb-20 sm:mt-28 sm:px-8 sm:pb-28">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-[#0a1020] p-8 text-white sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black leading-tight sm:text-4xl">Need one of these, or a spare for it?</h2>
                <p className="mt-4 max-w-lg text-base text-slate-300">
                  Send a part number, a drawing or just a photo of the worn part. We'll match it and quote within one working day.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link to="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0a1020] transition hover:bg-slate-100">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://wa.me/917806936475" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* A tall section whose content sticks to the screen while the visitor scrolls through it.
   Scroll progress drives the drawing and steps through the explanation. With reduced motion
   it becomes a normal section showing the finished drawing and every step. */
function ScrollTopic({ topic, index }: { topic: Topic; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.5 });
  const still = useMotionValue(1);
  const p = reduce ? still : smooth;
  const n = topic.steps.length;
  const [step, setStep] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStep(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));
  const shown = reduce ? n - 1 : step;
  const { Art } = topic;

  return (
    <section ref={ref} id={topic.id} className={reduce ? "py-16 sm:py-24" : "relative h-[280vh]"}>
      <div className={reduce ? "" : "sticky top-0 flex h-[100svh] items-center pb-4 pt-20 sm:pt-24"}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-5 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
              <span className="font-mono">{String(index).padStart(2, "0")}</span> {topic.eyebrow}
            </span>
            <h2 className="mt-2 font-display text-3xl font-black leading-[1.02] tracking-tight sm:mt-3 sm:text-5xl">{topic.title}</h2>
            <p className="mt-4 hidden max-w-md text-base leading-relaxed text-muted-foreground sm:block">{topic.intro}</p>

            <ol className="mt-4 space-y-1 sm:mt-7 sm:space-y-2">
              {topic.steps.map((s, i) => {
                const on = reduce || i === shown;
                return (
                  <li key={s.t} className={`rounded-2xl border p-3 transition duration-300 sm:p-4 ${on ? "border-brass/30 bg-brass/[0.06]" : "border-transparent"}`}>
                    <div className="flex items-center gap-3">
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold tabular-nums transition ${on ? "bg-brass text-white" : "bg-ink/[0.07] text-ink/50"}`}>{i + 1}</span>
                      <span className={`text-sm font-bold transition sm:text-base ${on ? "text-ink" : "text-ink/45"}`}>{s.t}</span>
                    </div>
                    <p className={`ml-9 text-sm leading-snug text-muted-foreground ${on ? "mt-1.5 block" : "hidden sm:mt-1 sm:line-clamp-1 sm:block sm:opacity-50"}`}>{s.d}</p>
                  </li>
                );
              })}
            </ol>

            {!reduce && (
              <div className="mt-5 hidden h-1 w-full max-w-md overflow-hidden rounded-full bg-ink/[0.07] sm:block">
                <motion.div className="h-full origin-left rounded-full bg-brass" style={{ scaleX: p }} />
              </div>
            )}
            <Link to="/products/$category" params={{ category: topic.shop.slug }} className="mt-5 hidden items-center gap-1.5 text-sm font-semibold text-brass hover:underline sm:inline-flex">
              Browse {topic.shop.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative order-1 overflow-hidden rounded-[2rem] border border-hairline bg-surface p-3 sm:p-6 lg:order-2">
            <div className="grid-background pointer-events-none opacity-50" />
            <div className="relative mx-auto h-[36svh] w-full sm:h-auto sm:aspect-[3/2]">
              <Art p={p} step={shown} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
