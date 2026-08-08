import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getVercelAnalytics } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Eye, MapPin, Laptop, Link2 } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/analytics")({
  component: AdminAnalyticsPage,
  head: () => ({ meta: [{ title: "Analytics — Admin" }] }),
});

function AdminAnalyticsPage() {
  const { session } = useAdminSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVercelAnalytics({ data: { token: session.access_token } })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor traffic and user behavior across the platform.</p>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Vercel Traffic Analytics</h2>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Live Data</span>
          </div>
          
          {loading ? (
            <div className="h-64 rounded-2xl bg-muted animate-pulse" />
          ) : !data ? (
            <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
              Failed to load analytics data
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Traffic Chart */}
              <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Total Views</h3>
                    <p className="text-2xl font-black">{data.totalViews}</p>
                  </div>
                </div>
                
                <div className="h-[250px] w-full">
                  {data.chartData?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-background)' }} />
                        <Line type="monotone" dataKey="Views" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No traffic data yet</div>
                  )}
                </div>
              </div>

              {/* Top Pages */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Link2 className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-bold text-foreground">Top Pages</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {data.topPages?.length > 0 ? data.topPages.map((page: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground truncate pr-4">{page.name}</span>
                      <span className="text-sm font-bold text-foreground shrink-0">{page.views}</span>
                    </div>
                  )) : (
                    <div className="text-sm text-muted-foreground">No data</div>
                  )}
                </div>
              </div>

              {/* Countries */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-bold text-foreground">Top Countries</h3>
                </div>
                <div className="space-y-4">
                  {data.topCountries?.length > 0 ? data.topCountries.map((country: any, i: number) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-muted-foreground truncate">{country.name}</span>
                        <span className="text-sm font-bold text-foreground">{country.views}</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(country.views / data.totalViews) * 100}%` }} />
                      </div>
                    </div>
                  )) : (
                    <div className="text-sm text-muted-foreground">No data</div>
                  )}
                </div>
              </div>

              {/* OS / Devices */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Laptop className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-bold text-foreground">Operating Systems</h3>
                </div>
                <div className="space-y-4">
                  {data.topOs?.length > 0 ? data.topOs.map((os: any, i: number) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-muted-foreground truncate">{os.name}</span>
                        <span className="text-sm font-bold text-foreground">{os.views}</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(os.views / data.totalViews) * 100}%` }} />
                      </div>
                    </div>
                  )) : (
                    <div className="text-sm text-muted-foreground">No data</div>
                  )}
                </div>
              </div>

            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Datadog Overview</h2>
          </div>
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm h-[600px] xl:h-[800px]">
            <iframe 
              src="https://p.us5.datadoghq.com/sb/4de922cb-7df5-11f1-9ddf-fa7143159411-eadfd38513c3cb9351d3c652f831798a"
              className="w-full h-full border-0"
              title="Datadog Analytics Dashboard"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
