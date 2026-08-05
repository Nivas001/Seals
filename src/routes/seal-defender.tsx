import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { Shield, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/seal-defender")({
  head: () => ({
    meta: [{ title: "Seal Defender | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: SealDefender,
});

type GameObject = { id: number; x: number; y: number };

function SealDefender() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [playerX, setPlayerX] = useState(400);
  const [bullets, setBullets] = useState<GameObject[]>([]);
  const [enemies, setEnemies] = useState<GameObject[]>([]);
  
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const lastFireTime = useRef(0);

  const gameWidth = 800;
  const gameHeight = 600;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.code]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.code]: false }));
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      // Move player
      setPlayerX((x) => {
        let newX = x;
        if (keys["ArrowLeft"] || keys["KeyA"]) newX -= 7;
        if (keys["ArrowRight"] || keys["KeyD"]) newX += 7;
        return Math.max(20, Math.min(gameWidth - 20, newX));
      });

      // Fire bullets
      if (keys["Space"]) {
        const now = Date.now();
        if (now - lastFireTime.current > 200) { // Fire rate
          setBullets((b) => [...b, { id: now, x: playerX, y: gameHeight - 40 }]);
          lastFireTime.current = now;
        }
      }

      // Move bullets
      setBullets((prev) => 
        prev.map((b) => ({ ...b, y: b.y - 10 })).filter((b) => b.y > 0)
      );

      // Move enemies
      setEnemies((prev) => {
        let newEnemies = prev.map((e) => ({ ...e, y: e.y + 2 })); // Enemy speed
        
        // Check if enemy hit bottom (game over)
        if (newEnemies.some((e) => e.y > gameHeight - 30)) {
          setGameOver(true);
        }

        return newEnemies.filter((e) => e.y <= gameHeight);
      });

    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, keys, playerX]);

  // Enemy Spawner
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const spawnRate = Math.max(500, 2000 - score * 50);
    
    const interval = setInterval(() => {
      setEnemies((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * (gameWidth - 40) + 20, y: 0 }
      ]);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, score]);

  // Collision Detection
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    setBullets((currentBullets) => {
      let bulletsToKeep = [...currentBullets];
      
      setEnemies((currentEnemies) => {
        let enemiesToKeep = [...currentEnemies];
        
        for (let i = bulletsToKeep.length - 1; i >= 0; i--) {
          const b = bulletsToKeep[i];
          for (let j = enemiesToKeep.length - 1; j >= 0; j--) {
            const e = enemiesToKeep[j];
            
            // Simple bounding box collision
            if (
              b.x > e.x - 20 && b.x < e.x + 20 &&
              b.y > e.y - 20 && b.y < e.y + 20
            ) {
              // Hit!
              bulletsToKeep.splice(i, 1);
              enemiesToKeep.splice(j, 1);
              setScore((s) => s + 10);
              break; // bullet destroyed, move to next bullet
            }
          }
        }
        return enemiesToKeep;
      });
      
      return bulletsToKeep;
    });
  }, [bullets, enemies, isPlaying, gameOver]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setPlayerX(400);
    setBullets([]);
    setEnemies([]);
    setKeys({});
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 select-none font-mono">
      <div className="w-full max-w-[800px] mb-4 flex justify-between items-end text-emerald-500">
        <div>
          <Link to="/funny_url_list" className="text-emerald-900 hover:text-emerald-700 text-sm block mb-1">← Archives</Link>
          <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
            <Shield className="w-6 h-6" /> Seal Defender
          </h1>
        </div>
        <div className="text-xl">SCORE: {score.toString().padStart(6, '0')}</div>
      </div>

      <div className="w-full max-w-[800px] h-[600px] bg-zinc-950 relative overflow-hidden border-2 border-emerald-900 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        
        {/* Starfield Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           {Array.from({ length: 50 }).map((_, i) => (
             <div 
               key={i} 
               className="absolute bg-white rounded-full"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 width: `${Math.random() * 3}px`,
                 height: `${Math.random() * 3}px`,
                 opacity: Math.random(),
                 animation: `twinkle ${Math.random() * 3 + 1}s infinite alternate`
               }}
             />
           ))}
        </div>

        {/* Player (AARRKKAA Ship) */}
        <div 
          className="absolute bottom-4 w-10 h-10 flex items-center justify-center text-3xl z-20"
          style={{ left: `${playerX - 20}px` }}
        >
          🚀
        </div>

        {/* Bullets */}
        {bullets.map((b) => (
          <div 
            key={b.id}
            className="absolute w-1 h-4 bg-emerald-400 shadow-[0_0_10px_#34d399] rounded-full z-10"
            style={{ left: `${b.x - 2}px`, top: `${b.y}px` }}
          />
        ))}

        {/* Enemies (Rogue Seals) */}
        {enemies.map((e) => (
          <div 
            key={e.id}
            className="absolute w-8 h-8 flex items-center justify-center text-2xl z-10 animate-spin"
            style={{ left: `${e.x - 16}px`, top: `${e.y - 16}px`, animationDuration: '3s' }}
          >
            🍩
          </div>
        ))}

        {/* UI Overlay */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="text-center text-emerald-500 border border-emerald-900 p-8 bg-black shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              {gameOver ? (
                <>
                  <h2 className="text-4xl font-black mb-4 uppercase text-red-500">Hull Breach</h2>
                  <p className="mb-6">The factory has been overrun by rogue seals.</p>
                  <p className="mb-8 text-2xl">FINAL SCORE: {score}</p>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-black mb-4 uppercase tracking-widest">Seal Defender</h2>
                  <p className="mb-8 text-emerald-700">Defend the factory from defective mechanical seals.</p>
                  <div className="flex gap-8 justify-center mb-8 text-sm">
                    <div>[A] [D] OR ARROWS TO MOVE</div>
                    <div>[SPACE] TO FIRE</div>
                  </div>
                </>
              )}
              
              <button 
                onClick={startGame}
                className="px-8 py-3 bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 font-bold uppercase tracking-widest border border-emerald-500 transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                {gameOver ? 'RETRY' : 'INITIALIZE'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
