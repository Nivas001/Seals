import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useChatbotOpen } from "@/data/chatbotState";
import { Compass } from "lucide-react";

export type SidebarSection = {
  id: string;
  label: string;
};

type LineSidebarProps = {
  sections: SidebarSection[];
};

export function LineSidebar({ sections }: LineSidebarProps) {
  const isChatbotOpen = useChatbotOpen();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the last section whose top is above our threshold
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 120) {
            setActiveId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (!sections.length) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isChatbotOpen ? 0 : 1,
        x: isChatbotOpen ? 24 : 0,
        pointerEvents: isChatbotOpen ? "none" : "auto",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end selection:bg-brass/20"
      aria-label="Page section navigation"
    >
      {/* Sleek Glassmorphic Instrument Capsule Container */}
      <div className="relative flex flex-col items-end p-2.5 sm:p-3 rounded-2xl bg-surface/75 border border-ink/15 shadow-lift backdrop-blur-md transition-all duration-300 hover:bg-surface/90 hover:border-ink/25 hover:shadow-xl">
        {/* Top Header Badge */}
        <div className="flex items-center justify-end gap-1.5 px-1 pb-2 border-b border-hairline/80 w-full mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            NAV
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="w-2.5 h-2.5 text-brass" />
          </motion.div>
        </div>

        {/* Caliper Ruler Track Container */}
        <div className="relative flex flex-col items-end gap-2.5 py-2 pr-1 pl-6">
          {/* Top T-Cap */}
          <div
            aria-hidden="true"
            className="absolute right-[5.5px] top-1 w-2 h-[1px] bg-ink/30 pointer-events-none"
          />
          {/* Vertical Spine Track */}
          <div
            aria-hidden="true"
            className="absolute right-[5.5px] top-1 bottom-1 w-[1.5px] bg-gradient-to-b from-ink/30 via-ink/15 to-ink/30 pointer-events-none"
          />
          {/* Bottom T-Cap */}
          <div
            aria-hidden="true"
            className="absolute right-[5.5px] bottom-1 w-2 h-[1px] bg-ink/30 pointer-events-none"
          />

          {sections.map((section, idx) => {
            const isActive = activeId === section.id;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center gap-3 cursor-pointer py-1 focus:outline-none"
                aria-label={`Scroll to ${section.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Technical CAD-Numbered Label Pill */}
                <span
                  className={`transition-all duration-300 rounded-lg px-3 py-1.5 text-[11px] font-mono tracking-[0.08em] uppercase whitespace-nowrap shadow-xs backdrop-blur-md flex items-center gap-1.5 ${
                    isActive
                      ? "opacity-100 translate-x-0 bg-ink text-background font-bold border border-amber-500/60 shadow-md"
                      : "opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 bg-surface/95 text-ink/80 border border-hairline hover:bg-white hover:text-ink font-semibold"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  )}
                  <span
                    className={
                      isActive ? "text-amber-400 font-bold" : "text-amber-600 font-bold"
                    }
                  >
                    {num}
                  </span>
                  <span className={isActive ? "text-background/40" : "text-ink/30"}>
                    //
                  </span>
                  <span className={isActive ? "text-background" : "text-ink"}>
                    {section.label}
                  </span>
                </span>

                {/* Dual-Tone Brass Indicator Line Segment */}
                <span
                  className={`transition-all duration-300 rounded-full shrink-0 relative z-10 ${
                    isActive
                      ? "h-8 w-[3.5px] bg-gradient-to-b from-amber-400 via-brass to-amber-600 shadow-[0_0_14px_rgba(217,119,6,0.85)] scale-y-105"
                      : "h-4 w-[2px] bg-ink/25 group-hover:bg-ink/70 group-hover:h-6 group-hover:w-[3px]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
