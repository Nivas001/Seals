import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Send, Search, PackageCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Fast ways to reach us, shown above the form. */
export function QuickContact({ phone = "+91 78069 36475", email = "aarrkkaainternational@gmail.com" }: { phone?: string; email?: string }) {
  const items = [
    { icon: Phone, label: "Call sales", value: phone, href: `tel:${phone.replace(/\s/g, "")}`, tone: "bg-ink text-background" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${phone.replace(/[^0-9]/g, "")}`, tone: "bg-[#25D366] text-white", external: true },
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}`, tone: "border border-hairline bg-surface text-ink" },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <li key={it.label}>
          <a
            href={it.href}
            target={it.external ? "_blank" : undefined}
            rel={it.external ? "noopener noreferrer" : undefined}
            className={`flex min-h-[72px] items-center gap-4 rounded-2xl px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-lift ${it.tone}`}
          >
            <it.icon className="h-6 w-6 shrink-0" />
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">{it.label}</span>
              <span className="block truncate font-display text-base font-bold sm:text-lg">{it.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* What happens after the enquiry is sent. */
export function WhatHappensNext() {
  const steps = [
    { icon: Send, t: "You send your requirement", d: "A spec, drawing, model number or a photo of the worn part." },
    { icon: Search, t: "We match it and reply", d: "The exact grade, brand and dispatch timeline, within 24 hours on business days." },
    { icon: PackageCheck, t: "You confirm, we dispatch", d: "Packed and shipped from Hosur or a regional branch, on the timeline you need." },
  ];
  return (
    <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
      <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
        What happens after you send.
      </h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease }}
            className="relative rounded-3xl border border-hairline bg-surface p-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brass/10 text-brass">
              <s.icon className="h-6 w-6" />
            </span>
            <div className="mt-5 font-display text-xl font-black tracking-tight text-ink">
              <span className="mr-2 text-brass">{i + 1}.</span>
              {s.t}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.d}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
