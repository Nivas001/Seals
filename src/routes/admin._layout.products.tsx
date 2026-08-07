import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAdminProducts } from "@/lib/admin";
import { useAdminSession } from "@/components/admin/AdminContext";
import { ProductsTab } from "@/components/admin/ProductsTab";
import { Package } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/products")({
  component: AdminProductsPage,
  head: () => ({ meta: [{ title: "Products — Admin" }] }),
});

function AdminProductsPage() {
  const { session } = useAdminSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getAdminProducts({ data: { token: session.access_token } })
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <SectionLoader label="Loading Products" />;

  return (
    <ProductsTab
      products={data.products}
      categories={data.categories}
      token={session.access_token}
      onUpdate={fetchData}
    />
  );
}

function SectionLoader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-600">
      <div className="h-7 w-7 rounded-full border-2 border-brass border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}
