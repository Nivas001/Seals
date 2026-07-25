export type ProductCategory = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  count: number;
  items: string[];
  materials?: string[];
  brands?: string[];
};

import pumps from "@/assets/cat-pumps.jpg";
import seals from "@/assets/cat-seals.jpg";
import elastomers from "@/assets/cat-elastomers.jpg";
import hoses from "@/assets/cat-hoses.jpg";
import steel from "@/assets/cat-steel.jpg";
import bearings from "@/assets/cat-bearings.jpg";
import springs from "@/assets/cat-springs.jpg";
import valves from "@/assets/cat-valves.jpg";
import nozzles from "@/assets/cat-nozzles.jpg";
import couplings from "@/assets/cat-couplings.jpg";
import silicone from "@/assets/cat-silicone.jpg";

export const CATEGORIES: ProductCategory[] = [
  {
    slug: "pumps",
    name: "Pumps",
    short: "Process, dosing & fire-fighting pumps for every industrial line.",
    description:
      "A complete pump programme covering monoblock, centrifugal, axial flow, dosing and hygienic milk pumps — engineered for chemical, food, pharma and utility duties.",
    image: pumps,
    count: 10,
    items: [
      "Mono-block Pump",
      "Lime Slurry Pump",
      "Dosing Pump",
      "Horizontal Axial Flow Pump",
      "Centrifugal Pump",
      "Fire Fighting Pump",
      "Vertical Axial Flow Pump",
      "Pump with Priming Chamber",
      "SS Milk Pump with Stand",
      "Horizontal Split Case Pump",
    ],
  },
  {
    slug: "mechanical-seals",
    name: "Mechanical Seals",
    short: "Single-spring to cartridge, agitator & rotary union assemblies.",
    description:
      "Sealing solutions for rotating equipment across process industries — from simple single-spring designs to cartridge, agitator reactor and rotary union assemblies.",
    image: seals,
    count: 14,
    items: [
      "Single Spring",
      "Conical Spring",
      "Wave Spring",
      "Multi Spring",
      "Rubber Bellow",
      "Teflon Bellow",
      "Metal Bellow",
      "Cartridge Seals",
      "Double Cartridge Seal",
      "Grundfos",
      "Grundfos — Star Type",
      "Agitator Reactor Seal",
      "Rotary Union",
      "Rotary Joint",
    ],
  },
  {
    slug: "elastomers",
    name: "Elastomers",
    short: "O-rings, gaskets, diaphragms & custom moulded rubber.",
    description:
      "Rubber-like solids with elastic properties — including FKM, FFKM, PTFE, EPDM, NBR, HNBR, Silicone, PU and Nylon — formulated for chemical resistance, temperature and hygienic compliance.",
    image: elastomers,
    count: 15,
    materials: ["FKM", "FFKM", "PTFE", "EPDM", "NBR", "HNBR", "Silicone", "PU", "Nylon"],
    items: [
      "Oil Seal",
      "O-Rings",
      "Butterfly Gasket",
      "PTFE Envelope Gasket",
      "Champion Gasket",
      "Metallic & Non-Metallic Gasket",
      "Tri-clover Gaskets",
      "Black Rubber Diaphragm",
      "Rubber Extruded Cord",
      "PU Seal",
      "Rubber Sheet",
      "PTFE Tubes",
      "Nylon Cable Tie",
      "Custom Rubber Products",
      "Suction Cups",
    ],
  },
  {
    slug: "silicone",
    name: "Silicone",
    short: "Food-grade sheets, bellows, diaphragms & inflatable gaskets.",
    description:
      "Platinum-cured and general purpose silicone components engineered for food, pharma and hygienic processing — including endless gaskets, inflatable seals, bellows and custom moulded parts.",
    image: silicone,
    count: 9,
    items: [
      "Silicone Sheet",
      "Silicone Bellows",
      "Extruded Door Gasket",
      "Silicone Inflatable Gasket",
      "Silicone Diaphragms",
      "Silicone Endless Gasket",
      "Silicone Sleeves",
      "Silicone Suction Cups",
      "Silicone Rubber Custom Products",
    ],
  },
  {
    slug: "hoses",
    name: "Hoses",
    short: "Food-grade, braided, ducting & platinum-cured silicone tubing.",
    description:
      "A full hose programme from carbon-free and nylon-braided industrial hoses to platinum-cured silicone tubing and flexible ducting for demanding processing lines.",
    image: hoses,
    count: 6,
    items: [
      "Carbon Free Hose",
      "Nylon Braided Hose",
      "Food Grade Thunder Hose",
      "Platinum Cured Silicone Transparent Tube",
      "Flexible Ducting Hose",
      "Platinum Cured Silicone Braided Hose",
    ],
  },
  {
    slug: "stainless-steel",
    name: "Stainless Steel",
    short: "Flanges, clamps, shafts, sleeves & pump spare parts.",
    description:
      "Precision stainless steel components — flanges, tri-clover clamps, C-clips, shafts, sleeves, impellers and complete pump spare programmes.",
    image: steel,
    count: 9,
    items: [
      "SS Rod",
      "SS Shaft",
      "SS Sleeve",
      "SS Flanges",
      "SS C-Clip",
      "SS Clamps",
      "Tri Clover Clamps",
      "SS Impeller",
      "SS Pump Spare Parts",
    ],
  },
  {
    slug: "bearings",
    name: "Bearings",
    short: "Genuine SKF, FAG, NTN & INA bearings — ball and ceramic.",
    description:
      "Supply and distribution of premium bearing brands including SKF, FAG, NTN and INA — ball, ceramic and specialty bearings for industrial rotating equipment.",
    image: bearings,
    count: 2,
    brands: ["SKF", "FAG", "NTN", "INA"],
    items: ["Ball Bearings", "Ceramic Bearings"],
  },
  {
    slug: "couplings",
    name: "Couplings",
    short: "Chain, jaw & spacer couplings for power transmission.",
    description:
      "Reliable power transmission couplings for pump-motor sets and rotating machinery.",
    image: couplings,
    count: 3,
    items: ["Chain Coupling", "Jaw Coupling", "Spacer Coupling"],
  },
  {
    slug: "nozzles",
    name: "Nozzles",
    short: "Boron, silicon & tungsten carbide wear-resistant nozzles.",
    description:
      "Wear-resistant nozzles engineered for abrasive slurries and high-pressure spray applications.",
    image: nozzles,
    count: 3,
    items: ["Boron Carbide Nozzle", "Silicone Carbide Nozzle", "Tungsten Carbide Nozzle"],
  },
  {
    slug: "valves",
    name: "Valves",
    short: "Ball, flange-end ball & gate valves for process control.",
    description:
      "Industrial process valves for shut-off and control duty across chemical, food and utility service.",
    image: valves,
    count: 3,
    items: ["Flange End Ball Valve", "Ball Valve", "Gate Valve"],
  },
  {
    slug: "springs",
    name: "Springs",
    short: "Inconel & stainless steel springs — every geometry.",
    description:
      "Precision springs in Inconel and stainless steel — compression, torsion, disc, extension, conical and wire-form geometries for OEM and replacement.",
    image: springs,
    count: 9,
    materials: ["Inconel", "Stainless Steel"],
    items: [
      "Compression Spring",
      "Torsion Spring",
      "Disc / Belleville Spring",
      "Heavy Duty Kelly Spring",
      "Extension Spring",
      "Auger Conveyor Spring",
      "Conical / Taper Spring",
      "Volute Spring",
      "Wire Forms Spring",
    ],
  },
  {
    slug: "other",
    name: "Other Products",
    short: "Nylatron rod, non-sparking tools & pressure gauges.",
    description:
      "Specialty industrial supplies including engineering plastics, non-sparking safety tools and instrumentation.",
    image: nozzles,
    count: 3,
    items: ["Nylatron Rod", "Non-Sparking Tools", "Pressure Gauge"],
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

export const SECTORS = [
  { name: "Food", desc: "Hygienic, food-grade seals, gaskets and pumps." },
  { name: "Chemical", desc: "FFKM, PTFE and corrosion-resistant assemblies." },
  { name: "Beverages", desc: "Sanitary tri-clover fittings and silicone tubing." },
  { name: "Breweries", desc: "Process pumps, seals and platinum-cured hoses." },
  { name: "Plastics", desc: "Nozzles, wear parts and Nylatron machining stock." },
  { name: "Pharma", desc: "Cleanroom-ready diaphragms, o-rings and gaskets." },
  { name: "Oil & Gas", desc: "Non-sparking tools, HNBR seals and metal bellows." },
  { name: "Dye Manufacturing", desc: "Chemical-grade elastomers and rotary joints." },
];

export const COMPANY = {
  name: "AARRKKAA INTERNATIONAL",
  tagline: "Integrated technology support",
  motto:
    "To provide quality products and support to our valuable customers with a timely approach.",
  phones: ["+91 78069 36475", "+91 91086 24470"],
  emails: ["aarrkkaainternational@gmail.com", "salesaarrkkaa@gmail.com"],
  address: {
    line1: "#3/334, 11C, Surya Nagar",
    line2: "5th Cross, Arasanatti",
    city: "Hosur",
    district: "Krishnagiri Dist.",
    state: "Tamil Nadu",
    pincode: "635 126",
    country: "India",
  },
};
