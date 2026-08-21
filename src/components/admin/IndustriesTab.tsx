import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Factory,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Edit2,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { updateIndustryImage, upsertIndustry } from "@/lib/admin";
import { compressImage } from "@/lib/image-utils";
import type { IndustrySector } from "@/data/defaultIndustries";

interface IndustriesTabProps {
  industries: IndustrySector[];
  session: any;
  onUpdate: () => void;
}

export function IndustriesTab({ industries, session, onUpdate }: IndustriesTabProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [selectedPreviews, setSelectedPreviews] = useState<{ [id: string]: string }>({});
  const [selectedFiles, setSelectedFiles] = useState<{ [id: string]: File }>({});
  const fileInputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});

  // Editing full details modal
  const [editingSector, setEditingSector] = useState<IndustrySector | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Trigger file dialog
  const handleSelectClick = (id: string) => {
    fileInputRefs.current[id]?.click();
  };

  // When admin selects a new image file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFiles((prev) => ({ ...prev, [id]: file }));

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedPreviews((prev) => ({ ...prev, [id]: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel new image selection
  const handleCancelSelection = (id: string) => {
    setSelectedPreviews((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setSelectedFiles((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = "";
    }
  };

  // Save new image to database
  const handleSaveImage = async (sector: IndustrySector) => {
    const file = selectedFiles[sector.id || sector.slug];
    if (!file) return;

    setBusyId(sector.id || sector.slug);
    try {
      // Compress with high quality suitable for responsive industry cards
      const compressedBase64 = await compressImage(file, 1600, 0.85);

      await updateIndustryImage({
        data: {
          token: session.access_token,
          id: sector.id!,
          image: compressedBase64,
        },
      });

      toast.success(`Updated picture for ${sector.name}`);
      handleCancelSelection(sector.id || sector.slug);
      onUpdate();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update industry picture");
    } finally {
      setBusyId(null);
    }
  };

  // Open full edit modal
  const handleOpenEdit = (sector: IndustrySector) => {
    setEditingSector(sector);
    setEditFormData({
      name: sector.name,
      slug: sector.slug,
      tagline: sector.tagline,
      desc: sector.desc,
      duty: sector.duty,
      compliance: sector.compliance || "",
      priority: sector.priority ?? 0,
      image: sector.image,
    });
    setIsEditModalOpen(true);
  };

  // Save full sector modal
  const handleSaveSectorDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSector) return;

    setBusyId("modal");
    try {
      await upsertIndustry({
        data: {
          token: session.access_token,
          id: editingSector.id,
          slug: editFormData.slug,
          name: editFormData.name,
          tagline: editFormData.tagline,
          desc: editFormData.desc,
          duty: editFormData.duty,
          compliance: editFormData.compliance || null,
          image: editFormData.image,
          priority: Number(editFormData.priority) || 0,
        },
      });

      toast.success(`Saved details for ${editFormData.name}`);
      setIsEditModalOpen(false);
      setEditingSector(null);
      onUpdate();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save industry details");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface/50 border border-hairline p-5 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Factory className="w-5 h-5 text-primary" /> Industry Sectors & Photos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage pictures and information for all 8 industry sectors displayed on the public{" "}
            <a
              href="/industries"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1 font-semibold"
            >
              /industries <ExternalLink className="w-3.5 h-3.5" />
            </a>{" "}
            page.
          </p>
        </div>
      </div>

      {/* Grid of Sector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {industries.map((sector, index) => {
          const itemKey = sector.id || sector.slug;
          const previewUrl = selectedPreviews[itemKey];
          const isBusy = busyId === itemKey;
          const displayImage = previewUrl || sector.image;

          return (
            <GlowCard key={itemKey} className="overflow-hidden border border-hairline bg-surface flex flex-col justify-between">
              <div>
                {/* Sector Card Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline/60">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Sector {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-black text-foreground">{sector.name}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(sector)}
                    className="h-8 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit Info
                  </Button>
                </div>

                {/* Tagline */}
                <p className="text-xs font-medium text-muted-foreground mb-4 line-clamp-1">
                  {sector.tagline}
                </p>

                {/* Picture Area */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-hairline bg-zinc-900 group">
                  <img
                    src={displayImage}
                    alt={sector.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Change overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSelectClick(itemKey)}
                      className="bg-white/90 text-zinc-900 hover:bg-white text-xs font-bold rounded-full shadow-lg"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1.5" /> Replace Photo
                    </Button>
                  </div>

                  {/* Pending upload badge */}
                  {previewUrl && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md animate-pulse">
                      Pending Save
                    </div>
                  )}

                  {/* Duty badge */}
                  <div className="absolute bottom-2 left-2 text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {sector.duty}
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputRefs.current[itemKey] = el)}
                  onChange={(e) => handleFileChange(e, itemKey)}
                  className="hidden"
                />
              </div>

              {/* Action Controls */}
              <div className="pt-4 mt-4 border-t border-hairline/60 flex items-center justify-between gap-3">
                {previewUrl ? (
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      onClick={() => handleSaveImage(sector)}
                      disabled={isBusy}
                      size="sm"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      {isBusy ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1.5" /> Save New Picture
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleCancelSelection(itemKey)}
                      disabled={isBusy}
                      variant="outline"
                      size="sm"
                      className="border-hairline text-xs font-semibold rounded-xl"
                    >
                      <X className="w-3.5 h-3.5 mr-1" /> Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] text-muted-foreground">
                      Recommended: <strong className="text-foreground">16:9 / 1200×675px</strong>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectClick(itemKey)}
                      className="text-xs font-bold border-hairline hover:border-primary hover:text-primary rounded-xl"
                    >
                      <ImageIcon className="w-3.5 h-3.5 mr-1.5" /> Change Photo
                    </Button>
                  </div>
                )}
              </div>
            </GlowCard>
          );
        })}
      </div>

      {/* Edit Sector Details Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-xl bg-surface border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Edit Sector Details
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Update description, duty specifications, and compliance details.
            </DialogDescription>
          </DialogHeader>

          {editFormData && (
            <form onSubmit={handleSaveSectorDetails} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Industry Name
                  </label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Slug
                  </label>
                  <Input
                    value={editFormData.slug}
                    onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tagline
                </label>
                <Input
                  value={editFormData.tagline}
                  onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <Textarea
                  value={editFormData.desc}
                  onChange={(e) => setEditFormData({ ...editFormData, desc: e.target.value })}
                  className="min-h-[80px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Duty Window
                  </label>
                  <Input
                    value={editFormData.duty}
                    onChange={(e) => setEditFormData({ ...editFormData, duty: e.target.value })}
                    placeholder="e.g. CIP / SIP · 80 – 140 °C"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Compliance
                  </label>
                  <Input
                    value={editFormData.compliance}
                    onChange={(e) => setEditFormData({ ...editFormData, compliance: e.target.value })}
                    placeholder="e.g. FDA / 3A compliant"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={busyId === "modal"}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={busyId === "modal"}
                  className="bg-primary text-primary-foreground font-bold"
                >
                  {busyId === "modal" ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Details"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
