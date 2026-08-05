import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ShieldAlert, Skull, DollarSign } from "lucide-react";

export const Route = createFileRoute("/system-breach")({
  head: () => ({
    meta: [{ title: "Admin Dashboard | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: SystemBreach,
});

function SystemBreach() {
  const [phase, setPhase] = useState(0); // 0=normal, 1=glitch, 2=audio/download, 3=tasks, 4=bank, 5=prank
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [taskIndex, setTaskIndex] = useState(0);
  
  const [task1Input, setTask1Input] = useState("");
  const [task3Input, setTask3Input] = useState("");
  const [task4Input, setTask4Input] = useState("");
  
  const [bankAmount, setBankAmount] = useState(4285093.45);
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  // PHASES TIMELINE
  useEffect(() => {
    // Phase 0 -> 1 (Normal to Glitch)
    const t1 = setTimeout(() => {
      setPhase(1);
      addLog("UNAUTHORIZED ACCESS DETECTED");
      addLog("IP ORIGIN: MOSCOW, RU [194.58.112.42]");
      addLog("BYPASSING FIREWALL... SUCCESS");
    }, 3000);

    // Phase 1 -> 2 (Terminal to Audio/Downloads)
    const t2 = setTimeout(() => {
      setPhase(2);
      speak("Connection established. We are inside the network. Do not attempt to close this window, or we wipe the servers immediately.");
      addLog("DOWNLOADING: Customer_Bank_Routing.enc... 14%");
    }, 7000);

    // Phase 2 -> 3 (Tasks)
    const t3 = setTimeout(() => {
      setPhase(3);
      addLog("INITIATING DATA TRANSFER PROTOCOL");
    }, 15000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  const addLog = (msg: string) => {
    setTerminalLines(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0, 8)}] ${msg}`]);
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.8;
      msg.pitch = 0.2;
      // try to find a robotic/weird voice
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices.find(v => v.name.includes("Google") || v.name.includes("Zira")) || voices[0];
      window.speechSynthesis.speak(msg);
    }
  };

  // TASK 1: Scrambled Keyboard
  const handleTask1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const scrambled = val.split('').map(c => {
      const charCode = c.charCodeAt(0);
      return String.fromCharCode(charCode + (Math.random() > 0.5 ? 1 : -1));
    }).join('');
    setTask1Input(scrambled);
    if (val.length > 6) {
      addLog("TASK FAILED: COMMAND REJECTED");
      setTaskIndex(1);
    }
  };

  // TASK 2: Runaway Button
  const handleTask2Hover = () => {
    if (buttonRef.current) {
      const x = Math.random() * 300 - 150;
      const y = Math.random() * 300 - 150;
      buttonRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  // Phase 4: Bank Drain
  useEffect(() => {
    if (phase === 4) {
      const interval = setInterval(() => {
        setBankAmount(prev => {
          const next = prev - (Math.random() * 50000 + 10000);
          if (next <= 0) {
            clearInterval(interval);
            setTimeout(() => setPhase(5), 3000);
            return 0;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase]);

  if (phase === 5) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-1000">
        <h1 className="text-zinc-500 font-mono text-sm mb-4">Connection Terminated.</h1>
        <p className="text-white text-xl md:text-3xl font-bold mb-8 max-w-2xl leading-relaxed">
          Why did you even come to this URL? Did you really think Russian hackers wanted to steal a mechanical seal catalog?
        </p>
        <div className="text-6xl mb-8">🤡</div>
        <p className="text-zinc-400 font-mono mb-12">Sorry bro. It's just a prank.</p>
        <Link to="/" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-zinc-200 transition-colors">
          Return to Safety
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-hidden font-mono select-none ${phase > 0 ? 'bg-black text-red-500' : 'bg-zinc-100 text-zinc-900'}`}>
      
      {/* Fake Normal Dashboard */}
      <div className={`p-8 transition-opacity duration-75 ${phase > 0 ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <h1 className="text-3xl font-bold mb-8">AARRKKAA Admin Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow border">
            <h3 className="text-zinc-500 mb-2">Total Sales</h3>
            <div className="text-4xl font-bold">$1,204,590</div>
          </div>
          <div className="bg-white p-6 rounded shadow border">
            <h3 className="text-zinc-500 mb-2">Active Users</h3>
            <div className="text-4xl font-bold">42</div>
          </div>
          <div className="bg-white p-6 rounded shadow border">
            <h3 className="text-zinc-500 mb-2">Server Status</h3>
            <div className="text-4xl font-bold text-green-500">Secure</div>
          </div>
        </div>
      </div>

      {/* The Glitch / Terminal */}
      {phase > 0 && (
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">
          {/* Glitch overlays */}
          <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          
          <div className="p-4 flex-1 flex flex-col justify-end pointer-events-auto">
            <div className="max-w-3xl w-full mx-auto bg-black border-2 border-red-900 p-4 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
              <div className="flex items-center gap-2 border-b border-red-900 pb-2 mb-4 text-red-500">
                <TerminalIcon className="w-5 h-5" />
                <span className="font-bold tracking-widest">SYSTEM_OVERRIDE.EXE</span>
              </div>
              
              <div className="h-48 overflow-y-auto text-sm space-y-1 text-red-500/80 mb-4 flex flex-col justify-end">
                {terminalLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>

              {/* Tasks Area */}
              {phase === 3 && (
                <div className="border-t border-red-900 pt-4 mt-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-yellow-500 mb-4 animate-pulse">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="font-bold">COUNTER-MEASURE PROTOCOL INITIATED. COMPLETE TASKS TO ABORT.</span>
                  </div>

                  {taskIndex === 0 && (
                    <div>
                      <p className="mb-2">TASK 1: TYPE 'ABORT' TO SEVER CONNECTION</p>
                      <input 
                        type="text" 
                        value={task1Input}
                        onChange={handleTask1}
                        className="w-full bg-red-950 border border-red-500 text-red-100 p-2 outline-none"
                        autoFocus
                      />
                    </div>
                  )}

                  {taskIndex === 1 && (
                    <div className="h-32 relative flex items-center justify-center">
                      <p className="absolute top-0 left-0">TASK 2: CLICK TO RECONNECT FIREWALL</p>
                      <button 
                        ref={buttonRef}
                        onMouseEnter={handleTask2Hover}
                        onClick={() => { addLog("TASK FAILED: CONNECTION INTERCEPTED"); setTaskIndex(2); }}
                        className="px-6 py-2 bg-green-600 text-white font-bold transition-transform duration-75 absolute"
                      >
                        RECONNECT
                      </button>
                    </div>
                  )}

                  {taskIndex === 2 && (
                    <div>
                      <p className="mb-2">TASK 3: VERIFY ADMIN IDENTITY (Enter Password)</p>
                      <input 
                        type="password" 
                        value={task3Input}
                        onChange={(e) => setTask3Input(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addLog("ACCESS DENIED. FINGERPRINT MISMATCH.");
                            setTaskIndex(3);
                          }
                        }}
                        className="w-full bg-red-950 border border-red-500 text-red-100 p-2 outline-none"
                        autoFocus
                      />
                    </div>
                  )}

                  {taskIndex === 3 && (
                    <div>
                      <p className="mb-2 text-red-500 font-bold">CRITICAL: TRANSFER IN PROGRESS. TYPE 'DELETE SYSTEM32' TO WIPE DRIVE.</p>
                      <input 
                        type="text" 
                        value={task4Input}
                        onChange={(e) => setTask4Input(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addLog("TOO LATE. ROOT ACCESS COMPROMISED.");
                            setTimeout(() => {
                              setPhase(4);
                              speak("Thank you for your generous donation. Bank accounts are draining now.");
                            }, 1000);
                          }
                        }}
                        className="w-full bg-red-950 border border-red-500 text-red-100 p-2 outline-none uppercase"
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Bank Drain UI */}
              {phase === 4 && (
                <div className="border-t border-red-900 pt-8 mt-4 text-center animate-in zoom-in duration-500">
                  <Skull className="w-16 h-16 text-red-600 mx-auto mb-4 animate-bounce" />
                  <h2 className="text-2xl font-black text-red-500 mb-2 uppercase tracking-widest">Bank Security Compromised</h2>
                  <p className="text-red-400 mb-6">Transferring Corporate Funds to Offshore Account [Cayman Islands]</p>
                  
                  <div className="text-5xl md:text-7xl font-black text-red-600 flex items-center justify-center font-mono tracking-tighter">
                    <DollarSign className="w-12 h-12 md:w-16 md:h-16" />
                    {bankAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  
                  {bankAmount <= 0 && (
                    <div className="mt-8 text-xl font-bold text-red-500 animate-pulse">
                      TRANSFER COMPLETE. OPERATIONS CEASED.
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
