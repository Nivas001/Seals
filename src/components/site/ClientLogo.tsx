import type { Client } from "@/data/clients";

function initials(name: string) {
  const words = name.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
}

/** Real logo when available, otherwise a monogram badge with the company name. */
export function ClientLogo({ client, size = "md" }: { client: Client; size?: "md" | "lg" }) {
  const h = size === "lg" ? "h-9 sm:h-10" : "h-7 sm:h-8";
  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        decoding="async"
        className={`${h} w-auto max-w-[9rem] object-contain opacity-80 transition hover:opacity-100`}
      />
    );
  }
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      <span
        aria-hidden
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-hairline bg-background text-[11px] font-black tracking-tight text-ink/70"
      >
        {initials(client.name)}
      </span>
      <span className="text-[13px] font-bold tracking-tight text-ink/75">{client.name}</span>
    </span>
  );
}
