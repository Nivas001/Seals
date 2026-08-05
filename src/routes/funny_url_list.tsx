import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderLock, ExternalLink, Terminal, AlertTriangle, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/funny_url_list")({
  head: () => ({
    meta: [{ title: "Classified Archives | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: ClassifiedArchive,
});

const EASTER_EGGS = [
  { group: "Developer Fun", items: [
    { name: "Git Blame Disaster", path: "/git-blame", desc: "Historical record of catastrophic code deployments." },
    { name: "Error 418", path: "/418", desc: "The server refuses to brew coffee." },
    { name: "System Override", path: "/override", desc: "Emergency developer coolant terminal." },
  ]},
  { group: "Product Fun", items: [
    { name: "Unobtainium Pump", path: "/products/pumps/quantum-slurry-hyper-pump", desc: "Forged in a dying star. Pumping impossible physics." },
    { name: "Anti-Gravity Bearing", path: "/products/bearings/anti-gravity-bearing", desc: "Repels the Earth. Do not unbox outdoors." },
    { name: "Industrial Flubber", path: "/products/elastomers/flubber", desc: "Infinite coefficient of restitution." },
  ]},
  { group: "Public Fun", items: [
    { name: "DO NOT PUSH", path: "/do-not-push", desc: "A giant red button. Seriously, do not push it." },
    { name: "Project D.U.C.K.", path: "/stress-test", desc: "Advanced aerodynamic 3D modeling." },
    { name: "The Pump Matrix", path: "/matrix", desc: "Digital rain, but make it industrial." },
  ]},
  { group: "Interactive Games", items: [
    { name: "Whack-a-Leak", path: "/whack-a-leak", desc: "Stop the pipes from flooding the facility!" },
    { name: "Flappy Pump", path: "/flappy-pump", desc: "Pumps aren't meant to fly, but here we are." },
    { name: "Forklift Sim", path: "/forklift-sim", desc: "Warehouse organization with broken physics." },
    { name: "Rogue AI", path: "/rogue-ai", desc: "Customer support bot having an existential crisis." },
    { name: "Seal Defender", path: "/seal-defender", desc: "Defend the factory from defective seals in space." },
  ]}
];

function ClassifiedArchive() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-mono p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12 border-b border-zinc-800 pb-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <FolderLock className="w-12 h-12 text-red-600" />
            <div>
              <h1 className="text-3xl font-black tracking-widest text-white uppercase">Classified Archives</h1>
              <p className="text-zinc-500 mt-1 uppercase tracking-widest text-xs">AARRKKAA Internal Server // Level 9 Clearance Required</p>
            </div>
          </div>
          <div className="bg-red-950/30 border border-red-900/50 p-4 rounded text-sm text-red-400 flex gap-3 mt-8">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p>WARNING: The following directory contains unsanctioned, experimental, and highly volatile URL endpoints. Proceed with extreme caution.</p>
          </div>
        </header>

        <div className="space-y-12">
          {EASTER_EGGS.map((category, idx) => (
            <motion.section 
              key={category.group}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" />
                {category.group}
              </h2>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className="group relative block p-5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="mb-3">
                      <Fingerprint className="w-6 h-6 text-zinc-600 group-hover:text-red-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">{item.desc}</p>
                    <code className="text-[10px] bg-black px-2 py-1 rounded text-zinc-400 break-all">
                      {item.path}
                    </code>
                  </Link>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

      </div>
    </div>
  );
}
