import { useRef, type ReactNode, type MouseEvent, type HTMLAttributes } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Classes for the outer ring, e.g. grid placement or ordering. */
  containerClassName?: string;
  glowColor?: string;
}

/**
 * Card with a cursor-following light on its 1.5px border.
 * The glow lives only in the border ring: the card body stays fully opaque so the
 * highlight never washes over the text. Layout classes passed in `className`
 * (flex, justify-between, ...) apply to the inner body, which holds the children.
 */
export function GlowCard({
  children,
  className = "",
  containerClassName = "",
  glowColor = "rgba(2, 132, 199, 0.55)",
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const glow = useTransform([smoothX, smoothY], ([x, y]) => `radial-gradient(260px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`);

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
      className={cn(
        "group/glow relative h-full w-full rounded-[1.75rem] bg-hairline p-[1.5px] transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_36px_-18px_rgba(2,132,199,0.4)]",
        containerClassName,
      )}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{ background: glow }}
      />
      <div className={cn("relative h-full w-full rounded-[calc(1.75rem-1.5px)] bg-surface p-5 sm:p-8", className)}>{children}</div>
    </div>
  );
}
