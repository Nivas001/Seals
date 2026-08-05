import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function UnobtainiumPumpEasterEgg() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="hover:text-ink">Products</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products/$category" params={{ category: "pumps" }} className="hover:text-ink">
              Pumps
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Quantum Slurry Hyper-Pump</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                CLASSIFIED PROTOTYPE
              </div>
              <h1
                className="mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink bg-clip-text text-transparent"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)", backgroundImage: "linear-gradient(90deg, #1C1B18, #D97706)" }}
              >
                Quantum Slurry Hyper-Pump
              </h1>
              <p className="mt-4 text-lg font-medium text-ink/80">
                Engineered for interdimensional continuous duty.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                The Quantum Slurry Hyper-Pump (QSHP-9000) is the pinnacle of impossible engineering. Forged in the heart of a dying star and machined to sub-atomic tolerances, it is designed to pump entire oceans, paradoxes, and the concept of time itself. 
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => toast.error("ACCESS DENIED", { description: "Nice try. Our engineers are still trying to invent this.", icon: "🚫" })}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85 transition-transform active:scale-95"
                >
                  Request a quote ($999,999,999.00) <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <motion.div 
              initial={{ boxShadow: "0px 0px 0px rgba(217, 119, 6, 0)" }}
              animate={{ boxShadow: ["0px 0px 20px rgba(217, 119, 6, 0.4)", "0px 0px 60px rgba(0, 150, 255, 0.6)", "0px 0px 20px rgba(217, 119, 6, 0.4)"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-brass/50 bg-surface"
            >
              <img
                src="/images/unobtainium-pump.png"
                alt="Quantum Slurry Hyper-Pump"
                className="h-full w-full object-cover scale-105"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur">
                Classified Asset · QSHP-9000
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl px-5 pb-24 sm:mt-24 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-hairline bg-surface p-6 shadow-soft lg:col-span-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Specifications
              </div>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Impossible profile
              </h2>
              <dl className="mt-6 divide-y divide-hairline">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Material</dt>
                  <dd className="text-sm font-medium text-ink">Unobtainium / Vibranium Alloy (Grade 9)</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Max Pressure</dt>
                  <dd className="text-sm font-medium text-ink">Infinite (Bends Spacetime)</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Flow Rate</dt>
                  <dd className="text-sm font-medium text-ink">1 Pacific Ocean / Second</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Power Source</dt>
                  <dd className="text-sm font-medium text-ink">Captured Micro-Singularity</dd>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-hairline bg-ink p-6 text-background shadow-soft">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="h-32 w-32" />
              </div>
              <div className="relative z-10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                  Key benefits
                </div>
                <h2 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-3xl">
                  Why this product
                </h2>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-background/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                    <span>Defies the laws of thermodynamics.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-background/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                    <span>100% efficient. Actually creates energy.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-background/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                    <span>Self-lubricating using dark matter.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
