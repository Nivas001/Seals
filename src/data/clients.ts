// Client list shown on the home page and About page. Drop a logo file in public/clients/
// and set `logo` to show it; clients without one fall back to a monogram badge.
// `square` marks near-square emblems (FAG, INA) so they render taller and match wide wordmarks visually.
export type Client = { name: string; logo?: string; square?: boolean };

export const CLIENTS: Client[] = [
  { name: "Tata Electronics", logo: "/clients/tata-electronics.svg" },
  { name: "Schneider Electric", logo: "/clients/schneider-electric.svg" },
  { name: "Thermax Onsite Energy Solutions" },
  { name: "Anthem Biosciences" },
  { name: "Werner Finley" },
  { name: "Astral Coatings" },
  { name: "Ecovinal International" },
  { name: "Yashaswi Fish Meal & Oil" },
  { name: "Zenfold Sustainable Technology" },
  { name: "H&V Advanced Materials" },
  { name: "Eco Edge Solutions" },
  { name: "Mukka Proteins" },
  { name: "Megha Fruit Processing" },
  { name: "RMZ Oilfield Engineering" },
  { name: "Ingex Botanicals" },
  { name: "Ovobel Foods" },
  { name: "Essae Gears & Transmissions" },
];

// Manufacturers whose genuine products we supply (logos in public/brands/).
// Companies we deliver to belong in CLIENTS above, not here.
export const BRANDS: Client[] = [
  { name: "SKF", logo: "/brands/skf.svg" },
  { name: "FAG", logo: "/brands/fag.png", square: true },
  { name: "INA", logo: "/brands/ina.svg", square: true },
  { name: "NTN", logo: "/brands/ntn.svg" },
];
