import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart as BarChartIcon, Users, Activity, ExternalLink, ShieldAlert, MonitorPlay, MousePointerClick, Globe, Compass, LayoutTemplate, CursorClick } from "lucide-react";
import { useAdminSession } from "@/components/admin/AdminContext";
import { useState, useEffect } from "react";
import { getDatadogStats } from "@/lib/datadog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/admin/_layout/analytics")({
  component: AnalyticsPage,
  loader: () => getDatadogStats(),
  head: () => ({ meta: [{ title: "Datadog Analytics — Admin" }] }),
});

function AnalyticsPage() {
  const { chartData, topPages, browsers, regions, totalViews, totalInteractions } = Route.useLoaderData();
  const { session } = useAdminSession();
  const [datadogUrl, setDatadogUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem("datadog_dashboard_url");
    if (savedUrl) {
      setDatadogUrl(savedUrl);
    }
    setIsLoaded(true);
  }, []);

  const handleSaveUrl = (url: string) => {
    setDatadogUrl(url);
    localStorage.setItem("datadog_dashboard_url", url);
  };

  const handleDisconnect = () => {
    setDatadogUrl("");
    localStorage.removeItem("datadog_dashboard_url");
  };

  if (!session || !isLoaded) return null;

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

      <Tabs defaultValue="simplified" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <TabsTrigger value="simplified" className="rounded-md data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Simplified View</TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-md data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Advanced View</TabsTrigger>
        </TabsList>

        <TabsContent value="simplified" className="space-y-6">
          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* Top Row: Total Traffic (Spans 3 cols) + Interactions (Spans 1 col) */}
            <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">Traffic Overview (7 Days)</h2>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-brass">{totalViews.toLocaleString()}</span>
                  <span className="text-sm font-medium text-zinc-400 mb-1">total pageviews</span>
                </div>
              </div>
              <div className="h-[250px] w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dcb16e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#dcb16e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#dcb16e', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="pageviews" stroke="#dcb16e" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-center items-center text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                <CursorClick className="h-7 w-7" />
              </div>
              <h2 className="text-lg font-bold text-zinc-400 mb-1">Total Interactions</h2>
              <span className="text-5xl font-black text-white">{totalInteractions.toLocaleString()}</span>
              <p className="text-xs text-zinc-500 mt-2">Clicks, scrolls, & form submits</p>
            </div>

            {/* Middle Row: Top Pages (2 cols) + Regions (2 cols) */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-center gap-3 mb-6">
                <LayoutTemplate className="h-5 w-5 text-brass" />
                <h2 className="font-bold">Top Pages</h2>
              </div>
              <div className="space-y-4">
                {topPages.map((page: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300 truncate max-w-[200px]">{page.path}</span>
                    <div className="flex items-center gap-3 w-1/2">
                      <div className="h-2 bg-zinc-900 rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-brass/80 rounded-full" style={{ width: `${(page.views / topPages[0].views) * 100}%` }} />
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{page.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-blue-400" />
                <h2 className="font-bold">Top Regions</h2>
              </div>
              <div className="space-y-4">
                {regions.map((region: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">{region.name}</span>
                    <span className="text-sm font-bold text-blue-100 bg-blue-900/30 px-2 py-1 rounded-md">{region.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Browsers (Donut) */}
            <div className="md:col-span-1 lg:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col md:flex-row items-center gap-10">
              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="h-5 w-5 text-orange-400" />
                  <h2 className="font-bold">Browser Share</h2>
                </div>
                {browsers.map((browser: any, i: number) => {
                  const colors = ['#f97316', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981'];
                  return (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                        <span className="text-zinc-400">{browser.name}</span>
                      </div>
                      <span className="font-bold">{browser.count}</span>
                    </div>
                  );
                })}
              </div>
              <div className="h-[200px] w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={browsers}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      stroke="none"
                    >
                      {browsers.map((entry: any, index: number) => {
                        const colors = ['#f97316', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Embedded Public Dashboard Section */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-1">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-6 py-4 rounded-t-xl">
              <div className="flex items-center gap-3">
                <BarChartIcon className="h-5 w-5 text-brass" />
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
                      handleSaveUrl(e.currentTarget.value);
                    }
                  }}
                />
                <button 
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-zinc-200"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (input.value) handleSaveUrl(input.value);
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
                  onClick={handleDisconnect}
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
      </TabsContent>
      </Tabs>
      
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
