import { r as SECTORS, t as CATEGORIES } from "./catalog-DvL_hCl1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/items-e15jl-5G.js
var slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
var CATEGORY_DEFAULTS = {
	pumps: {
		tagline: (n) => `${n} engineered for continuous industrial duty.`,
		specs: (n) => [
			{
				label: "Type",
				value: n
			},
			{
				label: "Casing",
				value: "Cast Iron / SS304 / SS316 (duty-dependent)"
			},
			{
				label: "Impeller",
				value: "Closed / Semi-open, dynamically balanced"
			},
			{
				label: "Sealing",
				value: "Gland packing or mechanical seal"
			},
			{
				label: "Discharge",
				value: "25 mm – 300 mm"
			},
			{
				label: "Head range",
				value: "Up to 90 m"
			},
			{
				label: "Temperature",
				value: "Up to 180 °C (media-dependent)"
			}
		],
		benefits: [
			"Field-serviceable back-pull-out design",
			"Interchangeable spares across the range",
			"Low NPSHr for cavitation-free operation",
			"Available with VFD-ready motors"
		],
		applications: [
			"Chemical",
			"Food",
			"Pharma",
			"Breweries",
			"Oil & Gas"
		],
		related: [
			"mechanical-seals",
			"couplings",
			"valves",
			"stainless-steel"
		]
	},
	"mechanical-seals": {
		tagline: (n) => `${n} for reliable rotating equipment sealing.`,
		specs: (n) => [
			{
				label: "Configuration",
				value: n
			},
			{
				label: "Face materials",
				value: "Silicon Carbide, Tungsten Carbide, Carbon, Ceramic"
			},
			{
				label: "Secondary seal",
				value: "FKM / FFKM / EPDM / PTFE"
			},
			{
				label: "Metal parts",
				value: "SS304 / SS316 / Hastelloy"
			},
			{
				label: "Shaft size",
				value: "10 mm – 120 mm"
			},
			{
				label: "Pressure",
				value: "Up to 25 bar"
			},
			{
				label: "Temperature",
				value: "-40 °C to +220 °C"
			}
		],
		benefits: [
			"Balanced design for low face-load and wear",
			"Interchangeable with major OEM part numbers",
			"Custom faces for abrasive & corrosive media",
			"Cartridge variants for zero-error installation"
		],
		applications: [
			"Chemical",
			"Pharma",
			"Dye Manufacturing",
			"Oil & Gas"
		],
		related: [
			"pumps",
			"elastomers",
			"stainless-steel"
		]
	},
	elastomers: {
		tagline: (n) => `${n} in compound grades matched to your media.`,
		specs: (n, c) => [
			{
				label: "Product",
				value: n
			},
			{
				label: "Compounds",
				value: (c.materials ?? []).join(", ") || "FKM, EPDM, NBR, Silicone, PTFE"
			},
			{
				label: "Hardness",
				value: "40 – 90 Shore A"
			},
			{
				label: "Colour",
				value: "Black / White / Blue / Custom"
			},
			{
				label: "Compliance",
				value: "FDA & USP Class VI on request"
			},
			{
				label: "Temperature",
				value: "-50 °C to +260 °C (compound-dependent)"
			}
		],
		benefits: [
			"Custom moulding from client drawings",
			"Batch traceability & material certificates",
			"Hygienic grades for food & pharma",
			"Chemical resistance charts on request"
		],
		applications: [
			"Food",
			"Pharma",
			"Chemical",
			"Beverages"
		],
		related: [
			"silicone",
			"hoses",
			"mechanical-seals"
		]
	},
	silicone: {
		tagline: (n) => `${n} — platinum-cured, food & pharma compliant.`,
		specs: (n) => [
			{
				label: "Product",
				value: n
			},
			{
				label: "Cure",
				value: "Platinum / Peroxide"
			},
			{
				label: "Hardness",
				value: "40 – 80 Shore A"
			},
			{
				label: "Colour",
				value: "Translucent / White / Custom"
			},
			{
				label: "Compliance",
				value: "FDA 21 CFR 177.2600, USP Class VI"
			},
			{
				label: "Temperature",
				value: "-60 °C to +230 °C"
			}
		],
		benefits: [
			"Taste & odour free — ideal for dairy and pharma",
			"Excellent flex-life and compression set",
			"Custom extrusions & mouldings",
			"Steam & CIP/SIP resistant"
		],
		applications: [
			"Food",
			"Pharma",
			"Beverages",
			"Breweries"
		],
		related: ["elastomers", "hoses"]
	},
	hoses: {
		tagline: (n) => `${n} for demanding transfer and processing lines.`,
		specs: (n) => [
			{
				label: "Type",
				value: n
			},
			{
				label: "Bore sizes",
				value: "6 mm – 100 mm"
			},
			{
				label: "Reinforcement",
				value: "Polyester / Nylon / SS braid (variant-dependent)"
			},
			{
				label: "Working pressure",
				value: "Up to 16 bar"
			},
			{
				label: "Vacuum rating",
				value: "Full vacuum on braided variants"
			},
			{
				label: "Temperature",
				value: "-40 °C to +200 °C"
			}
		],
		benefits: [
			"Custom cut-lengths with end fittings",
			"Food & pharma compliant grades",
			"Kink resistant & flexible at low radius",
			"Odour & taste free bore"
		],
		applications: [
			"Food",
			"Beverages",
			"Pharma",
			"Chemical"
		],
		related: [
			"silicone",
			"elastomers",
			"stainless-steel"
		]
	},
	"stainless-steel": {
		tagline: (n) => `${n} precision-machined to drawing.`,
		specs: (n) => [
			{
				label: "Component",
				value: n
			},
			{
				label: "Grades",
				value: "SS304 / SS316 / SS316L / Duplex"
			},
			{
				label: "Finish",
				value: "Mirror / Matte / Electropolished"
			},
			{
				label: "Standards",
				value: "ASTM / DIN / IS on request"
			},
			{
				label: "Tolerance",
				value: "IT7 – IT9 (feature-dependent)"
			}
		],
		benefits: [
			"Made-to-drawing with material test certificates",
			"Hygienic finishes for food & pharma",
			"Fast turnaround for pump-spare kits",
			"Batch traceability"
		],
		applications: [
			"Food",
			"Pharma",
			"Beverages",
			"Chemical"
		],
		related: [
			"pumps",
			"mechanical-seals",
			"couplings"
		]
	},
	bearings: {
		tagline: (n) => `${n} — genuine, sealed & lubricated to spec.`,
		specs: (n, c) => [
			{
				label: "Type",
				value: n
			},
			{
				label: "Brands",
				value: (c.brands ?? []).join(", ")
			},
			{
				label: "Cage",
				value: "Steel / Brass / Polyamide"
			},
			{
				label: "Clearance",
				value: "C2 / C3 / C4 on request"
			},
			{
				label: "Lubrication",
				value: "Pre-greased or oil-lubed"
			}
		],
		benefits: [
			"Authorised distribution — 100% genuine",
			"Cross-reference help across brands",
			"Cold-chain safe storage",
			"Fast dispatch on common sizes"
		],
		applications: [
			"Chemical",
			"Food",
			"Oil & Gas",
			"Plastics"
		],
		related: ["couplings", "pumps"]
	},
	couplings: {
		tagline: (n) => `${n} for shock-free power transmission.`,
		specs: (n) => [
			{
				label: "Type",
				value: n
			},
			{
				label: "Bore range",
				value: "10 mm – 100 mm"
			},
			{
				label: "Torque",
				value: "Up to 2500 Nm"
			},
			{
				label: "Element",
				value: "NBR / Polyurethane / Steel chain"
			},
			{
				label: "Misalignment",
				value: "Angular & parallel compensation"
			}
		],
		benefits: [
			"Absorbs shock and vibration",
			"Simple field replacement",
			"Interchangeable with common OEM sizes",
			"Long service life"
		],
		applications: [
			"Chemical",
			"Food",
			"Plastics",
			"Oil & Gas"
		],
		related: ["bearings", "pumps"]
	},
	nozzles: {
		tagline: (n) => `${n} — extreme wear resistance for abrasive service.`,
		specs: (n) => [
			{
				label: "Material",
				value: n.replace(" Nozzle", "")
			},
			{
				label: "Orifice",
				value: "0.8 mm – 12 mm"
			},
			{
				label: "Spray pattern",
				value: "Solid stream / Flat fan / Full cone"
			},
			{
				label: "Pressure",
				value: "Up to 700 bar"
			},
			{
				label: "Fitting",
				value: "BSP / NPT / Flanged"
			}
		],
		benefits: [
			"10× life vs. hardened steel nozzles",
			"Consistent spray pattern over lifetime",
			"Chemical & thermal shock resistant",
			"Custom geometries on request"
		],
		applications: [
			"Chemical",
			"Plastics",
			"Oil & Gas"
		],
		related: ["valves", "elastomers"]
	},
	valves: {
		tagline: (n) => `${n} for reliable shut-off and process control.`,
		specs: (n) => [
			{
				label: "Type",
				value: n
			},
			{
				label: "Body",
				value: "SS304 / SS316 / CF8M"
			},
			{
				label: "End connection",
				value: "Screwed / Flanged / Tri-clover"
			},
			{
				label: "Size range",
				value: "15 mm – 200 mm"
			},
			{
				label: "Pressure class",
				value: "PN16 / PN25 / PN40"
			},
			{
				label: "Temperature",
				value: "Up to 200 °C"
			}
		],
		benefits: [
			"Fire-safe and anti-static options",
			"Full-bore for low pressure drop",
			"Pneumatic & electric actuation ready",
			"Hygienic variants for food & pharma"
		],
		applications: [
			"Chemical",
			"Food",
			"Pharma",
			"Oil & Gas"
		],
		related: [
			"pumps",
			"stainless-steel",
			"elastomers"
		]
	},
	springs: {
		tagline: (n) => `${n} — precision-wound to your drawing.`,
		specs: (n, c) => [
			{
				label: "Type",
				value: n
			},
			{
				label: "Materials",
				value: (c.materials ?? []).join(", ") || "Stainless Steel, Inconel"
			},
			{
				label: "Wire dia.",
				value: "0.2 mm – 12 mm"
			},
			{
				label: "Load capacity",
				value: "Custom, per drawing"
			},
			{
				label: "Finish",
				value: "Passivated / Shot-peened"
			}
		],
		benefits: [
			"Made-to-drawing in short lead times",
			"High-temperature Inconel grades available",
			"Shot-peened for improved fatigue life",
			"Batch traceability & load testing"
		],
		applications: [
			"Oil & Gas",
			"Chemical",
			"Plastics",
			"Pharma"
		],
		related: ["stainless-steel", "mechanical-seals"]
	},
	other: {
		tagline: (n) => `${n} — dependable industrial specialty supplies.`,
		specs: (n) => [
			{
				label: "Product",
				value: n
			},
			{
				label: "Options",
				value: "Standard & custom variants"
			},
			{
				label: "Compliance",
				value: "Material certificates on request"
			}
		],
		benefits: [
			"Sourced from established manufacturers",
			"Fast dispatch across India",
			"Bulk & OEM pricing"
		],
		applications: [
			"Chemical",
			"Oil & Gas",
			"Plastics"
		],
		related: ["stainless-steel", "elastomers"]
	}
};
var ITEM_DESCRIPTIONS = {
	"Mono-block Pump": "Compact monoblock design with pump and motor sharing a single shaft — ideal for water transfer, boosting and general utility duty where a small footprint matters.",
	"Lime Slurry Pump": "Heavy-duty pump built to handle abrasive lime slurry in FGD, water treatment and mineral processing lines, with wear-resistant liners and easy-service internals.",
	"Dosing Pump": "Precision metering pump for accurate chemical injection — repeatable flow across a wide turndown, with diaphragm or plunger heads to suit corrosive service.",
	"Centrifugal Pump": "Workhorse end-suction centrifugal for clear liquids across chemical, food and utility service — efficient hydraulics with a back-pull-out serviceable design.",
	"Fire Fighting Pump": "NFPA-style fire pump package with high-head performance, jockey pump and controller — ready for hydrant and sprinkler duty.",
	"SS Milk Pump with Stand": "Sanitary SS316 milk pump on a portable trolley — hygienic finishes, tri-clover connections and CIP/SIP compatible.",
	"Cartridge Seals": "Pre-set cartridge assembly that eliminates installation error — ideal for critical duty pumps and mixers with fast, foolproof changeouts.",
	"Agitator Reactor Seal": "Heavy-duty double seal engineered for reactor agitators — handles vacuum, pressure and hazardous media with a robust barrier fluid system.",
	"Rotary Union": "Rotating joint for continuous transfer of steam, water, oil or coolant into rotating equipment — leak-tight over millions of cycles.",
	"O-Rings": "Precision moulded O-rings across every standard size and compound — from general purpose NBR to FFKM for aggressive chemistries.",
	"PTFE Envelope Gasket": "Rubber-cored gasket sheathed in PTFE — combines the resilience of an elastomer with the chemical resistance of PTFE, ideal for lined pipework.",
	"Tri-clover Gaskets": "Sanitary clamp gaskets in silicone, EPDM and PTFE for hygienic tri-clamp assemblies across dairy, brewery and pharma lines.",
	"Silicone Inflatable Gasket": "Pneumatically inflated silicone seal that expands to close large gaps — perfect for autoclave doors, ovens and press platens.",
	"Platinum Cured Silicone Transparent Tube": "Crystal-clear platinum-cured silicone tube — taste and odour free, autoclavable, with excellent flex-life for peristaltic pumps.",
	"Nylon Braided Hose": "Braided industrial hose combining a flexible bore with a nylon reinforcement layer for pressure and abrasion resistance.",
	"Flexible Ducting Hose": "Lightweight flexible ducting for fume, dust and light material extraction with tight bend radius.",
	"SS Impeller": "Precision-cast or machined SS impellers — dynamically balanced replacements for popular pump OEMs.",
	"Tri Clover Clamps": "Sanitary tri-clamp couplings in SS304/SS316 for quick-release hygienic pipework.",
	"Ball Bearings": "Deep-groove and angular-contact ball bearings from SKF, FAG, NTN and INA — genuine stock with cross-reference support.",
	"Ceramic Bearings": "Hybrid and full-ceramic bearings for high-speed, high-temperature and corrosive environments where steel fails.",
	"Chain Coupling": "Simple, high-torque coupling using a duplex chain wrapped around two sprocket hubs — easy installation, no lubrication cover required.",
	"Jaw Coupling": "Elastomer-insert coupling that dampens vibration and compensates for shaft misalignment — standard on pump-motor sets.",
	"Spacer Coupling": "Spacer-style coupling that permits back-pull-out pump maintenance without disturbing motor alignment.",
	"Boron Carbide Nozzle": "Second-hardest engineered ceramic — outstanding life for high-pressure water-jet and abrasive blasting nozzles.",
	"Silicone Carbide Nozzle": "Hard, thermal-shock resistant nozzle for slurry spray, desulphurisation and mineral processing.",
	"Tungsten Carbide Nozzle": "Impact-resistant tungsten carbide nozzle for sandblasting, shot-peening and abrasive spray applications.",
	"Flange End Ball Valve": "Two-piece flanged ball valve with full bore and fire-safe seats — a workhorse for isolation duty.",
	"Ball Valve": "Screwed-end ball valve for compact isolation on utility and process lines.",
	"Gate Valve": "Rising-stem gate valve for full-bore isolation on water, steam and hydrocarbon service.",
	"Nylatron Rod": "Molybdenum-filled cast nylon rod — self-lubricating, low-friction stock for gears, bushes and wear pads.",
	"Non-Sparking Tools": "Beryllium-copper and aluminium-bronze hand tools for ATEX and explosive atmospheres.",
	"Pressure Gauge": "Bourdon-tube pressure gauges — dry, glycerine-filled and diaphragm-sealed variants for process and utility duty."
};
function getItem(categorySlug, itemSlug) {
	const category = CATEGORIES.find((c) => c.slug === categorySlug);
	if (!category) return null;
	const name = category.items.find((i) => slugify(i) === itemSlug);
	if (!name) return null;
	const defaults = CATEGORY_DEFAULTS[category.slug] ?? CATEGORY_DEFAULTS.other;
	const description = ITEM_DESCRIPTIONS[name] ?? `${name} in the ${category.name.toLowerCase()} range from AARRKKAA International — ${category.description}`;
	const siblings = category.items.filter((i) => i !== name).slice(0, 6).map((i) => ({
		name: i,
		slug: slugify(i)
	}));
	const relatedCategories = defaults.related.map((s) => CATEGORIES.find((c) => c.slug === s)).filter((c) => Boolean(c));
	const applications = defaults.applications.map((a) => SECTORS.find((s) => s.name === a)?.name ?? a).filter(Boolean);
	return {
		category,
		name,
		slug: itemSlug,
		tagline: defaults.tagline(name),
		description,
		specs: defaults.specs(name, category),
		benefits: defaults.benefits,
		applications,
		siblings,
		relatedCategories
	};
}
//#endregion
export { slugify as n, getItem as t };
