import { Link } from "@tanstack/react-router";
import { ArrowRight, Activity } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function FlubberEasterEgg() {
  return (
    <div className="min-h-screen bg-background text-ink overflow-hidden">
      <Navbar />
      <main className="pt-28 sm:pt-32 relative">
        <section className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-foreground relative z-10">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="hover:text-ink">Products</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products/$category" params={{ category: "elastomers" }} className="hover:text-ink">
              Elastomers
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Industrial Flubber</span>
          </nav>

          <div className="mt-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-green-500 animate-pulse">
              <Activity className="h-4 w-4" />
              HIGHLY VOLATILE SUBSTANCE
            </div>
            <h1 className="mt-3 font-display font-black leading-[0.98] tracking-tight text-ink text-5xl sm:text-7xl">
              Industrial Flubber
            </h1>
            <p className="mt-4 text-lg font-medium text-ink/80">
              The elastomer that refuses to stop bouncing.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Synthesized by accident when an engineer dropped a rubber seal into a vat of radioactive energy drink. It possesses an infinite coefficient of restitution. Do not drop.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => toast.success("Bounce requested", { description: "It is already on its way. Look out the window." })}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600 transition-transform active:scale-95 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              >
                Order 1 kg <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* The Flubber! */}
        <motion.div
          animate={{
            x: ["0vw", "80vw", "20vw", "90vw", "10vw", "0vw"],
            y: ["0vh", "60vh", "10vh", "80vh", "20vh", "0vh"],
            scale: [1, 0.8, 1.2, 0.9, 1.1, 1],
            rotate: [0, 180, 360, 540, 720, 900],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-400 mix-blend-multiply blur-[2px] z-20 pointer-events-none shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),_0_0_40px_rgba(74,222,128,0.8)]"
        />
        
        <motion.div
          animate={{
            x: ["10vw", "90vw", "10vw", "80vw", "0vw", "10vw"],
            y: ["80vh", "10vh", "70vh", "20vh", "60vh", "80vh"],
            scale: [0.5, 0.6, 0.4, 0.7, 0.5, 0.5],
            rotate: [0, -180, -360, -540, -720, -900],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-green-300 mix-blend-multiply blur-[1px] z-20 pointer-events-none shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.2),_0_0_20px_rgba(134,239,172,0.8)]"
        />

      </main>
      <div className="mt-48 relative z-30 bg-surface">
        <Footer />
      </div>
    </div>
  );
}
