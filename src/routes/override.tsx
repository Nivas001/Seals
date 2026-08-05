import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertOctagon, Terminal as TerminalIcon, Power } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/override")({
  head: () => ({
    meta: [
      { title: "SYSTEM OVERRIDE | AARRKKAA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OverrideTerminal,
});

function OverrideTerminal() {
  const [resolved, setResolved] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const i = setInterval(() => {
      setDots(p => p.length >= 3 ? "" : p + ".");
    }, 500);
    return () => clearInterval(i);
  }, []);

  if (resolved) {
    return (
      <div className="min-h-screen bg-[#001b3a] flex flex-col items-center justify-center text-white selection:bg-white/20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center"
        >
          <div className="grid h-24 w-24 place-items-center rounded-full bg-blue-500/20 text-blue-400 mx-auto mb-6">
            <Power className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-black font-display tracking-tight text-blue-100">Crisis Averted.</h1>
          <p className="mt-4 text-blue-300 max-w-sm mx-auto text-sm leading-relaxed">
            Emergency coolant (caffeine) deployed. Developer functions returning to nominal levels.
          </p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-6 py-2.5 text-sm font-semibold text-blue-200 hover:bg-blue-500/30 transition-colors">
            Return to Surface
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0505] flex flex-col font-mono text-red-500 selection:bg-red-900/50 relative overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />
      
      {/* Flashing Overlay */}
      <motion.div 
        animate={{ opacity: [0, 0.15, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-red-600 pointer-events-none z-0" 
      />

      <main className="relative z-20 flex-1 p-6 sm:p-12 max-w-4xl mx-auto w-full flex flex-col">
        <header className="flex items-center justify-between border-b border-red-500/30 pb-4">
          <div className="flex items-center gap-3">
            <TerminalIcon className="h-5 w-5" />
            <span className="text-sm font-bold tracking-widest">AARRKKAA_OS // v9.4.1</span>
          </div>
          <div className="text-sm tracking-widest animate-pulse">SYS_ERR_0x99F</div>
        </header>

        <div className="flex-1 flex flex-col justify-center items-center text-center mt-12 mb-12">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <AlertOctagon className="h-24 w-24 mx-auto mb-8 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          </motion.div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            Critical Failure
          </h1>
          <p className="mt-6 text-red-400/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed uppercase tracking-wider">
            Developer caffeine reserves critically depleted. Core logic engines overheating. Catastrophic shutdown imminent{dots}
          </p>

          <div className="mt-16">
            <button
              onClick={() => {
                toast("Coolant requested...", { style: { background: '#1a0505', color: '#ef4444', border: '1px solid #ef4444' } });
                setTimeout(() => setResolved(true), 1500);
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold uppercase tracking-widest text-red-900 bg-red-600 rounded hover:bg-red-500 transition-colors active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
            >
              Initiate Emergency Coolant
            </button>
          </div>
        </div>

        <footer className="text-xs text-red-500/50 mt-auto flex justify-between">
          <span>HOST: aarrkkaa.com</span>
          <span>UPTIME: ERR</span>
        </footer>
      </main>
    </div>
  );
}
