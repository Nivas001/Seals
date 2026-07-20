import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Phone, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from "@/lib/catalog-download";


const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/* Premium gear-seal SVG logo mark */
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {/* Outer gear ring */}
      <circle cx="18" cy="18" r="13" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      {/* Gear teeth */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const x1 = 18 + Math.cos(rad) * 12;
        const y1 = 18 + Math.sin(rad) * 12;
        const x2 = 18 + Math.cos(rad) * 15.5;
        const y2 = 18 + Math.sin(rad) * 15.5;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        );
      })}
      {/* Inner hub circle */}
      <circle cx="18" cy="18" r="6.5" stroke="white" strokeWidth="1.4" />
      {/* Centre dot */}
      <circle cx="18" cy="18" r="2.5" fill="white" />
      {/* Cross spokes */}
      <line x1="18" y1="11.5" x2="18" y2="24.5" stroke="white" strokeWidth="1" strokeOpacity="0.55" />
      <line x1="11.5" y1="18" x2="24.5" y2="18" stroke="white" strokeWidth="1" strokeOpacity="0.55" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentLabel = useMemo(() => {
    if (pathname === "/") return "Home";
    for (const item of NAV) {
      if (item.to !== "/" && pathname.startsWith(item.to)) return item.label;
    }
    const seg = pathname.split("/").filter(Boolean)[0];
    return seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : "Home";
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5">
        <nav
          className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 sm:px-4 ${
            scrolled ? "glass-liquid-strong" : "glass-liquid"
          }`}
          aria-label="Primary"
        >
          <Link
            to="/"
            className="group flex items-center gap-2.5 rounded-full pl-1 pr-2 py-1"
            aria-label="AARRKKAA International — home"
          >
            <span
              aria-hidden
              className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full text-primary-foreground transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ background: "var(--gradient-brand)" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 55%)",
                }}
              />
              <LogoMark size={22} />
            </span>
            <span className="hidden text-[14px] font-semibold tracking-tight text-ink sm:block">
              AARRKKAA
              <span className="ml-1 font-normal text-muted-foreground">
                International
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="glass-shimmer relative overflow-hidden rounded-full px-4 py-1.5 text-[15px] font-medium text-ink/75 transition-colors duration-300 hover:text-ink"
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{
                    className:
                      "glass-pill-active relative overflow-hidden rounded-full px-4 py-1.5 text-[15px] font-semibold text-ink",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile: current page label */}
          <div className="flex flex-1 items-center justify-center md:hidden">
            <span className="glass-pill-active inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold tracking-tight text-ink">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass" />
              {currentLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CATALOG_PDF_URL}
              download={CATALOG_PDF_FILENAME}
              target="_blank"
              rel="noopener"
              className="glass-shimmer relative hidden items-center gap-1.5 overflow-hidden rounded-full border border-ink/10 px-3.5 py-2 text-[12px] font-semibold text-ink shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset] transition-colors duration-300 hover:border-ink/25 lg:inline-flex"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, white 85%, transparent) 0%, color-mix(in oklab, white 55%, transparent) 100%)",
              }}
              aria-label="Download catalog PDF"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
              Catalog
            </a>
            <a
              href="tel:+917806936475"
              className="glass-cta-dark glass-shimmer relative hidden items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-[12px] font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
              Get a quote
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/60 text-ink shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset] transition hover:bg-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="glass-liquid-strong absolute inset-0 rounded-none"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative flex h-full flex-col justify-between px-6 pb-8 pt-24"
            >
              <ul className="space-y-1">
                {NAV.map((item, i) => {
                  const isActive =
                    item.to === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.to);
                  return (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`relative block border-b border-hairline/70 py-4 pl-4 text-3xl font-semibold tracking-tight text-ink ${
                          isActive ? "" : "text-ink/85"
                        }`}
                      >
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-brass"
                          />
                        )}
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="space-y-3">
                <a
                  href={CATALOG_PDF_URL}
                  download={CATALOG_PDF_FILENAME}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-background px-6 py-3.5 text-sm font-semibold text-ink"
                >
                  <Download className="h-4 w-4" />
                  Download catalog (PDF)
                </a>
                <a
                  href="tel:+917806936475"
                  className="glass-cta-dark flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-background"
                >
                  <Phone className="h-4 w-4" />
                  +91 78069 36475
                </a>
                <p className="text-center text-xs text-muted-foreground">
                  Hosur, Tamil Nadu · Serving South India
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
