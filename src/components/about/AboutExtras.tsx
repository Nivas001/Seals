import { toast } from "sonner";
import { Building2, Copy, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { COMPANY } from "@/data/catalog";

type Address = { line1: string; line2: string; city: string; district?: string; state: string; pincode: string };

async function copy(text: string, label: string) {
  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch {
    // Fallback for browsers or embeds that block the async clipboard API.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed; opacity:0; pointer-events:none;";
    document.body.appendChild(ta);
    ta.select();
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
  }
  if (ok) toast.success(`${label} copied`, { description: text });
  else toast.error("Couldn't copy. Please select the text instead.");
}

/* Head office with a live map, one-tap actions and copy-to-clipboard toasts. */
export function WhereWeAre({ address, phones, emails }: { address: Address; phones?: string[] | null; emails?: string[] | null }) {
  const phoneList = phones?.length ? phones : COMPANY.phones;
  const emailList = emails?.length ? emails : COMPANY.emails;
  const full = `${address.line1}, ${address.line2}, ${address.city}${address.district ? `, ${address.district}` : ""}, ${address.state} ${address.pincode}`;
  const maps = `https://maps.google.com/?q=${encodeURIComponent("Arasanatti Hosur Tamil Nadu 635126")}`;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">Where we are</h2>
        <p className="max-w-sm text-sm text-muted-foreground">Visit, call or message us. Tap any detail to copy it.</p>
      </div>
      <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-hairline bg-surface shadow-soft lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-brand)" }}>
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">Head office</div>
                <div className="font-display text-xl font-black text-ink">Hosur, Tamil Nadu</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => copy(full, "Address")}
              className="group mt-5 flex w-full items-start gap-3 rounded-2xl border border-hairline bg-background p-4 text-left transition hover:border-brass/40"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
              <span className="flex-1 text-sm leading-relaxed text-ink/80">{full}</span>
              <Copy className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-brass" />
              <span className="sr-only">Copy address</span>
            </button>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {phoneList.map((p) => (
                <li key={p}>
                  <button type="button" onClick={() => copy(p, "Phone number")} className="group flex w-full items-center gap-2 rounded-xl border border-hairline bg-background px-3 py-2.5 text-sm font-semibold text-ink transition hover:border-brass/40">
                    <Phone className="h-4 w-4 text-brass" /> <span className="flex-1 text-left">{p}</span>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-brass" />
                  </button>
                </li>
              ))}
              {emailList.map((e) => (
                <li key={e} className="sm:col-span-2">
                  <button type="button" onClick={() => copy(e, "Email")} className="group flex w-full items-center gap-2 rounded-xl border border-hairline bg-background px-3 py-2.5 text-sm font-semibold text-ink transition hover:border-brass/40">
                    <Mail className="h-4 w-4 text-brass" /> <span className="min-w-0 flex-1 truncate text-left">{e}</span>
                    <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-brass" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={maps} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-background transition hover:bg-ink/85">
              <Navigation className="h-4 w-4" /> Directions
            </a>
            <a href={`tel:${phoneList[0].replace(/\s/g, "")}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-semibold text-ink transition hover:bg-white">
              <Phone className="h-4 w-4" /> Call
            </a>
            <a href="https://wa.me/917806936475" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white transition hover:brightness-95">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="relative min-h-[280px] border-t border-hairline lg:border-l lg:border-t-0">
          <iframe
            title="AARRKKAA International head office map, Hosur"
            src="https://maps.google.com/maps?q=Arasanatti%20Hosur%20Tamil%20Nadu%20635126&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
