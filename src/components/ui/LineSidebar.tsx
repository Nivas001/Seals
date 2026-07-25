import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useChatbotOpen } from "@/data/chatbotState";

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
          if (scrollPosition >= top - 100) {
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
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end"
      aria-label="Page section navigation"
    >
      <div className="relative flex flex-col items-end gap-2.5 py-3 pr-1 pl-4">
        {/* Subtle connecting vertical line on the far right */}
        <div
          aria-hidden="true"
          className="absolute right-[5.5px] top-5 bottom-5 w-[1px] bg-ink/15 pointer-events-none"
        />

        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center gap-3 cursor-pointer py-1.5 focus:outline-none"
              aria-label={`Scroll to ${section.label}`}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Label Pill */}
              <span
                className={`transition-all duration-300 rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide whitespace-nowrap shadow-xs backdrop-blur-md ${
                  isActive
                    ? "opacity-100 translate-x-0 bg-ink text-background font-bold border border-ink shadow-md"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-surface/95 text-ink/80 border border-hairline hover:bg-white hover:text-ink"
                }`}
              >
                {section.label}
              </span>

              {/* Vertical Line Segment */}
              <span
                className={`transition-all duration-300 rounded-full shrink-0 relative z-10 ${
                  isActive
                    ? "h-7 w-1 bg-brass shadow-[0_0_12px_rgba(217,119,6,0.6)]"
                    : "h-3.5 w-0.5 bg-ink/30 group-hover:bg-ink/70 group-hover:h-5 group-hover:w-1"
                }`}
              />
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
