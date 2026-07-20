import { a as __toESM } from "../_runtime.mjs";
import { n as COMPANY, t as CATEGORIES } from "./catalog-DvL_hCl1.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Download, d as Menu, f as MapPin, p as Mail, s as Phone, t as X, v as FileDown } from "../_libs/lucide-react.mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-D6773OTi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATALOG_PDF_URL = {
	version: 1,
	asset_id: "3c6041ec-3e7e-4f6d-b058-290326315e08",
	project_id: "4d5c5f89-5922-4d7f-ae7e-0ca174fff69d",
	url: "/__l5e/assets-v1/3c6041ec-3e7e-4f6d-b058-290326315e08/AARRKKAA-Catalog.pdf",
	r2_key: "a/v1/4d5c5f89-5922-4d7f-ae7e-0ca174fff69d/3c6041ec-3e7e-4f6d-b058-290326315e08/AARRKKAA-Catalog.pdf",
	original_filename: "AARRKKAA-Catalog.pdf",
	size: 10517037,
	content_type: "application/pdf",
	created_at: "2026-07-20T11:37:37Z"
}.url;
var CATALOG_PDF_FILENAME = "AARRKKAA-Catalog.pdf";
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/products",
		label: "Products"
	},
	{
		to: "/industries",
		label: "Industries"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function LogoMark$1({ size = 36 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 36 36",
		fill: "none",
		"aria-hidden": true,
		className: "shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "13",
				stroke: "white",
				strokeWidth: "1.4",
				strokeOpacity: "0.5"
			}),
			Array.from({ length: 8 }).map((_, i) => {
				const rad = i * 360 / 8 * Math.PI / 180;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: 18 + Math.cos(rad) * 12,
					y1: 18 + Math.sin(rad) * 12,
					x2: 18 + Math.cos(rad) * 15.5,
					y2: 18 + Math.sin(rad) * 15.5,
					stroke: "white",
					strokeWidth: "2.2",
					strokeLinecap: "round"
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "6.5",
				stroke: "white",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "2.5",
				fill: "white"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "18",
				y1: "11.5",
				x2: "18",
				y2: "24.5",
				stroke: "white",
				strokeWidth: "1",
				strokeOpacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "11.5",
				y1: "18",
				x2: "24.5",
				y2: "18",
				stroke: "white",
				strokeWidth: "1",
				strokeOpacity: "0.55"
			})
		]
	});
}
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const currentLabel = (0, import_react.useMemo)(() => {
		if (pathname === "/") return "Home";
		for (const item of NAV) if (item.to !== "/" && pathname.startsWith(item.to)) return item.label;
		const seg = pathname.split("/").filter(Boolean)[0];
		return seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : "Home";
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: `pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 sm:px-4 ${scrolled ? "glass-liquid-strong" : "glass-liquid"}`,
			"aria-label": "Primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "group flex items-center gap-2.5 rounded-full pl-1 pr-2 py-1",
					"aria-label": "AARRKKAA International — home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"aria-hidden": true,
						className: "relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full text-primary-foreground transition-transform duration-500 ease-out group-hover:scale-105",
						style: { background: "var(--gradient-brand)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-0 rounded-full",
							style: { background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 55%)" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark$1, { size: 22 })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden text-[14px] font-semibold tracking-tight text-ink sm:block",
						children: ["AARRKKAA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 font-normal text-muted-foreground",
							children: "International"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-0.5 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "glass-shimmer relative overflow-hidden rounded-full px-4 py-1.5 text-[15px] font-medium text-ink/75 transition-colors duration-300 hover:text-ink",
						activeOptions: { exact: item.to === "/" },
						activeProps: { className: "glass-pill-active relative overflow-hidden rounded-full px-4 py-1.5 text-[15px] font-semibold text-ink" },
						children: item.label
					}) }, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 items-center justify-center md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "glass-pill-active inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold tracking-tight text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "h-1.5 w-1.5 rounded-full bg-brass"
						}), currentLabel]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: CATALOG_PDF_URL,
							download: CATALOG_PDF_FILENAME,
							target: "_blank",
							rel: "noopener",
							className: "glass-shimmer relative hidden items-center gap-1.5 overflow-hidden rounded-full border border-ink/10 px-3.5 py-2 text-[12px] font-semibold text-ink shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset] transition-colors duration-300 hover:border-ink/25 lg:inline-flex",
							style: { background: "linear-gradient(180deg, color-mix(in oklab, white 85%, transparent) 0%, color-mix(in oklab, white 55%, transparent) 100%)" },
							"aria-label": "Download catalog PDF",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								className: "h-3.5 w-3.5",
								strokeWidth: 2.5
							}), "Catalog"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+917806936475",
							className: "glass-cta-dark glass-shimmer relative hidden items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-[12px] font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
								className: "h-3.5 w-3.5",
								strokeWidth: 2.5
							}), "Get a quote"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen((v) => !v),
							className: "grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/60 text-ink shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset] transition hover:bg-white md:hidden",
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-40 md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-liquid-strong absolute inset-0 rounded-none",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				y: -20,
				opacity: 0
			},
			animate: {
				y: 0,
				opacity: 1
			},
			exit: {
				y: -10,
				opacity: 0
			},
			transition: {
				duration: .25,
				ease: [
					.2,
					.8,
					.2,
					1
				]
			},
			className: "relative flex h-full flex-col justify-between px-6 pb-8 pt-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: NAV.map((item, i) => {
					const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.li, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .05 * i },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: `relative block border-b border-hairline/70 py-4 pl-4 text-3xl font-semibold tracking-tight text-ink ${isActive ? "" : "text-ink/85"}`,
							children: [isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-brass"
							}), item.label]
						})
					}, item.to);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: CATALOG_PDF_URL,
						download: "AARRKKAA-Catalog.pdf",
						target: "_blank",
						rel: "noopener",
						onClick: () => setOpen(false),
						className: "flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-background px-6 py-3.5 text-sm font-semibold text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Download catalog (PDF)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "tel:+917806936475",
						className: "glass-cta-dark flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), "+91 78069 36475"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: "Hosur, Tamil Nadu · Serving South India"
					})
				]
			})]
		})]
	}, "mobile-menu") })] });
}
function DownloadCatalog({ variant = "outline", label = "Download catalog", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: CATALOG_PDF_URL,
		download: CATALOG_PDF_FILENAME,
		target: "_blank",
		rel: "noopener",
		className: `inline-flex items-center gap-2 font-semibold tracking-tight transition ${{
			solid: "rounded-full bg-ink px-5 py-2.5 text-[13px] text-background hover:bg-ink/85",
			outline: "rounded-full border border-ink/15 bg-background px-5 py-2.5 text-[13px] text-ink hover:border-ink/30 hover:bg-surface",
			ghost: "rounded-full px-3 py-1.5 text-[13px] text-ink/80 hover:bg-white/70 hover:text-ink",
			pill: "rounded-full bg-brass/15 px-4 py-2 text-[12px] text-ink border border-brass/30 hover:bg-brass/25"
		}[variant]} ${className}`,
		"aria-label": "Download AARRKKAA product catalog (PDF)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
			className: "h-3.5 w-3.5",
			strokeWidth: 2.5
		}), label]
	});
}
function LogoMark({ size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 36 36",
		fill: "none",
		"aria-hidden": true,
		className: "shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "13",
				stroke: "white",
				strokeWidth: "1.4",
				strokeOpacity: "0.4"
			}),
			Array.from({ length: 8 }).map((_, i) => {
				const rad = i * 360 / 8 * Math.PI / 180;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: 18 + Math.cos(rad) * 12,
					y1: 18 + Math.sin(rad) * 12,
					x2: 18 + Math.cos(rad) * 15.5,
					y2: 18 + Math.sin(rad) * 15.5,
					stroke: "white",
					strokeWidth: "2.2",
					strokeLinecap: "round"
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "6.5",
				stroke: "white",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "2.5",
				fill: "white"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "18",
				y1: "11.5",
				x2: "18",
				y2: "24.5",
				stroke: "white",
				strokeWidth: "1",
				strokeOpacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "11.5",
				y1: "18",
				x2: "24.5",
				y2: "18",
				stroke: "white",
				strokeWidth: "1",
				strokeOpacity: "0.45"
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 relative overflow-hidden",
		style: { background: "var(--gradient-footer)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-0 h-px",
				style: { background: "linear-gradient(90deg, transparent, oklch(0.74 0.14 75 / 0.6) 30%, oklch(0.62 0.14 245 / 0.5) 70%, transparent)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10",
				style: {
					background: "var(--gradient-brass)",
					filter: "blur(80px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full opacity-8",
				style: {
					background: "var(--gradient-brand)",
					filter: "blur(80px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-5 py-16 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
								style: { background: "var(--gradient-brass)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {
									className: "h-5 w-5 text-white",
									strokeWidth: 2.25
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-brass",
									children: "Product catalog · PDF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl",
									children: "Take the full AARRKKAA lineup with you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-md text-sm text-white/60",
									children: "Every category, sizing range and industry we serve — in one downloadable brochure."
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadCatalog, {
							variant: "solid",
							label: "Download catalog (PDF)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "grid h-10 w-10 place-items-center rounded-full text-primary-foreground",
										style: { background: "var(--gradient-brand)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { size: 22 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold tracking-tight text-white",
											children: "AARRKKAA INTERNATIONAL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-medium uppercase tracking-[0.14em] text-white/50",
											children: COMPANY.tagline
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-sm text-sm leading-relaxed text-white/55",
									children: "Supplier and distributor of pumps, mechanical seals, elastomers, stainless steel and precision components for food, pharma, chemical and process industries across South India."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/917806936475",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "mt-5 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 text-[13px] font-semibold text-[#25D366] transition hover:bg-[#25D366]/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-4 w-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										"aria-hidden": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
									}), "Chat on WhatsApp"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40",
								children: "Products"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2.5 text-sm",
								children: CATEGORIES.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products/$category",
									params: { category: c.slug },
									className: "text-white/65 transition-colors hover:text-white",
									children: c.name
								}) }, c.slug))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40",
								children: "Company"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										className: "text-white/65 transition-colors hover:text-white",
										children: "About us"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/industries",
										className: "text-white/65 transition-colors hover:text-white",
										children: "Industries served"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/products",
										className: "text-white/65 transition-colors hover:text-white",
										children: "Full catalog"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										className: "text-white/65 transition-colors hover:text-white",
										children: "Contact"
									}) })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40",
								children: "Reach us"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-3 text-sm text-white/65",
								children: [
									COMPANY.phones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 shrink-0 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `tel:${p.replace(/\s/g, "")}`,
											className: "transition-colors hover:text-white",
											children: p
										})]
									}, p)),
									COMPANY.emails.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 shrink-0 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `mailto:${e}`,
											className: "break-all transition-colors hover:text-white",
											children: e
										})]
									}, e)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											COMPANY.address.line1,
											", ",
											COMPANY.address.line2,
											",",
											" ",
											COMPANY.address.city,
											", ",
											COMPANY.address.state,
											" —",
											" ",
											COMPANY.address.pincode
										] })]
									})
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" AARRKKAA International. All rights reserved."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Head office in Hosur · Branches across South India" })]
					})
				]
			})
		]
	});
}
//#endregion
export { Navbar as n, Footer as t };
