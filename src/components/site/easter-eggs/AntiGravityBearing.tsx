import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function AntiGravityBearingEasterEgg() {
  return (
    <div className="min-h-screen bg-background text-ink overflow-hidden">
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <section className="mx-auto max-w-7xl px-5 sm:px-8 relative">
          
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground relative z-10">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="hover:text-ink">Products</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products/$category" params={{ category: "bearings" }} className="hover:text-ink">
              Bearings
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Anti-Gravity Bearing (AGB-01)</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-500 animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                EXTREME HAZARD WARNING
              </div>
              <h1 className="mt-3 font-display font-black leading-[0.98] tracking-tight text-ink text-5xl sm:text-7xl">
                AGB-01 Anti-Gravity Bearing
              </h1>
              <p className="mt-4 text-lg font-medium text-ink/80">
                Friction reduced by 104%. It actually repels the Earth.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                By harnessing dark energy and advanced magnetic levitation, the AGB-01 completely nullifies mass. Caution: Any machinery fitted with this bearing will immediately float into the stratosphere unless bolted directly to bedrock.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => toast.warning("WARNING", { description: "You are not certified to handle anti-gravity materials. Please consult a physicist." })}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85 transition-transform active:scale-95"
                >
                  Request orbital delivery <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -40, 0], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative aspect-[4/3] z-20"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <img
                src="/images/antigravity-bearing.png"
                alt="Anti-Gravity Bearing"
                className="relative h-full w-full object-contain drop-shadow-2xl"
              />
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
                Technical Data
              </h2>
              <dl className="mt-6 divide-y divide-hairline">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Mass</dt>
                  <dd className="text-sm font-medium text-ink">-45 kg (Negative Mass)</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Friction Coefficient</dt>
                  <dd className="text-sm font-medium text-ink">-0.004 (Generates momentum)</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Installation Requirement</dt>
                  <dd className="text-sm font-medium text-ink">Heavy-duty anchor chains, ceiling padding</dd>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-6 text-red-900 shadow-soft">
              <div className="relative z-10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-600">
                  Safety Protocol
                </div>
                <h2 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-3xl">
                  Danger
                </h2>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-red-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <span>Do NOT unbox outdoors. It will be lost to space.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-red-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <span>Keep away from dense planetary bodies.</span>
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
