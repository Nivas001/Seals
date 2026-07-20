import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$6 } from "./products._category-D8M_DMN-.mjs";
import { t as Route$7 } from "./products._category._item-NTTwfx5E.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cb-bt2k0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BkrjxOTy.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("[ErrorBoundary]", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AARRKKAA International — Industrial Pumps, Seals & Precision Components" },
			{
				name: "description",
				content: "Supplier & distributor of pumps, mechanical seals, elastomers, stainless steel, hoses and precision components for food, pharma, chemical and process industries across South India."
			},
			{
				name: "author",
				content: "AARRKKAA International"
			},
			{
				property: "og:title",
				content: "AARRKKAA International — Integrated technology support"
			},
			{
				property: "og:description",
				content: "Pumps, mechanical seals, elastomers, stainless steel and precision components for process industries. Head office in Hosur, Tamil Nadu."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:image",
				content: "/og-image.jpg"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$4 = () => import("./industries-K7u45nxh.mjs");
var Route$4 = createFileRoute("/industries")({
	head: () => ({ meta: [
		{ title: "Industries We Serve — AARRKKAA International" },
		{
			name: "description",
			content: "AARRKKAA supplies engineered pumps, seals, elastomers and precision components to food, chemical, beverages, breweries, plastics, pharma, oil & gas and dye manufacturing."
		},
		{
			property: "og:title",
			content: "Industries We Serve — AARRKKAA International"
		},
		{
			property: "og:description",
			content: "Eight sectors, one reliable supplier — engineered components for process-critical industries."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./contact-Jy33MOpW.mjs");
var Route$3 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — AARRKKAA International" },
		{
			name: "description",
			content: "Send a spec, drawing or photo — we respond within 24 hours on business days with grade, brand and dispatch timeline."
		},
		{
			property: "og:title",
			content: "Contact AARRKKAA International"
		},
		{
			property: "og:description",
			content: "Corporate enquiries, product quotes and support for AARRKKAA International, Hosur."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./about-D0uv4cQ2.mjs");
var Route$2 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us — AARRKKAA International" },
		{
			name: "description",
			content: "AARRKKAA International is a Hosur-based supplier and distributor of pumps, mechanical seals, elastomers and precision components for process industries across South India."
		},
		{
			property: "og:title",
			content: "About AARRKKAA International"
		},
		{
			property: "og:description",
			content: "Head office in Hosur, Tamil Nadu with branches across South India — delivering quality parts with a timely approach."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-B9mlUDIs.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./products.index-BxJLejNE.mjs");
var Route = createFileRoute("/products/")({
	head: () => ({ meta: [
		{ title: "Product Catalog — AARRKKAA International" },
		{
			name: "description",
			content: "Explore the full AARRKKAA product catalog: pumps, mechanical seals, elastomers, silicone, hoses, stainless steel, bearings, springs, valves, couplings and more."
		},
		{
			property: "og:title",
			content: "Product Catalog — AARRKKAA International"
		},
		{
			property: "og:description",
			content: "Pumps, seals, elastomers, stainless steel, hoses and precision components — organised into 12 categories."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndustriesRoute = Route$4.update({
	id: "/industries",
	path: "/industries",
	getParentRoute: () => Route$5
});
var ContactRoute = Route$3.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$5
});
var AboutRoute = Route$2.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$5
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var ProductsIndexRoute = Route.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$5
});
var ProductsCategoryRoute = Route$6.update({
	id: "/products/$category",
	path: "/products/$category",
	getParentRoute: () => Route$5
});
var ProductsCategoryRouteChildren = { ProductsCategoryItemRoute: Route$7.update({
	id: "/$item",
	path: "/$item",
	getParentRoute: () => ProductsCategoryRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	IndustriesRoute,
	ProductsCategoryRoute: ProductsCategoryRoute._addFileChildren(ProductsCategoryRouteChildren),
	ProductsIndexRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
