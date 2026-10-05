import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

// Keyboard-driven fixed-size games: show a friendly notice on phones/tablets instead of a broken game.
export function DesktopOnly({ children }: { children: ReactNode }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 819px), (pointer: coarse)");
    const update = () => setBlocked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!blocked) return <>{children}</>;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-center text-white">
      <h1 className="text-2xl font-black uppercase tracking-widest">Desktop only</h1>
      <p className="max-w-sm text-zinc-400">
        This one needs a keyboard and a bigger screen. Open it on a laptop or desktop to play.
      </p>
      <Link to="/funny_url_list" className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-900">
        Back to archives
      </Link>
    </div>
  );
}
