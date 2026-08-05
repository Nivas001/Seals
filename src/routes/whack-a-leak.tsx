import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Droplets, AlertOctagon, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/whack-a-leak")({
  head: () => ({
    meta: [{ title: "Whack-a-Leak | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: WhackALeak,
});

function WhackALeak() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [floodLevel, setFloodLevel] = useState(0);
  const [leaks, setLeaks] = useState<{ id: number; x: number; y: number }[]>([]);

  const spawnLeak = useCallback(() => {
    if (gameOver || !isPlaying) return;
    const newLeak = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 70 + 10,
    };
    setLeaks((prev) => [...prev, newLeak]);
  }, [gameOver, isPlaying]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const spawnRate = Math.max(400, 1500 - score * 50); // Gets faster
    const interval = setInterval(spawnLeak, spawnRate);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, score, spawnLeak]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const floodInterval = setInterval(() => {
      setFloodLevel((prev) => {
        const newLevel = prev + (leaks.length * 0.5); // Flood rises based on active leaks
        if (newLevel >= 100) {
          setGameOver(true);
          return 100;
        }
        return newLevel;
      });
    }, 500);
    return () => clearInterval(floodInterval);
  }, [isPlaying, gameOver, leaks.length]);

  const whack = (id: number) => {
    setLeaks((prev) => prev.filter((l) => l.id !== id));
    setScore((s) => s + 1);
    setFloodLevel((prev) => Math.max(0, prev - 2)); // Reduce flood slightly
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setFloodLevel(0);
    setLeaks([]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 overflow-hidden relative cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23eab308%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z%22/></svg>')_16_16,crosshair]">
      
      {/* Background Pipes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #52525b 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 flex flex-col justify-around opacity-10 pointer-events-none">
        <div className="h-4 bg-zinc-400 w-full" />
        <div className="h-8 bg-zinc-400 w-full" />
        <div className="h-6 bg-zinc-400 w-full" />
      </div>
      <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
        <div className="w-8 bg-zinc-400 h-full" />
        <div className="w-12 bg-zinc-400 h-full" />
      </div>

      {/* UI Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-40 bg-zinc-950/50 backdrop-blur border-b border-zinc-800">
        <div className="text-zinc-100 font-mono">
          <Link to="/funny_url_list" className="text-zinc-500 hover:text-zinc-300 text-sm block mb-2">← Archives</Link>
          <div className="text-2xl font-black text-amber-500 flex items-center gap-2">
            <Wrench className="w-6 h-6" /> WHACK-A-LEAK
          </div>
          <div className="text-xl">Fixed: {score}</div>
        </div>
        
        {/* Flood Meter */}
        <div className="w-48 sm:w-64">
          <div className="flex justify-between text-sm font-mono text-zinc-400 mb-1">
            <span>Flood Level</span>
            <span className={floodLevel > 80 ? "text-red-500 animate-pulse" : ""}>{Math.round(floodLevel)}%</span>
          </div>
          <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
            <div 
              className={`h-full transition-all duration-300 ${floodLevel > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${floodLevel}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rising Water Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-blue-600/40 backdrop-blur-sm transition-all duration-500 z-30 pointer-events-none border-t border-blue-400/50"
        style={{ height: `${floodLevel}%` }}
      />

      {/* Game Area */}
      <div className="absolute inset-0 z-20 pt-24 pb-8">
        <AnimatePresence>
          {leaks.map((leak) => (
            <motion.button
              key={leak.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute group"
              style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
              onMouseDown={() => whack(leak.id)}
            >
              <div className="relative flex items-center justify-center">
                {/* Hole */}
                <div className="absolute w-8 h-8 bg-black rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)]" />
                {/* Water Spout */}
                <motion.div 
                  animate={{ height: ["20px", "60px", "40px"] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="absolute bottom-4 w-4 bg-blue-400 rounded-t-full opacity-80"
                />
                <Droplets className="absolute bottom-8 w-12 h-12 text-blue-300 animate-bounce" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Start / Game Over Screen */}
      {(!isPlaying || gameOver) && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-xl max-w-md w-full text-center shadow-2xl">
            {gameOver ? (
              <>
                <AlertOctagon className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white mb-2 uppercase">Facility Flooded</h2>
                <p className="text-zinc-400 mb-6">You managed to fix <span className="text-amber-500 font-bold">{score}</span> leaks before drowning.</p>
              </>
            ) : (
              <>
                <Wrench className="w-20 h-20 text-amber-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white mb-2 uppercase">Whack-a-Leak</h2>
                <p className="text-zinc-400 mb-6">Pipes are bursting! Click the leaks to fix them. Don't let the flood meter reach 100%.</p>
              </>
            )}
            
            <button 
              onClick={startGame}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              {gameOver ? 'Try Again' : 'Start Repairing'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
