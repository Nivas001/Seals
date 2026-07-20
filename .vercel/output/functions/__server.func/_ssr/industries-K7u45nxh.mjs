import { a as cat_hoses_default, c as cat_seals_default, d as cat_valves_default, i as cat_elastomers_default, l as cat_silicone_default, n as COMPANY, o as cat_nozzles_default, s as cat_pumps_default, t as CATEGORIES, u as cat_steel_default } from "./catalog-DvL_hCl1.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as CircleCheck, _ as Gauge, a as ShieldCheck, h as Layers, n as Truck, w as ArrowUpRight, y as Factory } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as Footer } from "./Footer-D6773OTi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/industries-K7u45nxh.js
var import_jsx_runtime = require_jsx_runtime();
var industries_hero_default = "/assets/industries-hero-BGm3u9w_.jpg";
var industries_quality_default = "/assets/industries-quality-C4E1j06t.jpg";
var industries_inventory_default = "/assets/industries-inventory-CSUa1sSJ.jpg";
var SECTORS = [
	{
		name: "Food Processing",
		tagline: "Hygienic. Traceable. Food-safe.",
		desc: "From dairy lines to bakery and edible-oil plants, we supply sanitary pumps, gaskets and tubing that meet strict food-contact norms and clean-in-place routines.",
		image: cat_silicone_default,
		duty: "CIP / SIP · 80 – 140 °C",
		applications: [
			"Dairy transfer",
			"Edible oil dosing",
			"CIP/SIP loops",
			"Ingredient blending"
		],
		products: [
			{
				name: "SS Milk Pump",
				slug: "pumps"
			},
			{
				name: "Tri-clover Gaskets",
				slug: "elastomers"
			},
			{
				name: "Silicone Tubing",
				slug: "silicone"
			}
		],
		compliance: "Food-grade FDA / 3A style compliant components"
	},
	{
		name: "Chemical",
		tagline: "Aggressive media. Zero compromise.",
		desc: "FFKM, PTFE and metal-bellow assemblies built to survive acids, solvents and thermal cycling across reactor and transfer duty.",
		image: cat_elastomers_default,
		duty: "Up to 250 °C · abrasive & corrosive",
		applications: [
			"Reactor sealing",
			"Solvent transfer",
			"Acid dosing",
			"Filtration skids"
		],
		products: [
			{
				name: "Agitator Reactor Seal",
				slug: "mechanical-seals"
			},
			{
				name: "PTFE Envelope Gasket",
				slug: "elastomers"
			},
			{
				name: "Metal Bellow Seal",
				slug: "mechanical-seals"
			}
		],
		compliance: "Chemical-resistant elastomers and PTFE-lined parts"
	},
	{
		name: "Beverages",
		tagline: "Clean fill. Consistent flavour.",
		desc: "Sanitary tri-clover fittings, platinum-cured silicone tubing and hygienic pump packages tuned for carbonated drinks, juices and dairy beverages.",
		image: cat_hoses_default,
		duty: "Sanitary · low-shear",
		applications: [
			"Bottling lines",
			"Juice pasteurisation",
			"Syrup dosing",
			"Carbonation loops"
		],
		products: [
			{
				name: "Platinum-Cured Silicone Hose",
				slug: "hoses"
			},
			{
				name: "Tri-clover Clamps",
				slug: "stainless-steel"
			},
			{
				name: "Sanitary Butterfly Gasket",
				slug: "elastomers"
			}
		]
	},
	{
		name: "Breweries",
		tagline: "Wort to bottle — sealed tight.",
		desc: "Process pumps, seals and hoses engineered for brewhouse temperature swings and cleaning cycles without loss of flavour compounds.",
		image: cat_pumps_default,
		duty: "Sanitary · 4 – 95 °C",
		applications: [
			"Wort transfer",
			"Fermenter recirculation",
			"CIP loops",
			"Bottling / kegging"
		],
		products: [
			{
				name: "Centrifugal Pump",
				slug: "pumps"
			},
			{
				name: "Cartridge Seal",
				slug: "mechanical-seals"
			},
			{
				name: "Silicone Bellows",
				slug: "silicone"
			}
		]
	},
	{
		name: "Plastics",
		tagline: "Wear parts that outlast the shift.",
		desc: "Boron and tungsten carbide nozzles, Nylatron machining stock and abrasion-resistant seals for extrusion, moulding and masterbatch lines.",
		image: cat_nozzles_default,
		duty: "High-abrasion · 24×7 duty",
		applications: [
			"Injection moulding",
			"Extrusion",
			"Masterbatch dosing",
			"Pellet handling"
		],
		products: [
			{
				name: "Tungsten Carbide Nozzle",
				slug: "nozzles"
			},
			{
				name: "Nylatron Rod",
				slug: "other"
			},
			{
				name: "Wave Spring",
				slug: "springs"
			}
		]
	},
	{
		name: "Pharma",
		tagline: "Cleanroom-ready components.",
		desc: "Diaphragms, o-rings and silicone parts validated for API manufacturing, formulation and sterile processing environments.",
		image: cat_seals_default,
		duty: "USP Class VI style materials",
		applications: [
			"API reactors",
			"Formulation vessels",
			"Sterile fill",
			"Autoclave gaskets"
		],
		products: [
			{
				name: "Silicone Diaphragms",
				slug: "silicone"
			},
			{
				name: "FFKM O-Rings",
				slug: "elastomers"
			},
			{
				name: "Double Cartridge Seal",
				slug: "mechanical-seals"
			}
		],
		compliance: "USP Class VI style silicone & FFKM available"
	},
	{
		name: "Oil & Gas",
		tagline: "Built for pressure. Safe by design.",
		desc: "HNBR seals, non-sparking safety tools and metal bellows for upstream, midstream and refinery service where failure is not an option.",
		image: cat_valves_default,
		duty: "Sour service · ATEX-conscious",
		applications: [
			"Wellhead sealing",
			"Refinery valves",
			"Pipeline maintenance",
			"Explosive zones"
		],
		products: [
			{
				name: "Metal Bellow Seal",
				slug: "mechanical-seals"
			},
			{
				name: "Non-Sparking Tools",
				slug: "other"
			},
			{
				name: "Flange End Ball Valve",
				slug: "valves"
			}
		],
		compliance: "Non-sparking tools & HNBR / FFKM elastomers"
	},
	{
		name: "Dye Manufacturing",
		tagline: "Chemistry-grade sealing.",
		desc: "Rotary joints, chemical-grade elastomers and rugged pumps engineered for pigment slurries, solvents and reactive dye chemistries.",
		image: cat_steel_default,
		duty: "Corrosive slurries · high solids",
		applications: [
			"Pigment slurry transfer",
			"Reactor sealing",
			"Solvent recovery",
			"Drum unloading"
		],
		products: [
			{
				name: "Rotary Joint",
				slug: "mechanical-seals"
			},
			{
				name: "Lime Slurry Pump",
				slug: "pumps"
			},
			{
				name: "SS Impeller",
				slug: "stainless-steel"
			}
		]
	}
];
function IndustriesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-ink font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "overflow-x-clip pt-28 sm:pt-36",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto max-w-7xl px-4 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), " Industries we serve"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "mt-4 font-display font-black leading-[0.95] tracking-[-0.035em] text-ink text-balance",
										style: { fontSize: "clamp(2.25rem, 6.2vw, 5rem)" },
										children: [
											"Eight sectors.",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Every part matched to",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "italic text-brass",
												children: " the duty."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base",
										children: "From hygienic food processing to abrasive chemical service, our components are specified for the pressures, temperatures and compliance each industry demands — and shipped from stock so your line stays running."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 flex flex-wrap gap-2",
										children: [
											"Food",
											"Chemical",
											"Beverages",
											"Breweries",
											"Plastics",
											"Pharma",
											"Oil & Gas",
											"Dye"
										].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `#sector-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
											className: "rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[12px] font-medium text-ink/80 transition hover:bg-white hover:text-ink",
											children: t
										}, t))
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative overflow-hidden rounded-3xl border border-hairline shadow-lift",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: industries_hero_default,
										alt: "Industrial processing facility with stainless steel piping and machinery",
										width: 1600,
										height: 900,
										className: "h-[280px] w-full object-cover sm:h-[380px] lg:h-[440px]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 sm:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80",
											children: "Trusted supply chain"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-medium text-white sm:text-base",
											children: "500+ SKUs across 12 categories — dispatched from Hosur, Tamil Nadu."
										})]
									})]
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-brass",
										children: "Why teams pick AARRKKAA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 font-display font-black leading-[1] tracking-[-0.03em]",
										style: { fontSize: "clamp(1.75rem, 4vw, 2.75rem)" },
										children: "A supply partner, not just a supplier."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-[15px] leading-relaxed text-muted-foreground",
										children: "We combine deep application know-how with a wide, ready-to-ship inventory so procurement and maintenance teams get the right part — specified correctly, on time, backed by service."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 grid gap-4 md:grid-cols-6 md:grid-rows-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative overflow-hidden rounded-3xl border border-hairline bg-surface md:col-span-3 md:row-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: industries_quality_default,
												alt: "Engineer inspecting a precision stainless steel component",
												width: 1200,
												height: 1200,
												loading: "lazy",
												className: "h-64 w-full object-cover md:h-full"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute inset-x-0 bottom-0 p-6 sm:p-8",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Quality first"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "mt-4 font-display text-2xl font-black text-white sm:text-3xl",
														children: "Every part checked before it ships."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 max-w-md text-sm text-white/85",
														children: "Materials verified, geometries measured, brands authenticated — no surprises when the part reaches your line."
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTile, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5" }),
										title: "12 categories in one PO",
										body: "Pumps, seals, elastomers, hoses, bearings, valves, springs and more — consolidated to save procurement cycles.",
										className: "md:col-span-3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTile, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-5 w-5" }),
										title: "Application-matched sizing",
										body: "Tell us the duty. We recommend the material, class and geometry that will actually survive it."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTile, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5" }),
										title: "Ready to dispatch",
										body: "Fast-moving SKUs stocked in Hosur — same-day pick, next-day dispatch across South India.",
										accent: true
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid grid-cols-2 gap-3 rounded-3xl border border-hairline bg-surface p-4 sm:grid-cols-4 sm:gap-6 sm:p-8",
								children: [
									{
										k: "12",
										v: "product categories"
									},
									{
										k: "500+",
										v: "line-ready SKUs"
									},
									{
										k: "8",
										v: "industries served"
									},
									{
										k: "20+",
										v: "trusted OEM brands"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl font-black tracking-tight text-ink sm:text-4xl",
										children: s.k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground",
										children: s.v
									})]
								}, s.v))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-brass",
								children: "Sector deep dive"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display font-black leading-[1] tracking-[-0.03em]",
								style: { fontSize: "clamp(1.75rem, 4vw, 2.75rem)" },
								children: "Eight industries. One catalogue."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-sm text-muted-foreground",
								children: "Each sector below lists the duty conditions, typical applications and the AARRKKAA parts that fit them — jump straight to the product page from any card."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-5 lg:grid-cols-2",
							children: SECTORS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectorCard, {
								sector: s,
								index: i
							}, s.name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative overflow-hidden rounded-3xl border border-hairline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: industries_inventory_default,
									alt: "Warehouse of neatly organised industrial parts and components",
									width: 1200,
									height: 900,
									loading: "lazy",
									className: "h-64 w-full object-cover sm:h-96"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-brass",
										children: "How we work"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 font-display font-black leading-[1] tracking-[-0.03em]",
										style: { fontSize: "clamp(1.75rem, 4vw, 2.75rem)" },
										children: "From enquiry to line-ready — in four steps."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mt-6 space-y-4",
										children: [
											{
												t: "Share the duty",
												d: "Send us the drawing, fluid, temperature, pressure and speed — or just a photo of the failed part."
											},
											{
												t: "We spec the part",
												d: "Our application engineers recommend the correct material class, brand and geometry."
											},
											{
												t: "Quote & confirm",
												d: "Transparent pricing with lead-time — usually ex-stock for fast-moving items."
											},
											{
												t: "Dispatch & support",
												d: "Packed, dispatched and backed by after-sales support if anything needs adjustment."
											}
										].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-black text-background",
												children: i + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-ink",
													children: step.t
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm text-muted-foreground",
													children: step.d
												})]
											})]
										}, step.t))
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto mt-20 max-w-7xl px-4 pb-20 sm:mt-28 sm:px-8 sm:pb-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-3xl border border-hairline bg-ink p-8 text-background sm:p-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass/25 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-background/85",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factory, { className: "h-3.5 w-3.5" }), " Talk to an application engineer"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-2xl font-black leading-tight sm:text-4xl",
											children: "Not sure which part fits your line?"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 max-w-lg text-sm text-background/75 sm:text-base",
											children: "Share your duty conditions and we'll come back with the right specification, brand options and delivery timeline."
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 sm:items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/contact",
										className: "inline-flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brass/90",
										children: ["Request a quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${COMPANY.phones[0].replace(/\s+/g, "")}`,
										className: "text-sm font-medium text-background/85 underline-offset-4 hover:underline",
										children: ["or call ", COMPANY.phones[0]]
									})]
								})]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function FeatureTile({ icon, title, body, className = "", accent = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative overflow-hidden rounded-3xl border p-6 sm:p-7 ${accent ? "border-brass/30 bg-gradient-to-br from-brass/15 via-surface to-surface text-ink" : "border-hairline bg-surface text-ink"} ${className}`,
		children: [
			accent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brass/25 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `relative inline-grid h-10 w-10 place-items-center rounded-xl ${accent ? "bg-brass text-ink" : "bg-ink text-background"}`,
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "relative mt-4 font-display text-lg font-black tracking-tight sm:text-xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative mt-2 text-sm leading-relaxed text-muted-foreground",
				children: body
			})
		]
	});
}
function SectorCard({ sector, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: `sector-${sector.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
		className: "group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition hover:shadow-lift",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 w-full overflow-hidden sm:h-56",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: sector.image,
					alt: `${sector.name} industry application`,
					loading: "lazy",
					className: "h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }),
						"Sector ",
						String(index + 1).padStart(2, "0")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-black leading-tight text-white sm:text-3xl",
						children: sector.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] font-medium text-white/85",
						children: sector.tagline
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-5 p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] leading-relaxed text-muted-foreground",
					children: sector.desc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-hairline bg-background p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
							children: "Duty window"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm font-semibold text-ink",
							children: sector.duty
						})]
					}), sector.compliance && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-hairline bg-background p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
							children: "Compliance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm font-semibold text-ink",
							children: sector.compliance
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
					children: "Typical applications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2",
					children: sector.applications.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2 text-[13px] text-ink/85",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" }), a]
					}, a))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto border-t border-hairline pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
						children: "Recommended products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: sector.products.map((p) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: CATEGORIES.some((c) => c.slug === p.slug) ? `/products/${p.slug}` : "/products",
								className: "inline-flex items-center gap-1 rounded-full border border-hairline bg-background px-3 py-1.5 text-[12px] font-medium text-ink/85 transition hover:border-ink hover:text-ink",
								children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
							}, p.name);
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { IndustriesPage as component };
