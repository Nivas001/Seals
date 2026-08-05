import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/forklift-sim")({
  head: () => ({
    meta: [{ title: "Forklift Simulator | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: ForkliftSim,
});

type Box = { id: number; x: number; y: number; vx: number; vy: number; rotation: number };

function ForkliftSim() {
  const [player, setPlayer] = useState({ x: 400, y: 300, angle: 0 });
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  // Initialize boxes
  useEffect(() => {
    const initialBoxes: Box[] = [];
    for (let i = 0; i < 15; i++) {
      initialBoxes.push({
        id: i,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: 0,
        vy: 0,
        rotation: Math.random() * 360,
      });
    }
    setBoxes(initialBoxes);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key]: false }));
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer((p) => {
        let newX = p.x;
        let newY = p.y;
        let newAngle = p.angle;
        const speed = 5;
        const rotSpeed = 5;

        if (keys["ArrowLeft"] || keys["a"]) newAngle -= rotSpeed;
        if (keys["ArrowRight"] || keys["d"]) newAngle += rotSpeed;
        
        if (keys["ArrowUp"] || keys["w"]) {
          newX += Math.cos((newAngle - 90) * (Math.PI / 180)) * speed;
          newY += Math.sin((newAngle - 90) * (Math.PI / 180)) * speed;
        }
        if (keys["ArrowDown"] || keys["s"]) {
          newX -= Math.cos((newAngle - 90) * (Math.PI / 180)) * speed;
          newY -= Math.sin((newAngle - 90) * (Math.PI / 180)) * speed;
        }

        // Clamp to screen
        newX = Math.max(20, Math.min(780, newX));
        newY = Math.max(20, Math.min(580, newY));

        return { x: newX, y: newY, angle: newAngle };
      });

      setBoxes((prevBoxes) => 
        prevBoxes.map((b) => {
          let { x, y, vx, vy, rotation } = b;
          
          // Collision with player (broken physics)
          const dx = x - player.x;
          const dy = y - player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 50) {
            // Apply massive chaotic force
            vx += (dx / dist) * (Math.random() * 20 + 10);
            vy += (dy / dist) * (Math.random() * 20 + 10);
            rotation += Math.random() * 100 - 50;
          }

          // Friction
          vx *= 0.95;
          vy *= 0.95;

          x += vx;
          y += vy;

          // Bounce off walls
          if (x < 20 || x > 780) vx *= -1;
          if (y < 20 || y > 580) vy *= -1;
          
          x = Math.max(20, Math.min(780, x));
          y = Math.max(20, Math.min(580, y));

          return { ...b, x, y, vx, vy, rotation };
        })
      );
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [keys, player]);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[800px] mb-4 flex justify-between items-end">
        <div>
          <Link to="/funny_url_list" className="text-zinc-500 hover:text-zinc-300 text-sm block mb-1">← Archives</Link>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="text-red-500" />
            Forklift Physics Test_v0.1
          </h1>
        </div>
        <div className="text-zinc-500 text-sm">Objective: Organize the boxes</div>
      </div>

      <div className="w-full max-w-[800px] h-[600px] bg-zinc-800 relative overflow-hidden rounded-xl border border-zinc-700 shadow-2xl">
        {/* Concrete floor texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

        {/* Player (Forklift) */}
        <div 
          className="absolute w-12 h-16 bg-yellow-500 rounded-sm z-20 flex flex-col items-center shadow-lg"
          style={{ 
            left: `${player.x - 24}px`, 
            top: `${player.y - 32}px`,
            transform: `rotate(${player.angle}deg)`
          }}
        >
          <div className="w-8 h-8 bg-zinc-800 rounded mt-4" /> {/* Cab */}
          <div className="w-16 h-2 bg-zinc-400 absolute -top-4 rounded-sm" /> {/* Forks */}
          <div className="w-2 h-6 bg-zinc-400 absolute -top-2 left-2" />
          <div className="w-2 h-6 bg-zinc-400 absolute -top-2 right-2" />
        </div>

        {/* Boxes */}
        {boxes.map((b) => (
          <div
            key={b.id}
            className="absolute w-8 h-8 bg-amber-700 border-2 border-amber-900 flex items-center justify-center shadow-md z-10"
            style={{ 
              left: `${b.x - 16}px`, 
              top: `${b.y - 16}px`,
              transform: `rotate(${b.rotation}deg)`
            }}
          >
            <div className="w-full h-full border border-amber-600/50 m-1 relative">
              <span className="absolute top-0 right-0 text-[6px] text-amber-900 font-bold m-px rotate-45">UP</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-zinc-500 text-sm font-mono flex gap-4">
        <span>Controls: WASD or Arrows to drive</span>
      </div>
    </div>
  );
}
