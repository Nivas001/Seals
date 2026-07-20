import { f as getCategory } from "./catalog-DvL_hCl1.mjs";
import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._category-D8M_DMN-.js
var $$splitNotFoundComponentImporter = () => import("./products._category-Cz0upQtO.mjs");
var $$splitComponentImporter = () => import("./products._category-BKyxOT02.mjs");
var Route = createFileRoute("/products/$category")({
	loader: ({ params }) => {
		const cat = getCategory(params.category);
		if (!cat) throw notFound();
		return { category: cat };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Category not found — AARRKKAA International" }, {
			name: "robots",
			content: "noindex"
		}] };
		const c = loaderData.category;
		return { meta: [
			{ title: `${c.name} — AARRKKAA International` },
			{
				name: "description",
				content: c.description
			},
			{
				property: "og:title",
				content: `${c.name} — AARRKKAA International`
			},
			{
				property: "og:description",
				content: c.description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
