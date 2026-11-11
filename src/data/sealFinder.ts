/* Seal finder knowledge base.
   Questions, the catalog items they can point to, and the rules that turn a set of answers
   into a ranked shortlist plus a recommended specification (faces, elastomer, metallurgy, arrangement).
   Product slugs match the live catalog; the results page only shows items the catalog still returns. */

export type EquipmentId = "centrifugal" | "oem-pump" | "agitator" | "rotary" | "gearbox" | "static";
export type IndustryId =
  | "chemical"
  | "food"
  | "pharma"
  | "water"
  | "oilgas"
  | "textile"
  | "sugar"
  | "general";
export type MediaId = "water" | "hotwater" | "chemical" | "slurry" | "oil" | "hygienic" | "air";
export type TempId = "ambient" | "warm" | "hot" | "extreme" | "unsure";
export type PressureId = "low" | "medium" | "high" | "very-high" | "unsure";
export type SpeedId = "slow" | "standard" | "fast" | "unsure";
export type PriorityId = "zero-leak" | "long-life" | "drop-in" | "fast" | "budget" | "hygienic";

export type Answers = {
  equipment?: EquipmentId;
  industry?: IndustryId;
  media?: MediaId;
  temperature?: TempId;
  pressure?: PressureId;
  speed?: SpeedId;
  priorities: PriorityId[];
  shaft?: string;
  existing?: string;
  machine?: string;
  quantity?: string;
};

export const EMPTY_ANSWERS: Answers = { priorities: [] };

export type Option<T extends string> = { id: T; label: string; hint: string };

export const EQUIPMENT: Option<EquipmentId>[] = [
  {
    id: "centrifugal",
    label: "Centrifugal / process pump",
    hint: "End-suction, monoblock, split-case or slurry pumps",
  },
  {
    id: "oem-pump",
    label: "Grundfos or OEM pump",
    hint: "Vertical multistage pumps that need a drop-in seal",
  },
  {
    id: "agitator",
    label: "Agitator, reactor or mixer",
    hint: "Top-entry vessels, glass-lined and SS reactors",
  },
  {
    id: "rotary",
    label: "Rotating drum or roll",
    hint: "Steam, water or oil through a turning shaft: dryers, calenders",
  },
  {
    id: "gearbox",
    label: "Gearbox, motor or shaft",
    hint: "Keeping lubricant in and dust or water out",
  },
  {
    id: "static",
    label: "Flange, door or pipe joint",
    hint: "Static sealing: flanges, tri-clovers, vessel and oven doors",
  },
];

export const INDUSTRIES: Option<IndustryId>[] = [
  { id: "chemical", label: "Chemical processing", hint: "Acids, alkalis, solvents, intermediates" },
  { id: "food", label: "Food, dairy & beverage", hint: "Milk, juices, syrups, CIP lines" },
  { id: "pharma", label: "Pharma & biotech", hint: "Cleanroom, WFI, API manufacture" },
  { id: "water", label: "Water & wastewater", hint: "Treatment plants, effluent, utilities" },
  { id: "oilgas", label: "Oil, gas & power", hint: "Hydrocarbons, boiler feed, thermal oil" },
  { id: "textile", label: "Paper, textile & dye", hint: "Pulp, dye baths, calender rolls" },
  { id: "sugar", label: "Sugar, distillery & brewery", hint: "Juice, molasses, wort, spent wash" },
  { id: "general", label: "General engineering", hint: "Utilities, cooling, HVAC, other plants" },
];

export const MEDIA: Option<MediaId>[] = [
  { id: "water", label: "Clean water", hint: "Raw, treated or cooling water" },
  {
    id: "hotwater",
    label: "Hot water, steam or condensate",
    hint: "Boiler feed, hot water circuits",
  },
  {
    id: "chemical",
    label: "Acids, alkalis or solvents",
    hint: "Corrosive or aggressive chemicals",
  },
  {
    id: "slurry",
    label: "Slurry or abrasive solids",
    hint: "Lime, sand, pulp, effluent with grit",
  },
  { id: "oil", label: "Oil, fuel or hydrocarbons", hint: "Lube oil, diesel, thermic fluid" },
  {
    id: "hygienic",
    label: "Food or pharma product",
    hint: "Anything that must stay clean and compliant",
  },
  { id: "air", label: "Air, gas or dry running", hint: "Blowers, powders, no liquid at the faces" },
];

export const TEMPERATURES: Option<TempId>[] = [
  { id: "ambient", label: "Up to 80 °C", hint: "Ambient to warm" },
  { id: "warm", label: "80 – 150 °C", hint: "Hot process" },
  { id: "hot", label: "150 – 250 °C", hint: "High temperature" },
  { id: "extreme", label: "Above 250 °C", hint: "Thermal oil, steam" },
  { id: "unsure", label: "Not sure", hint: "We'll confirm" },
];

export const PRESSURES: Option<PressureId>[] = [
  { id: "low", label: "Up to 5 bar", hint: "Most transfer duties" },
  { id: "medium", label: "5 – 16 bar", hint: "Process pumps" },
  { id: "high", label: "16 – 40 bar", hint: "Multistage, boiler feed" },
  { id: "very-high", label: "Above 40 bar", hint: "High-pressure service" },
  { id: "unsure", label: "Not sure", hint: "We'll confirm" },
];

export const SPEEDS: Option<SpeedId>[] = [
  { id: "slow", label: "Below 500 rpm", hint: "Agitators, rolls" },
  { id: "standard", label: "Around 1450 rpm", hint: "4-pole motors" },
  { id: "fast", label: "2900 rpm or more", hint: "2-pole, high speed" },
  { id: "unsure", label: "Not sure", hint: "We'll confirm" },
];

export const PRIORITIES: Option<PriorityId>[] = [
  { id: "zero-leak", label: "Zero leakage", hint: "Toxic, flammable or costly media" },
  { id: "long-life", label: "Longest life", hint: "Fewer shutdowns between overhauls" },
  { id: "drop-in", label: "Drop-in replacement", hint: "Must fit my existing seal chamber" },
  { id: "fast", label: "Needed fast", hint: "Ship from stock, minimal lead time" },
  { id: "budget", label: "Lowest cost", hint: "Simple, economical design is fine" },
  { id: "hygienic", label: "FDA / hygienic", hint: "Food-contact or cleanroom compliant" },
];

export const MAX_PRIORITIES = 3;

/* ───────────── Catalog knowledge ───────────── */

type Affinity<T extends string> = Partial<Record<T, number>>;

export type FinderProduct = {
  slug: string;
  name: string;
  category: string;
  /** Equipment it belongs on. Anything not listed is filtered out. */
  equipment: Affinity<EquipmentId>;
  media?: Affinity<MediaId>;
  temperature?: Affinity<TempId>;
  pressure?: Affinity<PressureId>;
  speed?: Affinity<SpeedId>;
  industry?: Affinity<IndustryId>;
  priorities?: Affinity<PriorityId>;
  strengths: string[];
};

export const FINDER_PRODUCTS: FinderProduct[] = [
  {
    slug: "cartridge-seals",
    name: "Cartridge Seals",
    category: "mechanical-seals",
    equipment: { centrifugal: 3, agitator: 1 },
    media: { chemical: 2, slurry: 2, hotwater: 2, water: 1, oil: 2, hygienic: 1 },
    temperature: { ambient: 1, warm: 2, hot: 1 },
    pressure: { low: 1, medium: 2, high: 2, "very-high": -1 },
    speed: { standard: 1, fast: 1 },
    industry: { chemical: 1, textile: 1, sugar: 1, oilgas: 1 },
    priorities: { "long-life": 3, "drop-in": 1, fast: 1, budget: -2, "zero-leak": 1 },
    strengths: [
      "Pre-assembled and pre-set at the factory, so no measuring or setting errors on site",
      "Springs sit out of the product, so solids and crystals can't clog them",
      "Fits a standard seal chamber and swaps out in minutes",
    ],
  },
  {
    slug: "double-cartridge-seal",
    name: "Double Cartridge Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3, agitator: 1 },
    media: { chemical: 3, slurry: 3, oil: 2, hotwater: 1, water: -1, air: 1 },
    temperature: { ambient: 1, warm: 2, hot: 2 },
    pressure: { medium: 2, high: 3, "very-high": 2, low: 0 },
    industry: { chemical: 2, oilgas: 2, pharma: 1, textile: 1 },
    priorities: { "zero-leak": 4, "long-life": 2, budget: -3, fast: -1 },
    strengths: [
      "Two seals with a pressurised barrier fluid between them, so the product never reaches the atmosphere",
      "The safe choice for toxic, flammable or crystallising media",
      "Barrier fluid keeps the faces cool and clean in slurry service",
    ],
  },
  {
    slug: "multi-spring",
    name: "Multi Spring Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3, agitator: 1 },
    media: { chemical: 2, water: 1, hotwater: 1, oil: 2, slurry: -2 },
    temperature: { ambient: 1, warm: 2, hot: 1 },
    pressure: { low: 1, medium: 2, high: 2 },
    speed: { standard: 1, fast: 2 },
    industry: { chemical: 1, oilgas: 1 },
    priorities: { "long-life": 1, "drop-in": 1 },
    strengths: [
      "Many small springs give even face loading on larger shafts",
      "Rotation in either direction and stable at high speed",
      "Compact axial length for tight seal chambers",
    ],
  },
  {
    slug: "metal-bellow",
    name: "Metal Bellow Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3, agitator: 1 },
    media: { oil: 3, hotwater: 2, chemical: 1, slurry: -2 },
    temperature: { warm: 1, hot: 3, extreme: 4, ambient: -1 },
    pressure: { low: 1, medium: 2, high: 1, "very-high": -2 },
    industry: { oilgas: 3, textile: 1, chemical: 1 },
    priorities: { "long-life": 2, budget: -2 },
    strengths: [
      "A welded metal bellows replaces the springs and the dynamic O-ring",
      "Runs where rubber would harden: thermic fluid, hot oil and hot hydrocarbons",
      "No elastomer hang-up, so faces keep tracking at high temperature",
    ],
  },
  {
    slug: "teflon-bellow",
    name: "Teflon Bellow Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3 },
    media: { chemical: 4, slurry: -1, oil: 0, water: -1 },
    temperature: { ambient: 2, warm: 2, hot: -1, extreme: -3 },
    pressure: { low: 2, medium: 1, high: -2, "very-high": -3 },
    industry: { chemical: 3, pharma: 1, textile: 2 },
    priorities: { budget: 1, "long-life": 1 },
    strengths: [
      "Every wetted part is PTFE or ceramic, inert to nearly all acids and alkalis",
      "Springs are mounted outside the product, safe from corrosion",
      "Widely used on acid transfer and dye-bath pumps",
    ],
  },
  {
    slug: "rubber-bellow",
    name: "Rubber Bellow Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3 },
    media: { water: 3, hotwater: 1, slurry: 1, hygienic: 1, chemical: -2, oil: 0 },
    temperature: { ambient: 3, warm: 1, hot: -3, extreme: -4 },
    pressure: { low: 3, medium: 1, high: -2, "very-high": -3 },
    industry: { water: 3, general: 2, sugar: 1 },
    priorities: { budget: 3, fast: 2, "drop-in": 1 },
    strengths: [
      "Flexible bellows absorbs shaft movement and misalignment",
      "Economical, widely stocked and easy to fit",
      "Proven on water, wastewater and general utility pumps",
    ],
  },
  {
    slug: "single-spring",
    name: "Single Spring Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3 },
    media: { water: 3, hotwater: 2, oil: 1, hygienic: 1, slurry: -3, chemical: -1 },
    temperature: { ambient: 2, warm: 2, hot: -1, extreme: -3 },
    pressure: { low: 2, medium: 1, high: -1, "very-high": -3 },
    speed: { standard: 1, fast: -1 },
    industry: { water: 2, general: 2, food: 1 },
    priorities: { budget: 3, fast: 2 },
    strengths: [
      "Simple and robust: one large spring that tolerates light deposits",
      "The most economical mechanical seal for clean liquids",
      "Readily available in common shaft sizes",
    ],
  },
  {
    slug: "conical-spring",
    name: "Conical Spring Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3 },
    media: { water: 3, hotwater: 1, hygienic: 1, slurry: -3, chemical: -1 },
    temperature: { ambient: 2, warm: 1, hot: -2, extreme: -3 },
    pressure: { low: 3, medium: 0, high: -2, "very-high": -3 },
    industry: { water: 2, general: 2, food: 1 },
    priorities: { budget: 3, fast: 2 },
    strengths: [
      "Tapered spring for small shafts and short seal chambers",
      "Low cost, ideal for monoblock and domestic-duty pumps",
      "Easy to stock as a quick-change spare",
    ],
  },
  {
    slug: "wave-spring",
    name: "Wave Spring Seal",
    category: "mechanical-seals",
    equipment: { centrifugal: 3 },
    media: { water: 2, hotwater: 2, oil: 1, hygienic: 2, chemical: 1, slurry: -2 },
    temperature: { ambient: 1, warm: 2, hot: 0 },
    pressure: { low: 2, medium: 2, high: -1 },
    speed: { fast: 1 },
    industry: { food: 2, pharma: 1, general: 1 },
    priorities: { "drop-in": 1, hygienic: 1 },
    strengths: [
      "Wave spring is very short, so it fits where coil springs can't",
      "Even face load and smooth, crevice-light profile",
      "Good for hygienic pumps and compact designs",
    ],
  },
  {
    slug: "grundfos",
    name: "Grundfos Replacement Seal",
    category: "mechanical-seals",
    equipment: { "oem-pump": 5 },
    media: { water: 2, hotwater: 2, chemical: 0, hygienic: 0 },
    temperature: { ambient: 1, warm: 1 },
    pressure: { low: 1, medium: 2, high: 2 },
    industry: { water: 1, general: 1 },
    priorities: { "drop-in": 4, fast: 2, budget: 1 },
    strengths: [
      "Direct drop-in for Grundfos CR / CRN vertical multistage pumps",
      "Cartridge construction swaps without dismantling the pump",
      "Matches OEM face and elastomer options",
    ],
  },
  {
    slug: "grundfos-star-type",
    name: "Grundfos Star-Type Seal",
    category: "mechanical-seals",
    equipment: { "oem-pump": 4 },
    media: { water: 2, hotwater: 2 },
    temperature: { ambient: 1, warm: 1 },
    pressure: { low: 1, medium: 2 },
    industry: { water: 1, general: 1 },
    priorities: { "drop-in": 3, fast: 2, budget: 2 },
    strengths: [
      "Star-drive design for older and smaller Grundfos pumps",
      "Economical OEM-equivalent replacement",
      "Common sizes held as stock spares",
    ],
  },
  {
    slug: "agitator-reactor-seal",
    name: "Agitator Reactor Seal",
    category: "mechanical-seals",
    equipment: { agitator: 6 },
    media: { chemical: 2, hygienic: 2, slurry: 1, air: 2, oil: 1 },
    temperature: { ambient: 1, warm: 1, hot: 1 },
    pressure: { low: 2, medium: 1 },
    speed: { slow: 2 },
    industry: { chemical: 2, pharma: 2, food: 1 },
    priorities: { "zero-leak": 2, "long-life": 1 },
    strengths: [
      "Built for top-entry agitators with large shaft run-out",
      "Single, double or dry-running versions for reactors and mixers",
      "Seals vapour as well as liquid, keeping the vessel contained",
    ],
  },
  {
    slug: "rotary-union",
    name: "Rotary Union",
    category: "mechanical-seals",
    equipment: { rotary: 5 },
    media: { water: 2, hotwater: 3, oil: 2, air: 2 },
    temperature: { ambient: 1, warm: 2, hot: 2, extreme: 1 },
    pressure: { low: 1, medium: 2, high: 1 },
    speed: { slow: 2, standard: 1 },
    industry: { textile: 3, general: 1, food: 1 },
    priorities: { "long-life": 1 },
    strengths: [
      "Carries steam, water, coolant or thermal oil into a turning roll",
      "Carbon-graphite faces run with low friction for long service",
      "Single- and dual-passage versions",
    ],
  },
  {
    slug: "rotary-joint",
    name: "Rotary Joint",
    category: "mechanical-seals",
    equipment: { rotary: 5 },
    media: { hotwater: 3, oil: 2, water: 2, air: 1 },
    temperature: { warm: 2, hot: 3, extreme: 2 },
    pressure: { low: 1, medium: 2, high: 1 },
    speed: { slow: 2 },
    industry: { textile: 3, sugar: 1, oilgas: 1 },
    priorities: { "long-life": 2 },
    strengths: [
      "Heavy-duty joint for steam-heated dryer cans and calenders",
      "Self-supporting body handles high temperature and pressure",
      "Rebuildable with replacement seal kits",
    ],
  },
  {
    slug: "oil-seal",
    name: "Oil Seal",
    category: "elastomers",
    equipment: { gearbox: 5 },
    media: { oil: 3, water: 1, air: 1, slurry: 0 },
    temperature: { ambient: 2, warm: 1, hot: -1 },
    pressure: { low: 2, medium: -2, high: -4 },
    priorities: { budget: 2, fast: 2, "drop-in": 2 },
    strengths: [
      "Lip seal that keeps lubricant in and dust or water out",
      "NBR for general duty, FKM for hot or synthetic oils",
      "Single-lip, double-lip and dust-lip profiles in standard sizes",
    ],
  },
  {
    slug: "pu-seal",
    name: "PU Seal",
    category: "elastomers",
    equipment: { gearbox: 3 },
    media: { oil: 2, slurry: 2, water: 1 },
    temperature: { ambient: 2, warm: -1 },
    pressure: { low: 1, medium: 2, high: 1 },
    priorities: { "long-life": 2 },
    strengths: [
      "Polyurethane resists abrasion and extrusion",
      "Good for dirty, reciprocating or hydraulic duty",
      "Outlasts rubber where grit is present",
    ],
  },
  {
    slug: "tri-clover-gaskets",
    name: "Tri-clover Gaskets",
    category: "elastomers",
    equipment: { static: 4 },
    media: { hygienic: 4, water: 1, hotwater: 1 },
    temperature: { ambient: 1, warm: 1 },
    industry: { food: 3, pharma: 3, sugar: 2 },
    priorities: { hygienic: 4, fast: 1 },
    strengths: [
      "Sanitary clamp gasket for tri-clover / TC ferrules",
      "Silicone, EPDM and PTFE grades for food and pharma lines",
      "Crevice-free fit that survives CIP and SIP",
    ],
  },
  {
    slug: "ptfe-envelope-gasket",
    name: "PTFE Envelope Gasket",
    category: "elastomers",
    equipment: { static: 4 },
    media: { chemical: 4, hygienic: 1, oil: 1 },
    temperature: { ambient: 1, warm: 2, hot: 1 },
    industry: { chemical: 3, pharma: 1, textile: 1 },
    priorities: { "long-life": 1 },
    strengths: [
      "PTFE jacket faces the chemical; a soft core does the sealing",
      "Resists virtually all acids, alkalis and solvents",
      "Standard for glass-lined and FRP flanges",
    ],
  },
  {
    slug: "metallic-and-non-metallic-gasket",
    name: "Metallic & Non-Metallic Gasket",
    category: "elastomers",
    equipment: { static: 4 },
    media: { oil: 3, hotwater: 3, chemical: 1, water: 1, air: 1 },
    temperature: { warm: 2, hot: 3, extreme: 3 },
    pressure: { medium: 2, high: 3, "very-high": 3 },
    industry: { oilgas: 3, chemical: 1, general: 1 },
    priorities: { "zero-leak": 2, "long-life": 1 },
    strengths: [
      "Spiral-wound, ring-joint and compressed-fibre gaskets",
      "Rated for steam, hydrocarbons and high-pressure flanges",
      "Cut to ASME, DIN or custom flange drawings",
    ],
  },
  {
    slug: "silicone-inflatable-gasket",
    name: "Silicone Inflatable Gasket",
    category: "silicone",
    equipment: { static: 3 },
    media: { hygienic: 3, air: 2, hotwater: 1 },
    temperature: { ambient: 1, warm: 2, hot: 1 },
    industry: { pharma: 3, food: 2 },
    priorities: { hygienic: 3, "zero-leak": 1 },
    strengths: [
      "Inflates to seal doors on autoclaves, isolators and dryers",
      "Platinum-cured silicone, FDA compliant",
      "Made to your door profile and length",
    ],
  },
  {
    slug: "silicone-endless-gasket",
    name: "Silicone Endless Gasket",
    category: "silicone",
    equipment: { static: 3 },
    media: { hygienic: 3, hotwater: 1, air: 1 },
    temperature: { ambient: 1, warm: 2, hot: 2 },
    industry: { pharma: 2, food: 2 },
    priorities: { hygienic: 3 },
    strengths: [
      "Moulded as one seamless ring, so there's no joint to leak",
      "For vessel manways, sifters and FBD bowls",
      "Handles steam sterilisation",
    ],
  },
  {
    slug: "o-rings",
    name: "O-Rings",
    category: "elastomers",
    equipment: { static: 3, gearbox: 1 },
    media: { water: 2, oil: 2, chemical: 2, hygienic: 2, hotwater: 2, air: 1 },
    temperature: { ambient: 1, warm: 1, hot: 1 },
    pressure: { low: 1, medium: 1 },
    priorities: { fast: 2, budget: 2 },
    strengths: [
      "NBR, EPDM, FKM, FFKM, silicone and PTFE-encapsulated",
      "AS568, metric and custom sizes",
      "The secondary seal inside most mechanical seals",
    ],
  },
];

/** Add-ons worth suggesting alongside the main pick. */
const COMPANIONS: {
  slug: string;
  name: string;
  category: string;
  when: (a: Answers) => boolean;
  why: string;
}[] = [
  {
    slug: "tungsten-carbide-ring",
    name: "Tungsten Carbide Ring",
    category: "rings",
    when: (a) =>
      a.media === "slurry" ||
      a.media === "oil" ||
      a.pressure === "high" ||
      a.pressure === "very-high",
    why: "Hard-wearing seal face for abrasive or high-pressure duty",
  },
  {
    slug: "teflon-ring",
    name: "Teflon Ring",
    category: "rings",
    when: (a) => a.media === "chemical",
    why: "Chemically inert ring and wedge for aggressive media",
  },
  {
    slug: "o-rings",
    name: "O-Rings",
    category: "elastomers",
    when: (a) => a.equipment !== "static",
    why: "Spare secondary O-rings in the right compound for your media",
  },
  {
    slug: "ptfe-envelope-gasket",
    name: "PTFE Envelope Gasket",
    category: "elastomers",
    when: (a) => a.media === "chemical" && a.equipment !== "static",
    why: "Chemical-proof gaskets for the pump's suction and discharge flanges",
  },
  {
    slug: "tri-clover-gaskets",
    name: "Tri-clover Gaskets",
    category: "elastomers",
    when: (a) =>
      (a.media === "hygienic" || a.industry === "food" || a.industry === "pharma") &&
      a.equipment !== "static",
    why: "Sanitary clamp gaskets for the connecting pipework",
  },
  {
    slug: "metallic-and-non-metallic-gasket",
    name: "Metallic & Non-Metallic Gasket",
    category: "elastomers",
    when: (a) =>
      (a.temperature === "hot" || a.temperature === "extreme") && a.equipment !== "static",
    why: "Flange gaskets rated for the same temperature",
  },
  {
    slug: "ss-ring",
    name: "SS Ring",
    category: "rings",
    when: (a) => a.equipment === "centrifugal" || a.equipment === "agitator",
    why: "Stainless sleeves and spacer rings for the seal assembly",
  },
];

/* ───────────── Scoring ───────────── */

const WEIGHTS = {
  equipment: 2,
  media: 1.6,
  temperature: 1.1,
  pressure: 1,
  speed: 0.5,
  industry: 0.6,
  priority: 0.9,
} as const;

export type Match = {
  product: FinderProduct;
  score: number;
  percent: number;
  reasons: string[];
  cautions: string[];
};

const labelOf = <T extends string>(opts: Option<T>[], id?: T) =>
  opts.find((o) => o.id === id)?.label ?? "";

function dim<T extends string>(
  aff: Affinity<T> | undefined,
  value: T | undefined,
  weight: number,
  acc: { score: number; max: number; reasons: string[]; cautions: string[] },
  good: (label: string) => string,
  bad: (label: string) => string,
  label: string,
) {
  if (!value || value === ("unsure" as T)) return;
  acc.max += 3 * weight;
  const v = aff?.[value] ?? 0;
  acc.score += v * weight;
  if (v >= 2) acc.reasons.push(good(label));
  if (v <= -2) acc.cautions.push(bad(label));
}

export function scoreProduct(p: FinderProduct, a: Answers): Match | null {
  if (a.equipment && !p.equipment[a.equipment]) return null;
  const acc = { score: 0, max: 0, reasons: [] as string[], cautions: [] as string[] };

  if (a.equipment) {
    acc.max += 3 * WEIGHTS.equipment;
    acc.score += Math.min(3, p.equipment[a.equipment] ?? 0) * WEIGHTS.equipment;
  }
  dim(
    p.media,
    a.media,
    WEIGHTS.media,
    acc,
    (l) => `Compatible with ${l.toLowerCase()}`,
    (l) => `Not recommended for ${l.toLowerCase()}`,
    labelOf(MEDIA, a.media),
  );
  dim(
    p.temperature,
    a.temperature,
    WEIGHTS.temperature,
    acc,
    (l) => `Rated for ${l}`,
    (l) => `Struggles at ${l}`,
    labelOf(TEMPERATURES, a.temperature),
  );
  dim(
    p.pressure,
    a.pressure,
    WEIGHTS.pressure,
    acc,
    (l) => `Handles ${l.toLowerCase()}`,
    (l) => `Not designed for ${l.toLowerCase()}`,
    labelOf(PRESSURES, a.pressure),
  );
  dim(
    p.speed,
    a.speed,
    WEIGHTS.speed,
    acc,
    (l) => `Stable at ${l.toLowerCase()}`,
    (l) => `Less stable at ${l.toLowerCase()}`,
    labelOf(SPEEDS, a.speed),
  );
  dim(
    p.industry,
    a.industry,
    WEIGHTS.industry,
    acc,
    (l) => `Widely used in ${l.toLowerCase()}`,
    () => "",
    labelOf(INDUSTRIES, a.industry),
  );

  for (const pr of a.priorities) {
    acc.max += 3 * WEIGHTS.priority;
    const v = p.priorities?.[pr] ?? 0;
    acc.score += Math.min(3, v) * WEIGHTS.priority;
    if (v >= 2) acc.reasons.push(`Meets your “${labelOf(PRIORITIES, pr).toLowerCase()}” priority`);
    if (v <= -2)
      acc.cautions.push(`Works against your “${labelOf(PRIORITIES, pr).toLowerCase()}” priority`);
  }

  const percent = acc.max
    ? Math.round(Math.max(18, Math.min(98, (acc.score / acc.max) * 100)))
    : 50;
  return {
    product: p,
    score: acc.score,
    percent,
    reasons: acc.reasons,
    cautions: acc.cautions.filter(Boolean),
  };
}

export function rankProducts(a: Answers): Match[] {
  return FINDER_PRODUCTS.map((p) => scoreProduct(p, a))
    .filter((m): m is Match => !!m)
    .sort((x, y) => y.percent - x.percent || y.score - x.score);
}

export function companionsFor(a: Answers, exclude: string[]) {
  return COMPANIONS.filter((c) => c.when(a) && !exclude.includes(c.slug)).slice(0, 3);
}

export const fitLabel = (pct: number) =>
  pct >= 75 ? "Strong fit" : pct >= 55 ? "Good fit" : "Possible fit";

/* ───────────── Recommended specification ───────────── */

export type SpecRow = { label: string; value: string; note: string };

const isHot = (a: Answers) => a.temperature === "hot" || a.temperature === "extreme";
const isHighP = (a: Answers) => a.pressure === "high" || a.pressure === "very-high";

export function buildSpec(a: Answers): SpecRow[] {
  const rows: SpecRow[] = [];
  const rotating =
    a.equipment === "centrifugal" ||
    a.equipment === "oem-pump" ||
    a.equipment === "agitator" ||
    a.equipment === "rotary";
  const hygienic =
    a.media === "hygienic" ||
    a.priorities.includes("hygienic") ||
    a.industry === "pharma" ||
    a.industry === "food";

  if (rotating) {
    const faces: Record<MediaId, [string, string]> = {
      water: [
        "Carbon vs silicon carbide",
        "Carbon vs ceramic is a cheaper option for cold, clean water",
      ],
      hotwater: [
        "Carbon vs silicon carbide",
        "Carbon runs cool and resists blistering in hot water",
      ],
      chemical: [
        "Silicon carbide vs silicon carbide",
        "Use antimony-free carbon vs SiC for milder chemicals",
      ],
      slurry: [
        "Silicon carbide vs silicon carbide",
        "Tungsten carbide vs SiC if there are impacts or large solids",
      ],
      oil: ["Carbon vs tungsten carbide", "Tolerates the poor lubricity of light hydrocarbons"],
      hygienic: ["Food-grade carbon vs silicon carbide", "FDA-compliant carbon grade"],
      air: [
        "Carbon vs silicon carbide (dry-running grade)",
        "Needs a dry-running or gas-lubricated design",
      ],
    };
    const f = a.media
      ? faces[a.media]
      : ["Carbon vs silicon carbide", "Our default until we know the media"];
    rows.push({ label: "Seal faces", value: f[0], note: f[1] });
  }

  // Elastomer
  let elast: [string, string];
  if (a.temperature === "extreme")
    elast = [
      "Flexible graphite or FFKM",
      "Above 250 °C, avoid dynamic rubber: choose a metal bellow",
    ];
  else if (a.media === "chemical")
    elast =
      isHot(a) || a.priorities.includes("zero-leak")
        ? ["FFKM (perfluoroelastomer)", "Resists nearly every chemical up to ~300 °C"]
        : [
            "FKM (Viton) or PTFE",
            "Check the exact chemical; we confirm against a compatibility chart",
          ];
  else if (hygienic)
    elast = [
      "FDA EPDM or platinum-cured silicone",
      a.industry === "pharma"
        ? "USP Class VI grades available for pharma"
        : "Survives CIP and steam cleaning",
    ];
  else if (a.media === "hotwater")
    elast = ["EPDM (peroxide-cured)", "Best for hot water and steam; never use EPDM with oil"];
  else if (a.media === "oil")
    elast =
      isHot(a) || a.temperature === "warm"
        ? ["FKM (Viton)", "Holds up to hot and synthetic oils"]
        : ["NBR (nitrile)", "Economical and oil-resistant below ~100 °C"];
  else if (a.media === "slurry")
    elast = ["EPDM or FKM", "Chosen to suit the carrier liquid's chemistry"];
  else elast = ["NBR or EPDM", "NBR for oily water, EPDM for clean or hot water"];
  rows.push({
    label:
      a.equipment === "static" || a.equipment === "gearbox" ? "Material" : "Elastomer (O-rings)",
    value: elast[0],
    note: elast[1],
  });

  // Metallurgy
  if (a.equipment !== "static" && a.equipment !== "gearbox") {
    const metal: [string, string] =
      a.media === "chemical"
        ? ["SS316 or Hastelloy C", "Hastelloy C for chlorides, hydrochloric acid or bleach"]
        : hygienic
          ? ["SS316L, polished", "Smooth, crevice-free surfaces for cleanability"]
          : a.media === "water" || a.media === "hotwater"
            ? ["SS304 or SS316", "SS316 for treated or chlorinated water"]
            : ["SS316", "Our standard for process duty"];
    rows.push({ label: "Metal parts", value: metal[0], note: metal[1] });
  }

  // Arrangement / flush plan
  if (a.equipment === "centrifugal" || a.equipment === "oem-pump") {
    let arr: [string, string];
    if (
      a.priorities.includes("zero-leak") ||
      a.pressure === "very-high" ||
      (a.media === "chemical" && a.industry === "oilgas")
    )
      arr = [
        "Double seal, pressurised barrier (API Plan 53A / 54)",
        "Barrier fluid stays at higher pressure than the product, so nothing leaks out",
      ];
    else if (a.media === "slurry")
      arr = [
        "Single cartridge with clean external flush (Plan 32)",
        "Clean water pushes solids away from the faces",
      ];
    else if (a.media === "hotwater" && isHot(a))
      arr = [
        "Single seal with cooled flush (Plan 23)",
        "Keeps hot water from flashing at the seal faces",
      ];
    else if (a.media === "air")
      arr = [
        "Dry-running or double seal with buffer (Plan 52)",
        "Faces must never run without lubrication",
      ];
    else
      arr = [
        "Single seal with product flush (Plan 11)",
        "Simple, reliable arrangement for clean duty",
      ];
    rows.push({ label: "Arrangement", value: arr[0], note: arr[1] });
  } else if (a.equipment === "agitator") {
    rows.push({
      label: "Arrangement",
      value:
        a.priorities.includes("zero-leak") || a.media === "chemical"
          ? "Double seal with thermosyphon pot"
          : "Single dry-running seal",
      note: "Top-entry agitator seals must handle shaft run-out and vessel pressure or vacuum",
    });
  } else if (a.equipment === "static") {
    rows.push({
      label: "Gasket style",
      value:
        isHighP(a) || isHot(a)
          ? "Spiral-wound or ring-joint"
          : hygienic
            ? "Moulded sanitary profile"
            : a.media === "chemical"
              ? "PTFE envelope"
              : "Cut or moulded soft gasket",
      note: "We cut to your flange standard or drawing",
    });
  } else if (a.equipment === "gearbox") {
    rows.push({
      label: "Lip profile",
      value:
        a.media === "slurry" || a.media === "water"
          ? "Double lip with dust lip"
          : "Single lip with spring",
      note: "Extra lip keeps water and grit away from the oil",
    });
  }

  return rows;
}

/** Practical warnings based on the duty. */
export function watchOuts(a: Answers): string[] {
  const out: string[] = [];
  if (a.media === "slurry")
    out.push(
      "Avoid seals with springs in the product: solids pack around them and the faces stop closing.",
    );
  if (a.media === "air")
    out.push("Never let a liquid-lubricated seal run dry, even for a few seconds at start-up.");
  if (a.media === "hotwater" && isHot(a))
    out.push(
      "Hot water can flash to steam at the faces. A cooled flush or a cooler seal chamber prevents this.",
    );
  if (isHot(a))
    out.push(
      "Standard rubber bellows harden above about 120 °C. Choose a metal bellow or a cartridge with high-temperature O-rings.",
    );
  if (a.media === "chemical")
    out.push(
      "Tell us the exact chemical and its concentration. Elastomer choice depends on it more than anything else.",
    );
  if (a.media === "oil")
    out.push("EPDM swells in oil. Make sure any replacement O-rings are NBR or FKM.");
  if (a.pressure === "very-high")
    out.push(
      "Above 40 bar the seal must be balanced. Unbalanced designs will overheat and wear fast.",
    );
  if (a.speed === "fast")
    out.push(
      "At 2900 rpm and above, prefer a stationary-spring or multi-spring design for stability.",
    );
  if (a.equipment === "agitator")
    out.push("Measure shaft run-out at the seal. Agitator seals are sized to it.");
  if (a.media === "hygienic")
    out.push("Ask for FDA or EU 1935/2004 certificates for every wetted elastomer.");
  if (out.length < 2)
    out.push(
      "Fit the seal clean and dry. Most early failures come from dirt or a scratched face during installation.",
    );
  if (out.length < 2) out.push("Flush the seal chamber and vent air before starting the pump.");
  return out.slice(0, 4);
}

/** What our team needs to quote accurately. `done` marks what the visitor already gave us. */
export function checklist(a: Answers) {
  const rotating = a.equipment !== "static" && a.equipment !== "gearbox";
  return [
    {
      label: rotating ? "Shaft or sleeve diameter (mm)" : "Size or flange standard",
      done: !!a.shaft?.trim(),
    },
    {
      label: rotating ? "Pump or machine make and model" : "Equipment make and model",
      done: !!a.machine?.trim(),
    },
    {
      label: "Current seal brand / part number, or a photo of the old seal",
      done: !!a.existing?.trim(),
    },
    {
      label: "Exact media name and concentration",
      done: a.media !== undefined && a.media !== "chemical",
    },
    {
      label: "Operating temperature and pressure",
      done:
        !!a.temperature && a.temperature !== "unsure" && !!a.pressure && a.pressure !== "unsure",
    },
    { label: "Quantity required", done: !!a.quantity?.trim() },
  ];
}

/* ───────────── Summaries ───────────── */

export function dutyRows(a: Answers) {
  return [
    { step: 0, label: "Equipment", value: labelOf(EQUIPMENT, a.equipment) },
    { step: 1, label: "Industry", value: labelOf(INDUSTRIES, a.industry) },
    { step: 2, label: "Media", value: labelOf(MEDIA, a.media) },
    {
      step: 3,
      label: "Conditions",
      value:
        [
          labelOf(TEMPERATURES, a.temperature),
          labelOf(PRESSURES, a.pressure),
          a.speed && a.speed !== "unsure" ? labelOf(SPEEDS, a.speed) : "",
        ]
          .filter((s) => s && s !== "Not sure")
          .join(" · ") || (a.temperature ? "To confirm" : ""),
    },
    {
      step: 4,
      label: "Priorities",
      value: a.priorities.map((p) => labelOf(PRIORITIES, p)).join(", "),
    },
    {
      step: 5,
      label: "Details",
      value: [
        a.shaft && `Ø${a.shaft.replace(/\s*mm$/i, "")} mm`,
        a.machine,
        a.existing,
        a.quantity && `Qty ${a.quantity}`,
      ]
        .filter(Boolean)
        .join(" · "),
    },
  ];
}

export function specText(a: Answers, top?: Match) {
  const lines = ["SEAL FINDER — DUTY SHEET", ""];
  for (const r of dutyRows(a)) if (r.value) lines.push(`${r.label}: ${r.value}`);
  lines.push("", "RECOMMENDED SPECIFICATION");
  for (const r of buildSpec(a)) lines.push(`${r.label}: ${r.value}`);
  if (top) lines.push("", `Suggested product: ${top.product.name} (${top.percent}% match)`);
  return lines.join("\n");
}

/* ───────────── Share links ───────────── */

export function encodeAnswers(a: Answers): string {
  const json = JSON.stringify(a);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeAnswers(s: string): Answers | null {
  try {
    const json = decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));
    const v = JSON.parse(json);
    if (!v || typeof v !== "object") return null;
    const pick = <T extends string>(opts: Option<T>[], x: unknown) =>
      opts.some((o) => o.id === x) ? (x as T) : undefined;
    const str = (x: unknown) => (typeof x === "string" ? x.slice(0, 80) : undefined);
    return {
      equipment: pick(EQUIPMENT, v.equipment),
      industry: pick(INDUSTRIES, v.industry),
      media: pick(MEDIA, v.media),
      temperature: pick(TEMPERATURES, v.temperature),
      pressure: pick(PRESSURES, v.pressure),
      speed: pick(SPEEDS, v.speed),
      priorities: Array.isArray(v.priorities)
        ? v.priorities
            .filter((p: unknown) => PRIORITIES.some((o) => o.id === p))
            .slice(0, MAX_PRIORITIES)
        : [],
      shaft: str(v.shaft),
      existing: str(v.existing),
      machine: str(v.machine),
      quantity: str(v.quantity),
    };
  } catch {
    return null;
  }
}

export const isComplete = (a: Answers) =>
  !!(a.equipment && a.industry && a.media && a.temperature && a.pressure);
