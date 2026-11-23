// Client list shown on the home page and About page. Drop a logo file in public/clients/
// and set `logo` to show it; clients without one fall back to a monogram badge.
// `square` marks near-square emblems (FAG, INA) so they render taller and match wide wordmarks visually.
export type Client = { name: string; logo?: string; square?: boolean };

export const CLIENTS: Client[] = [
  { name: "Tata", logo: "/clients/tata.svg" },
  { name: "Schneider Electric", logo: "/clients/schneider-electric.svg" },
  { name: "Thermax Onsite Energy Solutions", logo: "/clients/thermax.png", square: true },
  { name: "Anthem Biosciences", logo: "/clients/anthem-biosciences.png" },
  { name: "Solara Active Pharma Sciences", logo: "/clients/solara-active-pharma-sciences.png" },
  { name: "Werner Finley", logo: "/clients/werner-finley.png" },
  { name: "Astral Coatings", logo: "/clients/astral-coatings.png" },
  { name: "Ecovinal International", logo: "/clients/ecovinal-international.png" },
  { name: "Yashaswi Fish Meal & Oil", logo: "/clients/yashaswi-fish-meal-oil.png", square: true },
  { name: "Zenfold Sustainable Technology", logo: "/clients/zenfold-sustainable-technology.png" },
  { name: "H&V Advanced Materials", logo: "/clients/hv-advanced-materials.png", square: true },
  { name: "Eco Edge Solutions", logo: "/clients/eco-edge-solutions.png", square: true },
  { name: "Mukka Proteins", logo: "/clients/mukka-proteins.png" },
  { name: "Megha Fruit Processing" },
  { name: "RMZ Oilfield Engineering", logo: "/clients/rmz-oilfield-engineering.png" },
  { name: "Ingex Botanicals", logo: "/clients/ingex-botanicals.png" },
  { name: "Ovobel Foods", logo: "/clients/ovobel-foods.png", square: true },
  { name: "Essae Gears & Transmissions", logo: "/clients/essae-gears-transmissions.png" },
];

// Manufacturers whose genuine products we supply (logos in public/brands/).
// Companies we deliver to belong in CLIENTS above, not here.
export const BRANDS: Client[] = [
  { name: "SKF", logo: "/brands/skf.svg" },
  { name: "FAG", logo: "/brands/fag.png", square: true },
  { name: "INA", logo: "/brands/ina.svg", square: true },
  { name: "NTN", logo: "/brands/ntn.svg" },
];
