import { useReducedMotion } from "framer-motion";

// Looping port scene: a cargo ship arrives, a gantry crane loads three containers onto it,
// the ship sails away. One 26s cycle, pure CSS keyframes (transform and opacity only).
const CYCLE = 26;
const BOX_W = 34;
const BOX_H = 15;
const COLORS = ["#0284c7", "#f59e0b", "#e2e8f0"];
const SHIP_X = 300; // docked position of the ship's left edge
const SLOTS = [SHIP_X + 50, SHIP_X + 86, SHIP_X + 122]; // upper-row deck slots (x of container left edge)
const DECK_Y = 116; // container top when sitting in an upper-row slot
const QUAY_Y = 160; // container top when sitting on the quay
const DOCK_X = [598, 636, 674];
const HOIST_Y = 62;

// Phase of the cycle (percent) when container i is picked up.
const pick = (i: number) => 30 + i * 11;

function keyframes() {
  const f = (n: number) => `${n.toFixed(2)}%`;
  let css = "";

  // Ship: arrives, waits while loading, leaves.
  css += `@keyframes ps-ship{0%{transform:translateX(-520px)}20%,72%{transform:translateX(0)}100%{transform:translateX(560px)}}`;
  css += `@keyframes ps-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(2.5px)}}`;
  css += `@keyframes ps-wave{from{transform:translateX(0)}to{transform:translateX(-120px)}}`;
  css += `@keyframes ps-plane{0%{transform:translateX(-80px)}100%{transform:translateX(900px)}}`;

  for (let i = 0; i < 3; i++) {
    const t0 = pick(i);
    const dx0 = DOCK_X[i];
    const dx1 = SLOTS[i];
    // Container on the quay: visible until picked up, returns when the next ship arrives.
    css += `@keyframes ps-dock-${i}{0%,${f(t0 - 0.3)}{opacity:1}${f(t0)},96%{opacity:0}100%{opacity:1}}`;
    // Hoisted container: lifts, travels over the ship, lowers into its slot, then hides.
    css += `@keyframes ps-carry-${i}{0%,${f(t0 - 0.3)}{opacity:0;transform:translate(${dx0}px,${QUAY_Y}px)}${f(t0)}{opacity:1;transform:translate(${dx0}px,${QUAY_Y}px)}${f(t0 + 3)}{transform:translate(${dx0}px,${HOIST_Y}px)}${f(t0 + 6.5)}{transform:translate(${dx1}px,${HOIST_Y}px)}${f(t0 + 9)}{opacity:1;transform:translate(${dx1}px,${DECK_Y}px)}${f(t0 + 9.2)},100%{opacity:0;transform:translate(${dx1}px,${DECK_Y}px)}}`;
    // Container on the ship deck: appears when lowered, then rides away with the ship.
    css += `@keyframes ps-deck-${i}{0%,${f(t0 + 8.9)}{opacity:0}${f(t0 + 9.2)},97%{opacity:1}100%{opacity:0}}`;
  }
  // Trolley follows the hoisted container: it rides along the boom.
  css += `@keyframes ps-cable{0%,${f(pick(0) - 0.3)}{opacity:0}${f(pick(0))},${f(pick(2) + 9.2)}{opacity:1}${f(pick(2) + 9.4)},100%{opacity:0}}`;
  return css;
}

export function PortScene() {
  const reduce = useReducedMotion();
  const css = keyframes();
  const anim = (name: string, extra = "") =>
    reduce ? undefined : { animation: `${name} ${CYCLE}s ${extra || "linear"} infinite` };

  return (
    <svg
      viewBox="0 0 800 240"
      className="h-auto w-full"
      role="img"
      aria-label="Animated cargo ship being loaded at a container port, then sailing away"
    >
      <defs>
        <style>{css}</style>
        <linearGradient id="ps-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0b1220" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="170" fill="url(#ps-sky)" />

      {/* Plane crossing the sky */}
      <g style={anim("ps-plane", "linear")} opacity="0.7">
        <path d="M0 34 l14 -3 l-5 -7 l3 0 l9 6 l12 -2 c3 0 3 3 0 3 l-12 2 l-9 7 l-3 0 l5 -7 z" fill="#e0f2fe" />
      </g>

      {/* Sea */}
      <rect x="0" y="168" width="800" height="72" fill="url(#ps-sea)" />
      <g style={anim("ps-wave", "linear")} opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M${i * 120 - 120} 182 q30 -8 60 0 t60 0`} fill="none" stroke="#7dd3fc" strokeOpacity="0.55" strokeWidth="1.2" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={`b${i}`} d={`M${i * 120 - 90} 204 q30 -7 60 0 t60 0`} fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1" />
        ))}
      </g>

      {/* Ship (moves in, waits, moves out) */}
      <g style={anim("ps-ship", "cubic-bezier(0.45,0,0.25,1)")}>
        <g style={reduce ? undefined : { animation: "ps-bob 4s ease-in-out infinite" }}>
          {/* hull */}
          <path d={`M${SHIP_X} 150 H${SHIP_X + 250} l-14 28 H${SHIP_X + 18} z`} fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.5" />
          <rect x={SHIP_X} y="146" width="250" height="5" fill="#1e293b" />
          {/* bridge */}
          <rect x={SHIP_X + 206} y="114" width="30" height="32" fill="#e2e8f0" />
          <rect x={SHIP_X + 210} y="119" width="22" height="6" fill="#0284c7" />
          <rect x={SHIP_X + 216} y="104" width="8" height="10" fill="#cbd5e1" />
          {/* pre-loaded containers */}
          {[0, 1, 2, 3, 4].map((c) => (
            <rect key={c} x={SHIP_X + 14 + c * 36} y={DECK_Y + 15} width={BOX_W} height={BOX_H} fill={COLORS[c % 3]} stroke="#0b1220" strokeOpacity="0.35" />
          ))}
          {/* containers loaded by the crane (appear when lowered) */}
          {[0, 1, 2].map((i) => (
            <g key={i} style={reduce ? { opacity: 1 } : { animation: `ps-deck-${i} ${CYCLE}s linear infinite` }}>
              <rect x={SLOTS[i]} y={DECK_Y} width={BOX_W} height={BOX_H} fill={COLORS[i]} stroke="#0b1220" strokeOpacity="0.35" />
            </g>
          ))}
        </g>
      </g>

      {/* Quay (in front of the ship) */}
      <rect x="560" y="176" width="240" height="64" fill="#111827" />
      <rect x="560" y="174" width="240" height="4" fill="#334155" />

      {/* Containers waiting on the quay */}
      {DOCK_X.map((x, i) => (
        <g key={i} style={reduce ? undefined : { animation: `ps-dock-${i} ${CYCLE}s linear infinite` }}>
          <rect x={x} y={QUAY_Y + 0} width={BOX_W} height={BOX_H} fill={COLORS[i]} stroke="#0b1220" strokeOpacity="0.35" />
        </g>
      ))}
      {/* A fixed stack at the far end of the quay */}
      <rect x="566" y={QUAY_Y} width={BOX_W} height={BOX_H} fill="#0284c7" stroke="#0b1220" strokeOpacity="0.35" />
      <rect x="566" y={QUAY_Y - BOX_H} width={BOX_W} height={BOX_H} fill="#e2e8f0" stroke="#0b1220" strokeOpacity="0.35" />

      {/* Gantry crane */}
      <g stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M730 174 V50 M776 174 V50" />
        <path d="M730 50 H776 M730 110 H776 M730 74 L776 110 M776 74 L730 110" strokeWidth="1.6" />
        <path d="M730 50 H320" strokeWidth="4" />
        <path d="M730 50 L560 50" strokeWidth="1" />
        <path d="M776 50 L790 38 L730 38" strokeWidth="1.6" />
      </g>

      {/* Hoisted containers with cable (one at a time) */}
      {[0, 1, 2].map((i) => (
        <g key={i} style={reduce ? { opacity: 0 } : { animation: `ps-carry-${i} ${CYCLE}s linear infinite`, opacity: 0 }}>
          <path d={`M4 0 L${BOX_W / 2} -10 L${BOX_W - 4} 0`} stroke="#cbd5e1" strokeWidth="1" fill="none" />
          <rect x="0" y="0" width={BOX_W} height={BOX_H} fill={COLORS[i]} stroke="#0b1220" strokeOpacity="0.35" />
        </g>
      ))}
    </svg>
  );
}
