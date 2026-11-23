import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import type { Topic } from "@/components/illustrations/HowItWorks";
import { Reveal } from "@/lib/motion";

/* Compact "How it works" card for a product category page. Unlike the full page, the drawing
   plays on its own on a loop while it is on screen, so it doesn't make the page longer.
   It can be paused, and with reduced motion it shows the finished state with every step. */
export function HowItWorksPanel({ topic }: { topic: Topic }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const p = useMotionValue(reduce ? 1 : 0);
  const [paused, setPaused] = useState(false);
  const n = topic.steps.length;
  const [step, setStep] = useState(reduce ? n - 1 : 0);
  useMotionValueEvent(p, "change", (v) => setStep(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));

  useEffect(() => {
    if (reduce) {
      p.set(1);
      return;
    }
    if (!inView || paused) return;
    // Resume from wherever it stopped, then loop from the start.
    const remaining = 9 * (1 - p.get());
    let loop: ReturnType<typeof animate> | undefined;
    const first = animate(p, 1, {
      duration: remaining,
      ease: "linear",
      onComplete: () => {
        p.set(0);
        loop = animate(p, [0, 1], { duration: 9, ease: "linear", repeat: Infinity, repeatDelay: 1.2 });
      },
    });
    return () => {
      first.stop();
      loop?.stop();
    };
  }, [inView, paused, reduce, p]);

  const { Art } = topic;

  return (
    <section aria-labelledby={`how-${topic.id}`} className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
      <Reveal>
        <div ref={ref} className="grid gap-6 overflow-hidden rounded-[2rem] border border-hairline bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">How it works · {topic.eyebrow}</span>
            <h2 id={`how-${topic.id}`} className="mt-3 font-display text-3xl font-black leading-[1.04] tracking-tight text-ink sm:text-4xl">
              {topic.title}
            </h2>
            <ol className="mt-5 space-y-1.5">
              {topic.steps.map((s, i) => {
                const on = reduce || i === step;
                return (
                  <li key={s.t}>
                    <button
                      type="button"
                      onClick={() => {
                        setPaused(true);
                        p.set((i + 0.6) / n);
                      }}
                      className={`w-full rounded-2xl border p-3 text-left transition duration-300 ${on ? "border-brass/30 bg-brass/[0.06]" : "border-transparent hover:bg-ink/[0.03]"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold transition ${on ? "bg-brass text-white" : "bg-ink/[0.07] text-ink/50"}`}>{i + 1}</span>
                        <span className={`text-sm font-bold transition ${on ? "text-ink" : "text-ink/50"}`}>{s.t}</span>
                      </span>
                      {on && <span className="ml-9 mt-1 block text-sm leading-snug text-muted-foreground">{s.d}</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/how-it-works"
                hash={topic.id}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-background transition hover:bg-ink/85"
              >
                See the full explainer <ArrowRight className="h-4 w-4" />
              </Link>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setPaused((v) => !v)}
                  aria-label={paused ? "Play animation" : "Pause animation"}
                  className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-ink transition hover:bg-background"
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-hairline bg-background p-3 sm:p-5">
            <div className="grid-background pointer-events-none opacity-50" />
            <div className="relative aspect-[3/2] w-full">
              <Art p={p} step={step} />
            </div>
            {!reduce && (
              <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.07]">
                <motion.div className="h-full origin-left rounded-full bg-brass" style={{ scaleX: p }} />
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
