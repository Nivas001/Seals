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
import { CreativeNotFound } from "@/components/site/CreativeNotFound";

import appCss from "../styles.css?url";

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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AARRKKAA International — Industrial Pumps, Seals & Precision Components" },
      { name: "description", content: "Supplier & distributor of pumps, mechanical seals, elastomers, stainless steel, hoses and precision components worldwide with service available globally." },
      { name: "author", content: "AARRKKAA International" },
      { property: "og:title", content: "AARRKKAA International — Integrated technology support" },
      { property: "og:description", content: "Pumps, mechanical seals, elastomers, stainless steel and precision components for process industries. Head office in Hosur, Tamil Nadu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss, type: "text/css" },
      { rel: "icon", href: "/logo.png?v=20260731", type: "image/png" },
      { rel: "shortcut icon", href: "/logo.png?v=20260731", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png?v=20260731" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AARRKKAA International",
              "url": "https://www.aarrkkaa.com",
              "logo": "https://www.aarrkkaa.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-78069-36475",
                "contactType": "sales",
                "areaServed": "Worldwide"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "#3/334, 11C, Surya Nagar, 5th Cross, Arasanatti",
                "addressLocality": "Hosur",
                "addressRegion": "Tamil Nadu",
                "postalCode": "635 126",
                "addressCountry": "IN"
              },
              "description": "Supplier & distributor of pumps, mechanical seals, elastomers, stainless steel, hoses and precision components worldwide."
            })
          }}
        />
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <AIChatbot />
      <Toaster position="top-center" closeButton />
    </QueryClientProvider>
  );
}
