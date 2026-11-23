import { useMemo, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

/* Scroll-driven explainers for the How it works page. Each drawing takes `p`, the visitor's
   scroll progress through its section (0 → 1), and `step`, the explanation step on screen, so
   the matching part is highlighted. Colours come from theme tokens and work in dark mode. */

const INK = "var(--ink)";
const SOFT = "color-mix(in oklab, var(--ink) 7%, var(--surface))";
const STEEL = "color-mix(in oklab, var(--ink) 16%, var(--surface))";
const STEEL_DARK = "color-mix(in oklab, var(--ink) 30%, var(--surface))";
const FLUID = "color-mix(in oklab, var(--brass) 24%, var(--surface))";
const ACCENT = "var(--brass)";

type ArtProps = { p: MotionValue<number>; step: number };

/** Pill label with a dotted leader. Turns brand blue while its step is on screen. */
function Tag({ x, y, tx, ty, text, active, anchor = "start" }: { x: number; y: number; tx: number; ty: number; text: string; active: boolean; anchor?: "start" | "end" }) {
  const w = text.length * 6.9 + 18;
  const left = anchor === "start" ? tx : tx - w;
  return (
    <g style={{ transition: "opacity 300ms" }} opacity={active ? 1 : 0.55}>
      <path d={`M${x} ${y} L${tx} ${ty}`} stroke={active ? ACCENT : INK} strokeOpacity={active ? 1 : 0.35} strokeWidth={1.3} strokeDasharray="2 3" />
      <circle cx={x} cy={y} r={3.5} fill={active ? ACCENT : INK} />
      <rect x={left} y={ty - 12} width={w} height={24} rx={12} fill={active ? ACCENT : "var(--surface)"} stroke={active ? ACCENT : "var(--hairline)"} />
      <text x={left + w / 2} y={ty + 4.5} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={active ? "white" : INK}>
        {text}
      </text>
    </g>
  );
}

const frac = (v: number) => v - Math.floor(v);

/* ───────────────────────── Centrifugal pump (front cutaway) ───────────────────────── */

const PC = { x: 220, y: 190 };

function pumpFlow(u: number) {
  // Spiral out from the eye, then up the discharge branch.
  if (u < 0.7) {
    const t = u / 0.7;
    const th = -t * Math.PI * 2;
    const r = 14 + t * 100;
    return { x: PC.x + r * Math.cos(th), y: PC.y + r * Math.sin(th) };
  }
  const t = (u - 0.7) / 0.3;
  return { x: PC.x + 114, y: PC.y - t * 165 };
}

function PumpDrop({ p, k, n }: { p: MotionValue<number>; k: number; n: number }) {
  const u = useTransform(p, (v) => frac(k / n + v * 3));
  const cx = useTransform(u, (v) => pumpFlow(v).x);
  const cy = useTransform(u, (v) => pumpFlow(v).y);
  const r = useTransform(u, (v) => 2.5 + v * 2.5);
  const opacity = useTransform(u, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);
  return <motion.circle cx={cx} cy={cy} r={r} fill={ACCENT} style={{ opacity }} />;
}

export function PumpArt({ p, step }: ArtProps) {
  const rotate = useTransform(p, [0, 1], [0, -1080]);
  const needle = useTransform(p, [0, 0.66, 1], [-120, 20, 35]);

  const volute = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 72; i++) {
      const th = -(i / 72) * Math.PI * 2;
      const r = 96 + (i / 72) * 36;
      pts.push(`${(PC.x + r * Math.cos(th)).toFixed(1)} ${(PC.y + r * Math.sin(th)).toFixed(1)}`);
    }
    return `M${pts.join(" L")} L${PC.x + 132} 40 L${PC.x + 96} 40 Z`;
  }, []);

  const vanes = [0, 60, 120, 180, 240, 300].map((a) => {
    const pt = (r: number, deg: number) => {
      const t = (deg * Math.PI) / 180;
      return `${(r * Math.cos(t)).toFixed(1)} ${(r * Math.sin(t)).toFixed(1)}`;
    };
    return `M${pt(24, a)} Q${pt(58, a + 14)} ${pt(80, a + 52)}`;
  });

  return (
    <svg viewBox="0 0 490 360" className="h-full w-full" role="img" aria-label="Front cutaway of a centrifugal pump: fluid enters the eye of the impeller, is flung outward by the spinning vanes and slows in the widening volute casing, building pressure at the discharge.">
      {/* casing */}
      <path d={volute} fill="none" stroke={INK} strokeWidth={22} strokeLinejoin="round" />
      <path d={volute} fill="none" stroke={SOFT} strokeWidth={18} strokeLinejoin="round" />
      <path d={volute} fill={FLUID} />
      <path d={volute} fill="none" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
      <rect x={PC.x + 84} y={22} width={60} height={14} rx={3} fill={SOFT} stroke={INK} strokeWidth={2} />
      {/* volute highlight */}
      <path d={volute} fill="none" stroke={ACCENT} strokeWidth={3} strokeOpacity={step === 2 ? 0.9 : 0} style={{ transition: "stroke-opacity 300ms" }} />

      {/* fluid */}
      {Array.from({ length: 16 }, (_, k) => (
        <PumpDrop key={k} p={p} k={k} n={16} />
      ))}

      {/* impeller */}
      <motion.g style={{ rotate }}>
        <circle cx={PC.x} cy={PC.y} r={84} fill="transparent" />
        <g transform={`translate(${PC.x} ${PC.y})`}>
          <circle r={82} fill="none" stroke={INK} strokeOpacity={0.25} strokeWidth={1.5} strokeDasharray="3 5" />
          {vanes.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={step === 1 ? ACCENT : INK} strokeWidth={6} strokeLinecap="round" style={{ transition: "stroke 300ms" }} />
          ))}
          <circle r={20} fill={INK} />
          <circle r={7} fill={SOFT} />
          <rect x={-2} y={-11} width={4} height={6} fill={SOFT} />
        </g>
      </motion.g>
      <circle cx={PC.x} cy={PC.y} r={30} fill="none" stroke={ACCENT} strokeWidth={2} strokeDasharray="4 4" strokeOpacity={step === 0 ? 1 : 0.35} style={{ transition: "stroke-opacity 300ms" }} />

      {/* discharge pressure gauge */}
      <path d={`M${PC.x + 132} 80 H${PC.x + 160}`} stroke={INK} strokeWidth={4} />
      <circle cx={PC.x + 182} cy={80} r={22} fill="var(--surface)" stroke={INK} strokeWidth={2.5} />
      <path d={`M${PC.x + 166} 92 A22 22 0 0 1 ${PC.x + 198} 92`} fill="none" stroke={ACCENT} strokeOpacity={0.35} strokeWidth={3} transform={`rotate(180 ${PC.x + 182} 80)`} />
      <g transform={`translate(${PC.x + 182} 80)`}>
        <motion.g style={{ rotate: needle }}>
          <circle r={16} fill="transparent" />
          <path d="M0 0 V-16" stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round" />
        </motion.g>
      </g>
      <circle cx={PC.x + 182} cy={80} r={3} fill={INK} />
      <text x={PC.x + 182} y={118} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--muted-foreground)" letterSpacing="0.06em">
        PRESSURE
      </text>

      <Tag x={PC.x - 18} y={PC.y - 18} tx={20} ty={34} text="Suction eye" active={step === 0} />
      <Tag x={PC.x + 46} y={PC.y + 40} tx={372} ty={250} text="Impeller" active={step === 1} />
      <Tag x={PC.x + 92} y={PC.y + 88} tx={372} ty={300} text="Volute casing" active={step === 2} />
      <Tag x={PC.x + 114} y={30} tx={372} ty={160} text="Discharge" active={step === 2} />
    </svg>
  );
}

/* ───────────────────────── Ball valve (section) ───────────────────────── */

const VC = { x: 240, y: 165 };

function ValveDrop({ p, k, n, open }: { p: MotionValue<number>; k: number; n: number; open: MotionValue<number> }) {
  // Flow only starts once the bore begins to line up with the pipe.
  const x = useTransform(p, (v) => 20 + frac(k / n + Math.max(0, v - 0.38) * 4) * 440);
  const opacity = useTransform([x, open] as MotionValue<number>[], ([xv, o]: number[]) => (xv < VC.x - 60 ? 1 : o));
  const y = VC.y + ((k * 7) % 3 - 1) * 14;
  return <motion.circle cx={x} cy={y} r={3.5} fill={ACCENT} style={{ opacity }} />;
}

export function ValveArt({ p, step }: ArtProps) {
  const open = useTransform(p, [0.3, 0.68], [0, 1]);
  const ballRotate = useTransform(open, [0, 1], [90, 0]);
  const handleW = useTransform(open, [0, 1], [34, 150]);
  const downstream = useTransform(open, [0, 1], [0, 1]);

  return (
    <svg viewBox="0 0 480 320" className="h-full w-full" role="img" aria-label="Section through a ball valve: turning the handle a quarter turn rotates the ball until its bore lines up with the pipe and fluid flows through.">
      {/* pipe walls and fluid */}
      <rect x={20} y={VC.y - 30} width={VC.x - 80} height={60} fill={FLUID} />
      <motion.rect x={VC.x + 60} y={VC.y - 30} width={180} height={60} fill={FLUID} style={{ opacity: downstream }} />
      {[-1, 1].map((s) => (
        <g key={s}>
          <rect x={20} y={s < 0 ? VC.y - 42 : VC.y + 30} width={150} height={12} fill={SOFT} stroke={INK} strokeWidth={2} />
          <rect x={310} y={s < 0 ? VC.y - 42 : VC.y + 30} width={150} height={12} fill={SOFT} stroke={INK} strokeWidth={2} />
        </g>
      ))}

      {/* body */}
      <rect x={150} y={VC.y - 70} width={180} height={140} rx={40} fill={SOFT} stroke={INK} strokeWidth={2.5} />
      <rect x={150} y={VC.y - 56} width={12} height={112} rx={3} fill={STEEL} stroke={INK} strokeWidth={2} />
      <rect x={318} y={VC.y - 56} width={12} height={112} rx={3} fill={STEEL} stroke={INK} strokeWidth={2} />
      <circle cx={VC.x} cy={VC.y} r={62} fill={FLUID} opacity={0.6} />

      {/* seats */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sy) => (
          <rect key={`${sx}${sy}`} x={VC.x + sx * 62 - 5} y={VC.y + sy * 40 - 9} width={10} height={18} rx={2} fill={step === 1 ? ACCENT : STEEL_DARK} style={{ transition: "fill 300ms" }} />
        )),
      )}

      {/* ball */}
      <motion.g style={{ rotate: ballRotate }}>
        <circle cx={VC.x} cy={VC.y} r={56} fill={STEEL} stroke={step === 0 ? ACCENT : INK} strokeWidth={step === 0 ? 3 : 2.5} style={{ transition: "stroke 300ms" }} />
        <rect x={VC.x - 56} y={VC.y - 28} width={112} height={56} fill={FLUID} stroke={INK} strokeWidth={2} />
        <rect x={VC.x - 6} y={VC.y - 56} width={12} height={8} fill={INK} />
      </motion.g>

      {/* flow */}
      {Array.from({ length: 14 }, (_, k) => (
        <ValveDrop key={k} p={p} k={k} n={14} open={open} />
      ))}

      {/* stem, packing and handle */}
      <rect x={VC.x - 8} y={44} width={16} height={VC.y - 56 - 44 + 4} fill={STEEL} stroke={INK} strokeWidth={2} />
      <rect x={VC.x - 16} y={70} width={32} height={14} rx={2} fill={SOFT} stroke={INK} strokeWidth={2} />
      <motion.rect x={VC.x - 17} y={28} height={16} rx={8} width={handleW} fill={step === 1 ? ACCENT : INK} style={{ transition: "fill 300ms" }} />
      <circle cx={VC.x} cy={36} r={5} fill="var(--surface)" />

      <text x={40} y={VC.y + 70} fontSize={11} fontWeight={700} fill="var(--muted-foreground)" letterSpacing="0.06em">
        FLOW →
      </text>

      <Tag x={VC.x - 30} y={VC.y + 40} tx={160} ty={286} text="Ball" active={step === 0} anchor="end" />
      <Tag x={VC.x + 62} y={VC.y + 40} tx={300} ty={286} text="Seats" active={step === 1} />
      <Tag x={VC.x + 8} y={60} tx={420} ty={60} text="Stem" active={step === 1} anchor="end" />
      <Tag x={400} y={VC.y} tx={470} ty={252} text="Full bore" active={step === 2} anchor="end" />
    </svg>
  );
}

/* ───────────────────────── O-ring (section through a groove) ───────────────────────── */

export function ORingArt({ p, step }: ArtProps) {
  // Free cross-section 64 high; the closed joint leaves 52 (about 19% squeeze) and an 8-unit clearance gap.
  const GROOVE = { x0: 200, x1: 298, top: 200, bottom: 244 };
  const FREE_R = 32;
  const FREE_TOP = GROOVE.bottom - FREE_R * 2;

  const faceY = useTransform(p, [0.05, 0.36], [112, 192]); // bottom edge of the mating part
  const pressure = useTransform(p, [0.6, 0.88], [0, 1]);
  const ry = useTransform(faceY, (yb) => (GROOVE.bottom - Math.max(FREE_TOP, yb)) / 2);
  const rx = useTransform(ry, (v) => (FREE_R * FREE_R) / v);
  const cy = useTransform(ry, (v) => GROOVE.bottom - v);
  const cx = useTransform([rx, pressure] as MotionValue<number>[], ([r, q]: number[]) => 246 + q * (GROOVE.x1 - r - 246 - 0.5));
  const blockY = useTransform(faceY, (v) => v - 118);
  const gapH = useTransform(faceY, (v) => Math.max(0, GROOVE.top - v));
  const shineRx = useTransform(rx, (v) => v * 0.55);
  const shineRy = useTransform(ry, (v) => v * 0.4);
  const fluidW = useTransform([cx, rx] as MotionValue<number>[], ([c, r]: number[]) => Math.max(0, c - r - GROOVE.x0 + 2));
  const gland = `M40 200 H${GROOVE.x0} V${GROOVE.bottom} H${GROOVE.x1} V200 H440 V292 H40 Z`;

  return (
    <svg viewBox="0 0 480 320" className="h-full w-full" role="img" aria-label="Section through an O-ring in its groove: the mating face squeezes the ring, then system pressure pushes it against the far wall of the groove, sealing tighter.">
      <defs>
        <pattern id="oring-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={INK} strokeOpacity={0.14} strokeWidth={1.5} />
        </pattern>
      </defs>

      {/* gland with groove */}
      <path d={gland} fill={SOFT} />
      <path d={gland} fill="url(#oring-hatch)" stroke={step === 0 ? ACCENT : INK} strokeWidth={2.5} style={{ transition: "stroke 300ms" }} />

      {/* pressurised fluid fills the clearance gap and the groove behind the ring */}
      <motion.g style={{ opacity: pressure }}>
        <motion.rect x={40} y={faceY} width={GROOVE.x0 - 40} height={gapH} fill={ACCENT} fillOpacity={0.55} />
        <motion.rect x={GROOVE.x0 + 1.5} y={GROOVE.top} width={fluidW} height={GROOVE.bottom - GROOVE.top - 1.5} fill={ACCENT} fillOpacity={0.3} />
      </motion.g>

      {/* mating part */}
      <motion.g style={{ y: blockY }}>
        <rect x={40} y={26} width={400} height={92} fill={SOFT} />
        <rect x={40} y={26} width={400} height={92} fill="url(#oring-hatch)" stroke={step === 1 ? ACCENT : INK} strokeWidth={2.5} style={{ transition: "stroke 300ms" }} />
        <Tag x={400} y={104} tx={430} ty={58} text="Mating face" active={step === 1} anchor="end" />
      </motion.g>

      {/* the O-ring */}
      <motion.ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={INK} fillOpacity={0.88} />
      <motion.ellipse cx={cx} cy={cy} rx={shineRx} ry={shineRy} fill="white" fillOpacity={0.08} />

      {/* pressure arrows, on top so they read over the parts */}
      <motion.g style={{ opacity: pressure }}>
        {[58, 104, 150].map((x) => (
          <path key={x} d={`M${x} 196 h26 m-8 -7 l8 7 l-8 7`} fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <rect x={54} y={150} width={92} height={24} rx={12} fill={ACCENT} />
        <text x={100} y={166.5} textAnchor="middle" fontSize={12} fontWeight={800} fill="white" letterSpacing="0.06em">
          PRESSURE
        </text>
      </motion.g>

      <Tag x={246} y={222} tx={310} ty={306} text="O-ring" active anchor="start" />
      <Tag x={GROOVE.x1 - 4} y={GROOVE.bottom - 4} tx={440} ty={268} text="Groove" active={step === 0} anchor="end" />
    </svg>
  );
}

/* ───────────────────────── Ball bearing (front view) ───────────────────────── */

const BC = { x: 240, y: 170 };
const PITCH = 88;
const BALL = 22;
const N_BALLS = 9;

export function BearingArt({ p, step }: ArtProps) {
  const inner = useTransform(p, [0, 1], [0, 720]);
  const cage = useTransform(inner, (v) => v * 0.375); // cage runs at ~3/8 of shaft speed
  const spin = useTransform(inner, (v) => -(v - v * 0.375) * ((PITCH - BALL) / BALL));

  const ring = (r0: number, r1: number) =>
    `M${BC.x + r1} ${BC.y} A${r1} ${r1} 0 1 0 ${BC.x - r1} ${BC.y} A${r1} ${r1} 0 1 0 ${BC.x + r1} ${BC.y} Z M${BC.x + r0} ${BC.y} A${r0} ${r0} 0 1 1 ${BC.x - r0} ${BC.y} A${r0} ${r0} 0 1 1 ${BC.x + r0} ${BC.y} Z`;

  return (
    <svg viewBox="0 0 480 340" className="h-full w-full" role="img" aria-label="Front view of a deep-groove ball bearing: the inner ring turns with the shaft, the balls roll between the races held apart by the cage, and the outer ring stays still in its housing.">
      <defs>
        <pattern id="bearing-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={INK} strokeOpacity={0.16} strokeWidth={1.5} />
        </pattern>
        <radialGradient id="bearing-ball" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="white" stopOpacity={0.9} />
          <stop offset="0.35" stopColor="color-mix(in oklab, var(--ink) 12%, var(--surface))" />
          <stop offset="1" stopColor="color-mix(in oklab, var(--ink) 45%, var(--surface))" />
        </radialGradient>
      </defs>

      {/* housing (fixed) */}
      <path d={ring(132, 156)} fill={SOFT} fillRule="evenodd" />
      <path d={ring(132, 156)} fill="url(#bearing-hatch)" fillRule="evenodd" stroke={INK} strokeWidth={2} />

      {/* outer ring (fixed) */}
      <path d={ring(110, 132)} fill={STEEL} fillRule="evenodd" stroke={step === 2 ? ACCENT : INK} strokeWidth={step === 2 ? 3 : 2} style={{ transition: "stroke 300ms" }} />

      {/* cage and balls */}
      <motion.g style={{ rotate: cage }}>
        <circle cx={BC.x} cy={BC.y} r={118} fill="transparent" />
        <circle cx={BC.x} cy={BC.y} r={PITCH} fill="none" stroke={ACCENT} strokeOpacity={step === 2 ? 0.9 : 0.4} strokeWidth={5} style={{ transition: "stroke-opacity 300ms" }} />
        {Array.from({ length: N_BALLS }, (_, i) => {
          const a = (i / N_BALLS) * Math.PI * 2;
          const bx = BC.x + PITCH * Math.cos(a);
          const by = BC.y + PITCH * Math.sin(a);
          return (
            <g key={i} transform={`translate(${bx.toFixed(1)} ${by.toFixed(1)})`}>
              <motion.g style={{ rotate: spin }}>
                <circle r={BALL} fill="url(#bearing-ball)" stroke={step === 1 ? ACCENT : INK} strokeWidth={step === 1 ? 2.5 : 1.6} style={{ transition: "stroke 300ms" }} />
                <path d={`M${-BALL + 5} 0 H${BALL - 5}`} stroke={INK} strokeOpacity={0.35} strokeWidth={1.5} />
              </motion.g>
            </g>
          );
        })}
      </motion.g>

      {/* inner ring and shaft (turn together) */}
      <motion.g style={{ rotate: inner }}>
        <path d={ring(46, 66)} fill={STEEL} fillRule="evenodd" stroke={step === 0 ? ACCENT : INK} strokeWidth={step === 0 ? 3 : 2} style={{ transition: "stroke 300ms" }} />
        <circle cx={BC.x} cy={BC.y} r={46} fill={STEEL_DARK} stroke={INK} strokeWidth={2} />
        <rect x={BC.x - 6} y={BC.y - 46} width={12} height={10} fill={SOFT} stroke={INK} strokeWidth={1.5} />
        <rect x={BC.x + 50} y={BC.y - 3} width={14} height={6} rx={3} fill={ACCENT} />
        <circle cx={BC.x} cy={BC.y} r={6} fill={INK} />
      </motion.g>

      <Tag x={BC.x + 36} y={BC.y + 36} tx={20} ty={316} text="Inner ring + shaft" active={step === 0} />
      <Tag x={BC.x + PITCH * Math.cos(0.7)} y={BC.y + PITCH * Math.sin(0.7)} tx={470} ty={316} text="Balls in a cage" active={step === 1} anchor="end" />
      <Tag x={BC.x + 116} y={BC.y - 70} tx={470} ty={24} text="Outer ring (fixed)" active={step === 2} anchor="end" />
    </svg>
  );
}

/* ───────────────────────── Topic content (shared by the page and the category panels) ───────────────────────── */

export type Step = { t: string; d: string };
export type Topic = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: Step[];
  shop: { label: string; slug: string };
  Art: (props: ArtProps) => ReactNode;
};

export const PUMP: Topic = {
  id: "pump",
  eyebrow: "Centrifugal pump",
  title: "Speed in, pressure out.",
  intro: "The most common pump in a process plant has one moving part that does the work: the impeller.",
  steps: [
    { t: "Fluid enters the eye", d: "Liquid comes in through the suction pipe to the centre of the impeller, called the eye." },
    { t: "The impeller flings it outward", d: "Curved vanes spin with the motor shaft and throw the liquid outward, giving it speed." },
    { t: "The volute turns speed into pressure", d: "The casing widens as it wraps round, slowing the liquid so its speed becomes pressure at the discharge." },
  ],
  shop: { label: "Pumps", slug: "pumps" },
  Art: PumpArt,
};

export const TOPICS_AFTER_SEAL: Topic[] = [
  {
    id: "valve",
    eyebrow: "Ball valve",
    title: "A quarter turn from shut to open.",
    intro: "A ball with a hole through it, sitting between two seats. Turn it and the hole lines up with the pipe.",
    steps: [
      { t: "Closed: the ball blocks the line", d: "The bore sits across the pipe, so the solid side of the ball faces the flow. The seats hold the pressure." },
      { t: "A quarter turn", d: "Turning the handle 90° turns the stem and the ball with it. The soft seats keep it sealed as it moves." },
      { t: "Open: full bore", d: "With the bore lined up, flow passes straight through with almost no restriction." },
    ],
    shop: { label: "Valves", slug: "valves" },
    Art: ValveArt,
  },
  {
    id: "o-ring",
    eyebrow: "O-ring",
    title: "The simplest seal there is.",
    intro: "A ring of rubber in a groove. It seals because it is squeezed, and seals harder when pressure rises.",
    steps: [
      { t: "It sits in a groove", d: "The ring rests in a machined groove, a little taller than the groove is deep." },
      { t: "Squeezed into place", d: "Closing the joint squashes it, typically by 15 to 30% of its thickness, so it presses on both surfaces." },
      { t: "Pressure makes it tighter", d: "System pressure pushes the ring against the far wall of the groove, so the seal tightens as pressure rises." },
    ],
    shop: { label: "Elastomers & O-rings", slug: "elastomers" },
    Art: ORingArt,
  },
  {
    id: "bearing",
    eyebrow: "Ball bearing",
    title: "Rolling, not rubbing.",
    intro: "Bearings carry a spinning shaft with very little friction by letting hardened balls roll between two rings.",
    steps: [
      { t: "The inner ring turns with the shaft", d: "The inner ring is a tight fit on the shaft, so the two turn together." },
      { t: "Balls roll between the races", d: "Hardened steel balls roll, not slide, so friction stays low. The cage keeps them evenly spaced." },
      { t: "The outer ring stays put", d: "The outer ring sits still in the housing and carries the load into the machine frame." },
    ],
    shop: { label: "Bearings", slug: "bearings" },
    Art: BearingArt,
  },
];


/** Explainer shown on a product category page, keyed by category slug. */
export const TOPIC_FOR_CATEGORY: Record<string, Topic> = {
  pumps: PUMP,
  valves: TOPICS_AFTER_SEAL[0],
  elastomers: TOPICS_AFTER_SEAL[1],
  bearings: TOPICS_AFTER_SEAL[2],
};
