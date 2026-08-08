import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart as BarChartIcon, Users, Activity, ExternalLink, ShieldAlert, MonitorPlay, MousePointerClick, Globe, Compass, LayoutTemplate, MonitorSmartphone, Monitor, Smartphone, Gauge, Clock, Timer } from "lucide-react";
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
  const { chartData, topPages, browsers, regions, totalViews, totalInteractions, os, devices, perf } = Route.useLoaderData();
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Traffic Analytics</h2>
          <p className="mt-1 text-sm text-muted-foreground">Deep dive into your customer behavior.</p>
        </div>
        
        {/* Session Replays CTA */}
        <a 
          href="https://app.datadoghq.com/rum/replay/sessions"
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 flex items-center gap-3 shadow-lg"
        >
          <MonitorPlay className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Launch Session Replays</span>
          <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
        </a>
      </div>

      {/* Feature Highlights showing what Datadog tracks */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-foreground">Live Traffic</h3>
          <p className="mt-2 text-sm text-muted-foreground">Monitor active visitors and real-time pageviews across the site.</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
            <MousePointerClick className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-foreground">User Journeys</h3>
          <p className="mt-2 text-sm text-muted-foreground">Track clicks, scrolls, and navigation paths for UX optimization.</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
            <Activity className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-foreground">Performance</h3>
          <p className="mt-2 text-sm text-muted-foreground">Core Web Vitals, load times, and API latency tracking.</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-foreground">Error Tracking</h3>
          <p className="mt-2 text-sm text-muted-foreground">Instant alerts for Javascript crashes or broken API endpoints.</p>
        </div>
      </div>

      <Tabs defaultValue="simplified" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-surface border border-border rounded-lg p-1">
          <TabsTrigger value="simplified" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground">Simplified View</TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground">Advanced View</TabsTrigger>
        </TabsList>

        <TabsContent value="simplified" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6 flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-muted-foreground font-medium mb-1">Total Pageviews (7 Days)</h3>
                <div className="text-4xl font-black text-foreground">{totalViews.toLocaleString()}</div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6 flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                <MousePointerClick className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-muted-foreground font-medium mb-1">Total Interactions (Estimated)</h3>
                <div className="text-4xl font-black text-foreground">{totalInteractions.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl relative">
              <div className="h-[250px] w-full mt-auto p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorViews2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.4} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-foreground)' }} itemStyle={{ color: 'var(--color-primary)', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="pageviews" stroke="var(--color-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorViews2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="md:col-span-1 rounded-2xl border border-border bg-surface p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <LayoutTemplate className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-foreground">Top Pages</h2>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {topPages.map((page: any, i: number) => {
                  const maxViews = Math.max(...topPages.map((p: any) => p.views));
                  const percentage = Math.max(5, (page.views / maxViews) * 100);
                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground truncate max-w-[120px]" title={page.path}>{page.path}</span>
                        <span className="font-bold text-foreground">{page.views}</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-1">
            <div className="flex items-center justify-between border-b border-border bg-background/50 px-6 py-4 rounded-t-xl">
              <div className="flex items-center gap-3">
                <BarChartIcon className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-foreground">Embedded Public Dashboard</h2>
              </div>
            </div>
            <div className="p-6">
              {!datadogUrl ? (
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xl">
                  <div className="flex flex-col items-center text-center gap-4 py-8">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShieldAlert className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Datadog Configuration Required</h3>
                      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                        To view the advanced embedded dashboard, you need to provide your Datadog Public Dashboard URL.
                      </p>
                    </div>
                    <div className="w-full max-w-md flex flex-col gap-2 mt-4">
                      <label className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Datadog Public Dashboard URL</label>
                      <input
                        type="url"
                        value={datadogUrl}
                        onChange={(e) => setDatadogUrl(e.target.value)}
                        placeholder="https://p.datadoghq.com/sb/..."
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                      <button 
                        onClick={saveDatadogUrl}
                        className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-all"
                      >
                        Embed Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-[800px] w-full overflow-hidden rounded-xl border border-border bg-surface">
                  <div className="absolute right-4 top-4 z-10">
                    <button 
                      onClick={handleDisconnect}
                      className="rounded-lg bg-background border border-border px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-surface transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                  <iframe src={datadogUrl} width="100%" height="100%" className="border-0 bg-transparent" title="Datadog Dashboard" allowFullScreen />
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
