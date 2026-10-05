import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { WORLD, WORLD_PATH } from "@/data/worldCountries";

// Trade network drawn on a real country map (Natural Earth, public domain).
// Amber lanes: parts sourced from the home countries of the brands we supply.
// Blue lanes: deliveries from our Hosur head office to markets worldwide.
// Lanes are illustrative. Motion uses SVG motion paths, so it costs no JavaScript.
const px = (lon: number, lat: number) => ({ x: lon + 180, y: WORLD.lat0 - lat });

const HUB = { name: "Hosur", ...px(77.83, 12.74) };

const SOURCES = [
  { name: "Sweden", ...px(11.97, 57.7) },
  { name: "Germany", ...px(10.2, 50.05) },
  { name: "France", ...px(2.2, 48.9) },
  { name: "Japan", ...px(135.5, 34.7) },
];

const MARKETS = [
  { name: "Dubai", ...px(55.27, 25.2) },
  { name: "Singapore", ...px(103.82, 1.35) },
  { name: "Jakarta", ...px(106.8, -6.2) },
  { name: "Sydney", ...px(151.2, -33.87) },
  { name: "Durban", ...px(31.02, -29.86) },
  { name: "Lagos", ...px(3.4, 6.5) },
  { name: "New York", ...px(-74.0, 40.71) },
  { name: "Sao Paulo", ...px(-46.6, -23.5) },
];

type Pt = { x: number; y: number };

// Quadratic curve between two points, bulging upward like a flight arc.
function curve(a: Pt, b: Pt) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = (a.x + b.x) / 2;
  const cy = (a.y + b.y) / 2 - Math.max(8, dist * 0.22);
  const mid = { x: 0.25 * a.x + 0.5 * cx + 0.25 * b.x, y: 0.25 * a.y + 0.5 * cy + 0.25 * b.y };
  return { d: `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`, mid };
}

const AMBER = "#fbbf24";
const BLUE = "#38bdf8";

export function TradeLanes() {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const inbound = SOURCES.map((s, i) => ({ ...s, ...curve(s, HUB), id: `${uid}-in-${i}`, dur: 7 + (i % 2) * 1.5, begin: -i * 1.9 }));
  const outbound = MARKETS.map((m, i) => ({ ...m, ...curve(HUB, m), id: `${uid}-out-${i}`, dur: 8 + (i % 3) * 1.6, begin: -i * 1.3 }));

  const graticule: string[] = [];
  for (let lon = 0; lon <= 360; lon += 30) graticule.push(`M${lon} 0V${WORLD.h}`);
  for (let lat = 0; lat <= WORLD.h; lat += 30) graticule.push(`M0 ${lat}H360`);

  return (
    <svg
      viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
      className="h-auto w-[182%] max-w-none -ml-[76%] sm:ml-0 sm:w-full"
      role="img"
      aria-label="World map showing parts sourced from Sweden, Germany, France and Japan into Hosur, and delivered from Hosur to markets worldwide"
    >
      <defs>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.6" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glowA`}>
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.55" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-land`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2a47" />
          <stop offset="100%" stopColor="#111b30" />
        </linearGradient>
      </defs>

      {/* Graticule */}
      <path d={graticule.join("")} stroke="#38bdf8" strokeOpacity="0.06" strokeWidth="0.3" fill="none" />

      {/* Real countries with borders */}
      <path d={WORLD_PATH} fill={`url(#${uid}-land)`} stroke="#4b6492" strokeOpacity="0.55" strokeWidth="0.22" strokeLinejoin="round" />

      {/* Inbound sourcing lanes (amber) */}
      {inbound.map((l) => (
        <g key={l.id}>
          <path id={l.id} d={l.d} fill="none" stroke={AMBER} strokeOpacity="0.55" strokeWidth="0.35" strokeDasharray="1.2 1.4" strokeLinecap="round" />
          <circle cx={l.x} cy={l.y} r="3.2" fill={`url(#${uid}-glowA)`} />
          <circle cx={l.x} cy={l.y} r="0.9" fill={AMBER} />
          <text x={l.x} y={l.y - 2.2} textAnchor="middle" className="hidden sm:block" fontSize="3.6" fontWeight="600" fill="#fde68a">
            {l.name}
          </text>
          <Particle id={l.id} color={AMBER} dur={l.dur} begin={l.begin} mid={l.mid} reduce={!!reduce} />
        </g>
      ))}

      {/* Outbound delivery lanes (blue) */}
      {outbound.map((l) => (
        <g key={l.id}>
          <path id={l.id} d={l.d} fill="none" stroke={BLUE} strokeOpacity="0.6" strokeWidth="0.35" strokeDasharray="1.2 1.4" strokeLinecap="round" />
          <circle cx={l.x} cy={l.y} r="3.2" fill={`url(#${uid}-glow)`}>
            {!reduce && <animate attributeName="r" values="2.2;4.2;2.2" dur="3.6s" begin={`${l.begin}s`} repeatCount="indefinite" />}
          </circle>
          <circle cx={l.x} cy={l.y} r="0.9" fill="#e0f2fe" />
          <text x={l.x} y={l.y + 5} textAnchor="middle" className="hidden sm:block" fontSize="3.6" fontWeight="600" fill="#cbd5e1">
            {l.name}
          </text>
          <Particle id={l.id} color="#e0f2fe" dur={l.dur} begin={l.begin} mid={l.mid} reduce={!!reduce} />
        </g>
      ))}

      {/* Hub */}
      <circle cx={HUB.x} cy={HUB.y} r="7" fill={`url(#${uid}-glow)`}>
        {!reduce && <animate attributeName="r" values="5;9;5" dur="3.2s" repeatCount="indefinite" />}
      </circle>
      <circle cx={HUB.x} cy={HUB.y} r="1.6" fill={BLUE} stroke="#f0f9ff" strokeWidth="0.5" />
      <text x={HUB.x + 3} y={HUB.y + 6.2} fontSize="4.6" fontWeight="800" fill="#f8fafc">
        Hosur
      </text>
    </svg>
  );
}

// A glowing dot that travels along a lane; rests at the midpoint when motion is reduced.
function Particle({ id, color, dur, begin, mid, reduce }: { id: string; color: string; dur: number; begin: number; mid: Pt; reduce: boolean }) {
  const dots = [0, 0.14, 0.28]; // head plus a short fading trail
  return (
    <g transform={reduce ? `translate(${mid.x.toFixed(1)} ${mid.y.toFixed(1)})` : undefined}>
      {dots.map((lag, i) => (
        <circle key={i} r={1.25 - i * 0.3} fill={color} fillOpacity={1 - i * 0.35}>
          {!reduce && (
            <animateMotion dur={`${dur}s`} begin={`${begin + lag}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.6 1">
              <mpath href={`#${id}`} />
            </animateMotion>
          )}
        </circle>
      ))}
    </g>
  );
}
