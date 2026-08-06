import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Paperclip,
  Linkedin,
  Instagram,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { VerifiedSupplierBadge } from "@/components/site/VerifiedSupplierBadge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Input } from "@/components/base/input/input";
import { COMPANY, CATEGORIES } from "@/data/catalog";
import { getItem, slugify } from "@/data/items";
import { toast } from "sonner";
import { chatbotState } from "@/data/chatbotState";
import { sendContactEmail } from "@/lib/email";

type ContactSearch = {
  category?: string;
  product?: string;
  subject?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
    product: typeof search.product === "string" ? search.product : undefined,
    subject: typeof search.subject === "string" ? search.subject : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — AARRKKAA International" },
      {
        name: "description",
        content:
          "Send a spec, drawing or photo — we respond within 24 hours on business days with grade, brand and dispatch timeline.",
      },
      { property: "og:title", content: "Contact AARRKKAA International" },
      {
        property: "og:description",
        content:
          "Corporate enquiries, product quotes and support for AARRKKAA International, Hosur.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-32">
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-7 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Get in touch
              </div>
              <h1
                className="mt-4 font-display font-black leading-[0.95] tracking-[-0.035em] text-ink text-balance"
                style={{ fontSize: "clamp(2rem, 8vw, 4.75rem)" }}
              >
                Request a quote.
                <br />
                <span className="italic text-brass">We&rsquo;ll match the part.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Share a spec sheet, drawing, model number or a photograph of the
                worn component. Our sales team responds with the exact grade,
                brand recommendation and dispatch timeline.
              </p>
            </div>
            <div className="hidden sm:flex lg:col-span-5 justify-center lg:justify-end">
              <VerifiedSupplierBadge />
            </div>
          </div>

          {/* Bento grid */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <CorporateCard className="order-2 lg:order-1 h-full" />
            <InquiryCard className="order-1 lg:order-2 h-full" />
            <FollowCard className="order-3 h-full" />
            <NewsletterCard className="order-4 h-full" />
          </div>
        </section>

        {/* Map */}
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-8">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
                  Location
                </div>
                <div className="mt-1 font-display text-xl font-black tracking-tight text-ink">
                  Hosur, Tamil Nadu
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Arasanatti+Hosur+Tamil+Nadu+635126"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-ink"
              >
                Open in Maps →
              </a>
            </div>
            <iframe
              title="AARRKKAA International — Hosur head office map"
              src="https://maps.google.com/maps?q=Arasanatti%20Hosur%20Tamil%20Nadu%20635126&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full border-t border-hairline"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Cards ---------- */

function CardShell({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GlowCard className={className}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
        {eyebrow}
      </div>
      <h2 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </GlowCard>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-3">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brass/10 backdrop-blur-md border border-brass/20 text-brass shadow-sm"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-sm font-medium text-ink">{children}</div>
      </div>
    </div>
  );
}

function CorporateCard({ className }: { className?: string }) {
  return (
    <CardShell eyebrow="Corporate" title={COMPANY.name} className={className}>
      <p className="-mt-3 text-sm text-muted-foreground">
        {COMPANY.tagline} · Assist &amp; Deliver
      </p>
      <div className="mt-4 divide-y divide-hairline">
        <InfoRow icon={Phone} label="Call">
          <div className="flex flex-col">
            {COMPANY.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="hover:text-brass"
              >
                {p}
              </a>
            ))}
          </div>
        </InfoRow>
        <InfoRow icon={Mail} label="Email">
          <div className="flex flex-col">
            {COMPANY.emails.map((e) => (
              <a
                key={e}
                href={`mailto:${e}`}
                className="break-all hover:text-brass"
              >
                {e}
              </a>
            ))}
          </div>
        </InfoRow>
        <InfoRow icon={MapPin} label="Head office">
          {COMPANY.address.line1}, {COMPANY.address.line2},<br />
          {COMPANY.address.city}, {COMPANY.address.district},<br />
          {COMPANY.address.state} — {COMPANY.address.pincode}
        </InfoRow>
        <InfoRow icon={Clock} label="Response time">
          Within 24 hours on business days.
        </InfoRow>
        <InfoRow icon={Sparkles} label="24/7 AI Support">
          <div className="flex flex-col gap-1.5">
            <span className="text-muted-foreground">Get instant answers &amp; technical guidance anytime.</span>
            <button
              onClick={() => chatbotState.setOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass hover:underline w-fit cursor-pointer pt-0.5"
            >
              <span>Launch ASK ARKA</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>
        </InfoRow>
      </div>
    </CardShell>
  );
}

const inputBase =
  "w-full rounded-xl border border-hairline bg-background px-3 py-2.5 text-sm sm:px-4 sm:py-3 text-ink placeholder:text-muted-foreground/70 shadow-inner outline-none transition focus:border-ink/40 focus:ring-2 focus:ring-brass/30";

const labelBase =
  "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

function InquiryCard({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const search = Route.useSearch();

  // Look up detailed item specifications if a product is selected
  let productDetail = null;
  if (search.product) {
    const pSlug = slugify(search.product);
    for (const cat of CATEGORIES) {
      const found = getItem(cat.slug, pSlug);
      if (found) {
        productDetail = found;
        break;
      }
    }
  }

  const defaultCategory = search.category || (productDetail?.category.name ?? "");
  const defaultSubject = search.product
    ? `Quote Request: ${search.product}`
    : search.subject || "";
  const defaultMessage = search.product
    ? `I would like to request a quotation for:\n\n• Product: ${search.product}\n• Category: ${defaultCategory || "General"}\n\n[Please specify required quantity, duty conditions, or operating parameters below]:\n`
    : "";

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Str = (reader.result as string).split(",")[1];
        resolve(base64Str);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || name.length > 100) {
      toast.error("Please enter a valid name (up to 100 characters).");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid corporate email address.");
      return;
    }
    if (!message || message.length > 3000) {
      toast.error("Please provide enquiry details (up to 3000 characters).");
      return;
    }

    setSubmitting(true);
    const subject = String((data.get("subject") ?? defaultSubject) || "Enquiry");
    const category = String(data.get("category") ?? "");

    // Process file attachment if exists
    let attachmentData = undefined;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement | null;
    const file = fileInput?.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds the 10MB limit.");
        setSubmitting(false);
        return;
      }
      try {
        const base64Content = await getBase64(file);
        attachmentData = {
          filename: file.name,
          content: base64Content,
        };
      } catch (err) {
        console.error("Error reading file:", err);
        toast.error("Failed to read file attachment. Please try again.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const response = await sendContactEmail({
        name,
        email,
        category,
        subject,
        message,
        attachment: attachmentData,
      });

      if (response.success) {
        toast.success(
          response.mock
            ? "Inquiry logged in dev console (Mock Mode)"
            : "Inquiry submitted successfully!",
        );
        if (response.mock) {
          toast.info("Check server terminal to view the logged email body.");
        }
        form.reset();
        setFileName("");
      } else {
        toast.error(response.error || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CardShell eyebrow="Enquiry" title="Send us a request" className={className}>
      {(search.product || search.category) && (
        <div className="mb-6 rounded-2xl border border-brass/40 bg-gradient-to-br from-brass/15 via-brass/5 to-surface p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-brass/10 backdrop-blur-md border border-brass/20 shadow-sm text-brass font-bold">
                <Sparkles className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brass">
                  Quotation Request Attached
                </div>
                <div className="mt-0.5 font-display text-base sm:text-lg font-bold text-ink flex flex-wrap items-center gap-2">
                  <span className="truncate">{search.product || search.category}</span>
                  {(search.category || productDetail?.category.name) && (
                    <span className="rounded-full border border-brass/30 bg-brass/15 px-2.5 py-0.5 text-[11px] font-semibold text-ink whitespace-nowrap">
                      {search.category || productDetail?.category.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Link
              to="/catalog"
              className="shrink-0 text-xs font-bold text-muted-foreground hover:text-brass underline decoration-dotted transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      )}
      <form
        key={defaultSubject + defaultCategory}
        className="grid gap-3 sm:gap-4"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="name" className={labelBase}>
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={100}
              placeholder="Full name"
              className={`mt-2 ${inputBase}`}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="email" className={labelBase}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={255}
              placeholder="you@company.com"
              className={`mt-2 ${inputBase}`}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="category" className={labelBase}>
              Product category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={defaultCategory}
              className={`mt-2 ${inputBase} appearance-none`}
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor="subject" className={labelBase}>
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              defaultValue={defaultSubject}
              maxLength={140}
              placeholder="Purpose of enquiry"
              className={`mt-2 ${inputBase}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelBase}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            defaultValue={defaultMessage}
            required
            rows={4}
            maxLength={2000}
            placeholder="Share your duty conditions, drawing numbers or part specs…"
            className={`mt-2 ${inputBase} resize-y`}
          />
        </div>

        <div>
          <div className={labelBase}>Attachment (optional)</div>
          <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink/20 bg-background px-3 py-3 text-sm text-muted-foreground hover:border-ink/40">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-background">
              <Paperclip className="h-3.5 w-3.5" /> Browse
            </span>
            <span className="min-w-0 flex-1 truncate">
              {fileName || "No file selected"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-background transition hover:bg-ink/85 disabled:opacity-60 sm:w-auto sm:self-start"
        >
          <Send className="h-4 w-4" />
          {submitting ? "Sending…" : "Submit inquiry"}
        </button>
      </form>
    </CardShell>
  );
}

function FollowCard({ className }: { className?: string }) {
  return (
    <CardShell eyebrow="Connect" title="Follow our journey" className={className}>
      <p className="-mt-3 text-sm text-muted-foreground">
        Stay updated with our latest product launches, industry insights and
        corporate news from the shop floor.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
        {[
          { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: Linkedin },
          { href: "https://www.instagram.com/", label: "Instagram", Icon: Instagram },
          { href: "https://wa.me/917806936475", label: "WhatsApp", Icon: MessageCircle },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 overflow-hidden rounded-xl sm:rounded-2xl border border-hairline bg-background p-2.5 sm:px-5 sm:py-3 text-[9px] sm:text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-lg hover:shadow-brass/10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brass/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span
              className="relative grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-lg bg-brass/10 backdrop-blur-md border border-brass/20 text-brass shadow-sm transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-6deg]"
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            </span>
            <span className="relative transition-colors duration-300 group-hover:text-brass text-center leading-none">
              {label}
            </span>
          </a>
        ))}
      </div>
    </CardShell>
  );
}

function NewsletterCard({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      toast.success("Subscribed — thanks for following AARRKKAA.");
      setEmail("");
      setBusy(false);
    }, 500);
  }

  return (
    <div className={`relative flex flex-col h-full overflow-hidden rounded-[1.5rem] border border-hairline bg-surface p-5 text-ink shadow-soft sm:rounded-[1.75rem] sm:p-8 ${className}`}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
        Newsletter
      </div>
      <h2 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl">
        Stay updated
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Get technical articles, catalog updates and enterprise offers delivered
        directly to your inbox.
      </p>
      <form onSubmit={onSubscribe} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1 min-w-0">
          <Input
            isRequired
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            hint="We will not share your email with anyone."
            placeholder="you@company.com"
            tooltip="Receive product updates and offers."
            maxLength={255}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-background transition hover:bg-ink/85 disabled:opacity-60 sm:mt-7"
        >
          {busy ? "…" : "Subscribe"}
        </button>
      </form>
      <p className="mt-3 text-[11px] text-muted-foreground">
        No spam. Unsubscribe at any time.
      </p>
    </div>
  );
}
