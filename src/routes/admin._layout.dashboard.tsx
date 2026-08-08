import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getDashboardStats } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { MessageCircle, Mail, FolderOpen, Package, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/_layout/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — Admin" }] }),
});

function DashboardPage() {
  const { session } = useAdminSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats({ data: { token: session.access_token } })
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Inquiries", value: stats.inquiryCount, icon: MessageCircle, color: "text-blue-400", bg: "bg-blue-500/10", href: "/admin/inquiries" },
        { label: "Subscribers", value: stats.subscriberCount, icon: Mail, color: "text-emerald-400", bg: "bg-emerald-500/10", href: "/admin/subscribers" },
        { label: "Categories", value: stats.categoryCount, icon: FolderOpen, color: "text-brass", bg: "bg-brass/10", href: "/admin/categories" },
        { label: "Products", value: stats.productCount, icon: Package, color: "text-violet-400", bg: "bg-violet-500/10", href: "/admin/products" },
      ]
    : [];
  const analytics = stats?.analytics || { totalViews: 0, totalInteractions: 0, chartData: [] };
  const subCount = stats?.subscriberCount || 0;
  const inquiries = stats?.recentInquiries || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with AARRKKAA today.</p>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stat cards */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-6 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Views", value: analytics.totalViews, icon: MessageCircle, color: "text-blue-500", bg: "bg-blue-500/10", caption: "Updated for 24 hrs only data" },
                { label: "Interactions", value: analytics.totalInteractions, icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "Subscribers", value: subCount, icon: Mail, color: "text-purple-500", bg: "bg-purple-500/10" },
                { label: "Inquiries", value: inquiries.length, icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              ].map(({ label, value, icon: Icon, color, bg, caption }) => (
                <div 
                  key={label}
                  className="group rounded-2xl border border-border bg-surface p-5 flex flex-col justify-center gap-3 hover:border-border/80 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${bg}`}>
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">{label}</div>
                      <div className="text-2xl font-black text-foreground">{value}</div>
                      {caption && (
                        <div className="text-[9px] font-medium text-orange-500 mt-1 uppercase tracking-wider">{caption}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Main Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-foreground">Traffic Overview</h3>
                <p className="text-xs text-muted-foreground">Track customer interest over time</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="w-full h-full animate-pulse bg-muted rounded-xl" />
              ) : analytics?.chartData?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} 
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-background)' }}
                      />
                      <Line type="monotone" dataKey="Views" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                      <Line type="monotone" dataKey="Inquiries" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
              ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground font-medium">
                    No traffic data available.
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Recent Inquiries Preview */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs font-bold text-primary hover:opacity-80">View All →</Link>
          </div>
          
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />)}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-12 text-center">
                <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">No inquiries yet</p>
              </div>
            ) : (
              inquiries.slice(0, 3).map((inq: any) => (
                <div key={inq.id} className="p-4 px-6 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-muted-foreground">{inq.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{inq.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{inq.subject}</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground shrink-0 mt-1">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Manage Products", to: "/admin/products", icon: Package },
          { label: "Subscribers", to: "/admin/subscribers", icon: Mail },
        ].map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className="rounded-xl border border-border bg-surface p-4 hover:border-border/80 hover:bg-muted/50 transition-all group"
          >
            <Icon className="h-5 w-5 text-primary mb-3" />
            <div className="text-sm font-bold text-foreground transition-colors">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
