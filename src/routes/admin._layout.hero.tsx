import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAdminHero } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { HeroCarouselTab } from "@/components/admin/HeroCarouselTab";

export const Route = createFileRoute("/admin/_layout/hero")({
  component: AdminHeroPage,
  head: () => ({ meta: [{ title: "Hero Carousel — Admin" }] }),
});

function AdminHeroPage() {
  const { session } = useAdminSession();
  const [heroImages, setHeroImages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getAdminHero({ data: { token: session.access_token } })
      .then((imgs) => setHeroImages({ heroImages: imgs }))
      .finally(() => setLoading(false));
  };



  useEffect(() => { fetchData(); }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
      <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Slides</span>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Hero Editor</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage the homepage hero carousel.</p>
        </div>
      </div>
      <HeroCarouselTab
        data={heroImages}
        session={session}
        onUpdate={fetchData}
      />
    </div>
  );
}
