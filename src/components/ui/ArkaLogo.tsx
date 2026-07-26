import React from "react";

export interface ArkaLogoProps {
  size?: number;
  className?: string;
  variant?: "mark" | "full" | "stacked";
}

export function ArkaLogoMark({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Metallic Steel Gradient for Gears */}
        <linearGradient id="arka-steel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        {/* Luxury Golden Brass Gradient */}
        <linearGradient id="arka-brass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        {/* Drop shadow for architectural depth */}
        <filter id="arka-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* GEAR 1: Top Left (Around x=30, y=32, r=16) */}
      <g className="origin-[30px_32px] animate-[spin_24s_linear_infinite]">
        <circle cx="30" cy="32" r="14" stroke="url(#arka-steel)" strokeWidth="2.5" fill="none" opacity="0.9" />
        {Array.from({ length: 10 }).map((_, i) => {
          const deg = (i * 360) / 10;
          const rad = (deg * Math.PI) / 180;
          const x1 = 30 + Math.cos(rad) * 11.5;
          const y1 = 32 + Math.sin(rad) * 11.5;
          const x2 = 30 + Math.cos(rad) * 17.5;
          const y2 = 32 + Math.sin(rad) * 17.5;
          return (
            <line
              key={`g1-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#arka-steel)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="30" cy="32" r="7" stroke="url(#arka-brass)" strokeWidth="1.6" fill="#1E293B" />
        <circle cx="30" cy="32" r="2.5" fill="url(#arka-steel)" />
      </g>

      {/* GEAR 2: Bottom Left (Around x=22, y=70, r=15) */}
      <g className="origin-[22px_70px] animate-[spin_20s_linear_infinite_reverse]">
        <circle cx="22" cy="70" r="13" stroke="url(#arka-steel)" strokeWidth="2.5" fill="none" opacity="0.9" />
        {Array.from({ length: 10 }).map((_, i) => {
          const deg = (i * 360) / 10;
          const rad = (deg * Math.PI) / 180;
          const x1 = 22 + Math.cos(rad) * 10.5;
          const y1 = 70 + Math.sin(rad) * 10.5;
          const x2 = 22 + Math.cos(rad) * 16.5;
          const y2 = 70 + Math.sin(rad) * 16.5;
          return (
            <line
              key={`g2-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#arka-steel)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="22" cy="70" r="6" stroke="url(#arka-steel)" strokeWidth="1.5" fill="#0F172A" />
        <circle cx="22" cy="70" r="2" fill="url(#arka-brass)" />
      </g>

      {/* GEAR 3: Bottom Right (Around x=98, y=66, r=16) */}
      <g className="origin-[98px_66px] animate-[spin_26s_linear_infinite]">
        <circle cx="98" cy="66" r="14" stroke="url(#arka-steel)" strokeWidth="2.5" fill="none" opacity="0.9" />
        {Array.from({ length: 10 }).map((_, i) => {
          const deg = (i * 360) / 10;
          const rad = (deg * Math.PI) / 180;
          const x1 = 98 + Math.cos(rad) * 11.5;
          const y1 = 66 + Math.sin(rad) * 11.5;
          const x2 = 98 + Math.cos(rad) * 17.5;
          const y2 = 66 + Math.sin(rad) * 17.5;
          return (
            <line
              key={`g3-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#arka-steel)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="98" cy="66" r="7" stroke="url(#arka-brass)" strokeWidth="1.6" fill="#1E293B" />
        <circle cx="98" cy="66" r="2.5" fill="url(#arka-steel)" />
      </g>

      {/* DOUBLE 'A' MOUNTAIN PILLARS (Bold White/Silver/Ink Geometric Structure) */}
      <g filter="url(#arka-shadow)">
        {/* Left A Pillar */}
        <path
          d="M 12 96 L 44 14 C 46 10, 50 10, 52 14 L 74 96 L 58 96 L 48 64 L 28 96 Z"
          fill="currentColor"
          className="text-ink dark:text-white transition-colors duration-300"
        />
        <path
          d="M 12 96 L 44 14 C 46 10, 50 10, 52 14 L 74 96 L 58 96 L 48 64 L 28 96 Z"
          stroke="url(#arka-steel)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />

        {/* Right A Pillar */}
        <path
          d="M 46 96 L 72 22 C 74 18, 78 18, 80 22 L 108 96 L 92 96 L 76 56 L 64 96 Z"
          fill="currentColor"
          className="text-ink dark:text-white transition-colors duration-300"
        />
        <path
          d="M 46 96 L 72 22 C 74 18, 78 18, 80 22 L 108 96 L 92 96 L 76 56 L 64 96 Z"
          stroke="url(#arka-steel)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
      </g>

      {/* HORIZONTAL 'ARKA' BANNER ACROSS CENTER */}
      <g filter="url(#arka-shadow)" className="z-20">
        {/* Banner background bar */}
        <rect
          x="18"
          y="49"
          width="84"
          height="20"
          rx="3"
          fill="#0F172A"
          stroke="url(#arka-brass)"
          strokeWidth="1.4"
        />

        {/* Top & Bottom Accent Lines */}
        <line x1="24" y1="52.5" x2="96" y2="52.5" stroke="url(#arka-brass)" strokeWidth="1" opacity="0.85" />
        <line x1="24" y1="65.5" x2="96" y2="65.5" stroke="url(#arka-brass)" strokeWidth="1" opacity="0.85" />

        {/* ARKA Text inside banner */}
        <text
          x="60"
          y="62.5"
          textAnchor="middle"
          fill="#F8FAFC"
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="0.28em"
          style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
        >
          ARKA
        </text>
      </g>
    </svg>
  );
}

export function ArkaLogo({
  size = 36,
  className = "",
  variant = "full",
}: ArkaLogoProps) {
  if (variant === "mark") {
    return <ArkaLogoMark size={size} className={className} />;
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
        <ArkaLogoMark size={size} />
        <div className="text-center font-display tracking-[0.14em] uppercase text-ink select-none">
          <div className="text-sm font-black leading-none">AARRKKAA</div>
          <div className="text-[10px] font-semibold text-brass tracking-[0.24em] mt-1">
            International
          </div>
        </div>
      </div>
    );
  }

  // Default "full" horizontal variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ArkaLogoMark size={size} />
      <div className="flex flex-col justify-center leading-none select-none">
        <span className="font-display text-[15px] sm:text-[16px] font-black tracking-[0.12em] text-ink uppercase">
          AARRKKAA
        </span>
        <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.24em] text-muted-foreground uppercase mt-1">
          International
        </span>
      </div>
    </div>
  );
}
