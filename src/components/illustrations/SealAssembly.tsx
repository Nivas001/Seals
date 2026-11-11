import { useId, useRef, useState } from "react";
import {
  easeInOut,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/lib/motion";

/* Signature moment for the home page: an exploded single-spring mechanical seal that
   slides into its seal chamber as the visitor scrolls, in the order a fitter builds it.

   The layout follows a real inside-mounted pusher seal: the motor (atmosphere) side is on
   the left, the pump's seal chamber on the right. The gland bolts to the chamber face on
   studs, the silicon carbide seat sits in the gland on an O-ring, and the carbon rotary face,
   spring and drive collar ride on the shaft inside the chamber. The two lapped faces, where
   the sealing actually happens, carry the brand accent.

   The view is a 3/4 view from the motor side, so for every ring the right half of its
   outline is the half nearest the viewer. With reduced motion the drawing stays exploded
   and fully labelled. */

const CY = 190;
const SHAFT_R = 18;

// Seal chamber (cutaway, hatched like a section drawing)
const CH_X0 = 454; // chamber face, where the gland's back sits
const CH_X1 = 640; // inside end of the chamber
const CH_IN = 84; // chamber bore radius
const CH_OUT = 116; // outside of the housing
const THROAT = 26; // throat bushing clearance around the shaft
const STUD_R = 100; // gland stud radius

type Mat = "steel" | "sic" | "carbon";

type Part = {
  n: number;
  name: string;
  sub: string;
  note: string;
  cx: number; // assembled x of the face nearest the motor side
  dx: number; // offset when exploded
  rx: number;
  ry: number;
  t: number; // thickness along the shaft
  bore: number; // bore radius
  mat: Mat;
  labelBelow?: boolean;
  window: [number, number]; // part of the scroll in which it slides home
};

const PARTS: Part[] = [
  {
    n: 1,
    name: "Gland plate",
    sub: "Stainless steel",
    note: "Bolts to the seal chamber on studs with a gasket behind it. Holds the seat and carries the flush port.",
    cx: 430,
    dx: -390,
    rx: 24,
    ry: 118,
    t: 24,
    bore: 30,
    mat: "steel",
    window: [0.34, 1],
  },
  {
    n: 2,
    name: "Stationary seat",
    sub: "Silicon carbide",
    note: "The fixed sealing face. Sits in the gland on an O-ring and is pinned so it can't turn.",
    cx: 452,
    dx: -302,
    rx: 16,
    ry: 70,
    t: 16,
    bore: 24,
    mat: "sic",
    labelBelow: true,
    window: [0.26, 0.94],
  },
  {
    n: 3,
    name: "Rotary face",
    sub: "Carbon graphite",
    note: "Lapped flat to under a micron. Turns with the shaft against the seat, sealed to it by an O-ring.",
    cx: 470,
    dx: -230,
    rx: 15,
    ry: 64,
    t: 14,
    bore: 21,
    mat: "carbon",
    window: [0.16, 0.84],
  },
  {
    n: 4,
    name: "Spring",
    sub: "Stainless steel",
    note: "Loads the rotary face onto the seat and takes up wear, so the faces stay closed as the carbon wears.",
    cx: 486,
    dx: -156,
    rx: 12,
    ry: 48,
    t: 76,
    bore: 0,
    mat: "steel",
    labelBelow: true,
    window: [0.08, 0.74],
  },
  {
    n: 5,
    name: "Drive collar",
    sub: "Set screws grip shaft",
    note: "Set screws lock it to the shaft. It holds the spring and turns the rotating parts with the shaft.",
    cx: 564,
    dx: -74,
    rx: 14,
    ry: 56,
    t: 30,
    bore: SHAFT_R,
    mat: "steel",
    window: [0, 0.62],
  },
];

const MAT: Record<Mat, { line: string; face: [string, string]; side: [string, string, string] }> = {
  steel: {
    line: "var(--seal-line)",
    face: ["#ffffff", "#e2e7ed"],
    side: ["#f4f6f9", "#d9dfe6", "#b3bcc8"],
  },
  sic: {
    line: "var(--brass)",
    face: ["#f6f9ff", "#d9e5f8"],
    side: ["#e8f0fd", "#cad9f2", "#a9bfe4"],
  },
  carbon: {
    line: "var(--seal-carbon-line)",
    face: ["#535a65", "#2c3037"],
    side: ["#5d646f", "#3a3f47", "#1f2227"],
  },
};

const DARK = "#14171c";

/** Right (near) half of a ring outline at x, as an open path from top to bottom. */
function nearHalf(x: number, rx: number, ry: number) {
  return `M${x} ${CY - ry} A${rx} ${ry} 0 0 1 ${x} ${CY + ry}`;
}

/** A point on a cylinder's outside at angle a (degrees, 90 = top), s along the shaft. */
function onRim(s: number, rx: number, ry: number, a: number) {
  const r = (a * Math.PI) / 180;
  return { x: s + rx * Math.cos(r), y: CY - ry * Math.sin(r) };
}

function Ring({ p, uid }: { p: Part; uid: string }) {
  const m = MAT[p.mat];
  const top = CY - p.ry;
  const bot = CY + p.ry;
  const back = p.cx + p.t;
  const bx = (p.rx * p.bore) / p.ry; // bore ellipse keeps the part's perspective
  const clip = `${uid}-bore-${p.n}`;
  const k = p.ry / p.rx;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <clipPath id={clip}>
          <ellipse cx={p.cx} cy={CY} rx={bx} ry={p.bore} />
        </clipPath>
      </defs>

      {/* outside of the ring */}
      <path
        d={`M${p.cx} ${top} H${back} A${p.rx} ${p.ry} 0 0 1 ${back} ${bot} H${p.cx} Z`}
        fill={`url(#${uid}-${p.mat}-side)`}
        stroke={m.line}
        strokeWidth={1.8}
      />
      {/* specular streak along the top of the rim */}
      <path
        d={`M${p.cx + 2} ${top + p.ry * 0.12} H${back + p.rx * 0.45}`}
        stroke="#fff"
        strokeOpacity={p.mat === "carbon" ? 0.22 : 0.85}
        strokeWidth={2}
      />

      {p.n === 1 && (
        <>
          {/* gasket on the back face, against the chamber */}
          <path
            d={nearHalf(back - 3, p.rx, p.ry - 1)}
            fill="none"
            stroke={DARK}
            strokeWidth={3.2}
          />
          {/* tapped flush port on the rim */}
          {(() => {
            const f = onRim(p.cx + p.t / 2, p.rx, p.ry, 66);
            return (
              <g>
                <ellipse
                  cx={f.x}
                  cy={f.y}
                  rx={4.6}
                  ry={3.4}
                  fill="#c3cad3"
                  stroke={m.line}
                  strokeWidth={1.2}
                />
                <ellipse cx={f.x} cy={f.y} rx={2.4} ry={1.8} fill={DARK} />
              </g>
            );
          })()}
        </>
      )}

      {p.n === 2 && (
        <>
          {/* O-ring round the outside, the seat's secondary seal */}
          <path
            d={nearHalf(p.cx + p.t / 2, p.rx, p.ry + 1.5)}
            fill="none"
            stroke={DARK}
            strokeWidth={5}
          />
          <path
            d={nearHalf(p.cx + p.t / 2 - 1, p.rx, p.ry + 0.5)}
            fill="none"
            stroke="#fff"
            strokeOpacity={0.35}
            strokeWidth={1}
          />
          {/* lapped sealing face (faces the rotary) */}
          <path
            d={nearHalf(back, p.rx, p.ry)}
            fill="none"
            stroke="var(--brass)"
            strokeWidth={2.8}
          />
        </>
      )}

      {p.n === 5 &&
        [52, -38].map((a) => {
          const s = onRim(p.cx + p.t / 2, p.rx, p.ry, a);
          return (
            <g key={a}>
              <ellipse cx={s.x} cy={s.y} rx={3.6} ry={4.4} fill={DARK} />
              <path
                d={`M${s.x - 1.6} ${s.y} l0.8 -1.5 h1.6 l0.8 1.5 l-0.8 1.5 h-1.6 Z`}
                fill="#6b7480"
              />
            </g>
          );
        })}

      {/* the face we look at */}
      <ellipse
        cx={p.cx}
        cy={CY}
        rx={p.rx}
        ry={p.ry}
        fill={`url(#${uid}-${p.mat}-face)`}
        stroke={m.line}
        strokeWidth={1.8}
      />
      {/* edge chamfer */}
      <ellipse
        cx={p.cx}
        cy={CY}
        rx={p.rx * 0.9}
        ry={p.ry * 0.9}
        fill="none"
        stroke={p.mat === "carbon" ? "#fff" : m.line}
        strokeOpacity={p.mat === "carbon" ? 0.14 : 0.22}
        strokeWidth={1}
      />

      {p.n === 1 && (
        <>
          {/* open bolt slots that drop over the chamber studs */}
          {[-1, 1].map((d) => (
            <path
              key={d}
              d={
                d < 0
                  ? `M${p.cx - 3.4} ${top + 0.5} V${CY - STUD_R + 4} A3.4 3.4 0 0 0 ${p.cx + 3.4} ${CY - STUD_R + 4} V${top + 0.5}`
                  : `M${p.cx - 3.4} ${bot - 0.5} V${CY + STUD_R - 4} A3.4 3.4 0 0 1 ${p.cx + 3.4} ${CY + STUD_R - 4} V${bot - 0.5}`
              }
              fill="#8d96a2"
              stroke={m.line}
              strokeWidth={1.2}
            />
          ))}
          {/* register step that locates the gland in the chamber bore */}
          <ellipse
            cx={p.cx}
            cy={CY}
            rx={(p.rx * 46) / p.ry}
            ry={46}
            fill="none"
            stroke={m.line}
            strokeOpacity={0.35}
            strokeWidth={1.1}
          />
        </>
      )}

      {p.n === 2 && (
        /* slot for the anti-rotation pin */
        <ellipse cx={p.cx} cy={bot - 9} rx={1.9} ry={4.2} fill={DARK} />
      )}

      {p.n === 3 && (
        <>
          {/* raised carbon nose: the narrow band that actually runs on the seat */}
          <ellipse
            cx={p.cx - 2}
            cy={CY}
            rx={56 / k}
            ry={56}
            fill={`url(#${uid}-nose)`}
            stroke="var(--brass)"
            strokeWidth={1.8}
          />
          <ellipse cx={p.cx - 2} cy={CY} rx={41 / k} ry={41} fill={`url(#${uid}-carbon-face)`} />
          <ellipse
            cx={p.cx - 2}
            cy={CY}
            rx={41 / k}
            ry={41}
            fill="none"
            stroke="var(--brass)"
            strokeOpacity={0.6}
            strokeWidth={1}
          />
        </>
      )}

      {p.n === 5 && (
        /* seat for the end of the spring */
        <ellipse
          cx={p.cx}
          cy={CY}
          rx={(p.rx * 47) / p.ry}
          ry={47}
          fill="none"
          stroke={m.line}
          strokeOpacity={0.4}
          strokeWidth={1.3}
        />
      )}

      {/* bore, with the shaft showing through */}
      {p.bore > SHAFT_R && <ellipse cx={p.cx} cy={CY} rx={bx} ry={p.bore} fill="#59616c" />}
      <g clipPath={`url(#${clip})`}>
        <rect
          x={p.cx - bx}
          y={CY - SHAFT_R}
          width={bx * 2}
          height={SHAFT_R * 2}
          fill={`url(#${uid}-shaft)`}
        />
      </g>
      {p.n === 3 && (
        /* O-ring in the bore: the rotary's secondary seal against the shaft */
        <>
          <ellipse
            cx={p.cx}
            cy={CY}
            rx={bx}
            ry={p.bore}
            fill="none"
            stroke={DARK}
            strokeWidth={4.5}
          />
          <ellipse
            cx={p.cx}
            cy={CY}
            rx={bx + 1.6}
            ry={p.bore + 1.6}
            fill="none"
            stroke="#fff"
            strokeOpacity={0.25}
            strokeWidth={1}
          />
        </>
      )}
      <ellipse
        cx={p.cx}
        cy={CY}
        rx={bx}
        ry={p.bore}
        fill="none"
        stroke={m.line}
        strokeOpacity={0.7}
        strokeWidth={1.2}
      />
    </g>
  );
}

/* A helical spring round the shaft, drawn as half-turns. The near halves (bowing right)
   pass in front of the shaft, the far halves (bowing left) behind it, so the two halves are
   rendered on either side of the shaft. */
function springPaths(p: Part) {
  const coils = 6;
  const pitch = p.t / coils;
  const top = CY - p.ry;
  const bot = CY + p.ry;
  const c = p.rx * 1.333;
  const near: string[] = [];
  const far: string[] = [];
  for (let i = 0; i < coils; i++) {
    const x = p.cx + i * pitch;
    const h = x + pitch / 2;
    near.push(`M${x} ${top} C${x + c} ${top} ${h + c} ${bot} ${h} ${bot}`);
    far.push(`M${h} ${bot} C${h - c} ${bot} ${x + pitch - c} ${top} ${x + pitch} ${top}`);
  }
  // closed, ground end coils that sit flat on the rotary and the collar
  const e0 = p.cx;
  const e1 = p.cx + p.t;
  near.unshift(nearHalf(e0, p.rx, p.ry));
  near.push(nearHalf(e1, p.rx, p.ry));
  far.unshift(`M${e0} ${bot} A${p.rx} ${p.ry} 0 0 1 ${e0} ${top}`);
  far.push(`M${e1} ${bot} A${p.rx} ${p.ry} 0 0 1 ${e1} ${top}`);
  return { near: near.join(" "), far: far.join(" ") };
}

function SpringHalf({ p, half }: { p: Part; half: "near" | "far" }) {
  const d = springPaths(p)[half];
  const isNear = half === "near";
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d={d}
        stroke="var(--seal-line)"
        strokeOpacity={isNear ? 1 : 0.55}
        strokeWidth={isNear ? 4.6 : 3.8}
      />
      <path d={d} stroke={isNear ? "#e9edf2" : "#b7c0cb"} strokeWidth={isNear ? 2.2 : 1.6} />
      {isNear && (
        <path
          d={d}
          stroke="#fff"
          strokeOpacity={0.9}
          strokeWidth={0.8}
          transform="translate(-0.6 -0.6)"
        />
      )}
    </g>
  );
}

function Label({ p, opacity }: { p: Part; opacity: MotionValue<number> }) {
  const x = p.cx + p.t / 2 + (p.n === 4 ? 0 : p.rx * 0.4);
  const below = !!p.labelBelow;
  const ty = below ? 318 : 34; // badge centre
  const edge = below ? CY + p.ry + 6 : CY - p.ry - 6;
  return (
    <motion.g style={{ opacity }} className="max-sm:hidden">
      <line
        x1={x}
        y1={edge}
        x2={x}
        y2={below ? ty - 13 : ty + 13}
        stroke="var(--muted-foreground)"
        strokeOpacity={0.55}
        strokeWidth={1.2}
        strokeDasharray="2 3"
      />
      <circle cx={x} cy={ty} r={11} fill="var(--brass)" />
      <text x={x} y={ty + 4.5} textAnchor="middle" fontSize={12.5} fontWeight={800} fill="#fff">
        {p.n}
      </text>
      <text x={x + 18} y={ty + 1} fontSize={15} fontWeight={700} fill="var(--ink)">
        {p.name}
      </text>
      <text x={x + 18} y={ty + 18} fontSize={12} fontWeight={500} fill="var(--muted-foreground)">
        {p.sub}
      </text>
    </motion.g>
  );
}

/* Phones: the drawing is too small for names, so each part carries a large number badge
   that matches the list underneath. */
function Badge({ p, opacity }: { p: Part; opacity: MotionValue<number> }) {
  const x = p.cx + p.t / 2;
  const y = CY - p.ry - 30;
  return (
    <motion.g style={{ opacity }} className="sm:hidden">
      <circle cx={x} cy={y} r={22} fill="var(--brass)" />
      <text x={x} y={y + 8.5} textAnchor="middle" fontSize={25} fontWeight={800} fill="#fff">
        {p.n}
      </text>
    </motion.g>
  );
}

function useSlide(p: Part, progress: MotionValue<number>) {
  return useTransform(progress, p.window, [p.dx, 0], { ease: easeInOut });
}

export function SealAssembly() {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 40%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });
  const still = useMotionValue(0);
  const progress = reduce ? still : smooth;
  const [active, setActive] = useState<number | null>(null);

  const labelOpacity = useTransform(progress, [0.04, 0.3], [1, 0]);
  const badgeOpacity = useTransform(progress, [0.35, 0.55], [1, 0]);
  const doneOpacity = useTransform(progress, [0.86, 1], [0, 1]);
  const fluidOpacity = useTransform(progress, [0.7, 1], [0, 1]);
  const glow = useTransform(progress, [0.8, 1], [0, 0.6]);
  const glandOpacity = useTransform(progress, [0.88, 1], [1, 0.5]);

  const [gland, seat, rotary, spring, collar] = PARTS;
  const x = {
    1: useSlide(gland, progress),
    2: useSlide(seat, progress),
    3: useSlide(rotary, progress),
    4: useSlide(spring, progress),
    5: useSlide(collar, progress),
  } as Record<number, MotionValue<number>>;

  const dim = (n: number) => ({
    opacity: active && active !== n ? 0.22 : 1,
    transition: "opacity 200ms",
  });

  const wall = (s: 1 | -1) => {
    const y = (r: number) => CY - s * r;
    return `M${CH_X0} ${y(CH_OUT)} H${CH_X1 + 24} V${y(THROAT)} H${CH_X1} V${y(CH_IN)} H${CH_X0} Z`;
  };

  const stop = (c: string, o: number) => <stop offset={o} stopColor={c} />;

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
            Scroll to fit a single-spring seal into its chamber, in the order a fitter would. We
            supply complete seals and the spares inside them, so a worn face, a tired spring or a
            perished O-ring is a part number away, not a new seal.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-6 sm:mt-4">
          <svg
            viewBox="0 0 800 380"
            className="h-auto w-full select-none [--seal-carbon-line:#161a20] [--seal-line:oklch(0.24_0.02_260)] dark:[--seal-carbon-line:#7d8592] dark:[--seal-line:oklch(0.1_0.02_260)]"
            role="img"
            aria-labelledby={`${uid}-title`}
          >
            <title id={`${uid}-title`}>
              Exploded single-spring mechanical seal sliding onto a pump shaft and into its seal
              chamber: gland plate, silicon carbide stationary seat, carbon rotary face, spring and
              drive collar
            </title>
            <defs>
              {(Object.keys(MAT) as Mat[]).map((k) => (
                <g key={k}>
                  <radialGradient id={`${uid}-${k}-face`} cx="35%" cy="30%" r="80%">
                    {stop(MAT[k].face[0], 0)}
                    {stop(MAT[k].face[1], 1)}
                  </radialGradient>
                  <linearGradient id={`${uid}-${k}-side`} x1="0" y1="0" x2="0" y2="1">
                    {stop(MAT[k].side[0], 0)}
                    {stop(MAT[k].side[1], 0.5)}
                    {stop(MAT[k].side[2], 1)}
                  </linearGradient>
                </g>
              ))}
              <linearGradient id={`${uid}-nose`} x1="0" y1="0" x2="0" y2="1">
                {stop("#dfe3e9", 0)}
                {stop("#a9b1bc", 0.55)}
                {stop("#7d8692", 1)}
              </linearGradient>
              <linearGradient id={`${uid}-shaft`} x1="0" y1="0" x2="0" y2="1">
                {stop("#cfd6df", 0)}
                {stop("#f8fafc", 0.28)}
                {stop("#e1e6ec", 0.6)}
                {stop("#a3adba", 1)}
              </linearGradient>
              <pattern
                id={`${uid}-hatch`}
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="7"
                  stroke="var(--ink)"
                  strokeOpacity="0.2"
                  strokeWidth="1.2"
                />
              </pattern>
              <linearGradient id={`${uid}-fluid`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--brass)" stopOpacity="0.07" />
                <stop offset="1" stopColor="var(--brass)" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* process fluid fills the chamber once the seal is closed */}
            <motion.path
              d={`M${CH_X0} ${CY - CH_IN} H${CH_X1} V${CY - THROAT} H${CH_X1 + 24} V${CY + THROAT} H${CH_X1} V${CY + CH_IN} H${CH_X0} Z`}
              fill={`url(#${uid}-fluid)`}
              style={{ opacity: fluidOpacity }}
            />

            {/* seal chamber, cut away */}
            {([1, -1] as const).map((s) => (
              <g key={s}>
                <path d={wall(s)} fill="color-mix(in oklab, var(--ink) 5%, var(--surface))" />
                <path
                  d={wall(s)}
                  fill={`url(#${uid}-hatch)`}
                  stroke="var(--ink)"
                  strokeOpacity={0.5}
                  strokeWidth={1.6}
                  strokeLinejoin="round"
                />
              </g>
            ))}

            {/* gland studs, screwed into the chamber face */}
            {[-1, 1].map((s) => {
              const y = CY + s * STUD_R;
              return (
                <g key={s}>
                  <rect
                    x={410}
                    y={y - 3.5}
                    width={CH_X0 - 410}
                    height={7}
                    rx={1.5}
                    fill={`url(#${uid}-shaft)`}
                    stroke="var(--seal-line)"
                    strokeOpacity={0.7}
                    strokeWidth={1.1}
                  />
                  {Array.from({ length: 9 }, (_, i) => (
                    <line
                      key={i}
                      x1={413 + i * 4}
                      y1={y - 3.5}
                      x2={411 + i * 4}
                      y2={y + 3.5}
                      stroke="var(--seal-line)"
                      strokeOpacity={0.3}
                      strokeWidth={0.8}
                    />
                  ))}
                </g>
              );
            })}

            {/* far half of the spring, behind the shaft */}
            <motion.g style={{ x: x[4], ...dim(4) }}>
              <SpringHalf p={spring} half="far" />
            </motion.g>

            {/* shaft, running from the motor coupling (broken off, left) through the throat */}
            <path
              d={`M18 ${CY - SHAFT_R} H784 V${CY + SHAFT_R} H18 C24 ${CY + 8} 12 ${CY - 8} 18 ${CY - SHAFT_R} Z`}
              fill={`url(#${uid}-shaft)`}
              stroke="var(--seal-line)"
              strokeOpacity={0.6}
              strokeWidth={1.6}
              strokeLinejoin="round"
            />
            <ellipse
              cx={784}
              cy={CY}
              rx={5}
              ry={SHAFT_R}
              fill="#e4e8ee"
              stroke="var(--seal-line)"
              strokeOpacity={0.6}
              strokeWidth={1.6}
            />
            {/* centreline */}
            <line
              x1={6}
              y1={CY}
              x2={796}
              y2={CY}
              stroke="var(--brass)"
              strokeOpacity={0.45}
              strokeWidth={1}
              strokeDasharray="14 4 2 4"
            />

            {/* glow where the faces meet once assembled */}
            <motion.ellipse
              cx={470}
              cy={CY}
              rx={16}
              ry={78}
              fill="var(--brass)"
              style={{ opacity: glow, filter: "blur(12px)" }}
            />

            {/* parts, deepest first so the gland sits on top */}
            <motion.g style={{ x: x[5], ...dim(5) }}>
              <Ring p={collar} uid={uid} />
            </motion.g>
            <motion.g style={{ x: x[4], ...dim(4) }}>
              <SpringHalf p={spring} half="near" />
            </motion.g>
            <motion.g style={{ x: x[3], ...dim(3) }}>
              <Ring p={rotary} uid={uid} />
            </motion.g>
            <motion.g style={{ x: x[2], ...dim(2) }}>
              <Ring p={seat} uid={uid} />
            </motion.g>
            <motion.g style={{ x: x[1], ...dim(1) }}>
              <motion.g style={{ opacity: glandOpacity }}>
                <Ring p={gland} uid={uid} />
              </motion.g>
            </motion.g>

            {/* gland nuts, run down once the gland is home */}
            <motion.g style={{ opacity: doneOpacity }}>
              {[-1, 1].map((s) => {
                const y = CY + s * STUD_R;
                return (
                  <g key={s}>
                    <rect
                      x={413}
                      y={y - 8}
                      width={15}
                      height={16}
                      rx={1.5}
                      fill="#dde2e8"
                      stroke="var(--seal-line)"
                      strokeWidth={1.3}
                    />
                    <line
                      x1={418}
                      y1={y - 8}
                      x2={418}
                      y2={y + 8}
                      stroke="var(--seal-line)"
                      strokeOpacity={0.4}
                    />
                    <line
                      x1={423}
                      y1={y - 8}
                      x2={423}
                      y2={y + 8}
                      stroke="var(--seal-line)"
                      strokeOpacity={0.4}
                    />
                  </g>
                );
              })}
            </motion.g>

            {/* labels ride with their parts */}
            {PARTS.map((p) => (
              <motion.g key={p.n} style={{ x: x[p.n] }}>
                <Label p={p} opacity={labelOpacity} />
                <Badge p={p} opacity={badgeOpacity} />
              </motion.g>
            ))}

            {/* fixed annotations */}
            <g className="max-sm:hidden">
              <text
                x={CH_X1 + 30}
                y={CY + CH_OUT + 26}
                textAnchor="end"
                fontSize={13}
                fontWeight={700}
                fill="var(--ink)"
              >
                Seal chamber
              </text>
              <text
                x={CH_X1 + 30}
                y={CY + CH_OUT + 43}
                textAnchor="end"
                fontSize={12}
                fill="var(--muted-foreground)"
              >
                Pump side, full of process fluid
              </text>
            </g>
            <g
              fontSize={10.5}
              fontWeight={700}
              letterSpacing={1.4}
              fill="var(--muted-foreground)"
              className="max-sm:hidden"
            >
              <text x={18} y={372}>
                ← MOTOR SIDE
              </text>
              <text x={784} y={372} textAnchor="end">
                IMPELLER SIDE →
              </text>
            </g>

            {/* assembled state */}
            <motion.g style={{ opacity: doneOpacity }} className="max-sm:hidden">
              <line
                x1={474}
                y1={CY - 70}
                x2={474}
                y2={48}
                stroke="var(--brass)"
                strokeWidth={1.3}
                strokeDasharray="2 3"
              />
              <circle cx={474} cy={CY - 66} r={3} fill="var(--brass)" />
              <text x={484} y={36} fontSize={15} fontWeight={700} fill="var(--ink)">
                Sealing faces
              </text>
              <text x={484} y={53} fontSize={12} fill="var(--muted-foreground)">
                Carbon running on silicon carbide
              </text>

              <text x={40} y={CY - 114} fontSize={26} fontWeight={800} fill="var(--ink)">
                Faces closed.
              </text>
              <text fontSize={14} fill="var(--muted-foreground)">
                <tspan x={40} y={CY - 87}>
                  The spring holds the carbon face on the
                </tspan>
                <tspan x={40} y={CY - 68}>
                  seat. Between them runs a fluid film
                </tspan>
                <tspan x={40} y={CY - 49}>
                  about a micron thick: enough to cool and
                </tspan>
                <tspan x={40} y={CY - 30}>
                  lubricate the faces, too thin to leak.
                </tspan>
              </text>
            </motion.g>
          </svg>
        </div>

        <ol className="relative mt-6 grid gap-x-6 gap-y-4 border-t border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {PARTS.map((p) => (
            <li
              key={p.n}
              tabIndex={0}
              onMouseEnter={() => setActive(p.n)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.n)}
              onBlur={() => setActive(null)}
              className="-m-2 cursor-default rounded-xl p-2 text-sm outline-none transition-colors hover:bg-ink/[0.03] focus-visible:ring-2 focus-visible:ring-brass/50"
            >
              <div className="flex items-center gap-2 font-bold text-ink">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brass text-[11px] font-extrabold tabular-nums text-white">
                  {p.n}
                </span>
                {p.name}
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brass/90">
                {p.mat === "steel" ? (p.n === 5 ? "Stainless steel" : p.sub) : p.sub}
              </div>
              <p className="mt-1 leading-snug text-muted-foreground">{p.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
