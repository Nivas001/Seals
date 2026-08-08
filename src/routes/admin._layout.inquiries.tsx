import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getInquiries, toggleInquiryStatus } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { toast } from "sonner";
import { InquiriesKanban } from "@/components/admin/InquiriesKanban";

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    const originalInquiry = inquiries.find(i => i.id === id);
    const originalStatus = originalInquiry?.status || "Active";
    
    // Optimistically update
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    
    try {
      await toggleInquiryStatus({ data: { token: session.access_token, id, status: newStatus } });
      toast.success(`Inquiry moved to ${newStatus}`);
    } catch {
      toast.error("Failed to update inquiry status");
      // Revert on error
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: originalStatus } : i));
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
      <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Inquiries</span>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customer Inquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage messages from the contact form.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => (i.status || "Active") === "Active").length} Active
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => i.status === "In Progress").length} In Progress
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            {inquiries.filter(i => i.status === "Completed").length} Done
          </span>
        </div>
      </div>

      <InquiriesKanban inquiries={inquiries} onStatusChange={handleStatusChange} />
    </div>
  );
}
