import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search,
  Bot,
  Home,
  Wrench,
  ShieldAlert,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { chatbotState } from "@/data/chatbotState";
import { COMPANY } from "@/data/catalog";

export function CreativeNotFound() {
  const handleAskAdvisor = () => {
    chatbotState.askQuestion("How do I solve this 404 error and find my missing part?");
  };

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-between selection:bg-brass/20 selection:text-ink">
      <Navbar />

      <main className="relative flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Blueprint & Grid background effects */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="grid-lines absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(217, 119, 6, 0.12) 0%, rgba(255,255,255,0) 65%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          {/* Animated Warning Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[11px] font-bold uppercase tracking-[0.14em] mb-8 shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>System Alert — Coordinate Void Detected</span>
          </motion.div>

          {/* Huge 404 Display with Theme Engineering Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex items-center justify-center gap-2 sm:gap-6 font-display font-black tracking-tighter select-none"
          >
            <span className="text-8xl sm:text-9xl md:text-[11rem] leading-none text-ink drop-shadow-sm">
              4
            </span>
            <div className="relative flex items-center justify-center w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 rounded-3xl bg-surface border-2 border-dashed border-ink/30 shadow-inner">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute text-brass/25"
              >
                <Wrench className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20" />
              </motion.div>
              <span className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold text-brass relative z-10">
                0
              </span>
            </div>
            <span className="text-8xl sm:text-9xl md:text-[11rem] leading-none text-ink drop-shadow-sm">
              4
            </span>
          </motion.div>

          {/* Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-ink tracking-tight">
              Pipeline Disconnected: Component Not Found
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              The mechanical seal, pump assembly, or catalog specification you are searching for does not exist at this URL coordinate or has been relocated within our inventory.
            </p>
          </motion.div>

          {/* Technical Diagnostic Blueprint Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 max-w-xl mx-auto text-left"
          >
            <GlowCard className="p-6 sm:p-7 border-ink/15 bg-surface/90 backdrop-blur-md shadow-lg">
              <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  <span className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
                    Diagnostic Status
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-ink/5 px-2 py-0.5 rounded text-muted-foreground font-semibold">
                  ERR_CODE: 404_SEAL_VOID
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink/80 leading-normal mb-5 font-mono">
                <strong className="text-ink">Remediation Protocol:</strong> Do not abandon your engineering project! Our AI Equipment Advisor is standing by to identify equivalent metallurgical grades, CAD drawings, or custom fabrication options immediately.
              </p>

              {/* Primary AI Advisor Trigger Button */}
              <button
                onClick={handleAskAdvisor}
                className="group relative w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-ink text-background font-semibold text-sm shadow-lift transition-all duration-300 hover:bg-brass hover:text-ink hover:shadow-[0_10px_25px_-5px_rgba(217,119,6,0.4)] focus:outline-none"
              >
                <Bot className="w-5 h-5 text-amber-400 group-hover:text-ink transition-colors animate-bounce" />
                <span>Ask AI Advisor How To Solve This 404</span>
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:text-ink transition-colors ml-1" />
              </button>
            </GlowCard>
          </motion.div>

          {/* Alternative Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-hairline hover:border-ink/40 font-semibold text-xs sm:text-sm text-ink shadow-2xs hover:bg-white transition-all duration-200"
            >
              <Search className="w-4 h-4 text-brass" />
              <span>Browse All 12 Categories</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-hairline hover:border-ink/40 font-semibold text-xs sm:text-sm text-ink shadow-2xs hover:bg-white transition-all duration-200"
            >
              <Home className="w-4 h-4 text-muted-foreground" />
              <span>Return to HQ</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-hairline hover:border-ink/40 font-semibold text-xs sm:text-sm text-ink shadow-2xs hover:bg-white transition-all duration-200"
            >
              <PhoneCall className="w-4 h-4 text-muted-foreground" />
              <span>Contact Sales Team</span>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
