import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlowCard } from "@/components/ui/GlowCard";
import { toast } from "sonner";
import { upsertProduct, deleteProduct } from "@/lib/admin";
import { Trash2, Edit2, Plus, X, Search, ChevronUp, ChevronDown } from "lucide-react";

export function ProductsTab({ products, categories, token, onUpdate }: { products: any[]; categories: any[]; token: string; onUpdate: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollPos, setScrollPos] = useState(0);

  const defaultProduct = {
    categoryId: categories[0]?.id || "", name: "", slug: "", tagline: "", description: "", image: "",
    priority: 0,
    specs: [{ label: "", value: "" }], benefits: [{ text: "" }], applications: [{ text: "" }]
  };
  const [formData, setFormData] = useState(defaultProduct);

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

  const startEdit = (p: any) => {
    setScrollPos(window.scrollY);
    setEditingId(p.id);
    setIsAdding(false);
    setFormData({
      categoryId: p.categoryId,
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      description: p.description,
      image: p.image || "",
      priority: p.priority || 0,
      specs: p.specs.length ? p.specs.map((s: any) => ({ label: s.label, value: s.value })) : [],
      benefits: p.benefits.length ? p.benefits.map((b: any) => ({ text: b.text })) : [],
      applications: p.applications.length ? p.applications.map((a: any) => ({ text: a.text })) : [],
    });
  };

  const startAdd = (categoryId?: string) => {
    setScrollPos(window.scrollY);
    setEditingId(null);
    setIsAdding(true);
    setFormData(categoryId ? { ...defaultProduct, categoryId } : defaultProduct);
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setTimeout(() => {
      window.scrollTo({ top: scrollPos, behavior: 'instant' });
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await upsertProduct({
        data: {
          token,
          id: editingId || undefined,
          ...formData,
          specs: formData.specs.filter((s: any) => s.label && s.value),
          benefits: formData.benefits.filter((b: any) => b.text),
          applications: formData.applications.filter((a: any) => a.text)
        }
      });
      toast.success(`Product ${editingId ? "updated" : "created"} successfully.`);
      cancelForm();
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to save product");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    setBusy(true);
    try {
      await deleteProduct({ data: { token, id } });
      toast.success("Product deleted.");
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete product");
    } finally {
      setBusy(false);
    }
  };

  const changePriority = async (p: any, delta: number) => {
    setBusy(true);
    try {
      await upsertProduct({
        data: {
          token,
          id: p.id,
          categoryId: p.categoryId,
          name: p.name,
          slug: p.slug,
          tagline: p.tagline,
          description: p.description,
          image: p.image || undefined,
          priority: (p.priority || 0) + delta,
          specs: p.specs.map((s: any) => ({ label: s.label, value: s.value })),
          benefits: p.benefits.map((b: any) => ({ text: b.text })),
          applications: p.applications.map((a: any) => ({ text: a.text })),
        }
      });
      onUpdate();
    } catch (e: any) {
      toast.error("Failed to update priority");
    } finally {
      setBusy(false);
    }
  };

  // Group products by category
  const groupedProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const map = new Map<string, any[]>();
    
    categories.forEach(c => map.set(c.id, []));
    
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.slug.toLowerCase().includes(q)
    );

    filtered.forEach(p => {
      if (map.has(p.categoryId)) {
        map.get(p.categoryId)?.push(p);
      }
    });

    // Sort products by priority (lower number = higher up)
    map.forEach(list => {
      list.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    });

    return map;
  }, [products, categories, searchQuery]);

  return (
    <div className="space-y-8">
      {!isAdding && !editingId && (
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-display font-black text-ink">Products</h3>
          <Button onClick={() => startAdd()} className="bg-brass text-background rounded-full hover:bg-brass/90">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      )}

      {(isAdding || editingId) && (
        <GlowCard className="p-6">
          <h3 className="text-lg font-bold text-ink mb-4">{editingId ? "Edit Product" : "New Product"}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} isRequired />
              <Input label="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} isRequired />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
                <select 
                  className="w-full bg-surface border border-hairline rounded-md h-10 px-3 text-sm text-ink focus:border-brass outline-none"
                  value={formData.categoryId} 
                  onChange={e => setFormData({...formData, categoryId: e.target.value})} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <Input type="number" label="Priority Order (Lower = First)" value={formData.priority.toString()} onChange={e => setFormData({...formData, priority: parseInt(e.target.value) || 0})} isRequired />
            </div>

            <Input label="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
            
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
              <Textarea className="w-full bg-surface border-hairline focus:border-brass text-ink min-h-[80px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Image (Optional)</label>
              <div className="flex items-center gap-3">
                {formData.image && <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded bg-zinc-100 border border-hairline" />}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brass/10 file:text-brass hover:file:bg-brass/20 cursor-pointer" />
              </div>
            </div>

            {/* Dynamic Arrays */}
            <div className="space-y-4 pt-4 border-t border-hairline">
              <div>
                <h4 className="text-sm font-bold text-ink mb-2">Specifications</h4>
                {formData.specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input label="Label" value={spec.label} onChange={e => {
                      const newSpecs = [...formData.specs]; newSpecs[i].label = e.target.value; setFormData({...formData, specs: newSpecs})
                    }} />
                    <Input label="Value" value={spec.value} onChange={e => {
                      const newSpecs = [...formData.specs]; newSpecs[i].value = e.target.value; setFormData({...formData, specs: newSpecs})
                    }} />
                    <Button type="button" variant="ghost" onClick={() => setFormData({...formData, specs: formData.specs.filter((_, idx) => idx !== i)})}><X className="w-4 h-4 text-red-500"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, specs: [...formData.specs, {label:'', value:''}]})}>Add Spec</Button>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-ink mb-2">Benefits</h4>
                {formData.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input label="Benefit" value={benefit.text} onChange={e => {
                      const newB = [...formData.benefits]; newB[i].text = e.target.value; setFormData({...formData, benefits: newB})
                    }} />
                    <Button type="button" variant="ghost" onClick={() => setFormData({...formData, benefits: formData.benefits.filter((_, idx) => idx !== i)})}><X className="w-4 h-4 text-red-500"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, benefits: [...formData.benefits, {text:''}]})}>Add Benefit</Button>
              </div>

              <div>
                <h4 className="text-sm font-bold text-ink mb-2">Applications</h4>
                {formData.applications.map((app, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input label="Application" value={app.text} onChange={e => {
                      const newA = [...formData.applications]; newA[i].text = e.target.value; setFormData({...formData, applications: newA})
                    }} />
                    <Button type="button" variant="ghost" onClick={() => setFormData({...formData, applications: formData.applications.filter((_, idx) => idx !== i)})}><X className="w-4 h-4 text-red-500"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, applications: [...formData.applications, {text:''}]})}>Add Application</Button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={busy} className="bg-brass text-background hover:bg-brass/90">Save Product</Button>
              <Button type="button" variant="outline" onClick={cancelForm} disabled={busy}>Cancel</Button>
            </div>
          </form>
        </GlowCard>
      )}

      {!isAdding && !editingId && (
        <div className="space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-hairline rounded-lg text-sm text-ink focus:border-brass outline-none shadow-sm"
            />
          </div>
          
          <div className="space-y-12">
            {categories.map(cat => {
              const catProducts = groupedProducts.get(cat.id) || [];
              if (catProducts.length === 0 && searchQuery !== "") return null;

              return (
                <div key={cat.id} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-hairline pb-2">
                    <div className="flex items-center gap-3">
                      {cat.image && <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-md object-cover border border-hairline" />}
                      <h4 className="text-lg font-bold text-ink">{cat.name}</h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => startAdd(cat.id)} className="text-xs font-semibold text-brass hover:text-brass hover:bg-brass/10">
                      <Plus className="w-3 h-3 mr-1" /> Add to {cat.name}
                    </Button>
                  </div>

                  {catProducts.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground border border-dashed border-hairline rounded-xl bg-surface/50">
                      No products in this category yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catProducts.map((p, idx) => (
                        <div key={p.id} className="group flex flex-col bg-surface border border-hairline rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-brass/30 transition-all">
                          <div className="aspect-[4/3] bg-zinc-50 relative">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-bold uppercase tracking-widest text-xs">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button type="button" variant="secondary" size="icon" className="w-8 h-8 bg-white/90 hover:bg-white text-ink shadow-sm" onClick={() => startEdit(p)} disabled={busy}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="destructive" size="icon" className="w-8 h-8 shadow-sm" onClick={() => handleDelete(p.id, p.name)} disabled={busy}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 flex-1 flex flex-col">
                            <h5 className="font-bold text-ink mb-1 line-clamp-1">{p.name}</h5>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">{p.tagline || p.description}</p>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-hairline mt-auto">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Order: {p.priority || 0}</span>
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => changePriority(p, -1)} 
                                  disabled={busy || idx === 0}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-accent text-ink hover:bg-brass/20 hover:text-brass transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </button>
                                <button 
                                  onClick={() => changePriority(p, 1)} 
                                  disabled={busy || idx === catProducts.length - 1}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-accent text-ink hover:bg-brass/20 hover:text-brass transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
