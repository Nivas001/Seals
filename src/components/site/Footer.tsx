import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, FileDown, ArrowUpRight } from "lucide-react";
import { COMPANY, CATEGORIES } from "@/data/catalog";
import { DownloadCatalog } from "@/components/site/DownloadCatalog";

import { ArkaLogo } from "@/components/ui/ArkaLogo";

export function Footer() {
  return (
    <footer className="mt-24 relative overflow-hidden border-t border-hairline bg-surface">
      {/* Top accent border */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
      />

      {/* Subtle background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10"
        style={{ background: "var(--surface)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full opacity-8"
        style={{ background: "var(--surface)", filter: "blur(80px)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {/* Catalog download CTA */}
        <div className="mb-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-hairline bg-background p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
              style={{ background: "var(--surface)" }}
            >
              <FileDown className="h-5 w-5 text-ink" strokeWidth={2.25} />
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

        {/* Main footer grid */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.5fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center">
              <ArkaLogo size={46} variant="full" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              supplier and distributor of pumps, mechanical seals, elastomers,
              stainless steel and precision components for food, pharma,
              chemical and process industries worldwide with service available globally.
            </p>
            {/* WhatsApp link in footer */}
            <a
              href="https://wa.me/917806936475"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 text-[13px] font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Products
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products/$category"
                    params={{ category: c.slug }}
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about" className="text-ink/60 transition-colors hover:text-ink">About us</Link></li>
              <li><Link to="/industries" className="text-ink/60 transition-colors hover:text-ink">Industries served</Link></li>
              <li><Link to="/products" className="text-ink/60 transition-colors hover:text-ink">Full catalog</Link></li>
              <li><Link to="/contact" className="text-ink/60 transition-colors hover:text-ink">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Reach us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink/60">
              {COMPANY.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-brass" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-ink">{p}</a>
                </li>
              ))}
              {COMPANY.emails.map((e) => (
                <li key={e} className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-brass" />
                  <a href={`mailto:${e}`} className="transition-colors hover:text-ink">{e}</a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" />
                <span>
                  {COMPANY.address.line1}, {COMPANY.address.line2},{" "}
                  {COMPANY.address.city}, {COMPANY.address.state} —{" "}
                  {COMPANY.address.pincode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AARRKKAA International. All rights reserved.</p>
          <p>Head office in Hosur · Service available globally</p>
        </div>
      </div>
    </footer>
  );
}
