import { a as __toESM } from "../_runtime.mjs";
import { n as COMPANY, r as SECTORS, t as CATEGORIES } from "./catalog-DvL_hCl1.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ChevronUp, S as CircleCheck, T as ArrowRight, a as ShieldCheck, f as MapPin, i as Sparkles, l as MessagesSquare, n as Truck, p as Mail, r as Star, s as Phone, w as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as motion, r as AnimatePresence, t as useInView } from "../_libs/framer-motion.mjs";
import { n as Navbar, t as Footer } from "./Footer-D6773OTi.mjs";
import { t as factory_default } from "./factory-BTivBIAf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B9mlUDIs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_mechanical_default = "/assets/hero-mechanical-CIrHw-vj.jpg";
var BENTO_LAYOUT = {
	pumps: "sm:col-span-4 sm:row-span-2",
	"mechanical-seals": "sm:col-span-2 sm:row-span-2",
	elastomers: "sm:col-span-2",
	silicone: "sm:col-span-2",
	hoses: "sm:col-span-2",
	"stainless-steel": "sm:col-span-4",
	bearings: "sm:col-span-2",
	couplings: "sm:col-span-2",
	nozzles: "sm:col-span-2",
	valves: "sm:col-span-2",
	springs: "sm:col-span-2",
	other: "sm:col-span-2"
};
function useCountUp(target, duration = 1500) {
	const [count, setCount] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-80px"
	});
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		let start = 0;
		const step = target / (duration / 16);
		const timer = setInterval(() => {
			start += step;
			if (start >= target) {
				setCount(target);
				clearInterval(timer);
			} else setCount(Math.floor(start));
		}, 16);
		return () => clearInterval(timer);
	}, [
		inView,
		target,
		duration
	]);
	return {
		count,
		ref
	};
}
function StatItem({ target, suffix, label }) {
	const { count, ref } = useCountUp(target);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-display text-2xl font-black tracking-tight text-ink sm:text-3xl",
			children: [count, suffix]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground",
			children: label
		})]
	});
}
function Home() {
	const featured = CATEGORIES.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustStrip, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutPreview, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsBento, { featured }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Industries, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyUs, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTABand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactPreview, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActions, {})
		]
	});
}
function FloatingActions() {
	const [showTop, setShowTop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShowTop(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:right-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			initial: {
				opacity: 0,
				scale: .7
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .7
			},
			transition: { duration: .2 },
			onClick: () => window.scrollTo({
				top: 0,
				behavior: "smooth"
			}),
			className: "grid h-10 w-10 place-items-center rounded-full border border-hairline bg-background shadow-lift text-ink/70 transition hover:text-ink hover:-translate-y-0.5",
			"aria-label": "Scroll to top",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
		}, "scroll-top") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: "https://wa.me/917806936475",
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": "Chat on WhatsApp",
			className: "group relative flex items-center gap-2 overflow-hidden rounded-full shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(37,211,102,0.4)]",
			style: { background: "#25D366" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "max-w-0 overflow-hidden pl-0 text-[13px] font-semibold text-white transition-all duration-300 group-hover:max-w-[140px] group-hover:pl-4 whitespace-nowrap",
				children: "Chat with us"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-12 w-12 shrink-0 place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "h-6 w-6 text-white",
					fill: "currentColor",
					viewBox: "0 0 24 24",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
				})
			})]
		})]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden pt-28 sm:pt-32 lg:pt-36",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-[0.35]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-lines absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "radial-gradient(ellipse at 50% 0%, oklch(0.985 0.005 85 / 0) 55%, oklch(0.985 0.005 85) 82%)" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto max-w-7xl px-5 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							className: "inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), "Integrated technology support"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .6,
								delay: .05
							},
							className: "mt-5 text-balance font-display font-black leading-[0.95] tracking-[-0.035em] text-ink",
							style: { fontSize: "clamp(2.5rem, 6.2vw, 5.25rem)" },
							children: [
								"Precision parts for",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"industry that",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block bg-clip-text px-2 italic text-transparent",
									style: { backgroundImage: "var(--gradient-brand)" },
									children: "can’t stop."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .15
							},
							className: "mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "AARRKKAA International supplies pumps, mechanical seals, stainless steel, elastomers and specialty components to food, pharma, chemical and process plants across South India — matched accurately, shipped on time."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .25
							},
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/products",
								className: "group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition hover:bg-ink/85",
								children: ["Explore the catalog", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white",
								children: "Request a quote"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatItem, {
									target: 12,
									suffix: "+",
									label: "Product categories"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatItem, {
									target: 8,
									suffix: "",
									label: "Sectors served"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatItem, {
									target: 100,
									suffix: "+",
									label: "SKU lines stocked"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .98
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .7,
						delay: .1
					},
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-hairline bg-surface shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_mechanical_default,
								alt: "Precision machined mechanical assembly with polished steel and brass components",
								width: 1600,
								height: 1400,
								className: "h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-0",
								style: { background: "linear-gradient(180deg, transparent 55%, oklch(0.14 0.02 260 / 0.35) 100%)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .5 },
								className: "glass-strong absolute left-4 top-4 max-w-[62%] rounded-2xl p-3.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "grid h-8 w-8 place-items-center rounded-lg text-primary-foreground",
										style: { background: "var(--gradient-brass)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
											children: "Authorised"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold text-ink",
											children: "SKF · FAG · NTN · INA"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .65 },
								className: "glass-strong absolute bottom-4 left-4 right-4 rounded-2xl p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
											children: "Head office"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 text-sm font-bold text-ink",
											children: "Hosur, Tamil Nadu"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 text-xs text-muted-foreground",
											children: "Branches across South India"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-background transition hover:bg-ink/85",
										"aria-label": "Contact us",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
									})]
								})
							})
						]
					})
				})]
			})
		})]
	});
}
function TrustStrip() {
	const items = [
		"SKF",
		"FAG",
		"NTN",
		"INA",
		"Schneider Electric",
		"PTFE",
		"Werner Finley",
		"FFKM",
		"EPDM",
		"HNBR",
		"Tata Electronics",
		"Enterprise Partner",
		"RMZ Oil & Gas",
		"SS 316",
		"NYLATRON"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-20 border-y border-hairline bg-surface py-6 sm:mt-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-5 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block",
				children: "Brands & materials we stock"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "marquee-track flex w-max gap-10",
						children: [...items, ...items].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whitespace-nowrap text-[13px] font-semibold tracking-tight text-ink/60",
							children: x
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-y-0 left-0 w-16",
						style: { background: "linear-gradient(to right, var(--surface), transparent)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-y-0 right-0 w-16",
						style: { background: "linear-gradient(to left, var(--surface), transparent)" }
					})
				]
			})]
		})
	});
}
function AboutPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "About the company" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl",
					children: [
						"A trusted partner for",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"plants that",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-brass",
							children: " keep running."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-lg text-base leading-relaxed text-muted-foreground",
					children: "AARRKKAA International is a supplier and distributor of pumps, pump spares, stainless steel flanges, clamps, silicone products, gaskets, seals, hoses, non-sparking tools and precision springs. Our head office is in Hosur, Tamil Nadu, with branches across South India — enabling fast response and consistent delivery for plants that can’t afford downtime."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white",
						children: ["Our story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-[2rem] border border-hairline p-8 sm:p-10",
					style: { background: "var(--gradient-brand)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70",
							children: "Our motto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl",
							children: [
								"“",
								COMPANY.motto,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3",
							children: [
								{
									k: "Improve",
									v: "Response time on every query"
								},
								{
									k: "Accuracy",
									v: "Right part, first time"
								},
								{
									k: "Feedback",
									v: "Loop that builds trust"
								}
							].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-white/10 p-4 backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-white",
									children: x.k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs leading-snug text-white/70",
									children: x.v
								})]
							}, x.k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40",
							style: {
								background: "var(--gradient-brass)",
								filter: "blur(60px)"
							}
						})
					]
				})
			})]
		})
	});
}
function ProductsBento({ featured }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between gap-6 sm:flex-row sm:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "What we supply" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl",
				children: [
					"A catalog built for",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"process reliability."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/products",
				className: "inline-flex items-center gap-2 self-start rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur hover:bg-white sm:self-end",
				children: ["View all categories ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-6 lg:auto-rows-[240px]",
			children: featured.map((cat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .5,
					delay: i * .04
				},
				className: `bento-tile bento-tile-hover ${BENTO_LAYOUT[cat.slug] ?? "sm:col-span-2"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/products/$category",
					params: { category: cat.slug },
					className: "group relative flex h-full w-full flex-col justify-between overflow-hidden p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cat.image,
							alt: cat.name,
							loading: "lazy",
							className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-0",
							style: { background: "linear-gradient(180deg, oklch(1 0 0 / 0.05) 0%, oklch(0.14 0.02 260 / 0.55) 100%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "glass rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink",
								children: [String(cat.count).padStart(2, "0"), " items"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "glass-strong grid h-8 w-8 place-items-center rounded-full text-ink transition group-hover:bg-ink group-hover:text-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-black tracking-tight text-white sm:text-2xl",
								children: cat.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-xs text-[13px] leading-snug text-white/85",
								children: cat.short
							})]
						})
					]
				})
			}, cat.slug))
		})]
	});
}
function Industries() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-[1fr_1.4fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Industries we serve" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl",
					children: [
						"Eight sectors.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"One reliable",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-brass",
							children: " partner."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-sm leading-relaxed text-muted-foreground",
					children: "Our components meet the hygienic, chemical and mechanical demands of some of India’s most process-critical industries."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: SECTORS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					initial: {
						opacity: 0,
						y: 10
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .4,
						delay: i * .04
					},
					className: "group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-4 transition hover:border-ink/25 hover:shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] font-semibold uppercase tracking-[0.12em] text-brass",
							children: ["Sector 0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-display text-lg font-black tracking-tight text-ink",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-snug text-muted-foreground",
							children: s.desc
						})
					]
				}, s.name))
			})]
		})
	});
}
function WhyUs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Why AARRKKAA" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "max-w-xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl",
					children: [
						"Committed to convenience,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"accuracy and delivery."
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						num: "01",
						icon: ShieldCheck,
						title: "Quality first",
						body: "Genuine bearings, certified elastomers and traceable stainless steel — no compromises on materials or sourcing.",
						accent: "oklch(0.5 0.15 245)"
					},
					{
						num: "02",
						icon: Truck,
						title: "Timely delivery",
						body: "Regional stock and disciplined logistics keep your production line running when critical parts run out.",
						accent: "oklch(0.74 0.14 75)"
					},
					{
						num: "03",
						icon: MessagesSquare,
						title: "Fast response",
						body: "Improved response time on every technical query, quote request and follow-up — no long wait times.",
						accent: "oklch(0.5 0.15 245)"
					},
					{
						num: "04",
						icon: CircleCheck,
						title: "Feedback loop",
						body: "We collect customer feedback to continuously sharpen matching accuracy and order reliability.",
						accent: "oklch(0.74 0.14 75)"
					}
				].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 14
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .45,
						delay: i * .07
					},
					className: "group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-shadow duration-300 hover:shadow-lift",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "pointer-events-none absolute -right-3 -top-4 font-display text-[5.5rem] font-black leading-none tracking-tighter select-none transition-transform duration-500 group-hover:scale-110",
							style: {
								color: p.accent,
								opacity: .07
							},
							children: p.num
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "relative grid h-11 w-11 place-items-center rounded-xl text-primary-foreground shadow-soft",
							style: { background: "var(--gradient-brand)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "relative mt-5 font-display text-lg font-bold tracking-tight text-ink",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative mt-2 text-sm leading-relaxed text-muted-foreground",
							children: p.body
						})
					]
				}, p.title))
			})
		]
	});
}
var TESTIMONIALS = [
	{
		quote: "AARRKKAA consistently delivers the right mechanical seals on time. Their matching accuracy and fast response have kept our production lines running without interruption.",
		name: "Production Manager",
		role: "Food Processing Plant, Tamil Nadu"
	},
	{
		quote: "We rely on AARRKKAA for all our pump spares and stainless steel fittings. Their team responds quickly to urgent requests and their components are always genuine.",
		name: "Maintenance Engineer",
		role: "Pharmaceutical Facility, Karnataka"
	},
	{
		quote: "Sourcing PTFE and elastomeric components used to take weeks. With AARRKKAA, we get accurate quotes and fast dispatch from their regional stock. Outstanding service.",
		name: "Procurement Head",
		role: "Chemical Process Industry, Andhra Pradesh"
	}
];
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-64 rounded-[3rem] opacity-5",
			style: {
				background: "var(--gradient-brand)",
				filter: "blur(48px)"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "What our customers say" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl",
					children: [
						"Trusted by process plants",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-brass",
							children: "across South India."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 sm:grid-cols-3",
					children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-60px"
						},
						transition: {
							duration: .5,
							delay: i * .1
						},
						className: "flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6 transition-shadow duration-300 hover:shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-0.5 mb-4",
								children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-brass text-brass" }, j))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex-1 text-sm leading-relaxed text-ink/80 italic",
								children: [
									"“",
									t.quote,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-t border-hairline pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-ink",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-[12px] text-muted-foreground",
									children: t.role
								})]
							})
						]
					}, i))
				})
			]
		})]
	});
}
function Process() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative mx-auto mt-24 max-w-7xl overflow-hidden px-5 sm:mt-32 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[2rem] p-6 sm:p-10 lg:p-14",
			style: { background: "var(--gradient-footer)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), "How we work"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl font-black leading-[1.02] tracking-tight text-white sm:text-4xl",
					children: "Assist & deliver — in three steps."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-white/40",
					children: "From first query to dispatched crate."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 grid gap-px md:grid-cols-3",
				children: [
					{
						k: "01",
						t: "Enquire",
						d: "Send a spec, a drawing, or even a photograph of the worn part. We identify it accurately.",
						icon: MessagesSquare
					},
					{
						k: "02",
						t: "Match",
						d: "We recommend the correct grade, material or brand — from our stocked programme or sourced direct.",
						icon: ShieldCheck
					},
					{
						k: "03",
						t: "Deliver",
						d: "Dispatched from our Hosur HQ or regional branch, on the timeline you need. No delays.",
						icon: Truck
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					initial: {
						opacity: 0,
						y: 14
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .45,
						delay: i * .1
					},
					className: "relative flex flex-col rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm md:rounded-none md:border-0 md:border-r md:last:border-r-0 md:bg-transparent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-5xl font-black italic leading-none",
							style: {
								backgroundImage: "var(--gradient-brass)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text"
							},
							children: s.k
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "grid h-8 w-8 place-items-center rounded-lg",
								style: { background: "rgba(255,255,255,0.1)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-white/70" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold tracking-tight text-white",
								children: s.t
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-white/55 md:pr-8",
							children: s.d
						})
					]
				}, s.k))
			})]
		})
	});
}
function CTABand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[2rem] p-8 sm:p-14",
			style: { background: "var(--gradient-brand)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: factory_default,
				alt: "",
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity",
				loading: "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70",
						children: "Need a specific spare?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 font-display text-3xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl",
						children: [
							"Tell us the part.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"We’ll match it."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base",
						children: "Share a drawing, a model number or a picture. Our team responds with the exact grade, brand and delivery timeline."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+917806936475",
							className: "glass-strong flex items-center justify-between rounded-2xl px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: "Call sales"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-bold text-ink",
								children: "+91 78069 36475"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-brass" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://wa.me/917806936475",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "glass-strong flex items-center justify-between rounded-2xl px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: "WhatsApp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-bold text-ink",
								children: "Chat instantly"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "h-5 w-5 text-[#25D366]",
								fill: "currentColor",
								viewBox: "0 0 24 24",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:aarrkkaainternational@gmail.com",
							className: "glass-strong flex items-center justify-between rounded-2xl px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-display text-sm font-bold text-ink",
									children: "aarrkkaainternational@gmail.com"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 shrink-0 text-brass" })]
						})
					]
				})]
			})]
		})
	});
}
function ContactPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto mt-24 max-w-7xl px-5 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Find us" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl",
				children: "Get in touch."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: { duration: .5 },
					className: "lg:col-span-2 relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lift",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full opacity-40",
						style: {
							background: "var(--gradient-brand)",
							filter: "blur(48px)"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "grid h-10 w-10 place-items-center rounded-xl text-primary-foreground",
								style: { background: "var(--gradient-brand)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Head office"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-display text-2xl font-black tracking-tight text-ink",
								children: "Hosur, Tamil Nadu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm leading-relaxed text-ink/70",
								children: [
									COMPANY.address.line1,
									", ",
									COMPANY.address.line2,
									",",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									COMPANY.address.city,
									", ",
									COMPANY.address.state,
									" — ",
									COMPANY.address.pincode
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-[12px] text-muted-foreground",
								children: "Branches across Tamil Nadu · Karnataka · Andhra Pradesh · Telangana · Kerala"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .5,
						delay: .1
					},
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 rounded-2xl border border-hairline bg-surface p-6 transition-shadow duration-300 hover:shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "grid h-10 w-10 place-items-center rounded-xl",
								style: { background: "var(--gradient-brass)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Phone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 space-y-1",
								children: COMPANY.phones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${p.replace(/\s/g, "")}`,
									className: "block font-display text-lg font-bold text-ink hover:text-brass transition-colors",
									children: p
								}, p))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 rounded-2xl border border-hairline bg-surface p-6 transition-shadow duration-300 hover:shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "grid h-10 w-10 place-items-center rounded-xl",
								style: { background: "var(--gradient-brand)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 space-y-1",
								children: COMPANY.emails.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${e}`,
									className: "block break-all text-sm font-semibold text-ink hover:text-brass transition-colors",
									children: e
								}, e))
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white",
					children: ["Full contact details & enquiry form ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			})
		]
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), children]
	});
}
//#endregion
export { Home as component };
