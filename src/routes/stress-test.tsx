import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crosshair, Ruler, Beaker } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/stress-test")({
  head: () => ({
    meta: [
      { title: "Advanced Stress Testing | AARRKKAA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StressTestEasterEgg,
});

function StressTestEasterEgg() {
  return (
    <div className="min-h-screen bg-[#0d1321] text-[#64ffda] selection:bg-[#64ffda]/30 flex flex-col font-mono">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 relative flex items-center justify-center overflow-hidden">
        {/* Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.05)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.1)_1px,transparent_1px)] bg-[length:200px_200px] pointer-events-none" />
        
        {/* Crosshairs */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[120%] h-[1px] bg-[#64ffda]/20" />
          <div className="h-[120%] w-[1px] bg-[#64ffda]/20 absolute" />
        </div>
        <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 text-[#64ffda]/10 pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-[250px_1fr_250px] gap-8 items-center h-full">
          
          {/* Left Panel - Readouts */}
          <div className="space-y-6 text-xs uppercase tracking-widest hidden lg:block">
            <div className="border border-[#64ffda]/30 bg-[#0d1321]/80 backdrop-blur p-4 rounded">
              <h3 className="text-[#64ffda] font-bold mb-3 flex items-center gap-2"><Ruler className="h-4 w-4" /> Specs</h3>
              <ul className="space-y-2 text-[#64ffda]/70">
                <li className="flex justify-between"><span>Material</span> <span>Cis-Isoprene</span></li>
                <li className="flex justify-between"><span>Buoyancy</span> <span>100%</span></li>
                <li className="flex justify-between"><span>Squeak</span> <span>120dB</span></li>
                <li className="flex justify-between"><span>Stress</span> <span>Nominal</span></li>
              </ul>
            </div>
            <div className="border border-[#64ffda]/30 bg-[#0d1321]/80 backdrop-blur p-4 rounded">
              <h3 className="text-[#64ffda] font-bold mb-3">Debug Feed</h3>
              <div className="space-y-1 text-[10px] text-[#64ffda]/50 h-24 overflow-hidden">
                <p>Initializing quack engine...</p>
                <p>Simulating fluid dynamics...</p>
                <p>Aerodynamic drag coefficient: 0.04</p>
                <p>Thermal stability verified.</p>
                <p>Ready for bathtub deployment.</p>
              </div>
            </div>
          </div>

          {/* Center - The Duck */}
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <motion.div
              animate={{ 
                rotateY: 360,
                rotateX: [0, 10, -10, 0],
                y: [0, -15, 0]
              }}
              transition={{ 
                rotateY: { repeat: Infinity, duration: 4, ease: "linear" },
                rotateX: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              className="text-[180px] leading-none select-none drop-shadow-[0_0_30px_rgba(100,255,218,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              🦆
            </motion.div>
            
            <div className="mt-12 text-center">
              <h1 className="text-2xl font-black uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(100,255,218,0.8)]">Project D.U.C.K.</h1>
              <p className="text-[#64ffda]/60 text-sm">Dynamic Utility & Calming Kit</p>
            </div>
          </div>

          {/* Right Panel - Readouts */}
          <div className="space-y-6 text-xs uppercase tracking-widest hidden lg:block">
            <div className="border border-[#64ffda]/30 bg-[#0d1321]/80 backdrop-blur p-4 rounded">
              <h3 className="text-[#64ffda] font-bold mb-3 flex items-center gap-2"><Beaker className="h-4 w-4" /> Lab Results</h3>
              <ul className="space-y-2 text-[#64ffda]/70">
                <li className="flex justify-between"><span>Vibration</span> <span>Absorbed</span></li>
                <li className="flex justify-between"><span>Cavitation</span> <span>Zero</span></li>
                <li className="flex justify-between"><span>Cute Factor</span> <span>Maximum</span></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
