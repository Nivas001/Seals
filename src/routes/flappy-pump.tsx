import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/flappy-pump")({
  head: () => ({
    meta: [{ title: "Flappy Pump | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: FlappyPump,
});

const GRAVITY = 0.6;
const JUMP = -8;
const PIPE_SPEED = 3;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;

function FlappyPump() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  const [pumpY, setPumpY] = useState(300);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<{x: number, topHeight: number}[]>([]);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameHeight = 600;
  const gameWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth, 800) : 800;

  const jump = useCallback(() => {
    if (gameOver) return;
    if (!isPlaying) setIsPlaying(true);
    setVelocity(JUMP);
  }, [gameOver, isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Main game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      // Physics
      setPumpY((y) => {
        const newY = y + velocity;
        // Floor collision
        if (newY >= gameHeight - 40) {
          setGameOver(true);
          return gameHeight - 40;
        }
        // Ceiling collision
        if (newY <= 0) {
          return 0;
        }
        return newY;
      });
      setVelocity((v) => v + GRAVITY);

      // Pipes
      setPipes((currentPipes) => {
        // Move pipes
        let newPipes = currentPipes.map(p => ({ ...p, x: p.x - PIPE_SPEED }));
        
        // Remove off-screen pipes and score
        if (newPipes.length > 0 && newPipes[0].x < -PIPE_WIDTH) {
          newPipes.shift();
          setScore(s => s + 1);
        }

        // Add new pipes
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < gameWidth - 300) {
          const minPipeHeight = 50;
          const maxPipeHeight = gameHeight - PIPE_GAP - minPipeHeight;
          const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
          newPipes.push({ x: gameWidth, topHeight });
        }

        return newPipes;
      });
    }, 1000 / 60); // 60fps

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, velocity, gameWidth]);

  // Collision detection
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const pumpRadius = 20;
    const pumpCenterX = 100 + pumpRadius; // Pump is fixed at x=100
    const pumpCenterY = pumpY + pumpRadius;

    for (const pipe of pipes) {
      if (
        pumpCenterX + pumpRadius > pipe.x &&
        pumpCenterX - pumpRadius < pipe.x + PIPE_WIDTH
      ) {
        // Inside x-bounds of pipe
        if (
          pumpCenterY - pumpRadius < pipe.topHeight || // Hit top pipe
          pumpCenterY + pumpRadius > pipe.topHeight + PIPE_GAP // Hit bottom pipe
        ) {
          setGameOver(true);
        }
      }
    }
  }, [pumpY, pipes, isPlaying, gameOver]);

  const resetGame = () => {
    setIsPlaying(false);
    setGameOver(false);
    setScore(0);
    setPumpY(300);
    setVelocity(0);
    setPipes([]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-[800px] mb-4 flex justify-between items-end">
        <div>
          <Link to="/funny_url_list" className="text-zinc-500 hover:text-zinc-300 text-sm block mb-1">← Archives</Link>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Flappy Pump</h1>
        </div>
        <div className="text-4xl font-mono text-amber-500 font-bold">{score}</div>
      </div>

      <div 
        ref={gameAreaRef}
        className="w-full max-w-[800px] h-[600px] bg-zinc-800 relative overflow-hidden rounded-xl border-4 border-zinc-700 shadow-2xl cursor-pointer"
        onMouseDown={jump}
        onTouchStart={jump}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#52525b 1px, transparent 1px), linear-gradient(90deg, #52525b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* The Pump (Player) */}
        <div 
          className="absolute w-10 h-10 left-[100px] transition-transform duration-75 flex items-center justify-center text-3xl z-20"
          style={{ 
            top: `${pumpY}px`, 
            transform: `rotate(${Math.min(Math.max(velocity * 4, -45), 90)}deg)` 
          }}
        >
          ⚙️
        </div>

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <div key={i}>
            {/* Top Pipe */}
            <div 
              className="absolute bg-emerald-600 border-4 border-emerald-800 rounded-b-md z-10"
              style={{
                left: `${pipe.x}px`,
                top: 0,
                width: `${PIPE_WIDTH}px`,
                height: `${pipe.topHeight}px`
              }}
            >
              <div className="absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-6 bg-emerald-500 border-4 border-emerald-800 rounded-sm" />
            </div>
            
            {/* Bottom Pipe */}
            <div 
              className="absolute bg-emerald-600 border-4 border-emerald-800 rounded-t-md z-10"
              style={{
                left: `${pipe.x}px`,
                top: `${pipe.topHeight + PIPE_GAP}px`,
                width: `${PIPE_WIDTH}px`,
                height: `${gameHeight - (pipe.topHeight + PIPE_GAP)}px`
              }}
            >
              <div className="absolute top-0 left-[-4px] w-[calc(100%+8px)] h-6 bg-emerald-500 border-4 border-emerald-800 rounded-sm" />
            </div>
          </div>
        ))}

        {/* Start / Game Over Screen */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-xl max-w-sm w-full text-center shadow-2xl">
              {gameOver ? (
                <>
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-black text-white mb-2 uppercase">Catastrophic Failure</h2>
                  <p className="text-zinc-400 mb-6">Pumps are not meant to fly. Score: <span className="text-amber-500 font-bold">{score}</span></p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4">⚙️</div>
                  <h2 className="text-2xl font-black text-white mb-2 uppercase">Flappy Pump</h2>
                  <p className="text-zinc-400 mb-6">Click or press Space to fly. Dodge the industrial piping.</p>
                </>
              )}
              
              <button 
                onClick={(e) => { e.stopPropagation(); resetGame(); }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {gameOver ? 'Try Again' : 'Start Motor'}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-zinc-500 text-sm font-mono text-center">
        Tip: Don't let the pump crash into the pipes.
      </div>
    </div>
  );
}
