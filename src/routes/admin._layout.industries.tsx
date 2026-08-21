import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAdminIndustries } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { IndustriesTab } from "@/components/admin/IndustriesTab";
import type { IndustrySector } from "@/data/defaultIndustries";

export const Route = createFileRoute("/admin/_layout/industries")({
  component: AdminIndustriesPage,
  head: () => ({ meta: [{ title: "Industries — Admin" }] }),
});

function AdminIndustriesPage() {
  const { session } = useAdminSession();
  const [industries, setIndustries] = useState<IndustrySector[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getAdminIndustries({ data: { token: session.access_token } })
      .then((data: any) => {
        setIndustries(data || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
        <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-xs font-bold uppercase tracking-widest">Loading Industry Sectors</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Industry Sectors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Change photos and descriptions for all 8 industry sectors.
          </p>
        </div>
      </div>
      <IndustriesTab
        industries={industries}
        session={session}
        onUpdate={fetchData}
      />
    </div>
  );
}
