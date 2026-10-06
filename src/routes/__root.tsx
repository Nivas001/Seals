import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import "@fontsource-variable/inter";
import { ErrorBoundary } from "react-error-boundary";
import { CreativeNotFound } from "@/components/site/CreativeNotFound";
import { logTraffic } from "@/lib/admin";
import appCss from "../styles.css?url";
import { COMPANY } from "@/data/catalog";

function NotFoundComponent() {
  return <CreativeNotFound />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://www.aarrkkaa.com";

// Business details must match the Contact page and Google Business Profile exactly (same NAP everywhere).
// alternateName tells Google that "ARKA" and spaced spellings refer to this brand.
const SITE_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AARRKKAA International",
      legalName: "AARRKKAA INTERNATIONAL",
      alternateName: ["AARRKKAA", "Aarrkkaa International", "ARKA", "ARKA International", "AARRKKAA Hosur"],
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-full.png`, width: 817, height: 724 },
      image: `${SITE_URL}/og-image.jpg`,
      slogan: COMPANY.tagline,
      description:
        "Supplier and distributor of pumps, mechanical seals, bearings, elastomers and precision components for food, pharma, chemical and process industries worldwide.",
      email: COMPANY.emails[0],
      telephone: "+91-78069-36475",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-78069-36475",
          contactType: "sales",
          email: COMPANY.emails[1],
          areaServed: "Worldwide",
          availableLanguage: ["English", "Tamil", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-99945-37470",
          contactType: "customer service",
          email: COMPANY.emails[0],
          areaServed: "Worldwide",
          availableLanguage: ["English", "Tamil", "Hindi"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "AARRKKAA International",
      alternateName: "ARKA",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/logo-full.png`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
        addressLocality: COMPANY.address.city,
        addressRegion: COMPANY.address.state,
        postalCode: COMPANY.address.pincode.replace(/\s/g, ""),
        addressCountry: "IN",
      },
      telephone: "+91-78069-36475",
      email: COMPANY.emails[0],
      priceRange: "₹₹",
      areaServed: [
        { "@type": "City", name: "Hosur" },
        { "@type": "City", name: "Krishnagiri" },
        { "@type": "City", name: "Bengaluru" },
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Coimbatore" },
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "State", name: "Karnataka" },
        { "@type": "Country", name: "India" },
        "Worldwide",
      ],
      knowsAbout: [
        "Mechanical seals", "Cartridge seals", "Agitator seals", "O-rings", "Gaskets", "Oil seals",
        "Industrial pumps", "Pump spares", "Bearings", "Elastomers", "Silicone products", "Industrial hoses", "Stainless steel fittings",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "AARRKKAA International",
      alternateName: ["AARRKKAA", "ARKA"],
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, interactive-widget=resizes-content" },
      { title: "AARRKKAA International — Mechanical Seals, Pumps & Spares Supplier in Hosur, Tamil Nadu, India" },
      { name: "description", content: "AARRKKAA International (ARKA) is a mechanical seal, pump and industrial spares supplier in Hosur, Tamil Nadu, India. Seals, O-rings, gaskets, bearings, elastomers, hoses and stainless steel for process plants across India and worldwide." },
      { name: "author", content: "AARRKKAA International" },
      { name: "theme-color", content: "#113447" },
      { property: "og:site_name", content: "AARRKKAA International" },
      { property: "og:title", content: "AARRKKAA International — Industrial Pumps, Seals & Precision Components" },
      { property: "og:description", content: "Pumps, mechanical seals, bearings, elastomers, stainless steel and precision components for process industries. Head office in Hosur, Tamil Nadu." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AARRKKAA International logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss, type: "text/css" },
      { rel: "icon", href: "/favicon.png?v=20261006", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=20261006" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // One canonical URL per page on the www host (aarrkkaa.com redirects there), without query strings.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const canonical = SITE_URL + (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SITE_JSON_LD }} />
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-accent/20 selection:text-ink">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Toaster } from "@/components/ui/sonner";
import { AIChatbot } from "@/components/site/AIChatbot";
import { CHATBOT_PATHS } from "@/data/chatbotState";
import { useLocation } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const hasChatbot = CHATBOT_PATHS.includes(location.pathname);

  // Custom Analytics Tracker using non-blocking background task
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sendLog = () => {
        logTraffic({
          data: {
            path: location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer || "Direct"
          }
        }).catch(() => {});
      };

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(sendLog, { timeout: 2000 });
      } else {
        setTimeout(sendLog, 300);
      }
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <RoutePendingIndicator />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {hasChatbot && <AIChatbot />}
      <Toaster position="top-center" offset={84} mobileOffset={84} closeButton />
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}

import { useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

function RoutePendingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  if (!isLoading) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-primary/20">
      <motion.div
        className="h-full w-full bg-primary"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}
