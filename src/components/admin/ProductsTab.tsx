import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlowCard } from "@/components/ui/GlowCard";
import { toast } from "sonner";
import { upsertProduct, deleteProduct, updateProductPriorities, restoreProduct } from "@/lib/admin";
import { Trash2, Edit2, Plus, ChevronUp, ChevronDown, Search, X, GripHorizontal, EyeOff, ArchiveRestore, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableProductCard({ p, onEdit, onDelete, busy }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`group flex flex-col bg-surface border rounded-2xl overflow-hidden transition-all ${isDragging ? 'shadow-xl border-brass scale-105' : 'border-hairline shadow-sm hover:shadow-md hover:border-brass/30'} ${p.isHidden ? 'opacity-60' : ''}`}>
      <div className="aspect-[4/3] bg-zinc-50 relative">
        {p.image ? (
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-bold uppercase tracking-widest text-xs">No Image</div>
        )}
        {p.isHidden && (
          <div className="absolute top-2 left-2 z-10 bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <EyeOff className="w-3 h-3" /> Hidden
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 to-transparent flex items-start justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit ? (
            <div {...attributes} {...listeners} className="p-2 cursor-grab active:cursor-grabbing text-white/80 hover:text-white bg-black/20 rounded backdrop-blur-sm touch-none">
              <GripHorizontal className="w-5 h-5" />
            </div>
          ) : <div />}
          <div className="flex gap-1">
            {onEdit ? (
              <>
                <Button type="button" variant="secondary" size="icon" className="w-8 h-8 bg-white/90 hover:bg-white text-ink shadow-sm" onClick={() => onEdit(p)} disabled={busy}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button type="button" variant="destructive" size="icon" className="w-8 h-8 shadow-sm" onClick={() => onDelete(p)} disabled={busy}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button type="button" variant="outline" size="sm" className="h-8 bg-black/50 border-zinc-700 text-white hover:bg-brass hover:border-brass shadow-sm backdrop-blur-sm" onClick={() => onDelete(p)} disabled={busy}>
                <ArchiveRestore className="w-4 h-4 mr-2" /> Restore
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h5 className="font-bold text-ink mb-1 line-clamp-1">{p.name}</h5>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{p.tagline || p.description}</p>
      </div>
    </div>
  );
}

export function ProductsTab({ products, categories, token, onUpdate }: { products: any[]; categories: any[]; token: string; onUpdate: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProducts, setActiveProducts] = useState(products);

  useEffect(() => {
    setActiveProducts(products);
  }, [products]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  
  const [viewMode, setViewMode] = useState<"active" | "trash">("active");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const activeFiltered = activeProducts.filter(p => !p.isDeleted);
  const trashFiltered = activeProducts.filter(p => p.isDeleted);

  const [scrollPos, setScrollPos] = useState(0);

  const defaultProduct = {
    categoryId: categories[0]?.id || "", 
    name: "", slug: "", tagline: "", description: "", image: "", priority: 1, isHidden: false,
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
      priority: p.priority || 1,
      isHidden: p.isHidden || false,
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

  const confirmDelete = (p: any) => {
    setProductToDelete(p);
    setDeleteConfirmText("");
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    if (deleteConfirmText !== productToDelete.name) return;
    
    setBusy(true);
    try {
      await deleteProduct({ data: { token, id: productToDelete.id } });
      toast.success("Product moved to trash.");
      setDeleteConfirmOpen(false);
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete product");
    } finally {
      setBusy(false);
    }
  };

  const handleRestore = async (p: any) => {
    setBusy(true);
    try {
      await restoreProduct({ data: { token, id: p.id } });
      toast.success("Product restored.");
      onUpdate();
    } catch (e: any) {
      toast.error("Failed to restore product");
    } finally {
      setBusy(false);
    }
  };

  // Group products by category
  const groupedProducts = useMemo(() => {
    const map = new Map<string, any[]>();
    const q = searchQuery.toLowerCase();
    
    categories.forEach(c => map.set(c.id, []));
    
    const filtered = activeFiltered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.slug.toLowerCase().includes(q)
    );

    filtered.forEach(p => {
      if (map.has(p.categoryId)) {
        map.get(p.categoryId)?.push(p);
      }
    });

    map.forEach(list => {
      list.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    });

    return map;
  }, [activeFiltered, categories, searchQuery]);

  const handleDragEnd = async (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const catProducts = groupedProducts.get(categoryId) || [];
      const oldIndex = catProducts.findIndex((p: any) => p.id === active.id);
      const newIndex = catProducts.findIndex((p: any) => p.id === over.id);
      
      const newCatProducts = arrayMove(catProducts, oldIndex, newIndex);
      
      const updates = newCatProducts.map((p: any, index: number) => ({
        id: p.id,
        priority: index + 1
      }));

      const nextProducts = [...activeProducts];
      updates.forEach(u => {
        const idx = nextProducts.findIndex(p => p.id === u.id);
        if (idx !== -1) nextProducts[idx].priority = u.priority;
      });
      setActiveProducts(nextProducts);

      setBusy(true);
      try {
        await updateProductPriorities({ data: { token, updates } });
        onUpdate();
      } catch (e) {
        toast.error("Failed to save product order");
        setActiveProducts(products); 
      } finally {
        setBusy(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-2">
              Are you sure you want to delete <strong>{productToDelete?.name}</strong>? 
              This will move the product to the Trash.
              <br /><br />
              Please type <strong className="text-white select-none">{productToDelete?.name}</strong> to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={productToDelete?.name}
              className="bg-zinc-900 border-zinc-700 text-zinc-100"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={busy || deleteConfirmText !== productToDelete?.name}
              className="bg-red-600 hover:bg-red-700"
            >
              Move to Trash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isAdding && !editingId && (
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 rounded-full border border-hairline bg-surface text-sm focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            
            <div className="flex bg-surface border border-hairline rounded-lg p-1">
              <button 
                onClick={() => setViewMode("active")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === "active" ? "bg-brass text-white shadow-sm" : "text-muted-foreground hover:text-ink"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setViewMode("trash")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === "trash" ? "bg-zinc-800 text-white shadow-sm" : "text-muted-foreground hover:text-ink"}`}
              >
                Trash ({trashFiltered.length})
              </button>
            </div>
          </div>
          <Button onClick={() => startAdd()} className="bg-brass text-background hover:bg-brass/90 rounded-full text-xs uppercase tracking-wider font-bold shrink-0">
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
              <Input label="Priority (lower = first)" type="number" value={formData.priority.toString()} onChange={e => setFormData({...formData, priority: parseInt(e.target.value) || 0})} isRequired />
            </div>

            <div className="pt-2 border-t border-hairline mt-4">
              <div className="flex items-center justify-between p-4 bg-zinc-50 border border-hairline rounded-xl">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-ink">Hide Product</Label>
                  <p className="text-xs text-muted-foreground">When hidden, this product will not appear on the live website.</p>
                </div>
                <Switch 
                  checked={formData.isHidden} 
                  onCheckedChange={(checked) => setFormData({...formData, isHidden: checked})} 
                />
              </div>
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
                      <h4 className="text-lg font-bold text-ink flex items-center gap-2">
                        {cat.name}
                        <span className="bg-brass/20 text-brass px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold">
                          {catProducts.length} Product{catProducts.length !== 1 ? 's' : ''}
                        </span>
                      </h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => startAdd(cat.id)} className="text-xs font-semibold text-brass hover:text-brass hover:bg-brass/10">
                      <Plus className="w-3 h-3 mr-1" /> Add Product
                    </Button>
                  </div>

                  {catProducts.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground border border-dashed border-hairline rounded-xl bg-surface/50">
                      No products in this category yet.
                    </div>
                  ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, cat.id)}>
                      <SortableContext items={catProducts.map(p => p.id)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {catProducts.map((p) => (
                            <SortableProductCard 
                              key={p.id} 
                              p={p} 
                              onEdit={startEdit} 
                              onDelete={confirmDelete} 
                              busy={busy} 
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isAdding && !editingId && viewMode === "trash" && (
        <div className="space-y-4">
          {trashFiltered.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-hairline rounded-xl bg-surface/50 text-muted-foreground text-sm font-medium">
              The trash is empty.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trashFiltered.map((p) => (
                <SortableProductCard 
                  key={p.id} 
                  p={p} 
                  onDelete={handleRestore} 
                  busy={busy} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
