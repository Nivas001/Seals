import { useState } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Image as ImageIcon, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { upsertHeroImage, deleteHeroImage } from "@/lib/admin";
import { compressImage } from "@/lib/image-utils";

export function HeroCarouselTab({ data, session, onUpdate }: { data: any, session: any, onUpdate: () => void }) {
  const [busy, setBusy] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [order, setOrder] = useState(0);

  const images = data.heroImages || [];

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newImage) return toast.error("Please select an image");
    
    if (newImage.size > 2 * 1024 * 1024) {
      return toast.error("Image must be less than 2MB");
    }

    setBusy(true);
    try {
      const url = await compressImage(newImage);
      await upsertHeroImage({
        data: {
          token: session.access_token,
          url,
          order,
        }
      });
      toast.success("Image added to carousel");
      setIsAdding(false);
      setNewImage(null);
      setPreview("");
      setOrder(0);
      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add image");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this image?")) return;
    setBusy(true);
    try {
      await deleteHeroImage({ data: { token: session.access_token, id } });
      toast.success("Image removed");
      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove image");
    } finally {
      setBusy(false);
    }
  }

  async function changePriority(img: any, change: number) {
    setBusy(true);
    try {
      await upsertHeroImage({
        data: {
          token: session.access_token,
          id: img.id,
          url: img.url,
          order: img.order + change
        }
      });
      onUpdate();
    } catch (err) {
      toast.error("Failed to update order");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-brass" /> Hero Carousel
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Manage images displayed in the homepage hero carousel.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} disabled={busy} className="bg-brass text-background hover:bg-brass/90">
            <Plus className="w-4 h-4 mr-2" /> Add Image
          </Button>
        )}
      </div>

      {isAdding && (
        <GlowCard className="p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">Add New Image</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Image</label>
                <div className="flex items-center gap-3">
                  {preview && <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded bg-zinc-100 border border-hairline" />}
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brass/10 file:text-brass hover:file:bg-brass/20 cursor-pointer" required />
                </div>
              </div>
              <Input label="Order Priority (lower = first)" type="number" value={order.toString()} onChange={e => setOrder(parseInt(e.target.value) || 0)} isRequired />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={busy} className="bg-brass text-background">Save Image</Button>
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)} disabled={busy}>Cancel</Button>
            </div>
          </form>
        </GlowCard>
      )}

      {!isAdding && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-surface border border-dashed border-hairline rounded-xl">
              No images in the carousel yet. Add one to get started.
            </div>
          ) : (
            images.map((img: any, idx: number) => (
              <div key={img.id} className="group relative rounded-xl overflow-hidden border border-hairline bg-surface shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video relative">
                  <img src={img.url} alt="Carousel slide" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(img.id)} disabled={busy}>
                      <Trash2 className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-surface flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Order: {img.order}</span>
                  <div className="flex gap-1">
                    <button disabled={busy || idx === 0} onClick={() => changePriority(img, -1)} className="p-1 rounded bg-accent/50 text-muted-foreground hover:text-ink disabled:opacity-30"><ChevronUp className="w-4 h-4"/></button>
                    <button disabled={busy || idx === images.length - 1} onClick={() => changePriority(img, 1)} className="p-1 rounded bg-accent/50 text-muted-foreground hover:text-ink disabled:opacity-30"><ChevronDown className="w-4 h-4"/></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
