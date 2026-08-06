import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlowCard } from "@/components/ui/GlowCard";
import { toast } from "sonner";
import { updateContactInfo } from "@/lib/admin";

export function ContactTab({ initialData, token, onUpdate }: { initialData: any; token: string; onUpdate: () => void }) {
  const [data, setData] = useState({
    tagline: initialData?.tagline || "",
    motto: initialData?.motto || "",
    phones: initialData?.phones ? initialData.phones.join(", ") : "",
    emails: initialData?.emails ? initialData.emails.join(", ") : "",
    address: initialData?.address ? JSON.stringify(initialData.address, null, 2) : "{}",
  });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      let parsedAddress = {};
      try {
        parsedAddress = JSON.parse(data.address);
      } catch (e) {
        toast.error("Invalid JSON format in Address field.");
        setBusy(false);
        return;
      }

      await updateContactInfo({
        data: {
          token,
          tagline: data.tagline,
          motto: data.motto,
          phones: data.phones.split(",").map(s => s.trim()).filter(Boolean),
          emails: data.emails.split(",").map(s => s.trim()).filter(Boolean),
          address: parsedAddress,
        }
      });
      toast.success("Contact info updated successfully.");
      onUpdate();
    } catch (e: any) {
      toast.error(e.message || "Failed to update contact info");
    } finally {
      setBusy(false);
    }
  };

  return (
    <GlowCard className="p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-display font-black text-ink mb-1">Company Contact Info</h3>
        <p className="text-sm text-muted-foreground">This information will be displayed globally on the header and footer.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Tagline" 
          value={data.tagline} 
          onChange={(e) => setData({ ...data, tagline: e.target.value })} 
        />
        
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Motto</label>
          <Textarea 
            className="w-full bg-surface border-hairline focus:border-brass text-ink min-h-[80px]"
            value={data.motto} 
            onChange={(e) => setData({ ...data, motto: e.target.value })} 
          />
        </div>

        <Input 
          label="Phone Numbers (comma separated)" 
          value={data.phones} 
          onChange={(e) => setData({ ...data, phones: e.target.value })} 
        />

        <Input 
          label="Emails (comma separated)" 
          value={data.emails} 
          onChange={(e) => setData({ ...data, emails: e.target.value })} 
        />

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address (JSON Format)</label>
          <Textarea 
            className="w-full bg-surface border-hairline focus:border-brass text-ink font-mono min-h-[150px]"
            value={data.address} 
            onChange={(e) => setData({ ...data, address: e.target.value })} 
          />
          <p className="text-[10px] text-muted-foreground">Ensure keys like "line1", "city", "state", "country" are used.</p>
        </div>

        <Button 
          type="submit" 
          disabled={busy} 
          className="bg-brass text-background hover:bg-brass/90 rounded-full h-12 uppercase tracking-[0.1em] font-bold text-xs px-8"
        >
          {busy ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </GlowCard>
  );
}
