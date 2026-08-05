import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/do-not-push")({
  head: () => ({
    meta: [{ title: "DO NOT PUSH | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: DoNotPushEasterEgg,
});

function DoNotPushEasterEgg() {
  const [clicks, setClicks] = useState(0);
  const controls = useAnimation();

  const handlePush = async () => {
    setClicks((c) => c + 1);
    
    if (clicks < 10) {
      // Shake screen
      await controls.start({
        x: [0, -10 * (clicks + 1), 10 * (clicks + 1), -10 * (clicks + 1), 0],
        transition: { duration: 0.2 }
      });
    } else {
      // Explosion!
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#facc15', '#3b82f6', '#22c55e']
      });
      setClicks(0);
    }
  };

  const getWarning = () => {
    if (clicks === 0) return "DO NOT PUSH";
    if (clicks === 1) return "I SAID DO NOT PUSH";
    if (clicks === 2) return "STOP IT";
    if (clicks === 3) return "ARE YOU CRAZY?";
    if (clicks === 4) return "YOU'LL BREAK THE WEBSITE";
    if (clicks === 5) return "WARNING: MELTDOWN IMMINENT";
    if (clicks >= 6 && clicks < 10) return "DANGER! DANGER!";
    return "DO NOT PUSH";
  };

  return (
    <motion.div 
      animate={controls}
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-200 ${
        clicks > 5 ? 'bg-red-950' : 'bg-[#fafafa]'
      }`}
    >
      <div className="text-center">
        <h1 className={`text-4xl sm:text-6xl font-black mb-16 tracking-widest ${clicks > 5 ? 'text-red-500 animate-pulse' : 'text-zinc-800'}`}>
          {getWarning()}
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePush}
          className="relative group outline-none"
        >
          <div className="absolute inset-0 bg-red-900 rounded-full translate-y-4 group-active:translate-y-1 transition-transform" />
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-b from-red-500 to-red-700 rounded-full border-4 border-red-800 shadow-[inset_0_10px_20px_rgba(255,255,255,0.3)] flex items-center justify-center group-active:translate-y-3 transition-transform">
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-red-400/30 shadow-[inset_0_5px_15px_rgba(0,0,0,0.2)]" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
