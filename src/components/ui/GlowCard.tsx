import { useState, useRef, type ReactNode, type MouseEvent, type HTMLAttributes } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(217, 119, 6, 0.8)",
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for localized border glow beam
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor glow
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[1.75rem] p-[2px] transition-all duration-300 overflow-hidden bg-hairline hover:shadow-[0_15px_40px_-10px_rgba(217,119,6,0.35)] ${className}`}
      {...props}
    >
      {/* 1. Ambient continuous rotating gradient glow */}
      <div className="absolute -inset-full animate-spin bg-[conic-gradient(from_0deg,transparent_0_300deg,#D97706_330deg,transparent_360deg)] opacity-0 group-hover:opacity-75 transition-opacity duration-500" style={{ animationDuration: "6s" }} />

      {/* 2. Cursor-following border light beam */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`
          ),
        }}
      />

      {/* 3. Card Body Shell */}
      <div className="relative z-10 h-full w-full rounded-[calc(1.75rem-2px)] bg-surface p-6 sm:p-8 transition-colors duration-300 group-hover:bg-surface/95">
        {children}
      </div>
    </div>
  );
}
