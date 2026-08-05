import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/matrix")({
  head: () => ({
    meta: [{ title: "The Matrix | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: MatrixEasterEgg,
});

function MatrixEasterEgg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emojis = ["⚙️", "🔧", "🔩", "🦆", "💧", "🔥", "🛑"];
    const fontSize = 24;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = emojis[Math.floor(Math.random() * emojis.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      <div className="absolute top-4 left-4 z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 border border-green-500/30 text-green-500 rounded hover:bg-green-900/50 transition-colors backdrop-blur font-mono text-sm"
        >
          <Home className="w-4 h-4" /> Wake Up
        </Link>
      </div>
    </div>
  );
}
