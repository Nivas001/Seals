import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAdminContact } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { ContactTab } from "@/components/admin/ContactTab";

export const Route = createFileRoute("/admin/_layout/contact")({
  component: AdminContactPage,
  head: () => ({ meta: [{ title: "Contact Info — Admin" }] }),
});

function AdminContactPage() {
  const { session } = useAdminSession();
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getAdminContact({ data: { token: session.access_token } })
      .then(setContactInfo)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-600">
      <div className="h-7 w-7 rounded-full border-2 border-brass border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Contact Info</span>
    </div>
  );

  return (
    <ContactTab
      initialData={contactInfo}
      token={session.access_token}
      onUpdate={fetchData}
    />
  );
}
