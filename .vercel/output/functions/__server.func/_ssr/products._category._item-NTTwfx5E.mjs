import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getItem } from "./items-e15jl-5G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._category._item-NTTwfx5E.js
var $$splitNotFoundComponentImporter = () => import("./products._category._item-CF8HRo5i.mjs");
var $$splitComponentImporter = () => import("./products._category._item-B9pIkkyf.mjs");
var Route = createFileRoute("/products/$category/$item")({
	loader: ({ params }) => {
		const detail = getItem(params.category, params.item);
		if (!detail) throw notFound();
		return { detail };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product not found — AARRKKAA International" }, {
			name: "robots",
			content: "noindex"
		}] };
		const d = loaderData.detail;
		const title = `${d.name} — ${d.category.name} | AARRKKAA International`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: d.description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: d.description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
