import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { getItem, slugify } from "@/data/items";
import type { ProductCategory } from "@/data/catalog";

export function ProductItemCard({
  category,
  itemName,
  index,
}: {
  category: ProductCategory;
  itemName: string;
  index: number;
}) {
  const itemSlug = slugify(itemName);
  const detail = getItem(category.slug, itemSlug);

  // Show top 3 non-redundant specs as preview pills
  const previewSpecs = detail
    ? detail.specs
        .filter(
          (s) =>
            !["Type", "Product", "Configuration", "Component", "Product Type"].includes(s.label) &&
            s.value.toLowerCase() !== itemName.toLowerCase()
        )
        .slice(0, 3)
    : [];

  return (
    <Link
      to="/products/$category/$item"
      params={{ category: category.slug, item: itemSlug }}
      className="group relative flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-5 sm:p-6 transition-all duration-300 hover:border-ink/25 hover:shadow-soft overflow-hidden"
    >
      {/* Top bar: Item number */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          {String(index + 1).padStart(2, "0")}
        </span>
        {detail && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {detail.specs.length} specs
          </span>
        )}
      </div>

      {/* Item Title & Description */}
      <div className="flex-1">
        <h3 className="font-sans text-lg font-bold tracking-tight text-ink group-hover:text-brass transition-colors">
          {itemName}
        </h3>
        {detail && (
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {detail.description}
          </p>
        )}

        {/* Quick Preview Spec Badges */}
        {previewSpecs.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {previewSpecs.map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center gap-1 rounded-md border border-hairline bg-background/80 px-2 py-0.5 text-[11px] font-medium text-ink/80 shadow-2xs"
              >
                <span className="text-muted-foreground">{spec.label}:</span>
                <span className="font-semibold text-ink">{spec.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-hairline/60 pt-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/70 group-hover:text-ink transition-colors">
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>

        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/contact?category=${encodeURIComponent(category.name)}&product=${encodeURIComponent(itemName)}`;
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-1.5 text-[11px] font-bold text-ink shadow-2xs transition-all hover:bg-brass/90 hover:shadow active:scale-95 cursor-pointer"
        >
          <Sparkles className="h-3 w-3 text-ink" />
          <span>Get Quote</span>
        </span>
      </div>
    </Link>
  );
}
