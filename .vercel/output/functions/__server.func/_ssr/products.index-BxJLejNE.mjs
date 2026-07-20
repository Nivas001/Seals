import { t as CATEGORIES } from "./catalog-DvL_hCl1.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { w as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { n as Navbar, t as Footer } from "./Footer-D6773OTi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-BxJLejNE.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-32 sm:pt-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-7xl px-5 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-6 flex-col sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), "Full catalog"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 font-display font-black leading-[0.98] tracking-[-0.03em] text-ink",
								style: { fontSize: "clamp(2.5rem, 6vw, 5rem)" },
								children: ["Every part. One", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-brass",
									children: " supplier."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground",
								children: [
									"Twelve categories, ",
									total,
									"+ line items — pumps, seals, elastomers, stainless steel, hoses, springs and precision components sourced for process reliability."
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-hairline bg-surface px-5 py-4 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-black text-ink",
								children: CATEGORIES.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
								children: "Categories"
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto mt-14 max-w-7xl px-5 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: CATEGORIES.map((cat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
								duration: .4,
								delay: i * .03
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/products/$category",
								params: { category: cat.slug },
								className: "group block overflow-hidden rounded-2xl border border-hairline bg-surface transition hover:shadow-lift",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-[4/3] overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: cat.image,
										alt: cat.name,
										loading: "lazy",
										className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink",
										children: [String(cat.count).padStart(2, "0"), " items"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-xl font-black tracking-tight text-ink",
											children: cat.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm leading-snug text-muted-foreground",
											children: cat.short
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/[0.04] text-ink transition group-hover:bg-ink group-hover:text-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })
									})]
								})]
							})
						}, cat.slug))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ProductsPage as component };
