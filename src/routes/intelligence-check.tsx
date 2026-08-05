import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, RotateCcw, XCircle } from "lucide-react";

export const Route = createFileRoute("/intelligence-check")({
  head: () => ({
    meta: [{ title: "Intelligence Verification | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: IntelligenceCheck,
});

function IntelligenceCheck() {
  const [stage, setStage] = useState(0); // 0 = start, 1 = image, 2 = math, 3 = moving text, 4 = final insult
  const [insult, setInsult] = useState("");
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mathAnswer, setMathAnswer] = useState("");

  // Track mouse speed to insult them
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      setMouseSpeed(speed);
      setLastMousePos({ x: e.clientX, y: e.clientY });

      if (stage > 0 && stage < 4 && Math.random() > 0.99) {
        if (speed < 5) setInsult("Are you moving through molasses? Speed it up.");
        else if (speed > 50) setInsult("Whoa, frantic much? Calm your hand tremors.");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [lastMousePos, stage]);

  const fail = (msg: string) => {
    setInsult(msg);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4 font-sans text-zinc-900 select-none">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-200">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h1 className="font-bold">Security Verification</h1>
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="p-6 min-h-[400px] flex flex-col">
          
          <AnimatePresence mode="wait">
            {/* STAGE 0: Start */}
            {stage === 0 && (
              <motion.div key="stage0" exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6" />
                <h2 className="text-xl font-bold mb-2">Analyzing browser history...</h2>
                <p className="text-zinc-500 mb-8">We need to verify you possess the minimum IQ required to purchase industrial components.</p>
                <button 
                  onClick={() => setStage(1)}
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                >
                  I am a smart human
                </button>
              </motion.div>
            )}

            {/* STAGE 1: Image Select */}
            {stage === 1 && (
              <motion.div key="stage1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
                <h2 className="text-lg font-bold mb-1">Select all images containing a</h2>
                <h2 className="text-2xl font-black text-blue-600 mb-4">Centrifugal Pump</h2>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {/* Fake images */}
                  <div onClick={() => fail("That is a shoe. Are you blind?")} className="aspect-square bg-zinc-200 rounded cursor-pointer hover:ring-4 ring-blue-500 transition-all flex items-center justify-center text-4xl">👟</div>
                  <div onClick={() => fail("That is a toaster. A pump moves fluid, a toaster burns bread. Try again.")} className="aspect-square bg-zinc-200 rounded cursor-pointer hover:ring-4 ring-blue-500 transition-all flex items-center justify-center text-4xl">🍞</div>
                  <div onClick={() => fail("That's a duck. Quack. You failed.")} className="aspect-square bg-zinc-200 rounded cursor-pointer hover:ring-4 ring-blue-500 transition-all flex items-center justify-center text-4xl">🦆</div>
                  <div onClick={() => setStage(2)} className="aspect-square bg-zinc-200 rounded cursor-pointer hover:ring-4 ring-blue-500 transition-all flex items-center justify-center text-4xl blur-sm">⚙️</div>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: Math Check */}
            {stage === 2 && (
              <motion.div key="stage2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
                <h2 className="text-lg font-bold mb-4">Solve this extremely complex equation:</h2>
                <div className="text-5xl font-black text-center my-8 text-blue-600">2 + 2 = ?</div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    className="flex-1 border-2 border-zinc-300 rounded px-4 py-2 text-xl font-bold"
                  />
                  <button 
                    onClick={() => {
                      if (mathAnswer === "4") fail("INCORRECT. The answer is 4.00000000001 due to floating-point precision error. Are you a child? My calculator watch is smarter than you.");
                      else if (mathAnswer === "4.00000000001") setStage(3);
                      else fail(`"${mathAnswer}"? Have you ever attended a math class?`);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded"
                  >
                    Verify
                  </button>
                </div>
                {mathAnswer === "4" && insult && (
                  <button onClick={() => setStage(3)} className="mt-4 text-xs text-blue-500 underline text-center w-full">Fine, I'll let you pass out of pity.</button>
                )}
              </motion.div>
            )}

            {/* STAGE 3: Moving Text */}
            {stage === 3 && (
              <motion.div key="stage3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 relative overflow-hidden">
                <h2 className="text-lg font-bold mb-4">Click the text to prove you have motor skills:</h2>
                
                <motion.button
                  animate={{ 
                    x: [0, 200, -100, 150, -50, 0],
                    y: [0, 100, -50, 80, -100, 0],
                    rotate: [0, 90, -45, 180, -90, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => setStage(4)}
                  onHoverStart={() => fail("Too slow. I can literally process a billion calculations in the time it takes you to move your mouse.")}
                  className="absolute top-1/2 left-1/4 px-4 py-2 bg-zinc-800 text-white rounded font-bold whitespace-nowrap"
                >
                  I AM HUMAN
                </motion.button>
              </motion.div>
            )}

            {/* STAGE 4: Final Insult */}
            {stage === 4 && (
              <motion.div key="stage4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center items-center text-center">
                <XCircle className="w-24 h-24 text-red-500 mb-6" />
                <h2 className="text-2xl font-black text-red-600 mb-2">VERIFICATION FAILED</h2>
                <p className="text-zinc-600 mb-8 font-medium">You passed the tests, but our AI analyzed your face through the webcam and determined you don't look like someone who buys industrial components. Access permanently denied.</p>
                <Link to="/funny_url_list" className="text-sm text-blue-600 hover:underline">Return to safety</Link>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Insult Toast */}
          <AnimatePresence>
            {insult && stage < 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="mt-auto pt-4 border-t border-red-200 text-red-600 text-sm font-semibold flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                {insult}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
      
      <div className="mt-8 text-zinc-400 text-xs text-center max-w-sm">
        Protected by AARRKKAA Aggressive Security. Your incompetence has been logged.
      </div>
    </div>
  );
}
