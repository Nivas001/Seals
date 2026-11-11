import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/* Line-art illustrations of the parts we supply, one per catalog category.
   Drawn on a 64×64 grid with round 2px strokes in currentColor, so they inherit text color
   and read in any surface. With `animated`, each stroke draws itself in when scrolled into view. */

type Shape =
  | { t: "path"; d: string; accent?: boolean }
  | { t: "circle"; cx: number; cy: number; r: number; accent?: boolean }
  | { t: "ellipse"; cx: number; cy: number; rx: number; ry: number; accent?: boolean }
  | { t: "rect"; x: number; y: number; w: number; h: number; rx?: number; accent?: boolean };

const ring = (
  cx: number,
  cy: number,
  r: number,
  n: number,
  dotR: number,
  accent = false,
): Shape[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      t: "circle",
      cx: +(cx + Math.cos(a) * r).toFixed(2),
      cy: +(cy + Math.sin(a) * r).toFixed(2),
      r: dotR,
      accent,
    } as Shape;
  });

const SHAPES: Record<string, Shape[]> = {
  "mechanical-seals": [
    { t: "circle", cx: 32, cy: 32, r: 25 },
    { t: "circle", cx: 32, cy: 32, r: 16, accent: true },
    { t: "circle", cx: 32, cy: 32, r: 12, accent: true },
    { t: "circle", cx: 32, cy: 32, r: 6.5 },
    ...ring(32, 32, 20.5, 4, 1.6),
  ],
  pumps: [
    { t: "circle", cx: 26, cy: 36, r: 15 },
    { t: "circle", cx: 26, cy: 36, r: 4.5, accent: true },
    {
      t: "path",
      d: "M26 31.5c3-4 7-5 10-4M30.5 36c2 4 1.5 8-1 10.5M21.5 36c-3.5 1-6 4-6.5 7",
      accent: true,
    },
    { t: "path", d: "M30 21.6V9h10v14.2" },
    { t: "path", d: "M27 9h16" },
    { t: "path", d: "M41 36h17" },
    { t: "path", d: "M8 57h48M16 51v6M36 51v6" },
  ],
  bearings: [
    { t: "circle", cx: 32, cy: 32, r: 25 },
    { t: "circle", cx: 32, cy: 32, r: 19.5 },
    { t: "circle", cx: 32, cy: 32, r: 12.5 },
    { t: "circle", cx: 32, cy: 32, r: 7 },
    ...ring(32, 32, 16, 8, 3, true),
  ],
  valves: [
    { t: "path", d: "M6 42h12M46 42h12M6 34v16M58 34v16" },
    { t: "path", d: "M18 34v16h28V34c0-5-6-9-14-9s-14 4-14 9Z" },
    { t: "path", d: "M32 25V12", accent: true },
    { t: "ellipse", cx: 32, cy: 10, rx: 13, ry: 3.5, accent: true },
  ],
  springs: [
    { t: "path", d: "M17 7h30M17 57h30" },
    { t: "path", d: "M22 7l20 6-20 6 20 6-20 6 20 6-20 6 20 6-20 6", accent: true },
  ],
  elastomers: [
    { t: "circle", cx: 32, cy: 32, r: 24 },
    { t: "circle", cx: 32, cy: 32, r: 14 },
    { t: "path", d: "M15.5 22A19 19 0 0 1 32 13", accent: true },
  ],
  silicone: [
    { t: "rect", x: 8, y: 14, w: 48, h: 36, rx: 9 },
    { t: "rect", x: 18, y: 23, w: 28, h: 18, rx: 4, accent: true },
    { t: "circle", cx: 13.5, cy: 19.5, r: 2 },
    { t: "circle", cx: 50.5, cy: 19.5, r: 2 },
    { t: "circle", cx: 13.5, cy: 44.5, r: 2 },
    { t: "circle", cx: 50.5, cy: 44.5, r: 2 },
  ],
  hoses: [
    { t: "path", d: "M14 50c0-22 36-14 36-36" },
    { t: "path", d: "M22 50c0-16 36-8 36-30", accent: true },
    { t: "rect", x: 10, y: 50, w: 16, h: 7, rx: 1.5 },
    { t: "rect", x: 46, y: 7, w: 16, h: 7, rx: 1.5 },
  ],
  "stainless-steel": [
    { t: "circle", cx: 20, cy: 42, r: 12 },
    { t: "circle", cx: 44, cy: 42, r: 12 },
    { t: "circle", cx: 32, cy: 21, r: 12 },
    { t: "circle", cx: 20, cy: 42, r: 7.5, accent: true },
    { t: "circle", cx: 44, cy: 42, r: 7.5, accent: true },
    { t: "circle", cx: 32, cy: 21, r: 7.5, accent: true },
  ],
  couplings: [
    { t: "path", d: "M4 32h10M50 32h10" },
    { t: "rect", x: 14, y: 18, w: 16, h: 28, rx: 3 },
    { t: "rect", x: 34, y: 18, w: 16, h: 28, rx: 3 },
    { t: "path", d: "M30 22h4M30 32h4M30 42h4", accent: true },
  ],
  nozzles: [
    { t: "path", d: "M8 26h16l12 4v4l-12 4H8Z" },
    { t: "path", d: "M8 22v20" },
    { t: "path", d: "M42 32h14M41 26l13-7M41 38l13 7", accent: true },
  ],
  "motors-and-gearboxes": [
    { t: "rect", x: 8, y: 18, w: 36, h: 28, rx: 5 },
    { t: "path", d: "M16 18v28M24 18v28M32 18v28", accent: true },
    { t: "path", d: "M44 32h14" },
    { t: "path", d: "M12 46l-2 9h36l-2-9" },
  ],
  other: [
    { t: "path", d: "M32 8l20.8 12v24L32 56 11.2 44V20Z" },
    { t: "circle", cx: 32, cy: 32, r: 10, accent: true },
  ],
};

const ALIASES: Record<string, string> = {
  seals: "mechanical-seals",
  "o-rings": "elastomers",
  steel: "stainless-steel",
  motors: "motors-and-gearboxes",
  "additional-products": "other",
};

export function illustrationKey(slug: string) {
  const k = ALIASES[slug] ?? slug;
  return SHAPES[k] ? k : "other";
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE_OUT, delay: 0.08 * i },
      opacity: { duration: 0.2, delay: 0.08 * i },
    },
  }),
};

export function PartIllustration({
  slug,
  className,
  animated = false,
  title,
}: {
  slug: string;
  className?: string;
  animated?: boolean;
  /** Accessible name. Leave empty when the illustration only decorates a labelled item. */
  title?: string;
}) {
  const shapes = SHAPES[illustrationKey(slug)];
  const common = {
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      initial={animated ? "hidden" : false}
      whileInView={animated ? "show" : undefined}
      viewport={{ once: true, margin: "-40px" }}
      {...common}
    >
      {shapes.map((s, i) => {
        const props = {
          custom: i,
          variants: animated ? draw : undefined,
          stroke: s.accent ? "var(--brass)" : "currentColor",
          strokeWidth: 2,
        };
        switch (s.t) {
          case "path":
            return <motion.path key={i} {...props} d={s.d} />;
          case "circle":
            return <motion.circle key={i} {...props} cx={s.cx} cy={s.cy} r={s.r} />;
          case "ellipse":
            return <motion.ellipse key={i} {...props} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />;
          case "rect":
            return (
              <motion.rect
                key={i}
                {...props}
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx={s.rx ?? 0}
              />
            );
        }
      })}
    </motion.svg>
  );
}
