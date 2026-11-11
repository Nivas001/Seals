import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/lib/motion";

/* Signature moment for the home page: an exploded single-spring mechanical seal
   that slides together onto the shaft as the visitor scrolls. The two lapped faces,
   where the sealing actually happens, carry the brand accent; everything else is ink line art.
   With reduced motion the drawing stays exploded and fully labelled. */

const CY = 170;

type Part = {
  n: number;
  name: string;
  note: string;
  cx: number; // assembled x of the front face
  dx: number; // offset when exploded
  rx: number;
  ry: number;
  t: number; // thickness
  accent?: boolean;
  labelBelow?: boolean;
};

const PARTS: Part[] = [
  {
    n: 1,
    name: "Gland plate",
    note: "Bolts to the pump casing and holds the seat.",
    cx: 200,
    dx: -110,
    rx: 26,
    ry: 116,
    t: 22,
  },
  {
    n: 2,
    name: "Stationary seat",
    note: "The fixed sealing face, usually carbide or ceramic.",
    cx: 232,
    dx: -20,
    rx: 17,
    ry: 72,
    t: 14,
    accent: true,
    labelBelow: true,
  },
  {
    n: 3,
    name: "Rotary face",
    note: "Lapped flat and turns with the shaft against the seat.",
    cx: 252,
    dx: 80,
    rx: 17,
    ry: 70,
    t: 12,
    accent: true,
  },
  {
    n: 4,
    name: "Spring",
    note: "Keeps the two faces pressed together as they wear.",
    cx: 268,
    dx: 182,
    rx: 0,
    ry: 52,
    t: 72,
    labelBelow: true,
  },
  {
    n: 5,
    name: "Drive collar",
    note: "Locks the rotating parts to the shaft.",
    cx: 344,
    dx: 300,
    rx: 15,
    ry: 60,
    t: 26,
  },
];

function Ring({ p }: { p: Part }) {
  const stroke = p.accent ? "var(--brass)" : "var(--ink)";
  const face = p.accent
    ? "color-mix(in oklab, var(--brass) 14%, var(--surface))"
    : "var(--surface)";
  const side = p.accent
    ? "color-mix(in oklab, var(--brass) 26%, var(--surface))"
    : "color-mix(in oklab, var(--ink) 7%, var(--surface))";
  const top = CY - p.ry;
  const bottom = CY + p.ry;
  return (
    <g strokeWidth={1.8} stroke={stroke} strokeLinejoin="round">
      <ellipse cx={p.cx + p.t} cy={CY} rx={p.rx} ry={p.ry} fill={side} />
      <rect x={p.cx} y={top} width={p.t} height={p.ry * 2} fill={side} stroke="none" />
      <line x1={p.cx} y1={top} x2={p.cx + p.t} y2={top} />
      <line x1={p.cx} y1={bottom} x2={p.cx + p.t} y2={bottom} />
      <ellipse cx={p.cx} cy={CY} rx={p.rx} ry={p.ry} fill={face} />
      {/* bore, showing the shaft running through */}
      <ellipse
        cx={p.cx}
        cy={CY}
        rx={p.rx * 0.28}
        ry={19}
        fill="color-mix(in oklab, var(--ink) 12%, var(--surface))"
      />
      {p.n === 1 && (
        <>
          <ellipse cx={p.cx} cy={CY - 88} rx={4} ry={9} fill="var(--background)" />
          <ellipse cx={p.cx} cy={CY + 88} rx={4} ry={9} fill="var(--background)" />
        </>
      )}
      {p.n === 5 && (
        <rect x={p.cx + 8} y={top - 8} width={9} height={10} rx={1.5} fill="var(--surface)" />
      )}
    </g>
  );
}

function Spring({ p }: { p: Part }) {
  const coils = 6;
  const step = p.t / coils;
  let d = `M${p.cx} ${CY - p.ry}`;
  for (let i = 0; i < coils; i++) {
    const x = p.cx + i * step;
    d += ` L${x + step / 2} ${CY + p.ry} L${x + step} ${CY - p.ry}`;
  }
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--ink)"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Label({ p, opacity }: { p: Part; opacity: MotionValue<number> }) {
  const x = p.cx + p.t / 2;
  const edge = p.labelBelow ? CY + p.ry + 6 : CY - p.ry - 6;
  const ty = p.labelBelow ? CY + p.ry + 40 : CY - p.ry - 30;
  return (
    <motion.g style={{ opacity }} className="max-sm:hidden">
      <line
        x1={x}
        y1={edge}
        x2={x}
        y2={p.labelBelow ? ty - 16 : ty + 8}
        stroke="var(--hairline)"
        strokeWidth={1.5}
      />
      <text x={x} y={ty} textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--ink)">
        <tspan fill="var(--brass)">{String(p.n).padStart(2, "0")} </tspan>
        {p.name}
      </text>
    </motion.g>
  );
}

function PartGroup({
  p,
  progress,
  labelOpacity,
}: {
  p: Part;
  progress: MotionValue<number>;
  labelOpacity: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], [p.dx, 0]);
  return (
    <motion.g style={{ x }}>
      {p.n === 4 ? <Spring p={p} /> : <Ring p={p} />}
      <Label p={p} opacity={labelOpacity} />
    </motion.g>
  );
}

export function SealAssembly() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });
  const still = useMotionValue(0);
  const progress = reduce ? still : smooth;

  const labelOpacity = useTransform(progress, [0.05, 0.45], [1, 0]);
  const doneOpacity = useTransform(progress, [0.82, 1], [0, 1]);
  const glow = useTransform(progress, [0.75, 1], [0, 0.55]);

  // Parts render back to front: collar first so the gland sits on top.
  const order = [...PARTS].reverse();

  return (
    <section id="anatomy" className="scroll-mt-28 mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface px-5 pb-8 pt-10 sm:px-12 sm:pb-12 sm:pt-14">
        <div className="grid-background pointer-events-none opacity-60" />
        <Reveal className="relative max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
            Inside a mechanical seal
          </span>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Five parts.
            <br />
            One leak-tight seal.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Scroll to put a single-spring seal together. We supply complete seals and the spares
            inside them, so a worn face or tired spring is a part number away, not a new seal.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-6 sm:mt-2">
          <svg
            viewBox="0 0 800 340"
            className="h-auto w-full"
            role="img"
            aria-labelledby="seal-anatomy-title"
          >
            <title id="seal-anatomy-title">
              Exploded single-spring mechanical seal: gland plate, stationary seat, rotary face,
              spring and drive collar on a pump shaft
            </title>
            {/* pump casing wall */}
            <path
              d={`M40 ${CY - 130} V${CY - 26} M40 ${CY + 26} V${CY + 130}`}
              stroke="var(--ink)"
              strokeOpacity={0.35}
              strokeWidth={1.8}
              strokeDasharray="5 6"
            />
            {/* shaft */}
            <rect
              x={28}
              y={CY - 17}
              width={752}
              height={34}
              rx={4}
              fill="color-mix(in oklab, var(--ink) 6%, var(--surface))"
              stroke="var(--ink)"
              strokeOpacity={0.55}
              strokeWidth={1.8}
            />
            <line
              x1={34}
              y1={CY - 9}
              x2={774}
              y2={CY - 9}
              stroke="white"
              strokeOpacity={0.9}
              strokeWidth={2}
            />
            <ellipse
              cx={780}
              cy={CY}
              rx={5}
              ry={17}
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity={0.55}
              strokeWidth={1.8}
            />

            {/* glow where the faces meet once assembled */}
            <motion.ellipse
              cx={250}
              cy={CY}
              rx={22}
              ry={86}
              fill="var(--brass)"
              style={{ opacity: glow, filter: "blur(14px)" }}
            />

            {order.map((p) => (
              <PartGroup key={p.n} p={p} progress={progress} labelOpacity={labelOpacity} />
            ))}

            <motion.g style={{ opacity: doneOpacity }}>
              <text x={405} y={CY - 6} fontSize={22} fontWeight={800} fill="var(--ink)">
                Faces closed.
              </text>
              <text
                x={405}
                y={CY + 22}
                fontSize={15}
                fontWeight={500}
                fill="var(--muted-foreground)"
              >
                The seal runs on a fluid film about a micron thick.
              </text>
            </motion.g>
          </svg>
        </div>

        <ol className="relative mt-6 grid gap-x-6 gap-y-4 border-t border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {PARTS.map((p) => (
            <li key={p.n} className="text-sm">
              <div className="font-bold text-ink">
                <span className="mr-1.5 tabular-nums text-brass">
                  {String(p.n).padStart(2, "0")}
                </span>
                {p.name}
              </div>
              <p className="mt-1 leading-snug text-muted-foreground">{p.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
