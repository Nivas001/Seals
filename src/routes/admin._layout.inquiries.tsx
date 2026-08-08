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
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
      <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Inquiries</span>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customer Inquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage messages from the contact form.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => (i.status || "Active") === "Active").length} Active
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => i.status === "Completed").length} Done
          </span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface py-24 flex flex-col items-center gap-3">
          <MessageCircle className="h-10 w-10 text-muted-foreground" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">No inquiries yet</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-5 py-3.5 w-12"><input type="checkbox" className="rounded border-border bg-background accent-primary" /></th>
                  {["Date", "Name", "Category", "Subject", "Message", "Status"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(inq.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds([...selectedIds, inq.id]);
                          else setSelectedIds(selectedIds.filter(id => id !== inq.id));
                        }}
                        className="rounded border-border bg-background accent-primary"
                      />
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4 font-semibold text-foreground">
                      <div className="flex flex-col">
                        <span>{inq.name}</span>
                        <a href={`mailto:${inq.email}`} className="text-[10px] font-normal text-muted-foreground hover:text-primary transition-colors">
                          {inq.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {inq.category ? (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-muted text-muted-foreground rounded-md">
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
