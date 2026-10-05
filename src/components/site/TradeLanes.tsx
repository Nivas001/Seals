import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { Ship, Plane } from "lucide-react";
import { MAP, MAP_DOTS_PATH } from "@/data/worldMap";

// Illustrative trade lanes from our Hosur head office. Dot-matrix land is generated from
// Natural Earth data (public domain). Ships move along each lane with SVG motion paths.
const project = (lon: number, lat: number) => ({
  x: (lon - MAP.lon0) / MAP.step - 0.5,
  y: (MAP.lat0 - lat) / MAP.step - 0.5,
});

const HUB = { name: "Hosur", ...project(77.83, 12.74) };

const PORTS = [
  { name: "Dubai", lon: 55.27, lat: 25.2, mode: "ship" },
  { name: "Rotterdam", lon: 4.48, lat: 51.92, mode: "ship" },
  { name: "Singapore", lon: 103.82, lat: 1.35, mode: "ship" },
  { name: "Durban", lon: 31.02, lat: -29.86, mode: "ship" },
  { name: "Sydney", lon: 151.2, lat: -33.87, mode: "ship" },
  { name: "New York", lon: -74.0, lat: 40.71, mode: "air" },
] as const;

function lane(to: { x: number; y: number }) {
  const mx = (HUB.x + to.x) / 2;
  const my = (HUB.y + to.y) / 2;
  const dist = Math.hypot(to.x - HUB.x, to.y - HUB.y);
  const cy = my - Math.max(6, dist * 0.28);
  return `M${HUB.x.toFixed(2)} ${HUB.y.toFixed(2)} Q${mx.toFixed(2)} ${cy.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

export function TradeLanes() {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const lanes = PORTS.map((p, i) => {
    const pt = project(p.lon, p.lat);
    const dist = Math.hypot(pt.x - HUB.x, pt.y - HUB.y);
    const cy = (HUB.y + pt.y) / 2 - Math.max(6, dist * 0.28);
    // Midpoint of the quadratic curve, used as the resting spot when motion is reduced.
    const mid = { x: 0.25 * HUB.x + 0.5 * ((HUB.x + pt.x) / 2) + 0.25 * pt.x, y: 0.25 * HUB.y + 0.5 * cy + 0.25 * pt.y };
    return { ...p, ...pt, mid, d: lane(pt), id: `${uid}-lane-${i}`, dur: 9 + (i % 3) * 2.5, begin: -i * 1.7 };
  });

  return (
    <svg
      viewBox={`-2 -2 ${MAP.cols + 4} ${MAP.rows + 4}`}
      className="h-auto w-[176%] max-w-none -ml-[76%] sm:ml-0 sm:w-full"
      role="img"
      aria-label="Trade lanes from Hosur to ports around the world"
    >
      <defs>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-route`} x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Land as a dot matrix */}
      <path d={MAP_DOTS_PATH} stroke="#94a3b8" strokeOpacity="0.38" strokeWidth="0.62" strokeLinecap="round" fill="none" />

      {/* Lanes */}
      {lanes.map((l) => (
        <g key={l.id}>
          <path
            id={l.id}
            d={l.d}
            fill="none"
            stroke={`url(#${uid}-route)`}
            strokeWidth="0.28"
            strokeDasharray="0.9 1.1"
            strokeLinecap="round"
          >
            {!reduce && (
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="14s" repeatCount="indefinite" />
            )}
          </path>

          {/* Port marker */}
          <circle cx={l.x} cy={l.y} r="1.8" fill={`url(#${uid}-glow)`} />
          <circle cx={l.x} cy={l.y} r="0.55" fill="#e0f2fe" />
          <text x={l.x} y={l.y + 3.4} textAnchor="middle" className="hidden sm:block" fontSize="2.2" fill="#cbd5e1" fillOpacity="0.9" fontWeight="600">
            {l.name}
          </text>

          {/* Moving vessel */}
          <g transform={reduce ? `translate(${l.mid.x.toFixed(2)} ${l.mid.y.toFixed(2)})` : undefined}>
            {reduce ? null : (
              <animateMotion dur={`${l.dur}s`} begin={`${l.begin}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.6 1">
                <mpath href={`#${l.id}`} />
              </animateMotion>
            )}
            <circle r="2.1" fill="#0b1220" fillOpacity="0.85" stroke="#38bdf8" strokeOpacity="0.8" strokeWidth="0.25" />
            {l.mode === "ship" ? (
              <Ship x={-1.2} y={-1.2} width={2.4} height={2.4} color="#e0f2fe" strokeWidth={2} />
            ) : (
              <Plane x={-1.2} y={-1.2} width={2.4} height={2.4} color="#e0f2fe" strokeWidth={2} />
            )}
          </g>
        </g>
      ))}

      {/* Hub */}
      <circle cx={HUB.x} cy={HUB.y} r="4.2" fill={`url(#${uid}-glow)`}>
        {!reduce && <animate attributeName="r" values="3;5.2;3" dur="3.2s" repeatCount="indefinite" />}
      </circle>
      <circle cx={HUB.x} cy={HUB.y} r="0.9" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="0.3" />
      <text x={HUB.x + 1.6} y={HUB.y + 3.1} fontSize="2.6" fill="#f8fafc" fontWeight="700">
        Hosur
      </text>
    </svg>
  );
}
