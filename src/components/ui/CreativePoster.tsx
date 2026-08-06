import { Hexagon, Settings, Zap, Cpu, Activity, CircleDashed } from "lucide-react";

const ICONS = [Hexagon, Settings, Zap, Cpu, Activity, CircleDashed];
const GRADIENTS = [
  "from-amber-400/20 via-brass/10 to-transparent",
  "from-emerald-500/10 via-teal-500/5 to-transparent",
  "from-blue-500/10 via-indigo-500/5 to-transparent",
  "from-rose-500/10 via-pink-500/5 to-transparent",
  "from-purple-500/10 via-fuchsia-500/5 to-transparent",
  "from-zinc-500/20 via-slate-500/10 to-transparent",
];

export function CreativePoster({ title, className = "" }: { title: string; className?: string }) {
  // Use a simple hash of the title to deterministically pick an icon and gradient
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const Icon = ICONS[hash % ICONS.length];
  const gradient = GRADIENTS[hash % GRADIENTS.length];

  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-surface ${className}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
      
      {/* Tech Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <div className="relative z-10 flex flex-col items-center text-center p-4">
        <div className="mb-3 rounded-xl border border-hairline bg-background/50 p-3 shadow-sm backdrop-blur-sm">
          <Icon className="h-8 w-8 text-brass/70" />
        </div>
        
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
          Image Not Available
        </span>
        <h4 className="mt-1 font-display text-sm font-bold tracking-tight text-ink opacity-80 line-clamp-2">
          {title}
        </h4>
      </div>
    </div>
  );
}
