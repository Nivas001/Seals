import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlowCard } from "@/components/ui/GlowCard";
import { toast } from "sonner";
import { upsertCategory, deleteCategory, updateCategoryPriorities, restoreCategory } from "@/lib/admin";
import { Trash2, Edit2, Plus, GripVertical, EyeOff, ArchiveRestore, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableCategoryItem({ cat, onEdit, onDelete, busy }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cat.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`p-4 bg-surface border rounded-xl flex items-center justify-between transition-all ${isDragging ? 'shadow-xl border-brass scale-[1.01]' : 'border-hairline shadow-sm hover:shadow-md'} ${cat.isHidden ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4">
        {onEdit && (
          <div {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-ink active:cursor-grabbing p-2 touch-none">
            <GripVertical className="w-5 h-5" />
          </div>
        )}
        <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded border border-hairline bg-zinc-100" />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-ink">{cat.name}</h4>
            {cat.isHidden && <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1"><EyeOff className="w-3 h-3" /> Hidden</span>}
          </div>
          <p className="text-xs text-muted-foreground font-mono">{cat.slug}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {onEdit ? (
          <>
            <Button variant="outline" size="sm" onClick={() => onEdit(cat)} disabled={busy}>
              <Edit2 className="w-4 h-4 text-ink" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(cat)} disabled={busy} className="hover:bg-red-50 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => onDelete(cat)} disabled={busy} className="hover:bg-brass hover:text-white hover:border-brass">
            <ArchiveRestore className="w-4 h-4 mr-2" /> Restore
          </Button>
        )}
      </div>
    </div>
  );
}

export function CategoriesTab({ categories, token, onUpdate }: { categories: any[]; token: string; onUpdate: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [activeCategories, setActiveCategories] = useState(categories);

  import("react").then((React) => {
    React.useEffect(() => {
      setActiveCategories(categories);
    }, [categories]);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [viewMode, setViewMode] = useState<"active" | "trash">("active");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const activeFiltered = categories.filter(c => !c.isDeleted);
  const trashFiltered = categories.filter(c => c.isDeleted);

  const defaultCategory = {
    slug: "", name: "", short: "", description: "", image: "", priority: categories.length + 1, isHidden: false
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
      isHidden: cat.isHidden,
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

  const confirmDelete = (cat: any) => {
    setCategoryToDelete(cat);
    setDeleteConfirmText("");
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    if (deleteConfirmText !== categoryToDelete.name) return;
    
    setBusy(true);
    try {
      await deleteCategory({ data: { token, id: categoryToDelete.id } });
      toast.success("Category moved to trash.");
      setDeleteConfirmOpen(false);
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete category");
    } finally {
      setBusy(false);
    }
  };

  const handleRestore = async (cat: any) => {
    setBusy(true);
    try {
      await restoreCategory({ data: { token, id: cat.id } });
      toast.success("Category restored.");
      onUpdate();
    } catch (e: any) {
      toast.error("Failed to restore category");
    } finally {
      setBusy(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = activeCategories.findIndex((c: any) => c.id === active.id);
      const newIndex = activeCategories.findIndex((c: any) => c.id === over.id);
      const newArray = arrayMove(activeCategories, oldIndex, newIndex);
      
      // Optimitically update UI
      setActiveCategories(newArray);
      
      // Calculate new priorities
      const updates = newArray.map((cat: any, index: number) => ({
        id: cat.id,
        priority: index + 1
      }));

      setBusy(true);
      try {
        await updateCategoryPriorities({ data: { token, updates } });
        onUpdate();
      } catch (e) {
        toast.error("Failed to save new order");
        setActiveCategories(categories); // revert on failure
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
              Delete Category
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-2">
              Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>? 
              This will move the category and all of its products to the Trash.
              <br /><br />
              Please type <strong className="text-white select-none">{categoryToDelete?.name}</strong> to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={categoryToDelete?.name}
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
              disabled={busy || deleteConfirmText !== categoryToDelete?.name}
              className="bg-red-600 hover:bg-red-700"
            >
              Move to Trash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isAdding && !editingId && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-display font-black text-ink">Product Categories</h3>
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
            
            <div className="pt-2 border-t border-hairline mt-4">
              <div className="flex items-center justify-between p-4 bg-zinc-50 border border-hairline rounded-xl">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-ink">Hide Category</Label>
                  <p className="text-xs text-muted-foreground">When hidden, this category will not appear on the live website.</p>
                </div>
                <Switch 
                  checked={formData.isHidden} 
                  onCheckedChange={(checked) => setFormData({...formData, isHidden: checked})} 
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={busy} className="bg-brass text-background">Save</Button>
              <Button type="button" variant="outline" onClick={cancelForm} disabled={busy}>Cancel</Button>
            </div>
          </form>
        </GlowCard>
      )}

      {!isAdding && !editingId && viewMode === "active" && (
        <div className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={activeCategories.filter(c => !c.isDeleted).map((c: any) => c.id)} strategy={verticalListSortingStrategy}>
              {activeCategories.filter(c => !c.isDeleted).map((cat: any) => (
                <SortableCategoryItem 
                  key={cat.id} 
                  cat={cat} 
                  onEdit={startEdit} 
                  onDelete={confirmDelete} 
                  busy={busy} 
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      {!isAdding && !editingId && viewMode === "trash" && (
        <div className="space-y-4">
          {trashFiltered.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-hairline rounded-xl bg-surface/50 text-muted-foreground text-sm font-medium">
              The trash is empty.
            </div>
          ) : (
            trashFiltered.map((cat: any) => (
              <SortableCategoryItem 
                key={cat.id} 
                cat={cat} 
                onDelete={handleRestore} 
                busy={busy} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
