import { BadgeCheck, Clock, Globe2, MapPin } from "lucide-react";

// Four reassurance points, each backed by copy already used on the site.
const POINTS = [
  { icon: BadgeCheck, title: "Genuine parts", body: "Leading brands, traceable materials" },
  { icon: Clock, title: "Reply in 24 hours", body: "On business days" },
  { icon: Globe2, title: "Ships worldwide", body: "Service available globally" },
  { icon: MapPin, title: "Hosur, Tamil Nadu", body: "Head office with stock on hand" },
] as const;

export function TrustPoints({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 ${className}`}>
      {POINTS.map((p) => (
        <li key={p.title} className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass/10 text-brass">
            <p.icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="font-display text-[15px] font-bold leading-tight text-ink">{p.title}</div>
            <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{p.body}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
