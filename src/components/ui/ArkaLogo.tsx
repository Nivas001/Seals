export interface ArkaLogoProps {
  /** Height of the ARKA mark in px. */
  size?: number;
  className?: string;
  /** "mark": the gear + ARKA emblem only. "full": emblem with the AARRKKAA International wordmark. */
  variant?: "mark" | "full" | "stacked";
}

// public/logo-mark.png is the original ARKA emblem trimmed to its edges (746×593),
// so it renders at full size instead of shrinking inside empty padding.
const MARK_RATIO = 746 / 593;

export function ArkaLogo({ size = 36, className = "", variant = "mark" }: ArkaLogoProps) {
  const mark = (
    <img
      src="/logo-mark.png"
      alt={variant === "mark" ? "AARRKKAA International" : ""}
      width={Math.round(size * MARK_RATIO)}
      height={size}
      decoding="async"
      style={{ height: size, width: "auto" }}
      className="shrink-0 object-contain"
    />
  );

  if (variant === "mark") {
    return <div className={`flex items-center justify-center ${className}`}>{mark}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className="flex flex-col leading-none" style={{ color: "#113447" }}>
        <span className="font-display font-black tracking-[0.02em]" style={{ fontSize: Math.round(size * 0.46) }}>
          AARRKKAA
        </span>
        <span
          className="mt-[3px] font-semibold uppercase tracking-[0.28em] opacity-80"
          style={{ fontSize: Math.max(8, Math.round(size * 0.2)) }}
        >
          International
        </span>
      </span>
    </div>
  );
}

export function ArkaLogoMark(props: ArkaLogoProps) {
  return <ArkaLogo {...props} variant="mark" />;
}
