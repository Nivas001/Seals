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

  // Wordmark set in Montserrat to match the emblem's ARKA lettering. "International"
  // sits between two hairlines, like the rules above and below ARKA in the emblem.
  // Negative right margins cancel the trailing letter-spacing so both lines centre.
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className="flex flex-col font-brand leading-none" style={{ color: "#113447" }}>
        <span
          className="mr-[-0.06em] font-extrabold tracking-[0.06em]"
          style={{ fontSize: Math.round(size * 0.5) }}
        >
          AARRKKAA
        </span>
        <span
          className="flex items-center gap-[0.5em] font-semibold uppercase"
          style={{ fontSize: Math.max(8, size * 0.21), marginTop: Math.round(size * 0.11) }}
        >
          <span aria-hidden className="h-px min-w-[0.5em] flex-1 bg-current opacity-40" />
          <span className="mr-[-0.24em] tracking-[0.24em] opacity-85">International</span>
          <span aria-hidden className="h-px min-w-[0.5em] flex-1 bg-current opacity-40" />
        </span>
      </span>
    </div>
  );
}

export function ArkaLogoMark(props: ArkaLogoProps) {
  return <ArkaLogo {...props} variant="mark" />;
}
