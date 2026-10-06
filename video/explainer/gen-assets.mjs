// Generates icons.js (lucide icons as SVG strings) and world.js (the site's world map path)
// so explainer.html can run straight from the file system.
import fs from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as L from "lucide-react";

const names = ["Phone", "MessageCircle", "Mail", "Camera", "Truck", "Plane", "Ship", "Package", "PackageCheck", "Check", "CheckCircle2",
  "Factory", "Warehouse", "Clock", "AlertTriangle", "Search", "Scale", "BadgeCheck", "Globe2", "Tag", "ArrowRight", "FileText", "Handshake", "TrendingDown"];
const icons = {};
for (const n of names) {
  if (!L[n]) throw new Error("missing icon " + n);
  icons[n] = renderToStaticMarkup(createElement(L[n], { size: 24, strokeWidth: 2 }));
}
fs.writeFileSync(new URL("./icons.js", import.meta.url), "window.ICONS = " + JSON.stringify(icons) + ";\n");

const src = fs.readFileSync(new URL("../../src/data/worldCountries.ts", import.meta.url), "utf8");
const path = src.match(/WORLD_PATH = "([^"]+)"/)[1];
fs.writeFileSync(new URL("./world.js", import.meta.url), "window.WORLD_PATH = " + JSON.stringify(path) + ";\n");
console.log("icons", Object.keys(icons).length, "world path", path.length);
