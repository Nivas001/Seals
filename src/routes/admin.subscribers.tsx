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
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-600">
      <div className="h-7 w-7 rounded-full border-2 border-brass border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Subscribers</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-white">Newsletter Subscribers</h2>
        <p className="text-xs text-zinc-500 mt-0.5">{subscribers.length} total subscribers</p>
      </div>

      {subscribers.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-24 flex flex-col items-center gap-3">
          <Mail className="h-10 w-10 text-zinc-700" />
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">No subscribers yet</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email Address</th>
                <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Subscribed On</th>
                <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-zinc-200">{sub.email}</td>
                  <td className="px-5 py-4 text-xs text-zinc-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="h-3 w-3" /> Active
                    </span>
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
