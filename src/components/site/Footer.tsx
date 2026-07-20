import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, FileDown } from "lucide-react";
import { COMPANY, CATEGORIES } from "@/data/catalog";
import { DownloadCatalog } from "@/components/site/DownloadCatalog";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-hairline bg-background p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brass/15 text-brass"
            >
              <FileDown className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                Product catalog · PDF
              </div>
              <h4 className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">
                Take the full AARRKKAA lineup with you.
              </h4>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Every category, sizing range and industry we serve — in one downloadable brochure.
              </p>
            </div>
          </div>
          <DownloadCatalog variant="solid" label="Download catalog (PDF)" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-full text-primary-foreground shadow-soft"
                style={{ background: "var(--gradient-brand)" }}
              >
                <span className="text-[13px] font-black tracking-tighter">AK</span>
              </span>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-tight text-ink">
                  AARRKKAA INTERNATIONAL
                </div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {COMPANY.tagline}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Supplier and distributor of pumps, mechanical seals, elastomers,
              stainless steel and precision components for food, pharma,
              chemical and process industries across South India.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Products
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products/$category"
                    params={{ category: c.slug }}
                    className="text-ink/80 hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-ink/80 hover:text-ink">About us</Link></li>
              <li><Link to="/industries" className="text-ink/80 hover:text-ink">Industries served</Link></li>
              <li><Link to="/products" className="text-ink/80 hover:text-ink">Full catalog</Link></li>
              <li><Link to="/contact" className="text-ink/80 hover:text-ink">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Reach us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              {COMPANY.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-brass" />
                  <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                </li>
              ))}
              {COMPANY.emails.map((e) => (
                <li key={e} className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-brass" />
                  <a href={`mailto:${e}`} className="break-all">{e}</a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" />
                <span>
                  {COMPANY.address.line1}, {COMPANY.address.line2},<br />
                  {COMPANY.address.city}, {COMPANY.address.state} —{" "}
                  {COMPANY.address.pincode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AARRKKAA International. All rights reserved.</p>
          <p>Head office in Hosur · Branches across South India</p>
        </div>
      </div>
    </footer>
  );
}
