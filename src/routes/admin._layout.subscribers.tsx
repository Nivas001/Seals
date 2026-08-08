import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getSubscribers } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/subscribers")({
  component: AdminSubscribersPage,
  head: () => ({ meta: [{ title: "Subscribers — Admin" }] }),
});

function AdminSubscribersPage() {
  const { session } = useAdminSession();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubscribers({ data: { token: session.access_token } })
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
      <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Subscribers</span>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Subscribers</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your newsletter list.</p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-black text-foreground">{subscribers.length}</div>
          <p className="text-xs text-muted-foreground mt-0.5">{subscribers.length} total subscribers</p>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface py-24 flex flex-col items-center gap-3">
          <Mail className="h-10 w-10 text-muted-foreground" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">No subscribers yet</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</th>
                <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subscribed On</th>
                <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 font-medium text-foreground">{sub.email}</td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md">Subscribed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
