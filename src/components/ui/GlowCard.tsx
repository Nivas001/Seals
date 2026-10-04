import { type ReactNode, type HTMLAttributes } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = "", glowColor: _glowColor, ...props }: GlowCardProps) {
  return (
    <div className={`arka-surface-card group relative overflow-hidden rounded-lg border border-hairline bg-surface p-5 sm:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
