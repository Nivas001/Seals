import { n as COMPANY } from "./catalog-DvL_hCl1.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as CircleCheck, T as ArrowRight, p as Mail, s as Phone } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as Footer } from "./Footer-D6773OTi.mjs";
import { t as Route } from "./products._category._item-NTTwfx5E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._category._item-B9pIkkyf.js
var import_jsx_runtime = require_jsx_runtime();
function ItemPage() {
	const { detail } = Route.useLoaderData();
	const d = detail;
	const c = d.category;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-28 sm:pt-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-7xl px-5 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": "Breadcrumb",
							className: "text-[12px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-ink",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products",
									className: "hover:text-ink",
									children: "Products"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products/$category",
									params: { category: c.slug },
									className: "hover:text-ink",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink",
									children: d.name
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), c.name]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink",
									style: { fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)" },
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-lg font-medium text-ink/80",
									children: d.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground",
									children: d.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/contact",
											className: "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-ink/85",
											children: ["Request a quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `tel:${COMPANY.phones[0].replace(/\s+/g, "")}`,
											className: "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
												" ",
												COMPANY.phones[0]
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `mailto:${COMPANY.emails[0]}`,
											className: "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Email enquiry"]
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-lift",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.image,
									alt: `${d.name} — ${c.name}`,
									className: "h-full w-full object-cover",
									width: 1200,
									height: 900
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur",
									children: ["Representative image · ", c.name]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[1.5rem] border border-hairline bg-surface p-6 shadow-soft lg:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-brass",
										children: "Specifications"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl",
										children: "Technical profile"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
										className: "mt-6 divide-y divide-hairline",
										children: d.specs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
												children: s.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "text-sm font-medium text-ink",
												children: s.value
											})]
										}, s.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-xs text-muted-foreground",
										children: "Specifications are typical and vary by variant. Share your duty conditions for an exact recommendation."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[1.5rem] border border-hairline bg-ink p-6 text-background shadow-soft",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-brass",
										children: "Key benefits"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-2xl font-black tracking-tight sm:text-3xl",
										children: "Why this product"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 space-y-3",
										children: d.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-3 text-sm leading-relaxed text-background/90",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
										}, b))
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 lg:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[1.5rem] border border-hairline bg-surface p-6 lg:col-span-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-brass",
										children: "Applications"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-xl font-black tracking-tight text-ink",
										children: "Typical industries"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 flex flex-wrap gap-2",
										children: d.applications.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-hairline bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70",
											children: a
										}, a))
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[1.5rem] border border-hairline bg-surface p-6 lg:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-end justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-brass",
										children: "In the same range"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "mt-1 font-display text-xl font-black tracking-tight text-ink",
										children: ["Other ", c.name.toLowerCase()]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/products/$category",
										params: { category: c.slug },
										className: "text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-ink",
										children: "View all →"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 grid gap-2 sm:grid-cols-2",
									children: d.siblings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/products/$category/$item",
										params: {
											category: c.slug,
											item: s.slug
										},
										className: "group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-white p-3 transition hover:border-ink/25",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-ink",
											children: s.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-ink/50 transition group-hover:translate-x-0.5 group-hover:text-ink" })]
									}) }, s.slug))
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-black tracking-tight text-ink sm:text-3xl",
							children: "Related categories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: d.relatedCategories.slice(0, 4).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/products/$category",
								params: { category: o.slug },
								className: "group overflow-hidden rounded-2xl border border-hairline bg-surface",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative aspect-[5/3] overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: o.image,
										alt: o.name,
										loading: "lazy",
										className: "h-full w-full object-cover transition group-hover:scale-105"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-base font-bold tracking-tight text-ink",
										children: o.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: [String(o.count).padStart(2, "0"), " items"]
									})]
								})]
							}, o.slug))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[1.75rem] border border-hairline bg-ink p-8 text-background shadow-lift sm:p-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-2xl font-black tracking-tight sm:text-4xl",
									children: [
										"Need this ",
										d.name.toLowerCase(),
										" for your line?"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-xl text-sm text-background/70",
									children: "Share your duty conditions and drawings — our team responds with a technical recommendation and a firm quote."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-3 sm:justify-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/contact",
										className: "inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink hover:bg-brass/90",
										children: ["Send enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${COMPANY.phones[0].replace(/\s+/g, "")}`,
										className: "inline-flex items-center gap-2 rounded-full border border-background/25 bg-transparent px-5 py-3 text-sm font-semibold text-background hover:bg-background/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Call"]
									})]
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ItemPage as component };
