import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Building2, Copy, CreditCard, Landmark, Mail, MapPin, Navigation, Phone, ShieldCheck, Smartphone } from "lucide-react";
import { COMPANY } from "@/data/catalog";

const ease = [0.16, 1, 0.3, 1] as const;

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

/* Payment methods, shown as real options instead of decorative shapes. */
export function PaymentsBand() {
  const methods = [
    { icon: Landmark, t: "Netbanking & wire", d: "Direct bank transfer and SWIFT for corporate orders" },
    { icon: Smartphone, t: "UPI & wallets", d: "Google Pay, PhonePe, Paytm and more" },
    { icon: CreditCard, t: "International cards", d: "Visa, MasterCard and American Express" },
  ];
  return (
    <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-background shadow-2xl sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brass/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">Global commerce</div>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-4xl">Simple, secure payments.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/75 sm:text-base">
              Pay the way that suits your procurement team, whether you buy from across India or abroad.
            </p>
            <Link
              to="/about/payments"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px] hover:shadow-brass"
            >
              View payment options <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3">
            {methods.map((m, i) => (
              <motion.li
                key={m.t}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.1]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-brass">
                  <m.icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold">{m.t}</div>
                  <div className="text-sm text-background/65">{m.d}</div>
                </div>
              </motion.li>
            ))}
            <li className="flex items-center gap-2 px-1 pt-1 text-xs text-background/55">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Encrypted, PCI-DSS compliant payment gateways
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
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
        <p className="max-w-sm text-sm text-muted-foreground">Head office and stock in Hosur, Tamil Nadu. Dispatch across India and worldwide.</p>
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
