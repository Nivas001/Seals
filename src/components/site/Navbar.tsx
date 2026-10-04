import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { DownloadCatalog } from "@/components/site/DownloadCatalog";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="arka-header fixed inset-x-0 top-0 z-40 border-b border-hairline bg-white">
      <div className="arka-utility bg-ink text-white">
        <div className="arka-container flex items-center justify-between gap-4 py-2 text-xs">
          <span>Integrated technology support</span>
          <span>Hosur, India · Serving industry worldwide</span>
        </div>
      </div>
      <nav className="arka-nav arka-container flex min-h-20 items-center justify-between gap-5" aria-label="Primary">
        <Link to="/" className="arka-brand flex items-center gap-3" aria-label="AARRKKAA International — home">
          <img src="/logo.png" alt="" width={56} height={48} className="h-12 w-14 object-contain" />
          <span className="arka-wordmark text-ink">
            <strong>AARRKKAA</strong>
            <span>INTERNATIONAL</span>
          </span>
        </Link>
        <ul className="arka-desktop-nav hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link to={item.to} activeOptions={{ exact: item.to === "/" }}
                className="arka-nav-link" activeProps={{ className: "arka-nav-link is-active" }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="arka-nav-catalog hidden xl:block">
            <DownloadCatalog variant="navbar-pill" label="Catalog PDF" />
          </div>
          <Link to="/contact" className="arka-button arka-button-primary hidden sm:inline-flex">Request a quote</Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" className="arka-menu-button lg:hidden" aria-label="Open navigation">
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="arka-mobile-menu">
              <SheetTitle>AARRKKAA International</SheetTitle>
              <SheetDescription>Products, applications and technical support.</SheetDescription>
              <nav aria-label="Mobile" className="mt-8">
                {NAV.map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="arka-mobile-link"
                    activeProps={{ className: "arka-mobile-link is-active" }}>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 space-y-5">
                <DownloadCatalog variant="mobile-menu" label="Download catalog (PDF)" onDownload={() => setOpen(false)} />
                <a href="tel:+917806936475" className="flex items-center gap-3 text-base text-ink">
                  <Phone className="h-4 w-4" aria-hidden="true" /> +91 78069 36475
                </a>
                <p className="text-sm text-muted-foreground">Hosur, Tamil Nadu · Service available globally</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
