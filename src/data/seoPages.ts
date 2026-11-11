// Local "buy in Hosur" landing pages. Each one targets a real buying search
// ("where can I buy mechanical seals in Hosur", "pump dealers in Hosur", ...)
// with its own copy and FAQs, so they are not thin duplicates of each other.
// Every claim here must match facts stated elsewhere on the site.

export type SeoFaq = { q: string; a: string };

export type SeoPage = {
  slug: string;
  /** Category slug this page sells from; null for the all-products hub. */
  category: string | null;
  /** Further categories whose products are listed on the same page. */
  alsoCategories?: string[];
  /** Short product phrase used in headings and links, e.g. "Mechanical Seals". */
  product: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Search phrasings buyers use; shown on the page as "Also searched as". */
  alsoKnownAs: string[];
  faqs: SeoFaq[];
};

export const HOSUR_AREAS = [
  "SIPCOT Hosur Phase I & II",
  "Bagalur Road",
  "Mathigiri",
  "Zuzuvadi",
  "Shoolagiri",
  "Krishnagiri",
  "Denkanikottai",
  "Attibele",
  "Bommasandra",
  "Electronic City",
  "Bengaluru",
  "Chennai",
  "Coimbatore",
];

const ADDRESS_LINE = "#3/334, 11C, Surya Nagar, 5th Cross, Arasanatti, Hosur, Krishnagiri Dist., Tamil Nadu 635126";

const commonFaqs = (product: string): SeoFaq[] => [
  {
    q: `How do I get a price for ${product.toLowerCase()}?`,
    a: "Send the part number, size, a drawing or just a photo of the old part by WhatsApp (+91 78069 36475), phone or the enquiry form. We reply within one working day with the grade, brand, price and dispatch timeline.",
  },
  {
    q: "Do you deliver outside Hosur?",
    a: "Yes. We dispatch by road across India, by air for urgent orders and by sea for export. Fast-moving lines ship straight from our Hosur stock.",
  },
];

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "industrial-spares-supplier-in-hosur",
    category: null,
    product: "Industrial Spares",
    title: "Industrial Spares Supplier in Hosur — Seals, Pumps, Bearings | AARRKKAA",
    description:
      "Buy mechanical seals, pumps, bearings, O-rings, gaskets, hoses, valves and stainless steel spares in Hosur, Tamil Nadu. AARRKKAA International supplies plants in SIPCOT Hosur, Krishnagiri, Bengaluru and across India.",
    h1: "Industrial spares supplier in Hosur",
    intro:
      "AARRKKAA International is an industrial trading company based in Arasanatti, Hosur. Plants in SIPCOT Hosur, Krishnagiri and Bengaluru buy their mechanical seals, pumps, bearings, elastomers, hoses, valves and stainless steel spares from us. We source from manufacturers and trusted sellers, compare prices across them and pass the saving on, so one call covers most of your maintenance list.",
    alsoKnownAs: [
      "industrial spares shop in Hosur",
      "pump and seal dealers in Hosur",
      "maintenance spares supplier Hosur SIPCOT",
      "industrial products supplier Krishnagiri",
    ],
    faqs: [
      {
        q: "Where can I buy industrial spares in Hosur?",
        a: `AARRKKAA International, ${ADDRESS_LINE}. Call or WhatsApp +91 78069 36475 with your list and we quote within one working day.`,
      },
      {
        q: "What products can I buy from AARRKKAA in Hosur?",
        a: "Pumps, mechanical seals, elastomers (O-rings, oil seals, gaskets), silicone products, hoses, stainless steel parts and pump spares, bearings (SKF, FAG, INA, NTN), couplings, nozzles, valves, springs, motors and gearboxes.",
      },
      {
        q: "Are you a manufacturer?",
        a: "No. We are a trading company. We buy from manufacturers and trusted sellers in India and abroad, which lets us compare prices and recommend the right part without being tied to one brand.",
      },
      ...commonFaqs("industrial spares"),
    ],
  },
  {
    slug: "mechanical-seals-in-hosur",
    category: "mechanical-seals",
    product: "Mechanical Seals",
    title: "Buy Mechanical Seals in Hosur — Cartridge, Bellow & Pump Seals | AARRKKAA",
    description:
      "Where to buy mechanical seals in Hosur: single spring, multi spring, rubber, PTFE and metal bellow, cartridge, Grundfos-type and agitator seals from AARRKKAA International, Hosur, Tamil Nadu.",
    h1: "Buy mechanical seals in Hosur",
    intro:
      "Looking for a mechanical seal in Hosur? We supply pump and agitator seals from single-spring and conical-spring designs to rubber, PTFE and metal bellow seals, single and double cartridge seals, Grundfos-type seals, rotary unions and rotary joints. Send us the old seal, its size or the pump model and we will match the right replacement.",
    alsoKnownAs: [
      "mechanical seal dealers in Hosur",
      "pump seal shop near me Hosur",
      "cartridge seal supplier Hosur",
      "mechanical seal supplier Krishnagiri / Bengaluru",
    ],
    faqs: [
      {
        q: "Where can I buy mechanical seals in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Call or WhatsApp +91 78069 36475 with the seal size, pump model or a photo of the old seal.`,
      },
      {
        q: "Which types of mechanical seals do you supply?",
        a: "Single spring, conical spring, wave spring and multi spring seals; rubber, Teflon (PTFE) and metal bellow seals; single and double cartridge seals; Grundfos and Grundfos star-type seals; agitator reactor seals, rotary unions and rotary joints.",
      },
      {
        q: "Can you identify a seal from a photo or an old part?",
        a: "Yes. A clear photo with the shaft size, or the pump make and model, is usually enough for us to identify the replacement seal.",
      },
      ...commonFaqs("mechanical seals"),
    ],
  },
  {
    slug: "pumps-in-hosur",
    category: "pumps",
    product: "Pumps",
    title: "Buy Industrial Pumps in Hosur — Centrifugal, Dosing, Monoblock | AARRKKAA",
    description:
      "Buy industrial pumps in Hosur: monoblock, centrifugal, dosing, lime slurry, axial flow, split case, fire fighting and SS milk pumps, plus pump spares, from AARRKKAA International, Hosur, Tamil Nadu.",
    h1: "Buy industrial pumps in Hosur",
    intro:
      "We supply process and utility pumps to plants in and around Hosur: monoblock and centrifugal pumps, dosing pumps, lime slurry pumps, horizontal and vertical axial flow pumps, horizontal split case pumps, pumps with priming chambers, fire fighting pumps and stainless steel milk pumps. Seals, impellers, shafts and sleeves for the same pumps are available from us too.",
    alsoKnownAs: [
      "pump dealers in Hosur",
      "centrifugal pump supplier Hosur",
      "dosing pump supplier Hosur",
      "industrial pump shop Krishnagiri",
    ],
    faqs: [
      {
        q: "Where can I buy industrial pumps in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Share the duty (flow, head, liquid) or the model you are replacing and we will quote.`,
      },
      {
        q: "What information do you need to quote a pump?",
        a: "The liquid being pumped, flow rate, head or pressure, and the motor rating if you have it. If you are replacing a pump, the nameplate photo is enough.",
      },
      {
        q: "Do you also supply pump spares?",
        a: "Yes. Mechanical seals, stainless steel impellers, shafts, sleeves and other pump spare parts, plus couplings, motors and gearboxes for pump sets.",
      },
      ...commonFaqs("pumps"),
    ],
  },
  {
    slug: "o-rings-gaskets-oil-seals-in-hosur",
    category: "elastomers",
    product: "O-Rings, Gaskets & Oil Seals",
    title: "Buy O-Rings, Gaskets & Oil Seals in Hosur — Viton, EPDM, NBR | AARRKKAA",
    description:
      "Buy O-rings, oil seals, PTFE envelope gaskets, tri-clover gaskets, diaphragms and rubber sheets in Hosur in FKM (Viton), FFKM, PTFE, EPDM, NBR, HNBR, silicone and PU from AARRKKAA International.",
    h1: "Buy O-rings, gaskets and oil seals in Hosur",
    intro:
      "We supply elastomer sealing parts to plants around Hosur: O-rings, oil seals, PU seals, butterfly valve gaskets, PTFE envelope gaskets, metallic and non-metallic gaskets, tri-clover gaskets, rubber diaphragms, extruded cords, rubber sheets and custom moulded rubber parts. Materials include FKM (Viton), FFKM, PTFE, EPDM, NBR, HNBR, silicone, PU and nylon.",
    alsoKnownAs: [
      "O-ring shop in Hosur",
      "oil seal dealers Hosur",
      "rubber gasket supplier Hosur",
      "Viton O-ring supplier Krishnagiri / Bengaluru",
    ],
    faqs: [
      {
        q: "Where can I buy O-rings and oil seals in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Send the size (ID × cross-section, or shaft × bore × width for oil seals) and the material you need.`,
      },
      {
        q: "Which rubber materials do you supply?",
        a: "FKM (Viton), FFKM, PTFE, EPDM, NBR, HNBR, silicone, PU and nylon. Tell us the chemical, temperature and pressure and we will suggest the right one.",
      },
      {
        q: "Can you supply custom rubber parts?",
        a: "Yes. Send a drawing or sample for custom moulded rubber products, gaskets and diaphragms.",
      },
      ...commonFaqs("O-rings and gaskets"),
    ],
  },
  {
    slug: "bearings-in-hosur",
    category: "bearings",
    product: "Bearings",
    title: "Buy SKF, FAG, INA & NTN Bearings in Hosur — Genuine | AARRKKAA",
    description:
      "Buy genuine SKF, FAG, INA and NTN bearings in Hosur. Ball bearings and ceramic bearings for pumps, motors and rotating equipment from AARRKKAA International, Hosur, Tamil Nadu.",
    h1: "Buy genuine bearings in Hosur",
    intro:
      "We supply genuine ball bearings and ceramic bearings from SKF, FAG, INA and NTN to plants around Hosur, for pumps, motors, gearboxes and other rotating equipment. Send the bearing number and quantity and we will confirm brand, price and availability.",
    alsoKnownAs: [
      "bearing dealers in Hosur",
      "SKF bearing supplier Hosur",
      "FAG bearing shop Hosur",
      "bearing supplier Krishnagiri / Bengaluru",
    ],
    faqs: [
      {
        q: "Where can I buy SKF or FAG bearings in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Send the bearing number and quantity by WhatsApp or phone on +91 78069 36475.`,
      },
      {
        q: "Are the bearings genuine?",
        a: "Yes. We supply genuine bearings from SKF, FAG, INA and NTN.",
      },
      ...commonFaqs("bearings"),
    ],
  },
  {
    slug: "silicone-products-in-hosur",
    category: "silicone",
    product: "Silicone Products",
    title: "Buy Silicone Sheets, Gaskets & Bellows in Hosur — Food Grade | AARRKKAA",
    description:
      "Buy food-grade silicone sheets, inflatable gaskets, door gaskets, bellows, diaphragms and custom silicone parts in Hosur from AARRKKAA International, Hosur, Tamil Nadu.",
    h1: "Buy silicone products in Hosur",
    intro:
      "We supply silicone parts for food, pharma and hygienic processing to plants around Hosur: silicone sheets, bellows, extruded door gaskets, inflatable gaskets, diaphragms, endless gaskets, sleeves, suction cups and custom moulded silicone products.",
    alsoKnownAs: [
      "silicone sheet supplier Hosur",
      "silicone gasket dealers Hosur",
      "food grade silicone supplier Bengaluru",
    ],
    faqs: [
      {
        q: "Where can I buy silicone sheets and gaskets in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Send the thickness, size, hardness and application.`,
      },
      {
        q: "Do you supply food-grade and platinum-cured silicone?",
        a: "Yes. We supply platinum-cured and general-purpose silicone for food, pharma and hygienic processing lines.",
      },
      ...commonFaqs("silicone products"),
    ],
  },
  {
    slug: "industrial-hoses-in-hosur",
    category: "hoses",
    product: "Industrial Hoses",
    title: "Buy Industrial Hoses in Hosur — Braided, Food Grade, Silicone | AARRKKAA",
    description:
      "Buy industrial hoses in Hosur: nylon braided, carbon-free, food-grade thunder hose, platinum-cured silicone tubes and braided hoses, and flexible ducting from AARRKKAA International.",
    h1: "Buy industrial hoses in Hosur",
    intro:
      "We supply hoses for processing and utility lines to plants around Hosur: carbon-free hoses, nylon braided hoses, food-grade thunder hoses, platinum-cured transparent silicone tubes, platinum-cured silicone braided hoses and flexible ducting hoses.",
    alsoKnownAs: ["hose pipe dealers Hosur", "braided hose supplier Hosur", "food grade hose supplier Bengaluru"],
    faqs: [
      {
        q: "Where can I buy industrial hoses in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Send the inner diameter, length, pressure and the fluid it will carry.`,
      },
      ...commonFaqs("hoses"),
    ],
  },
  {
    slug: "stainless-steel-pump-spares-in-hosur",
    category: "stainless-steel",
    product: "Stainless Steel & Pump Spares",
    title: "Buy SS Pump Spares, Shafts, Flanges & Clamps in Hosur | AARRKKAA",
    description:
      "Buy stainless steel rods, shafts, sleeves, flanges, C-clips, tri-clover clamps, impellers and pump spare parts in Hosur from AARRKKAA International, Hosur, Tamil Nadu.",
    h1: "Buy stainless steel parts and pump spares in Hosur",
    intro:
      "We supply traceable stainless steel parts to plants around Hosur: SS rods, shafts, sleeves, flanges, C-clips, clamps, tri-clover clamps, impellers and complete pump spare parts. Share a drawing or the pump model for shafts, sleeves and impellers.",
    alsoKnownAs: ["SS flange supplier Hosur", "tri clover clamp dealers Hosur", "pump spares shop Hosur"],
    faqs: [
      {
        q: "Where can I buy SS pump spares in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Share the pump model or a drawing with the grade of stainless steel you need.`,
      },
      ...commonFaqs("stainless steel parts"),
    ],
  },
  {
    slug: "valves-couplings-in-hosur",
    category: "valves",
    alsoCategories: ["couplings"],
    product: "Valves & Couplings",
    title: "Buy Ball Valves, Gate Valves & Couplings in Hosur | AARRKKAA",
    description:
      "Buy ball valves, flange-end ball valves, gate valves and chain, jaw and spacer couplings in Hosur from AARRKKAA International, Hosur, Tamil Nadu.",
    h1: "Buy valves and couplings in Hosur",
    intro:
      "We supply process valves and power-transmission couplings to plants around Hosur: ball valves, flange-end ball valves and gate valves, plus chain, jaw and spacer couplings for pump-motor sets.",
    alsoKnownAs: ["ball valve dealers Hosur", "jaw coupling supplier Hosur", "valve shop Krishnagiri"],
    faqs: [
      {
        q: "Where can I buy valves and couplings in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Send the size, pressure rating and end connection for valves, or the shaft sizes for couplings.`,
      },
      ...commonFaqs("valves and couplings"),
    ],
  },
  {
    slug: "springs-in-hosur",
    category: "springs",
    product: "Springs",
    title: "Buy Industrial Springs in Hosur — SS & Inconel | AARRKKAA",
    description:
      "Buy compression, torsion, extension, disc (Belleville), conical, volute and wire-form springs in stainless steel and Inconel in Hosur from AARRKKAA International.",
    h1: "Buy industrial springs in Hosur",
    intro:
      "We supply precision springs in stainless steel and Inconel to plants around Hosur: compression, torsion, disc (Belleville), heavy-duty Kelly, extension, auger conveyor, conical, volute and wire-form springs, for OEM and replacement use.",
    alsoKnownAs: ["spring manufacturers and suppliers Hosur", "compression spring supplier Hosur", "SS spring dealers Bengaluru"],
    faqs: [
      {
        q: "Where can I buy industrial springs in Hosur?",
        a: `From AARRKKAA International, ${ADDRESS_LINE}. Send a drawing or sample with the wire diameter, outer diameter, free length and material.`,
      },
      ...commonFaqs("springs"),
    ],
  },
];

export const getSeoPage = (slug: string) => SEO_PAGES.find((p) => p.slug === slug);
export const getSeoPageForCategory = (category: string) =>
  SEO_PAGES.find((p) => p.category === category || p.alsoCategories?.includes(category));
