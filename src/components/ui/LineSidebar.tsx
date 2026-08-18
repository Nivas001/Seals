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
      initial={{ opacity: 0, x: 15 }}
      animate={{
        opacity: isChatbotOpen ? 0 : 1,
        x: isChatbotOpen ? 20 : 0,
        pointerEvents: isChatbotOpen ? "none" : "auto",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end"
      aria-label="Page section navigation"
    >
      <div className="relative flex flex-col items-end gap-3 py-4 pl-4 pr-0.5">
        {/* Subtle, continuous hairline background track on the far right */}
        <div
          aria-hidden="true"
          className="absolute right-[1px] top-4 bottom-4 w-[1px] bg-ink/10 pointer-events-none"
        />

        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center gap-3 cursor-pointer py-1 focus:outline-none"
              aria-label={`Scroll to ${section.label}`}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Elegant, Minimalist Label */}
              <span
                className={`transition-all duration-300 rounded-md px-2.5 py-1 text-xs whitespace-nowrap shadow-2xs backdrop-blur-md ${
                  isActive
                    ? "opacity-100 translate-x-0 font-bold text-ink bg-surface/95 border border-ink/20 shadow-sm"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 font-medium text-ink/75 bg-surface/85 border border-hairline hover:bg-white hover:text-ink"
                }`}
              >
                {section.label}
              </span>

              {/* Minimalist Line Indicator */}
              <span
                className={`transition-all duration-300 rounded-full shrink-0 relative z-10 ${
                  isActive
                    ? "h-6 w-[2px] bg-brass shadow-[0_0_10px_rgba(2,132,199,0.6)]"
                    : "h-3.5 w-[1.5px] bg-ink/20 group-hover:bg-ink/50 group-hover:h-5 group-hover:w-[2px]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
