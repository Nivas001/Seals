import { useEffect, useRef, useState, type DragEvent } from "react";
import { Camera, FileText, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

/* "Quote by photo": attach up to three photos or drawings of the part. Photos are resized in
   the browser (longest side 1600 px, JPEG) so a phone picture uploads quickly; PDFs go as they are.
   On phones a "Take a photo" button opens the camera directly. */

export const MAX_FILES = 3;
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_SIDE = 1600;

export type Picked = { id: string; file: File; preview?: string };

export function PhotoAttach({ value, onChange }: { value: Picked[]; onChange: (next: Picked[]) => void }) {
  const pickRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  // Free preview URLs when files are removed or the form unmounts.
  const latest = useRef(value);
  latest.current = value;
  useEffect(() => () => latest.current.forEach((p) => p.preview && URL.revokeObjectURL(p.preview)), []);

  const add = (list: FileList | null) => {
    if (!list?.length) return;
    const next = [...value];
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        toast.error(`You can attach up to ${MAX_FILES} files.`);
        break;
      }
      const ok = file.type.startsWith("image/") || file.type === "application/pdf";
      if (!ok) {
        toast.error(`${file.name}: please attach a photo or a PDF.`);
        continue;
      }
      if (file.size > MAX_BYTES && !file.type.startsWith("image/")) {
        toast.error(`${file.name} is over 10 MB.`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      });
    }
    onChange(next);
  };

  const remove = (id: string) => {
    const gone = value.find((p) => p.id === id);
    if (gone?.preview) URL.revokeObjectURL(gone.preview);
    onChange(value.filter((p) => p.id !== id));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    add(e.dataTransfer.files);
  };

  const full = value.length >= MAX_FILES;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Photos or drawing (optional)</div>
        <div className="text-[11px] text-muted-foreground">
          {value.length}/{MAX_FILES}
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`mt-2 rounded-2xl border border-dashed p-3 transition ${over ? "border-brass bg-brass/5" : "border-ink/20 bg-background"}`}
      >
        {value.length > 0 && (
          <ul className="mb-3 grid grid-cols-3 gap-2">
            {value.map((p) => (
              <li key={p.id} className="group relative aspect-square overflow-hidden rounded-xl border border-hairline bg-surface">
                {p.preview ? (
                  <img src={p.preview} alt={p.file.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                    <FileText className="h-6 w-6 text-brass" />
                    <span className="line-clamp-2 break-all text-[10px] text-muted-foreground">{p.file.name}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  aria-label={`Remove ${p.file.name}`}
                  className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink/80 text-background backdrop-blur transition hover:bg-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {!full && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => pickRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-background transition hover:bg-ink/85"
            >
              <ImagePlus className="h-3.5 w-3.5" /> Add photos
            </button>
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-ink/15 px-3 py-2 text-xs font-semibold text-ink transition hover:bg-surface sm:hidden"
            >
              <Camera className="h-3.5 w-3.5" /> Take a photo
            </button>
            <span className="text-xs text-muted-foreground">
              <span className="hidden sm:inline">or drop them here. </span>A photo of the worn part next to a ruler is often all we need.
            </span>
          </div>
        )}

        <input
          ref={pickRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

/** Turns the picked files into base64 attachments, shrinking photos on the way. */
export async function toAttachments(picked: Picked[]): Promise<{ filename: string; content: string }[]> {
  return Promise.all(picked.map(async ({ file }) => (file.type.startsWith("image/") ? shrinkImage(file) : readFile(file))));
}

async function readFile(file: File) {
  const content = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
  return { filename: file.name, content };
}

async function shrinkImage(file: File) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return readFile(file);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
    const base = file.name.replace(/\.[^.]+$/, "") || "photo";
    return { filename: `${base}.jpg`, content: dataUrl.split(",")[1] ?? "" };
  } catch {
    // Formats the browser can't decode (e.g. some HEIC files) are sent as they are.
    if (file.size > MAX_BYTES) throw new Error(`${file.name} is over 10 MB`);
    return readFile(file);
  }
}
