import { Link } from "@tanstack/react-router";

export function ProductItemCard({
  category, product, index, variant = "default",
}: { category: any; product: any; index: number; variant?: "default" | "bento" }) {
  const specs = (product.specs || []).filter((spec: any) =>
    !["Type", "Product", "Configuration", "Component", "Product Type"].includes(spec.label)
    && String(spec.value).toLowerCase() !== product.name.toLowerCase()).slice(0, 2);
  const image = product.image || category.image;
  return (
    <article className={`arka-product-card ${variant === "bento" ? "arka-product-card-compact" : ""}`}>
      <Link to="/products/$category/$item" params={{ category: category.slug, item: product.slug }}
        className="arka-product-image" aria-label={`View ${product.name}`} preload="intent">
        {image ? <img src={image} alt={product.image ? product.name : `${category.name} — representative category image`}
          loading="lazy" decoding="async" /> : <span>Photograph available on request</span>}
      </Link>
      <div className="arka-product-copy">
        <span className="arka-product-number">{String(index + 1).padStart(2, "0")} · {category.name}</span>
        <h3><Link to="/products/$category/$item" params={{ category: category.slug, item: product.slug }} preload="intent">{product.name}</Link></h3>
        {variant !== "bento" && <p>{product.description}</p>}
        {variant !== "bento" && specs.length > 0 && <dl className="arka-preview-specs">
          {specs.map((spec: any) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
        </dl>}
        <div className="arka-product-actions">
          <Link to="/products/$category/$item" params={{ category: category.slug, item: product.slug }} className="arka-text-link" preload="intent">View details</Link>
          <Link to="/contact" search={{ category: category.name, product: product.name }}
            className="arka-button arka-button-primary">Get a quote</Link>
        </div>
      </div>
    </article>
  );
}
