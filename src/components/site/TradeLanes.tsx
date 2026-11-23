import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DOT_STEP, WORLD_DOTS } from "@/data/worldDots";

// Trade network drawn on a dot-matrix world map (land sampled from Natural Earth, public domain).
// Amber lanes: parts sourced from the home countries of the brands we supply.
// Blue lanes: deliveries from our Hosur head office to markets worldwide.
// Lanes are illustrative. Travelling streaks use SVG animation, so they cost no JavaScript.
const LAT0 = 80;
const px = (lon: number, lat: number) => ({ x: lon + 180, y: LAT0 - lat });

// Crop to the region the network covers (roughly 100°W to 172°E, 70°N to 54°S) so land fills the frame.
export const VIEW = { x: 80, y: 10, w: 272, h: 124 };

type LabelPos = "top" | "bottom" | "left" | "right";
type Place = { name: string; x: number; y: number; label: LabelPos; sub?: string };

const HUB = { name: "Hosur", ...px(77.83, 12.74) };

export const SOURCES: Place[] = [
  { name: "Sweden", sub: "SKF", ...px(11.97, 57.7), label: "top" },
  { name: "Germany", sub: "FAG · INA", ...px(10.2, 50.05), label: "left" },
  { name: "Japan", sub: "NTN", ...px(135.5, 34.7), label: "top" },
];

export const MARKETS: Place[] = [
  { name: "Dubai", ...px(55.27, 25.2), label: "top" },
  { name: "Singapore", ...px(103.82, 1.35), label: "right" },
  { name: "Jakarta", ...px(106.8, -6.2), label: "bottom" },
  { name: "Sydney", ...px(151.2, -33.87), label: "left" },
  { name: "Durban", ...px(31.02, -29.86), label: "right" },
  { name: "Lagos", ...px(3.4, 6.5), label: "bottom" },
  { name: "New York", ...px(-74.0, 40.71), label: "top" },
  { name: "Sao Paulo", ...px(-46.6, -23.5), label: "bottom" },
];

type Pt = { x: number; y: number };

// Quadratic curve between two points, bulging upward like a flight arc.
function curve(a: Pt, b: Pt) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = (a.x + b.x) / 2;
  const cy = (a.y + b.y) / 2 - Math.max(6, dist * 0.2);
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const AMBER = "#fbbf24";
const BLUE = "#38bdf8";

/** `focus` names a source country (highlights its lane) or "Hosur" (highlights all deliveries). */
export function TradeLanes({ focus = null, onFocus }: { focus?: string | null; onFocus?: (name: string | null) => void }) {
  const reduce = !!useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const lanes = [
    ...SOURCES.map((s, i) => ({ key: s.name, kind: "in" as const, id: `${uid}-in-${i}`, from: s as Pt, to: HUB as Pt, color: AMBER, d: curve(s, HUB), dur: 4.6 + i * 0.7, begin: -i * 1.4 })),
    ...MARKETS.map((m, i) => ({ key: m.name, kind: "out" as const, id: `${uid}-out-${i}`, from: HUB as Pt, to: m as Pt, color: BLUE, d: curve(HUB, m), dur: 5 + (i % 3) * 0.9, begin: -i * 0.8 })),
  ];

  const lit = (kind: "in" | "out", key: string) => !focus || (focus === "Hosur" ? kind === "out" : kind === "in" && key === focus);
  const fade = { transition: "opacity 300ms ease" };

  return (
    <svg
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      className="block h-auto w-[175%] max-w-none -ml-[62%] sm:ml-0 sm:w-full"
      role="img"
      aria-label="World map showing parts sourced from Sweden, Germany and Japan into Hosur, India, and delivered from Hosur to markets worldwide"
      onMouseLeave={() => onFocus?.(null)}
    >
      <defs>
        <radialGradient id={`${uid}-glowB`}>
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.55" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glowA`}>
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.55" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>
        {/* Land dots brighten towards India, where the network centres. */}
        <radialGradient id={`${uid}-land`} gradientUnits="userSpaceOnUse" cx={HUB.x} cy={HUB.y} r="150">
          <stop offset="0%" stopColor="#5b7bb5" />
          <stop offset="45%" stopColor="#34496f" />
          <stop offset="100%" stopColor="#24334f" />
        </radialGradient>
        {lanes.map((l) => (
          <linearGradient key={l.id} id={`${l.id}-g`} gradientUnits="userSpaceOnUse" x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}>
            <stop offset="0%" stopColor={l.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={l.color} stopOpacity="0.25" />
          </linearGradient>
        ))}
      </defs>

      {/* Dot-matrix land */}
      <path d={WORLD_DOTS} stroke={`url(#${uid}-land)`} strokeWidth={DOT_STEP * 0.5} strokeLinecap="round" fill="none" />

      {/* Lanes: a faint arc that draws in on scroll, plus a bright streak travelling along it */}
      {lanes.map((l, i) => (
        <g key={l.id} style={{ ...fade, opacity: lit(l.kind, l.key) ? 1 : 0.12 }}>
          <motion.path
            d={l.d}
            fill="none"
            stroke={`url(#${l.id}-g)`}
            strokeWidth="0.45"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          />
          {!reduce && (
            <>
              <Streak d={l.d} color={l.color} width={2} opacity={0.22} dur={l.dur} begin={l.begin} />
              <Streak d={l.d} color={l.color === AMBER ? "#fde68a" : "#e0f2fe"} width={0.6} opacity={1} dur={l.dur} begin={l.begin} />
            </>
          )}
        </g>
      ))}

      {/* Market endpoints */}
      {MARKETS.map((m, i) => (
        <g key={m.name} style={{ ...fade, opacity: lit("out", m.name) ? 1 : 0.3 }}>
          <circle cx={m.x} cy={m.y} r="3" fill={`url(#${uid}-glowB)`}>
            {!reduce && <animate attributeName="r" values="2;3.6;2" dur="3.4s" begin={`${-i * 0.6}s`} repeatCount="indefinite" />}
          </circle>
          <circle cx={m.x} cy={m.y} r="0.9" fill="#e0f2fe" stroke="#0a1020" strokeWidth="0.25" />
          <Label place={m} tone="market" />
        </g>
      ))}

      {/* Source endpoints (hover to isolate a lane) */}
      {SOURCES.map((s) => (
        <g
          key={s.name}
          style={{ ...fade, opacity: lit("in", s.name) ? 1 : 0.35, cursor: onFocus ? "pointer" : undefined }}
          onMouseEnter={() => onFocus?.(s.name)}
        >
          <circle cx={s.x} cy={s.y} r="6" fill="transparent" />
          <circle cx={s.x} cy={s.y} r="3.6" fill={`url(#${uid}-glowA)`} />
          <circle cx={s.x} cy={s.y} r="1.05" fill={AMBER} stroke="#0a1020" strokeWidth="0.3" />
          <Label place={s} tone="source" />
        </g>
      ))}

      {/* Hub with expanding radar rings */}
      <g onMouseEnter={() => onFocus?.("Hosur")} style={{ cursor: onFocus ? "pointer" : undefined }}>
        {!reduce &&
          [0, 1.1, 2.2].map((b) => (
            <circle key={b} cx={HUB.x} cy={HUB.y} r="2" fill="none" stroke={BLUE} strokeWidth="0.3">
              <animate attributeName="r" values="2;12" dur="3.3s" begin={`${b}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.7;0" dur="3.3s" begin={`${b}s`} repeatCount="indefinite" />
            </circle>
          ))}
        <circle cx={HUB.x} cy={HUB.y} r="7" fill={`url(#${uid}-glowB)`} />
        <circle cx={HUB.x} cy={HUB.y} r="2" fill={BLUE} stroke="#f0f9ff" strokeWidth="0.6" />
        <g transform={`translate(${(HUB.x + 3.2).toFixed(1)} ${(HUB.y + 3).toFixed(1)})`} className="hidden sm:block">
          <rect x="0" y="0" width="21" height="8.6" rx="2" fill="#f8fafc" />
          <text x="2.2" y="4.5" fontSize="3.5" fontWeight="800" fill="#0a1020">
            Hosur
          </text>
          <text x="2.2" y="7.4" fontSize="2.2" fontWeight="600" fill="#475569" letterSpacing="0.15">
            HQ · INDIA
          </text>
        </g>
      </g>
    </svg>
  );
}

// A short bright dash that sweeps along a lane, entering and leaving cleanly.
function Streak({ d, color, width, opacity, dur, begin }: { d: string; color: string; width: number; opacity: number; dur: number; begin: number }) {
  return (
    <path d={d} pathLength={100} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={width} strokeLinecap="round" strokeDasharray="9 120">
      <animate attributeName="stroke-dashoffset" values="9;-100" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
    </path>
  );
}

// Readable pill label beside a map point. Labels hide on phones, where they would be too small to read;
// the source cards under the map carry that information there.
function Label({ place, tone }: { place: Place; tone: "source" | "market" }) {
  const fs = tone === "source" ? 3.1 : 2.8;
  const subFs = 2.1;
  const padX = 1.6;
  const textW = place.name.length * fs * 0.56;
  const subW = place.sub ? place.sub.length * subFs * 0.62 : 0;
  const w = Math.max(textW, subW) + padX * 2;
  const h = place.sub ? fs + subFs + 2.6 : fs + 2;
  const gap = 2.6;

  let x = place.x - w / 2;
  let y = place.y - gap - h;
  if (place.label === "bottom") y = place.y + gap;
  if (place.label === "left") {
    x = place.x - gap - w;
    y = place.y - h / 2;
  }
  if (place.label === "right") {
    x = place.x + gap;
    y = place.y - h / 2;
  }

  const source = tone === "source";
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`} className="hidden sm:block">
      <rect
        width={w.toFixed(2)}
        height={h.toFixed(2)}
        rx="1.4"
        fill={source ? "#1f1a0e" : "#0d1629"}
        fillOpacity="0.9"
        stroke={source ? AMBER : "#94a3b8"}
        strokeOpacity={source ? 0.55 : 0.25}
        strokeWidth="0.2"
      />
      <text x={padX} y={fs + 0.55} fontSize={fs} fontWeight="700" fill={source ? "#fde68a" : "#e2e8f0"}>
        {place.name}
      </text>
      {place.sub && (
        <text x={padX} y={fs + subFs + 1.5} fontSize={subFs} fontWeight="600" fill="#fbbf24" fillOpacity="0.75" letterSpacing="0.1">
          {place.sub}
        </text>
      )}
    </g>
  );
}
