/* Half-section of a single-spring mechanical seal on its shaft, used on the Find My Seal results
   to show where each recommended choice goes. Numbered markers match the list beside it. Face
   colours follow the recommended face pair (carbon is dark, silicon or tungsten carbide grey). */

const INK = "var(--ink)";
const SOFT = "color-mix(in oklab, var(--ink) 7%, var(--surface))";
const STEEL = "color-mix(in oklab, var(--ink) 18%, var(--surface))";
const STEEL_DARK = "color-mix(in oklab, var(--ink) 38%, var(--surface))";
const FLUID = "color-mix(in oklab, var(--brass) 14%, var(--surface))";
const ACCENT = "var(--brass)";

const CARBON = "#2a2f37";
const SIC = "#9aa6b6";
const TC = "#6f7884";
const CERAMIC = "#e6e9ee";

function faceColours(faces: string) {
  const [rot = "", seat = ""] = faces.toLowerCase().split(" vs ");
  const pick = (m: string) => (m.includes("silicon") ? SIC : m.includes("tungsten") ? TC : m.includes("ceramic") ? CERAMIC : CARBON);
  return { rotary: pick(rot), seat: pick(seat || "silicon carbide") };
}

export function SealSpecDiagram({ faces, className }: { faces: string; className?: string }) {
  const { rotary, seat } = faceColours(faces);
  const spring: string[] = [];
  for (let i = 0, x = 234; x <= 326; i++, x += 13) spring.push(`${x} ${i % 2 ? 196 : 142}`);

  const Badge = ({ n, x, y, tx, ty }: { n: number; x: number; y: number; tx: number; ty: number }) => (
    <g>
      <path d={`M${x} ${y} L${tx} ${ty}`} stroke={ACCENT} strokeWidth={1.4} strokeDasharray="2 3" />
      <circle cx={tx} cy={ty} r={3.5} fill={ACCENT} />
      <circle cx={x} cy={y} r={13} fill={ACCENT} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fontWeight={800} fill="white">
        {n}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label={`Half-section of a mechanical seal showing the recommended faces (${faces}), O-rings, spring and metal parts`}>
      <defs>
        <pattern id="spec-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeOpacity={0.16} strokeWidth={1.3} />
        </pattern>
      </defs>

      {/* process fluid in the seal chamber */}
      <rect x={170} y={56} width={406} height={158} fill={FLUID} />
      <text x={560} y={190} textAnchor="end" fontSize={11} fontWeight={700} fill="var(--muted-foreground)" letterSpacing="0.08em">
        PROCESS FLUID
      </text>

      {/* chamber housing */}
      <path d="M150 24 H600 V206 H576 V56 H150 Z" fill={SOFT} />
      <path d="M150 24 H600 V206 H576 V56 H150 Z" fill="url(#spec-hatch)" stroke={INK} strokeWidth={2} />

      {/* gland plate with stud */}
      <rect x={96} y={24} width={54} height={182} fill={SOFT} />
      <rect x={96} y={24} width={54} height={182} fill="url(#spec-hatch)" stroke={INK} strokeWidth={2} />
      <rect x={80} y={36} width={84} height={10} rx={2} fill={STEEL_DARK} stroke={INK} strokeWidth={1.5} />

      {/* shaft */}
      <rect x={0} y={214} width={640} height={48} fill={STEEL} stroke={INK} strokeWidth={2} />
      <path d="M0 262 H640" stroke={INK} strokeOpacity={0.35} strokeWidth={1.2} strokeDasharray="14 4 3 4" />

      {/* stationary seat and its O-ring */}
      <rect x={140} y={108} width={30} height={98} rx={2} fill={seat} stroke={INK} strokeWidth={2} />
      <circle cx={155} cy={103} r={7} fill={INK} />

      {/* rotary face, retainer and secondary O-ring */}
      <rect x={170} y={118} width={26} height={90} rx={2} fill={rotary} stroke={INK} strokeWidth={2} />
      <rect x={196} y={126} width={38} height={84} rx={3} fill={STEEL} stroke={INK} strokeWidth={2} />
      <circle cx={215} cy={207} r={6.5} fill={INK} />

      {/* sealing interface */}
      <path d="M170 118 V208" stroke={ACCENT} strokeWidth={3.5} />

      {/* spring */}
      <polyline points={spring.join(" ")} fill="none" stroke={STEEL_DARK} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={spring.join(" ")} fill="none" stroke={INK} strokeOpacity={0.6} strokeWidth={1.2} strokeLinejoin="round" />

      {/* drive collar with set screw */}
      <rect x={330} y={150} width={44} height={62} rx={3} fill={STEEL} stroke={INK} strokeWidth={2} />
      <rect x={345} y={140} width={14} height={12} rx={1.5} fill={STEEL_DARK} stroke={INK} strokeWidth={1.5} />

      <text x={12} y={204} fontSize={11} fontWeight={700} fill="var(--muted-foreground)" letterSpacing="0.08em">
        ← MOTOR SIDE
      </text>

      <Badge n={1} x={282} y={88} tx={282} ty={146} />
      <Badge n={2} x={205} y={88} tx={172} ty={124} />
      <Badge n={3} x={118} y={84} tx={152} ty={100} />
      <Badge n={4} x={404} y={110} tx={372} ty={160} />
    </svg>
  );
}
