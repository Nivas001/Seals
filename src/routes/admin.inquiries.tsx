import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getInquiries, toggleInquiryStatus } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { toast } from "sonner";
import { MessageCircle, Clock, CheckCircle2, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/inquiries")({
  component: AdminInquiriesPage,
  head: () => ({ meta: [{ title: "Inquiries — Admin" }] }),
});

function AdminInquiriesPage() {
  const { session } = useAdminSession();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInquiries({ data: { token: session.access_token } })
      .then(setInquiries)
      .finally(() => setLoading(false));
  }, []);

  async function handleToggle(id: string, currentStatus: string) {
    const newStatus = currentStatus === "Completed" ? "Active" : "Completed";
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    try {
      await toggleInquiryStatus({ data: { token: session.access_token, id, status: newStatus } });
      toast.success(`Marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update");
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: currentStatus } : i));
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-600">
      <div className="h-7 w-7 rounded-full border-2 border-brass border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Inquiries</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">Inquiries</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{inquiries.length} total received</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800 px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => (i.status || "Active") === "Active").length} Active
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => i.status === "Completed").length} Done
          </span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-24 flex flex-col items-center gap-3">
          <MessageCircle className="h-10 w-10 text-zinc-700" />
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">No inquiries yet</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-zinc-800">
                <tr>
                  {["Date", "Name", "Email", "Category", "Subject", "Message", "Status"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-5 py-4 text-xs text-zinc-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4 font-semibold text-zinc-200">{inq.name}</td>
                    <td className="px-5 py-4">
                      <a href={`mailto:${inq.email}`} className="text-brass hover:underline text-xs">{inq.email}</a>
                    </td>
                    <td className="px-5 py-4">
                      {inq.category ? (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 rounded-md">
                          {inq.category}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">{inq.subject}</td>
                    <td className="px-5 py-4">
                      <div className="max-w-[180px] truncate text-zinc-500 text-xs cursor-help" title={inq.message}>
                        {inq.message}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggle(inq.id, inq.status || "Active")}
                        className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg transition-colors ${
                          (inq.status || "Active") === "Completed"
                            ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                            : "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                        }`}
                      >
                        {(inq.status || "Active") === "Completed" ? (
                          <><CheckCircle2 className="h-3 w-3" /> Done</>
                        ) : (
                          <><Clock className="h-3 w-3" /> Active</>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
