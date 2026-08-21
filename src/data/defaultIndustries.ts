export interface IndustrySector {
  id?: string;
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  duty: string;
  compliance?: string | null;
  applications: string[];
  products?: { name: string; slug: string }[];
  priority?: number;
}

export const DEFAULT_SECTORS_DATA: IndustrySector[] = [
  {
    slug: "food-processing",
    name: "Food Processing",
    tagline: "Hygienic. Traceable. Food-safe.",
    desc: "From dairy lines to bakery and edible-oil plants, we supply sanitary pumps, gaskets and tubing that meet strict food-contact norms and clean-in-place routines.",
    image: "/images/cat-silicone.jpg",
    duty: "CIP / SIP · 80 – 140 °C",
    applications: ["Dairy transfer", "Edible oil dosing", "CIP/SIP loops", "Ingredient blending"],
    products: [
      { name: "SS Milk Pump", slug: "pumps" },
      { name: "Tri-clover Gaskets", slug: "elastomers" },
      { name: "Silicone Tubing", slug: "silicone" },
    ],
    compliance: "Food-grade FDA / 3A style compliant components",
    priority: 1,
  },
  {
    slug: "chemical",
    name: "Chemical",
    tagline: "Aggressive media. Zero compromise.",
    desc: "FFKM, PTFE and metal-bellow assemblies built to survive acids, solvents and thermal cycling across reactor and transfer duty.",
    image: "/images/cat-elastomers.jpg",
    duty: "Up to 250 °C · abrasive & corrosive",
    applications: ["Reactor sealing", "Solvent transfer", "Acid dosing", "Filtration skids"],
    products: [
      { name: "Agitator Reactor Seal", slug: "mechanical-seals" },
      { name: "PTFE Envelope Gasket", slug: "elastomers" },
      { name: "Metal Bellow Seal", slug: "mechanical-seals" },
    ],
    compliance: "Chemical-resistant elastomers and PTFE-lined parts",
    priority: 2,
  },
  {
    slug: "beverages",
    name: "Beverages",
    tagline: "Clean fill. Consistent flavour.",
    desc: "Sanitary tri-clover fittings, platinum-cured silicone tubing and hygienic pump packages tuned for carbonated drinks, juices and dairy beverages.",
    image: "/images/cat-hoses.jpg",
    duty: "Sanitary · low-shear",
    applications: ["Bottling lines", "Juice pasteurisation", "Syrup dosing", "Carbonation loops"],
    products: [
      { name: "Platinum-Cured Silicone Hose", slug: "hoses" },
      { name: "Tri-clover Clamps", slug: "stainless-steel" },
      { name: "Sanitary Butterfly Gasket", slug: "elastomers" },
    ],
    priority: 3,
  },
  {
    slug: "breweries",
    name: "Breweries",
    tagline: "Wort to bottle — sealed tight.",
    desc: "Process pumps, seals and hoses engineered for brewhouse temperature swings and cleaning cycles without loss of flavour compounds.",
    image: "/images/cat-pumps.jpg",
    duty: "Sanitary · 4 – 95 °C",
    applications: ["Wort transfer", "Fermenter recirculation", "CIP loops", "Bottling / kegging"],
    products: [
      { name: "Centrifugal Pump", slug: "pumps" },
      { name: "Cartridge Seal", slug: "mechanical-seals" },
      { name: "Silicone Bellows", slug: "silicone" },
    ],
    priority: 4,
  },
  {
    slug: "plastics",
    name: "Plastics",
    tagline: "Wear parts that outlast the shift.",
    desc: "Boron and tungsten carbide nozzles, Nylatron machining stock and abrasion-resistant seals for extrusion, moulding and masterbatch lines.",
    image: "/images/cat-nozzles.jpg",
    duty: "High-abrasion · 24×7 duty",
    applications: ["Injection moulding", "Extrusion", "Masterbatch dosing", "Pellet handling"],
    products: [
      { name: "Tungsten Carbide Nozzle", slug: "nozzles" },
      { name: "Nylatron Rod", slug: "other" },
      { name: "Wave Spring", slug: "springs" },
    ],
    priority: 5,
  },
  {
    slug: "pharma",
    name: "Pharma",
    tagline: "Cleanroom-ready components.",
    desc: "Diaphragms, o-rings and silicone parts validated for API manufacturing, formulation and sterile processing environments.",
    image: "/images/cat-seals.jpg",
    duty: "USP Class VI style materials",
    applications: ["API reactors", "Formulation vessels", "Sterile fill", "Autoclave gaskets"],
    products: [
      { name: "Silicone Diaphragms", slug: "silicone" },
      { name: "FFKM O-Rings", slug: "elastomers" },
      { name: "Double Cartridge Seal", slug: "mechanical-seals" },
    ],
    compliance: "USP Class VI style silicone & FFKM available",
    priority: 6,
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    tagline: "Built for pressure. Safe by design.",
    desc: "HNBR seals, non-sparking safety tools and metal bellows for upstream, midstream and refinery service where failure is not an option.",
    image: "/images/cat-valves.jpg",
    duty: "Sour service · ATEX-conscious",
    applications: ["Wellhead sealing", "Refinery valves", "Pipeline maintenance", "Explosive zones"],
    products: [
      { name: "Metal Bellow Seal", slug: "mechanical-seals" },
      { name: "Non-Sparking Tools", slug: "other" },
      { name: "Flange End Ball Valve", slug: "valves" },
    ],
    compliance: "Non-sparking tools & HNBR / FFKM elastomers",
    priority: 7,
  },
  {
    slug: "dye-manufacturing",
    name: "Dye Manufacturing",
    tagline: "Chemistry-grade sealing.",
    desc: "Rotary joints, chemical-grade elastomers and rugged pumps engineered for pigment slurries, solvents and reactive dye chemistries.",
    image: "/images/cat-steel.jpg",
    duty: "Corrosive slurries · high solids",
    applications: ["Pigment slurry transfer", "Reactor sealing", "Solvent recovery", "Drum unloading"],
    products: [
      { name: "Rotary Joint", slug: "mechanical-seals" },
      { name: "Lime Slurry Pump", slug: "pumps" },
      { name: "SS Impeller", slug: "stainless-steel" },
    ],
    priority: 8,
  },
];
