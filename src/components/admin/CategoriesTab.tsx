import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlowCard } from "@/components/ui/GlowCard";
import { toast } from "sonner";
import { upsertCategory, deleteCategory } from "@/lib/admin";
import { Trash2, Edit2, Plus, ChevronUp, ChevronDown } from "lucide-react";

export function CategoriesTab({ categories, token, onUpdate }: { categories: any[]; token: string; onUpdate: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [busy, setBusy] = useState(false);

  const defaultCategory = {
    slug: "", name: "", short: "", description: "", image: "", priority: categories.length + 1
  };
  const [formData, setFormData] = useState(defaultCategory);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Image must be less than 20MB");
        return;
      }
      try {
        const { compressImage } = await import("@/lib/image-utils");
        const base64 = await compressImage(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        toast.error("Failed to process image");
      }
    }
  };

  const startEdit = (cat: any) => {
    setEditingId(cat.id);
    setIsAdding(false);
    setFormData({
      slug: cat.slug,
      name: cat.name,
      short: cat.short,
      description: cat.description,
      image: cat.image || "",
      priority: cat.priority,
    });
  };

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setFormData(defaultCategory);
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await upsertCategory({
        data: {
          token,
          id: editingId || undefined,
          ...formData
        }
      });
      toast.success(`Category ${editingId ? "updated" : "created"} successfully.`);
      cancelForm();
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to save category");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This will also delete all products in this category.`)) return;
    setBusy(true);
    try {
      await deleteCategory({ data: { token, id } });
      toast.success("Category deleted.");
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete category");
    } finally {
      setBusy(false);
    }
  };

  const changePriority = async (cat: any, delta: number) => {
    setBusy(true);
    try {
      await upsertCategory({
        data: {
          token,
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          short: cat.short,
          description: cat.description,
          image: cat.image,
          priority: cat.priority + delta,
        }
      });
      onUpdate();
    } catch (e: any) {
      toast.error("Failed to update priority");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      {!isAdding && !editingId && (
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-display font-black text-ink">Product Categories</h3>
          <Button 
            onClick={startAdd} 
            className="bg-brass text-background hover:bg-brass/90 rounded-full text-xs uppercase tracking-wider font-bold"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </div>
      )}

      {(isAdding || editingId) && (
        <GlowCard className="p-6">
          <h3 className="text-lg font-bold text-ink mb-4">{editingId ? "Edit Category" : "New Category"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} isRequired />
              <Input label="Slug (URL Friendly)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} isRequired />
            </div>
            <Input label="Short Description" value={formData.short} onChange={e => setFormData({...formData, short: e.target.value})} isRequired />
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Description</label>
              <Textarea 
                className="w-full bg-surface border-hairline focus:border-brass text-ink min-h-[80px]"
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category Image</label>
                <div className="flex items-center gap-3">
                  {formData.image && <img src={formData.image} alt="Preview" className="w-10 h-10 object-cover rounded bg-zinc-100 border border-hairline" />}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brass/10 file:text-brass hover:file:bg-brass/20 cursor-pointer" />
                </div>
              </div>
              <Input label="Priority (lower = first)" type="number" value={formData.priority.toString()} onChange={e => setFormData({...formData, priority: parseInt(e.target.value) || 0})} isRequired />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={busy} className="bg-brass text-background">Save</Button>
              <Button type="button" variant="outline" onClick={cancelForm} disabled={busy}>Cancel</Button>
            </div>
          </form>
        </GlowCard>
      )}

      {!isAdding && !editingId && (
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={cat.id} className="p-4 bg-surface border border-hairline rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <button disabled={busy || idx === 0} onClick={() => changePriority(cat, -1)} className="text-muted-foreground hover:text-ink disabled:opacity-30"><ChevronUp className="w-5 h-5"/></button>
                  <span className="text-xs font-mono text-muted-foreground">{cat.priority}</span>
                  <button disabled={busy || idx === categories.length - 1} onClick={() => changePriority(cat, 1)} className="text-muted-foreground hover:text-ink disabled:opacity-30"><ChevronDown className="w-5 h-5"/></button>
                </div>
                <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded border border-hairline bg-zinc-100" />
                <div>
                  <h4 className="font-bold text-ink">{cat.name}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{cat.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(cat)} disabled={busy}>
                  <Edit2 className="w-4 h-4 text-ink" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(cat.id, cat.name)} disabled={busy} className="hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
