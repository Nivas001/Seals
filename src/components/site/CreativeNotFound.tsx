import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search,
  Home,
  Wrench,
  ShieldAlert,
  PhoneCall,
  LightbulbOff,
  ZapOff,
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { GlowCard } from "@/components/ui/GlowCard";

export function CreativeNotFound() {
  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-between selection:bg-brass/20 selection:text-ink">
      {/* Automatically hide Equipment Advisor floating widget when on any 404 page */}
      <style>{`#ai-chatbot-widget { display: none !important; }`}</style>

      <main className="relative flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Blueprint & Grid background effects */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="grid-lines absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 35% 50%, rgba(217, 119, 6, 0.12) 0%, rgba(255,255,255,0) 65%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left Column: Straight Hanging Broken Bulb (No Box, Real Hanging Physics) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start py-6 lg:py-0">
            {/* Swaying Pendulum Animation from Ceiling */}
            <motion.div
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top center" }}
              className="relative flex flex-col items-center select-none"
            >
              {/* Ceiling Mount Base */}
              <div className="w-12 sm:w-16 h-3 bg-ink/80 rounded-b-md shadow-md border-b border-hairline/20" />

              {/* Straight Hanging Wire */}
              <div className="w-1 sm:w-1.5 bg-gradient-to-b from-ink/90 via-ink/70 to-ink/90 h-40 sm:h-56 md:h-64 shadow-sm relative">
                {/* Subtle wire highlight */}
                <div className="absolute inset-y-0 left-0 w-0.5 bg-white/20" />
              </div>

              {/* Industrial Brass Socket Cap */}
              <div className="relative z-10 w-12 sm:w-16 h-10 sm:h-12 bg-gradient-to-b from-ink via-ink/90 to-ink rounded-t-lg border-2 border-brass/60 shadow-lg flex flex-col items-center justify-around py-1 -mt-1">
                <div className="w-full h-0.5 bg-brass/40" />
                <div className="w-full h-0.5 bg-brass/40" />
                <div className="w-full h-0.5 bg-brass/40" />
              </div>

              {/* The Broken Bulb Assembly */}
              <div className="relative flex items-center justify-center -mt-2">
                {/* Radial Flickering Arc Glow */}
                <div className="absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] animate-pulse pointer-events-none" />

                {/* Main Bulb Icon */}
                <LightbulbOff className="w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 text-ink/35 stroke-[1.1] drop-shadow-md" />

                {/* Electric Sparks inside the shattered filament */}
                <motion.div
                  animate={{ opacity: [1, 0.2, 0.9, 0.1, 1], scale: [1, 1.15, 0.9, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <ZapOff className="w-10 sm:w-12 h-10 sm:h-12 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
                </motion.div>

                {/* Simulated Glass Crack Lines / Severed Filament Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.6, 1, 0.5, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-6 bg-destructive/10 border border-destructive/30 px-3 py-1 rounded-full backdrop-blur-xs shadow-xs"
                >
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-destructive">
                    ⚡ Filament Blown
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 404 Wrench & Remediation Actions */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Animated Warning Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[11px] font-bold uppercase tracking-[0.14em] mb-6 shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>System Alert — Coordinate Void Detected</span>
            </motion.div>

            {/* Huge 404 Display with Theme Engineering Styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex items-center justify-center lg:justify-start gap-2 sm:gap-6 font-display font-black tracking-tighter select-none"
            >
              <span className="text-7xl sm:text-8xl md:text-9xl leading-none text-ink drop-shadow-sm">
                4
              </span>
              <div className="relative flex items-center justify-center w-16 sm:w-24 md:w-28 h-16 sm:h-24 md:h-28 rounded-2xl sm:rounded-3xl bg-surface border-2 border-dashed border-ink/30 shadow-inner">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute text-brass/25"
                >
                  <Wrench className="w-10 sm:w-14 md:w-16 h-10 sm:h-14 md:h-16" />
                </motion.div>
                <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold text-brass relative z-10">
                  0
                </span>
              </div>
              <span className="text-7xl sm:text-8xl md:text-9xl leading-none text-ink drop-shadow-sm">
                4
              </span>
            </motion.div>

            {/* Headline & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-ink tracking-tight">
                Pipeline Disconnected: Component Not Found
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                The mechanical seal, pump assembly, or catalog specification you are searching for does not exist at this URL coordinate or has been relocated within our inventory.
              </p>
            </motion.div>

            {/* Technical Diagnostic Blueprint Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 w-full max-w-xl text-left"
            >
              <GlowCard className="p-6 border-ink/15 bg-surface/90 backdrop-blur-md shadow-lg">
                <div className="flex items-start justify-between gap-4 border-b border-hairline pb-3.5 mb-3.5">
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

                <p className="text-xs sm:text-sm text-ink/80 leading-normal mb-4 font-mono">
                  <strong className="text-ink">Remediation Protocol:</strong> The specification or component URL you requested has been moved or requires custom engineering assembly. Our technical catalog remains fully accessible below.
                </p>

                {/* Primary Catalog Trigger Button */}
                <Link
                  to="/products"
                  className="group relative w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-ink text-background font-semibold text-sm shadow-lift transition-all duration-300 hover:bg-brass hover:text-ink hover:shadow-[0_10px_25px_-5px_rgba(217,119,6,0.4)] focus:outline-none"
                >
                  <Search className="w-5 h-5 text-amber-400 group-hover:text-ink transition-colors" />
                  <span>Browse Master Engineering Catalog</span>
                </Link>
              </GlowCard>
            </motion.div>

            {/* Alternative Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
