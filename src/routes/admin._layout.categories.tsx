import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAdminCategories } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { CategoriesTab } from "@/components/admin/CategoriesTab";

export const Route = createFileRoute("/admin/_layout/categories")({
  component: AdminCategoriesPage,
  head: () => ({ meta: [{ title: "Categories — Admin" }] }),
});

function AdminCategoriesPage() {
  const { session } = useAdminSession();
  const [categories, setCategories] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getAdminCategories({ data: { token: session.access_token } })
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-600">
      <div className="h-7 w-7 rounded-full border-2 border-brass border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">Loading Categories</span>
    </div>
  );

  return (
    <CategoriesTab
      categories={categories}
      token={session.access_token}
      onUpdate={fetchData}
    />
  );
}
