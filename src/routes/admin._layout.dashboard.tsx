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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Welcome back 👋</h2>
        <p className="mt-1 text-sm text-zinc-400">Here's what's happening with AARRKKAA today.</p>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stat cards (Left 50%) */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 flex-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 flex-1">
              {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col justify-center gap-3 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-black/20"
                >
                  <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">{value}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mt-0.5">{label}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Chart (Right 50%) */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-white">Inquiry Trends (Last 30 Days)</h3>
            <p className="text-xs text-zinc-500">Track customer interest over time</p>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            {loading ? (
              <div className="w-full h-full animate-pulse bg-zinc-800/50 rounded-xl" />
            ) : stats?.chartData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    minTickGap={20}
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#dcb16e' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Inquiries" 
                    stroke="#dcb16e" 
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#dcb16e', stroke: '#09090b', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-600 font-medium">
                Not enough data for chart
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent inquiries */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h3 className="text-sm font-bold text-white">Recent Inquiries</h3>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brass hover:text-brass/80 transition-colors"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-zinc-800 animate-pulse" />)}
          </div>
        ) : stats?.recentInquiries?.length === 0 ? (
          <div className="py-16 text-center">
            <MessageCircle className="h-8 w-8 mx-auto text-zinc-700 mb-2" />
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">No inquiries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {stats?.recentInquiries?.map((inq: any) => (
              <div key={inq.id} className="flex items-center gap-4 px-6 py-4">
                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-zinc-400">{inq.name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-zinc-200 truncate">{inq.name}</div>
                  <div className="text-xs text-zinc-500 truncate">{inq.subject}</div>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    (inq.status || "Active") === "Completed"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-amber-400 bg-amber-500/10"
                  }`}>
                    {(inq.status || "Active") === "Completed" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5" />}
                    {inq.status || "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { to: "/admin/products", label: "Manage Products", desc: "Add, edit, sort products" },
          { to: "/admin/hero", label: "Edit Hero", desc: "Change carousel images" },
          { to: "/admin/contact", label: "Contact Info", desc: "Update phone & address" },
        ].map(({ to, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all group"
          >
            <div className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{label}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
