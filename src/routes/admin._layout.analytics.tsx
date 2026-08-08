import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart, Users, Activity, ExternalLink, ShieldAlert, MonitorPlay, MousePointerClick, RefreshCw, Smartphone } from "lucide-react";
import { useAdminSession } from "@/components/admin/AdminContext";
import { useState } from "react";

export const Route = createFileRoute("/admin/_layout/analytics")({
  component: AnalyticsPage,
  head: () => ({ meta: [{ title: "Datadog Analytics — Admin" }] }),
});

function AnalyticsPage() {
  const { session } = useAdminSession();
  const [datadogUrl, setDatadogUrl] = useState("");

  if (!session) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Datadog Analytics</h1>
          <p className="mt-1 text-zinc-400">
            Real-time user insights, session replays, and performance metrics.
          </p>
        </div>
        
        {/* Session Replays CTA */}
        <a 
          href="https://app.datadoghq.com/rum/replay/sessions"
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-lg bg-[#632CA6] px-6 py-3 font-semibold text-white transition-all hover:bg-[#52218c] flex items-center gap-3 shadow-lg shadow-[#632CA6]/20"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <MonitorPlay className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Launch Session Replays</span>
          <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
        </a>
      </header>

      {/* Feature Highlights showing what Datadog tracks */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-zinc-100">Live Traffic</h3>
          <p className="mt-2 text-sm text-zinc-400">Monitor active visitors and real-time pageviews across the site.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
            <MousePointerClick className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-zinc-100">User Journeys</h3>
          <p className="mt-2 text-sm text-zinc-400">Track clicks, scrolls, and navigation paths for UX optimization.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
            <Activity className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-zinc-100">Performance</h3>
          <p className="mt-2 text-sm text-zinc-400">Core Web Vitals, load times, and API latency tracking.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-zinc-100">Error Tracking</h3>
          <p className="mt-2 text-sm text-zinc-400">Instant alerts for Javascript crashes or broken API endpoints.</p>
        </div>
      </div>

      {/* Embedded Public Dashboard Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-1">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-6 py-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <BarChart className="h-5 w-5 text-brass" />
            <h2 className="font-bold">Embedded Public Dashboard</h2>
          </div>
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            iframe viewer
          </div>
        </div>
        
        <div className="p-6">
          {!datadogUrl ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 py-20 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 shadow-xl">
                <BarChart className="h-8 w-8 text-zinc-500" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-zinc-200">Connect a Datadog Dashboard</h3>
              <p className="mb-8 max-w-md text-sm text-zinc-400">
                You can embed any Datadog Public Dashboard here. Go to Datadog, click the share icon on a dashboard, generate a public URL, and paste it below.
              </p>
              
              <div className="flex w-full max-w-lg items-center gap-3">
                <input
                  type="url"
                  placeholder="https://p.datadoghq.com/sb/..."
                  className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none focus:border-brass/50 focus:ring-1 focus:ring-brass/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setDatadogUrl(e.currentTarget.value);
                    }
                  }}
                />
                <button 
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-zinc-200"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (input.value) setDatadogUrl(input.value);
                  }}
                >
                  Embed
                </button>
              </div>
            </div>
          ) : (
            <div className="relative h-[800px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              {/* Controls */}
              <div className="absolute right-4 top-4 z-10">
                <button 
                  onClick={() => setDatadogUrl("")}
                  className="rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 shadow-lg hover:bg-zinc-800 transition-colors"
                >
                  Disconnect
                </button>
              </div>
              
              <iframe
                src={datadogUrl}
                width="100%"
                height="100%"
                className="border-0 bg-transparent"
                title="Datadog Dashboard"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="rounded-lg bg-blue-950/20 border border-blue-900/30 p-4 text-sm text-blue-200/70 flex gap-3 items-start">
        <MonitorPlay className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <p>
          <strong>Privacy Note:</strong> For extreme security and to protect your users' data, Datadog explicitly blocks Session Replay videos from being embedded inside external iFrames. To watch replays, you must click the purple "Launch Session Replays" button at the top to view them securely on Datadog's platform.
        </p>
      </div>
    </div>
  );
}
