import type { Client } from "@/data/clients";

function initials(name: string) {
  const words = name.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
}

/**
 * Real logo when available, otherwise a monogram badge with the company name.
 * `withName` always prints the company name next to the logo (used by the home marquee).
 */
export function ClientLogo({ client, size = "md", withName = false }: { client: Client; size?: "md" | "lg"; withName?: boolean }) {
  const h = client.square
    ? size === "lg" ? "h-14 sm:h-16" : "h-9 sm:h-10"
    : size === "lg" ? "h-9 sm:h-10" : "h-7 sm:h-8";
  if (client.logo && withName) {
    return (
      <span className="flex items-center gap-3 whitespace-nowrap">
        <img
          src={client.logo}
          alt=""
          decoding="async"
          className={`${client.square ? "h-9 sm:h-10" : "h-7 sm:h-8"} w-auto max-w-[7.5rem] shrink-0 object-contain`}
        />
        <span className="text-[13px] font-bold tracking-tight text-ink/75">{client.name}</span>
      </span>
    );
  }
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
