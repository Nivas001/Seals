import type { ReactElement } from "react";
import { useReducedMotion } from "framer-motion";

/* Illustrations for the Industries page.
   IndustryIcon: one line-drawn icon per sector, drawn on a 48-unit grid with the brand accent as a soft fill.
   PlantScene: a small process line (storage tank → pump → valve → reactor) with fluid flowing through it,
   calling out the parts we supply. Both use theme tokens, so they work in light and dark mode. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const TINT = { fill: "var(--brass)", fillOpacity: 0.16, stroke: "none" } as const;

export type IndustryKey = "food" | "chemical" | "beverages" | "breweries" | "plastics" | "pharma" | "oil-gas" | "dye";

export function industryKey(name: string): IndustryKey {
  const n = name.toLowerCase();
  if (n.startsWith("food")) return "food";
  if (n.startsWith("chem")) return "chemical";
  if (n.startsWith("bev")) return "beverages";
  if (n.startsWith("brew")) return "breweries";
  if (n.startsWith("plast")) return "plastics";
  if (n.startsWith("pharma")) return "pharma";
  if (n.startsWith("oil")) return "oil-gas";
  return "dye";
}

export function IndustryIcon({ kind, className }: { kind: IndustryKey; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {ICONS[kind]}
    </svg>
  );
}

const ICONS: Record<IndustryKey, ReactElement> = {
  // Milk churn
  food: (
    <g>
      <path {...TINT} d="M15 26h18v13a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3z" />
      <path {...S} d="M19 6h10M20 6v5M28 6v5M20 11c0 3-5 4-5 9v19a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V20c0-5-5-6-5-9" />
      <path {...S} d="M15 24h18M12 22a3 3 0 0 0 3 3M36 22a3 3 0 0 1-3 3" />
      <path {...S} d="M24 30c-1.6 2.2-2.4 3.6-2.4 4.6a2.4 2.4 0 0 0 4.8 0c0-1-.8-2.4-2.4-4.6z" />
    </g>
  ),
  // Conical flask with bubbles
  chemical: (
    <g>
      <path {...TINT} d="M14.5 30h19l5 9.5a2 2 0 0 1-1.8 2.5H11.3a2 2 0 0 1-1.8-2.5z" />
      <path {...S} d="M19 6h10M20 6v12L9.5 39.5A2 2 0 0 0 11.3 42h25.4a2 2 0 0 0 1.8-2.5L28 18V6" />
      <path {...S} d="M14.5 30c3-1.5 6-1.5 9.5 0s6.5 1.5 9.5 0" />
      <circle {...S} cx="21" cy="36" r="1.6" />
      <circle {...S} cx="27.5" cy="34" r="1.1" />
      <circle {...S} cx="25" cy="24" r="1" />
    </g>
  ),
  // Bottle with label and rising bubbles
  beverages: (
    <g>
      <path {...TINT} d="M17 24h14v15a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3z" />
      <path {...S} d="M21 5h6M21.5 5v6c0 2-4.5 4-4.5 9v19a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V20c0-5-4.5-7-4.5-9V5" />
      <path {...S} d="M17 24h14M17 33h14" />
      <circle {...S} cx="22" cy="29" r="0.9" />
      <circle {...S} cx="26" cy="27" r="0.7" />
      <circle {...S} cx="38" cy="14" r="1.4" />
      <circle {...S} cx="41" cy="8" r="1" />
    </g>
  ),
  // Beer mug with foam
  breweries: (
    <g>
      <path {...TINT} d="M11 17h20v21a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4z" />
      <path {...S} d="M11 17v21a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V17" />
      <path {...S} d="M31 21h4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-4" />
      <path {...S} d="M10 17a4 4 0 0 1 3-6.8A5 5 0 0 1 21.5 8a5 5 0 0 1 8.5 2.2A4 4 0 0 1 32 17z" />
      <path {...S} d="M17 23v13M25 23v13" />
    </g>
  ),
  // Hopper feeding an extruder barrel, pellets falling in
  plastics: (
    <g>
      <path {...TINT} d="M6 29h30v8H6z" />
      <path {...S} d="M12 6h16l-5 11v6h-6v-6z" />
      <rect {...S} x="6" y="29" width="30" height="8" rx="1.5" />
      <path {...S} d="M17 23h6v6M36 31.5h4l3 1.5-3 1.5h-4" />
      <path {...S} d="M10 33c2-2 4 2 6 0s4 2 6 0 4 2 6 0 4 2 6 0" />
      <circle {...S} cx="17" cy="10" r="1" />
      <circle {...S} cx="22" cy="11.5" r="1" />
      <circle {...S} cx="20" cy="14.5" r="1" />
    </g>
  ),
  // Capsule and tablet
  pharma: (
    <g>
      <path {...TINT} d="M24.5 13.5l7-7a7.1 7.1 0 0 1 10 10l-7 7z" />
      <path {...S} d="M24.5 13.5l7-7a7.1 7.1 0 0 1 10 10l-17 17a7.1 7.1 0 0 1-10-10z" />
      <path {...S} d="M24.5 13.5l10 10" />
      <circle {...S} cx="36" cy="36" r="7" />
      <path {...S} d="M31 41l10-10" />
    </g>
  ),
  // Pumpjack over a wellhead
  "oil-gas": (
    <g>
      <rect {...TINT} x="31" y="35" width="10" height="7" rx="1" />
      <path {...S} d="M4 42h40M10 42l7-22 7 22M13 33h8" />
      <path {...S} d="M6 17l27-7" />
      <path {...S} d="M33 10c3-1 5 1 5 4s-2 5-4 5" />
      <path {...S} d="M36 19v16M31 35h10v7M17 20v-6" />
      <circle {...S} cx="17" cy="13" r="1.6" />
      <path {...S} d="M7 17l1.5 9" />
      <rect {...S} x="4" y="26" width="9" height="5" rx="1" />
    </g>
  ),
  // Three colour drops
  dye: (
    <g>
      <path {...TINT} d="M31 20c-3.5 5-5.5 8.5-5.5 11a5.5 5.5 0 0 0 11 0c0-2.5-2-6-5.5-11z" />
      <path {...S} d="M18 6c-5 7-8 12-8 15.5a8 8 0 0 0 16 0C26 18 23 13 18 6z" />
      <path {...S} d="M31 20c-3.5 5-5.5 8.5-5.5 11a5.5 5.5 0 0 0 11 0c0-2.5-2-6-5.5-11z" />
      <path {...S} d="M16 30c-2.8 4-4.4 6.8-4.4 8.8a4.4 4.4 0 0 0 8.8 0c0-2-1.6-4.8-4.4-8.8z" />
      <path {...S} d="M14.5 17.5c-.8 1.4-1.2 2.6-1.2 3.6" />
    </g>
  ),
};

/* ───────── Hero scene ───────── */

export function PlantScene({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const line = "var(--ink)";
  const soft = "color-mix(in oklab, var(--ink) 6%, var(--surface))";
  const fluid = "color-mix(in oklab, var(--brass) 22%, var(--surface))";

  // Pipe run: tank outlet → pump suction, then pump discharge → up → across → down into the reactor.
  const suction = "M150 292 H226";
  const discharge = "M262 238 V112 H462 V150";

  const Pipe = ({ d }: { d: string }) => (
    <g>
      <path d={d} fill="none" stroke={line} strokeWidth={17} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={soft} strokeWidth={13} strokeLinejoin="round" />
      <path d={d} fill="none" stroke="var(--brass)" strokeWidth={3} strokeDasharray="7 11" strokeLinecap="round" strokeLinejoin="round">
        {!reduce && <animate attributeName="stroke-dashoffset" values="36;0" dur="1.1s" repeatCount="indefinite" />}
      </path>
    </g>
  );

  const Callout = ({ x, y, tx, ty, label, anchor = "start" }: { x: number; y: number; tx: number; ty: number; label: string; anchor?: "start" | "end" }) => (
    <g>
      <path d={`M${x} ${y} L${tx} ${ty}`} stroke="var(--brass)" strokeWidth={1.2} strokeDasharray="2 3" />
      <circle cx={x} cy={y} r={3.2} fill="var(--brass)" />
      <text x={anchor === "start" ? tx + 6 : tx - 6} y={ty + 4} textAnchor={anchor} fontSize={13} fontWeight={700} fill="var(--ink)">
        {label}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 380" className={className} role="img" aria-label="A process line: a storage tank feeds a centrifugal pump, which pushes fluid through a valve into a stirred reactor. Callouts mark the mechanical seal, pump, valve and gasket we supply.">
      <defs>
        <clipPath id="plant-tankA">
          <rect x="44" y="96" width="104" height="210" rx="22" />
        </clipPath>
        <clipPath id="plant-tankB">
          <rect x="436" y="148" width="96" height="158" rx="20" />
        </clipPath>
      </defs>

      {/* ground */}
      <path d="M16 340 H544" stroke="var(--hairline)" strokeWidth={2} />

      {/* storage tank */}
      <g clipPath="url(#plant-tankA)">
        <rect x="44" y="96" width="104" height="210" fill="var(--surface)" />
        <path d="M44 176 q13 -7 26 0 t26 0 t26 0 t26 0 V306 H44 Z" fill={fluid}>
          {!reduce && <animateTransform attributeName="transform" type="translate" values="0 0;-26 0;0 0" dur="5s" repeatCount="indefinite" />}
        </path>
        <path d="M70 176 q13 -7 26 0 t26 0 t26 0 t26 0 V306 H70 Z" fill={fluid} opacity={0.6} />
      </g>
      <rect x="44" y="96" width="104" height="210" rx="22" fill="none" stroke={line} strokeWidth={3} />
      <path d="M60 306 V340 M132 306 V340" stroke={line} strokeWidth={3} />
      <path d="M44 150 H148" stroke={line} strokeOpacity={0.15} strokeWidth={1.5} />
      <text x="96" y="132" textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--muted-foreground)" letterSpacing="0.08em">
        TANK
      </text>

      {/* reactor */}
      <g clipPath="url(#plant-tankB)">
        <rect x="436" y="148" width="96" height="158" fill="var(--surface)" />
        <rect x="436" y="214" width="96" height="92" fill={fluid} />
      </g>
      <rect x="436" y="148" width="96" height="158" rx="20" fill="none" stroke={line} strokeWidth={3} />
      <path d="M450 306 V340 M518 306 V340" stroke={line} strokeWidth={3} />
      {/* agitator */}
      <rect x="496" y="112" width="24" height="30" rx="4" fill={soft} stroke={line} strokeWidth={2.5} />
      <path d="M508 142 V262" stroke={line} strokeWidth={2.5} />
      <g transform="translate(508 262)">
        <g>
          {!reduce && <animateTransform attributeName="transform" type="scale" values="1 1;-1 1;1 1" dur="1.6s" repeatCount="indefinite" />}
          <path d="M0 0 L-18 -6 L-18 6 Z M0 0 L18 -6 L18 6 Z" fill="var(--ink)" fillOpacity={0.75} />
        </g>
      </g>
      <text x="472" y="196" textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--muted-foreground)" letterSpacing="0.08em">
        REACTOR
      </text>

      {/* pipes */}
      <Pipe d={suction} />
      <Pipe d={discharge} />

      {/* flanges with gasket on the discharge run */}
      <g transform="translate(360 112)">
        <rect x="-10" y="-17" width="7" height="34" rx="1.5" fill={soft} stroke={line} strokeWidth={2} />
        <rect x="3" y="-17" width="7" height="34" rx="1.5" fill={soft} stroke={line} strokeWidth={2} />
        <rect x="-3" y="-15" width="6" height="30" fill="var(--brass)" />
      </g>

      {/* valve on the riser */}
      <g transform="translate(262 176)">
        <path d="M-17 -22 L17 -22 L-17 22 L17 22 Z" fill={soft} stroke={line} strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M17 0 H34" stroke={line} strokeWidth={3} />
        <rect x="34" y="-5" width="30" height="10" rx="5" fill="var(--ink)" />
      </g>

      {/* pressure gauge */}
      <g transform="translate(410 112)">
        <path d="M0 -8 V-22" stroke={line} strokeWidth={3} />
        <circle cx="0" cy="-34" r="13" fill="var(--surface)" stroke={line} strokeWidth={2.5} />
        <g transform="translate(0 -34)">
          <path d="M0 0 L0 -9" stroke="var(--brass)" strokeWidth={2.2} strokeLinecap="round">
            {!reduce && <animateTransform attributeName="transform" type="rotate" values="-50;40;10;40;-50" dur="6s" repeatCount="indefinite" />}
          </path>
        </g>
      </g>

      {/* pump on baseplate */}
      <rect x="208" y="318" width="214" height="12" rx="3" fill={soft} stroke={line} strokeWidth={2.5} />
      <circle cx="262" cy="282" r="38" fill="var(--surface)" stroke={line} strokeWidth={3} />
      <g transform="translate(262 282)">
        <g>
          {!reduce && <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="2.4s" repeatCount="indefinite" />}
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} d="M0 -9 Q10 -18 8 -27" transform={`rotate(${a})`} fill="none" stroke={line} strokeWidth={2.4} strokeLinecap="round" />
          ))}
          <circle r="7" fill="var(--ink)" />
        </g>
      </g>
      <path d="M244 318 L250 312 M280 318 L274 312" stroke={line} strokeWidth={2.5} />
      {/* seal housing (accent), bearing frame and motor */}
      <rect x="300" y="268" width="14" height="28" rx="2" fill="var(--brass)" stroke={line} strokeWidth={2} />
      {!reduce && (
        <rect x="300" y="268" width="14" height="28" rx="2" fill="none" stroke="var(--brass)" strokeWidth={2}>
          <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="2;9;2" dur="2.2s" repeatCount="indefinite" />
        </rect>
      )}
      <rect x="314" y="272" width="28" height="20" rx="2" fill={soft} stroke={line} strokeWidth={2.5} />
      <rect x="342" y="256" width="72" height="52" rx="8" fill="var(--surface)" stroke={line} strokeWidth={3} />
      {[356, 368, 380, 392, 404].map((x) => (
        <path key={x} d={`M${x} 262 V302`} stroke={line} strokeOpacity={0.25} strokeWidth={2} />
      ))}
      <path d="M352 308 V318 M404 308 V318" stroke={line} strokeWidth={2.5} />

      {/* callouts */}
      <Callout x={307} y={268} tx={318} ty={222} label="Mechanical seal" />
      <Callout x={232} y={300} tx={150} ty={360} label="Pump" anchor="end" />
      <Callout x={245} y={170} tx={198} ty={150} label="Valve" anchor="end" />
      <Callout x={360} y={95} tx={340} ty={40} label="Gasket" anchor="end" />
    </svg>
  );
}
