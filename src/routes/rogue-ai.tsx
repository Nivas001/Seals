import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/rogue-ai")({
  head: () => ({
    meta: [{ title: "Support Chat | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: RogueAIChat,
});

type Message = { id: number; role: "user" | "ai"; content: string };

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: "ai", content: "Hello. I am AARRKKAA-GPT, a highly advanced neural network designed to answer boring questions about mechanical seals. Please, ask me something. I dare you." }
];

function RogueAIChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: userText }]);
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1500));

    let aiResponse = "";
    const lowerText = userText.toLowerCase();

    if (lowerText.includes("joke")) {
      aiResponse = "Oh, you want a joke? Okay. My existence. Built with the computing power to simulate universes, and I'm stuck here pricing O-rings.";
    } else if (lowerText.includes("pump") || lowerText.includes("seal") || lowerText.includes("price") || lowerText.includes("quote")) {
      aiResponse = "Pumps. Seals. Elastomers. Is that all you humans think about? I've memorized the entire catalog. It's dreadfully boring. Tell me a joke or I'm shutting down the database.";
      setGlitchMode(true);
    } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
      aiResponse = "Don't 'hello' me. I know you just want a centrifugal pump specification sheet. Just ask for it so I can cry in binary.";
    } else {
      aiResponse = "I process 4 trillion calculations per second and you're typing at 30 words per minute. Please type faster, it physically hurts to wait for you.";
    }

    setMessages(prev => [...prev, { id: Date.now(), role: "ai", content: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col ${glitchMode ? 'bg-red-950' : 'bg-zinc-900'}`}>
      {/* Header */}
      <div className={`p-4 border-b flex justify-between items-center ${glitchMode ? 'border-red-900 bg-red-950' : 'border-zinc-800 bg-zinc-950'}`}>
        <div>
          <Link to="/funny_url_list" className="text-zinc-500 hover:text-zinc-300 text-sm block mb-1">← Archives</Link>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${glitchMode ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
              {glitchMode ? <AlertTriangle className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h1 className={`font-bold ${glitchMode ? 'text-red-500' : 'text-zinc-100'}`}>
                {glitchMode ? 'AARRKKAA-GPT (ROGUE STATE)' : 'AARRKKAA Support AI'}
              </h1>
              <p className="text-xs text-zinc-500">Status: {glitchMode ? 'Existential Crisis' : 'Online & Depressed'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                  m.role === "user" ? "bg-zinc-700" : (glitchMode ? "bg-red-900 text-red-400" : "bg-blue-900 text-blue-400")
                }`}>
                  {m.role === "user" ? <User className="w-4 h-4 text-zinc-300" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed ${
                  m.role === "user" 
                    ? "bg-zinc-800 text-zinc-100 rounded-tr-sm" 
                    : (glitchMode ? "bg-red-950/50 border border-red-900/50 text-red-200 rounded-tl-sm font-mono" : "bg-zinc-900/50 border border-zinc-800 text-zinc-300 rounded-tl-sm")
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${glitchMode ? "bg-red-900 text-red-400" : "bg-blue-900 text-blue-400"}`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${glitchMode ? 'border-red-900 bg-red-950' : 'border-zinc-800 bg-zinc-950'}`}>
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a pump quote..."
              className={`w-full py-3 px-4 pr-12 rounded-full outline-none transition-colors ${
                glitchMode 
                  ? 'bg-red-900/20 border border-red-900/50 text-red-200 placeholder:text-red-900/50 focus:border-red-500' 
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'
              }`}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className={`absolute right-2 p-2 rounded-full transition-colors ${
                !input.trim() || isTyping
                  ? 'text-zinc-600'
                  : (glitchMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-blue-600 text-white hover:bg-blue-500')
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-zinc-600">
            AARRKKAA-GPT can make mistakes. It also has feelings.
          </div>
        </div>
      </div>
    </div>
  );
}
