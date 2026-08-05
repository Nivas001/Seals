import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export const Route = createFileRoute("/418")({
  head: () => ({
    meta: [{ title: "418 I'm a teapot | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: TeapotEasterEgg,
});

function TeapotEasterEgg() {
  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#4a3f35] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative"
      >
        {/* Steam */}
        <motion.div 
          animate={{ opacity: [0, 0.5, 0], y: [0, -30], x: [0, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-transparent to-[#4a3f35]/20 blur-sm rounded-full"
        />
        <Coffee className="w-48 h-48 sm:w-64 sm:h-64 text-[#d97706] drop-shadow-2xl" strokeWidth={1.5} />
      </motion.div>

      <h1 className="mt-12 text-6xl sm:text-8xl font-black font-display tracking-tight text-[#1c1b18]">
        418
      </h1>
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold">I'm a teapot</h2>
      
      <p className="mt-6 max-w-md mx-auto text-[#4a3f35]/80 leading-relaxed">
        The server refuses the attempt to brew coffee with a teapot. 
        Please locate the nearest industrial coffee machine to proceed.
      </p>

      <Link 
        to="/" 
        className="mt-10 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1c1b18] text-white font-semibold hover:bg-[#d97706] transition-colors shadow-lg active:scale-95"
      >
        Go find coffee
      </Link>
    </div>
  );
}
