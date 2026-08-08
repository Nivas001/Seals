import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_layout/analytics")({
  component: AdminAnalyticsPage,
  head: () => ({ meta: [{ title: "Analytics — Admin" }] }),
});

function AdminAnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor traffic and user behavior across the platform.</p>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Datadog Overview</h2>
          </div>
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm h-[800px]">
            <iframe 
              src="https://p.us5.datadoghq.com/sb/4de922cb-7df5-11f1-9ddf-fa7143159411-eadfd38513c3cb9351d3c652f831798a"
              className="w-full h-full border-0"
              title="Datadog Analytics Dashboard"
            />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Vercel Traffic Analytics</h2>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Coming Soon</span>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-12 text-center">
            <h3 className="text-sm font-bold text-foreground mb-2">Vercel Log Drain Data</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              We are building a custom pipeline to capture raw traffic logs from Vercel's Log Drain and visualize them here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
