import { useState, useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Award, CheckCircle2, MapPin, Cpu, Sparkles, Zap } from "lucide-react";
import { COMPANY } from "@/data/catalog";

import { ArkaLogoMark } from "@/components/ui/ArkaLogo";

export function VerifiedSupplierBadge() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 300,
    damping: 30,
  });

  // Sheen light coordinates
  const sheenX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), {
    stiffness: 250,
    damping: 25,
  });
  const sheenY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), {
    stiffness: 250,
    damping: 25,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-6 perspective-1000">
      {/* Lanyard Strap & Metallic Loop */}
      <div className="relative z-10 flex flex-col items-center -mb-4 pointer-events-none">
        {/* Woven strap */}
        <div className="w-10 h-14 bg-gradient-to-b from-ink via-zinc-800 to-ink rounded-t-md shadow-inner border-x border-t border-brass/30 flex items-center justify-center">
          <div className="w-1 h-full bg-brass/20" />
        </div>
        {/* Brass metallic ring */}
        <div className="w-14 h-7 -mt-2 rounded-full border-4 border-brass bg-gradient-to-b from-amber-400 via-brass to-amber-700 shadow-md flex items-center justify-center">
          <div className="w-8 h-2 rounded-full bg-ink/80 shadow-inner" />
        </div>
      </div>

      {/* 3D Tilt Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative w-full max-w-[350px] sm:max-w-[380px] rounded-[2rem] border-2 border-brass/60 bg-gradient-to-br from-surface via-background to-surface/95 p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(217,119,6,0.35)] backdrop-blur-xl transition-shadow hover:shadow-[0_35px_70px_-15px_rgba(217,119,6,0.5)] cursor-pointer overflow-hidden text-ink"
      >
        {/* Interactive Foil Sheen Glare */}
        <motion.div
          style={{ left: sheenX, top: sheenY }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-radial from-brass/30 via-amber-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Card Header Banner */}
        <div className="relative z-10 flex items-center gap-3.5 border-b border-brass/30 pb-5">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white border-2 border-brass/60 shadow-md p-1.5">
            <ArkaLogoMark size={50} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-sans text-xs font-bold tracking-[0.08em] text-ink uppercase">
              <span>{COMPANY.name}</span>
            </div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-brass mt-0.5">
              Verified Industrial Partner
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Supplier ID #AK-2026</span>
            </div>
          </div>
        </div>

        {/* Verification Seal Badge */}
        <div className="relative z-10 mt-5 flex items-center justify-between rounded-xl bg-brass/15 border border-brass/30 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brass shrink-0" />
            <span className="text-xs font-bold text-ink uppercase tracking-wide">
              ISO 9001 Compliant
            </span>
          </div>
          <Sparkles className="h-3.5 w-3.5 text-brass animate-spin" style={{ animationDuration: "8s" }} />
        </div>

        {/* Specifications & Capabilities */}
        <div className="relative z-10 mt-5 space-y-3 font-sans text-xs">
          <div className="flex items-start gap-2.5">
            <Cpu className="h-4 w-4 text-brass shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-ink">70+ Precision Categories</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Process pumps, mechanical seals, silicone tubing & SS316 fittings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Award className="h-4 w-4 text-brass shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-ink">Severe Duty Engineered</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Rated for 400°C temperatures, 60 Bar pressure & aggressive chemicals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Zap className="h-4 w-4 text-brass shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-ink">Rapid Response Guarantee</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Immediate sizing, metallurgical matching & worldwide dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-brass shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-ink">Headquarters</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Hosur, Tamil Nadu — Service available globally.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Hologram stamp */}
        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-hairline pt-3.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>AARRKKAA TECH CORP</span>
          <span className="text-brass">★ AUTHORIZED ★</span>
        </div>
      </motion.div>
    </div>
  );
}
