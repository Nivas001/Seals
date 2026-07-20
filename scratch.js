const fs = require("fs");
let content = fs.readFileSync("src/components/site/Footer.tsx", "utf8");

content = content.replace(/className="mt-24 relative overflow-hidden" style=\{\{ background: "var\(--gradient-footer\)" \}\}/g, 'className="mt-24 relative overflow-hidden border-t border-hairline bg-surface"');
content = content.replace(/style=\{\{ background: "linear-gradient.*?\}\}/g, 'style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}');

content = content.replace(/text-white\/60/g, 'text-muted-foreground');
content = content.replace(/text-white\/55/g, 'text-muted-foreground');
content = content.replace(/text-white\/50/g, 'text-muted-foreground');
content = content.replace(/text-white\/40/g, 'text-muted-foreground');
content = content.replace(/text-white\/35/g, 'text-muted-foreground');
content = content.replace(/text-white\/65/g, 'text-ink\/60');
content = content.replace(/text-white/g, 'text-ink');
content = content.replace(/border-white\/10/g, 'border-hairline');
content = content.replace(/bg-white\/5/g, 'bg-background');
content = content.replace(/stroke="white"/g, 'stroke="currentColor" className="text-ink"');
content = content.replace(/fill="white"/g, 'fill="currentColor" className="text-ink"');
content = content.replace(/text-primary-foreground/g, 'text-ink');
content = content.replace(/var\(--gradient-brand\)/g, 'var(--surface)');
content = content.replace(/var\(--gradient-brass\)/g, 'var(--surface)');

fs.writeFileSync("src/components/site/Footer.tsx", content);
