import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  X,
  Send,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare,
  Bot,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { CATEGORIES, COMPANY } from "@/data/catalog";
import { slugify } from "@/data/items";

type ProductMatch = {
  name: string;
  categoryName: string;
  categorySlug: string;
  itemSlug: string;
  description: string;
};

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
  contactCard?: boolean;
  products?: ProductMatch[];
  timestamp: string;
};

const QUICK_CHIPS = [
  { label: "📞 Contact a sales person", query: "give me ways to contact the person" },
  { label: "🥛 Hygienic dairy & food pumps", query: "recommend hygienic pumps for food and dairy" },
  { label: "⚙️ Seals for abrasive slurry", query: "what mechanical seals handle abrasive slurry?" },
  { label: "🌡️ FKM vs PTFE temperature limits", query: "explain temperature limits for fkm and ptfe gaskets" },
  { label: "📐 Request CAD drawings & pricing", query: "how do i request a quote or cad drawing?" },
];

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `Hello! I am your AARRKKAA Technical Specialist. Our motto is: "${COMPANY.motto}"\n\nI can assist you with selecting process pumps, mechanical seals, elastomers, or connect you directly with our engineering sales team. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [open, messages, isTyping]);

  // Helper to find products from catalog
  function findProducts(keywords: string[], limit = 3): ProductMatch[] {
    const matches: ProductMatch[] = [];
    for (const cat of CATEGORIES) {
      for (const item of cat.items) {
        const itemLower = item.toLowerCase();
        const catLower = cat.name.toLowerCase();
        const descLower = cat.description.toLowerCase();
        const isHit = keywords.some(
          (kw) =>
            itemLower.includes(kw) ||
            catLower.includes(kw) ||
            descLower.includes(kw),
        );
        if (isHit) {
          matches.push({
            name: item,
            categoryName: cat.name,
            categorySlug: cat.slug,
            itemSlug: slugify(item),
            description: `Engineered ${item} for industrial duty in ${cat.name.toLowerCase()}.`,
          });
          if (matches.length >= limit) return matches;
        }
      }
    }
    return matches;
  }

  // Smart intent processing
  function processUserQuery(queryText: string): {
    reply: string;
    contactCard?: boolean;
    products?: ProductMatch[];
  } {
    const q = queryText.toLowerCase().trim();

    // 1. Contact / Reach / Person / Phone / Email / WhatsApp / Address
    if (
      q.includes("contact") ||
      q.includes("call") ||
      q.includes("phone") ||
      q.includes("tel") ||
      q.includes("email") ||
      q.includes("mail") ||
      q.includes("whatsapp") ||
      q.includes("wa") ||
      q.includes("reach") ||
      q.includes("address") ||
      q.includes("location") ||
      q.includes("where") ||
      q.includes("office") ||
      q.includes("person") ||
      q.includes("human") ||
      q.includes("talk") ||
      q.includes("speak") ||
      q.includes("support") ||
      q.includes("sales") ||
      q.includes("number") ||
      q.includes("connect")
    ) {
      return {
        reply:
          "We offer multiple direct ways to connect with our technical sales engineers. Our team provides fast responses for custom sizing, pricing, and technical inquiries across South India:",
        contactCard: true,
      };
    }

    // 2. Quote / Pricing / CAD Drawings / Order / Buy
    if (
      q.includes("quote") ||
      q.includes("quotation") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("cost") ||
      q.includes("drawing") ||
      q.includes("cad") ||
      q.includes("spec") ||
      q.includes("buy") ||
      q.includes("order") ||
      q.includes("purchase") ||
      q.includes("estimate")
    ) {
      return {
        reply:
          "We provide formal pricing quotations, CAD general arrangement drawings, and custom engineering specifications tailored to your exact duty conditions (pressure, temperature, fluid type).\n\nYou can attach any product directly to our online enquiry form, or reach out to sales immediately:",
        contactCard: true,
      };
    }

    // 3. Pumps
    if (
      q.includes("pump") ||
      q.includes("milk") ||
      q.includes("dosing") ||
      q.includes("slurry") ||
      q.includes("centrifugal") ||
      q.includes("monoblock") ||
      q.includes("fire") ||
      q.includes("vacuum") ||
      q.includes("submersible") ||
      q.includes("gear") ||
      q.includes("split case") ||
      q.includes("axial") ||
      q.includes("flow") ||
      q.includes("head")
    ) {
      const keywords = ["pump", "milk", "dosing", "slurry", "centrifugal", "fire", "vacuum"];
      const hitKws = keywords.filter((kw) => q.includes(kw));
      const products = findProducts(hitKws.length > 0 ? hitKws : ["pump"], 3);
      return {
        reply:
          "AARRKKAA manufactures and supplies heavy-duty process pumps for chemical, food processing, pharma, and utility duties. Here are top recommendations matching your inquiry:",
        products,
      };
    }

    // 4. Mechanical Seals
    if (
      q.includes("seal") ||
      q.includes("spring") ||
      q.includes("cartridge") ||
      q.includes("agitator") ||
      q.includes("bellow") ||
      q.includes("rotary") ||
      q.includes("union") ||
      q.includes("leak") ||
      q.includes("shaft") ||
      q.includes("pusher") ||
      q.includes("balanced")
    ) {
      const keywords = ["seal", "spring", "cartridge", "bellow", "rotary", "agitator"];
      const hitKws = keywords.filter((kw) => q.includes(kw));
      const products = findProducts(hitKws.length > 0 ? hitKws : ["seal", "spring"], 3);
      return {
        reply:
          "We specialize in engineered mechanical seals for pumps, agitators, and reactors—rated for temperatures up to 400°C and pressures up to 60 bar. Here are relevant seal assemblies:",
        products,
      };
    }

    // 5. Elastomers / Gaskets / O-Rings
    if (
      q.includes("gasket") ||
      q.includes("o-ring") ||
      q.includes("o ring") ||
      q.includes("elastomer") ||
      q.includes("fkm") ||
      q.includes("viton") ||
      q.includes("epdm") ||
      q.includes("ptfe") ||
      q.includes("silicone") ||
      q.includes("nbr") ||
      q.includes("rubber") ||
      q.includes("tri-clover") ||
      q.includes("temp") ||
      q.includes("heat") ||
      q.includes("acid") ||
      q.includes("chemical")
    ) {
      const products = findProducts(["gasket", "silicone", "o-ring", "elastomer"], 2);
      return {
        reply:
          "Here is our technical material compatibility guide:\n\n• **FKM (Viton):** High temp up to 200°C+, excellent for oils & aggressive acids.\n• **PTFE:** Universal chemical inertness, cryogenic to 260°C.\n• **EPDM:** Ideal for steam, hot water, alkali, and CIP/SIP loops.\n• **Silicone:** FDA & 3A food/pharma grade high-purity tubing and gaskets.\n\nHere are matching components in our catalog:",
        products,
      };
    }

    // 6. Hoses / Tubing / Pipes / Valves / Fittings / Steel / Bearings
    if (
      q.includes("hose") ||
      q.includes("tube") ||
      q.includes("tubing") ||
      q.includes("pipe") ||
      q.includes("valve") ||
      q.includes("nozzle") ||
      q.includes("coupling") ||
      q.includes("bearing") ||
      q.includes("steel") ||
      q.includes("fitting") ||
      q.includes("nylatron")
    ) {
      const keywords = ["hose", "tube", "valve", "nozzle", "coupling", "bearing", "steel", "nylatron"];
      const hitKws = keywords.filter((kw) => q.includes(kw));
      const products = findProducts(hitKws.length > 0 ? hitKws : ["valve", "hose"], 3);
      return {
        reply:
          "We supply precision engineered fittings, hoses, valves, and mechanical components for demanding process environments. Here are matching catalog items:",
        products,
      };
    }

    // 7. Greeting / About / Motto
    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey") ||
      q.includes("good") ||
      q.includes("who") ||
      q.includes("about") ||
      q.includes("aarrkkaa") ||
      q.includes("motto") ||
      q.includes("help")
    ) {
      return {
        reply: `Hello! Welcome to AARRKKAA International. Our core motto is: "${COMPANY.motto}"\n\nI can help you size pumps, select mechanical seal materials, check chemical compatibility, or connect you with sales. What can I assist you with today?`,
      };
    }

    // 8. Fallback text search across catalog
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    const fallbackProducts = findProducts(words, 3);
    if (fallbackProducts.length > 0) {
      return {
        reply: `I searched our technical catalog for "${queryText}" and found these matching equipment components:`,
        products: fallbackProducts,
      };
    }

    // Absolute fallback -> show contact card
    return {
      reply: `I want to ensure you receive 100% accurate engineering advice for "${queryText}". While I couldn't find an exact match in our standard online catalog, our technical specialists design custom assemblies for specialized process requirements! Let's connect you with an engineer right now:`,
      contactCard: true,
    };
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const res = processUserQuery(userText);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: res.reply,
        contactCard: res.contactCard,
        products: res.products,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  }

  function handleChipClick(queryText: string) {
    if (isTyping) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const res = processUserQuery(queryText);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: res.reply,
        contactCard: res.contactCard,
        products: res.products,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  }

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-3 w-[calc(100vw-32px)] sm:w-[380px] md:w-[400px] h-[520px] max-h-[80vh] rounded-2xl border-2 border-brass/50 bg-surface/95 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden text-ink"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-ink px-4 py-3 text-background border-b border-brass/30">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brass text-ink font-bold shadow-2xs">
                  <Bot className="h-5 w-5 text-ink" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-display text-sm font-bold tracking-tight text-background truncate">
                    <span>AARRKKAA AI Specialist</span>
                    <Sparkles className="h-3.5 w-3.5 text-brass shrink-0 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-background/70 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Online • 100% Accurate Support</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-background/70 hover:bg-white/10 hover:text-background transition-colors"
                aria-label="Close AI Specialist"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-2xs ${
                      msg.sender === "user"
                        ? "bg-ink text-background rounded-br-2xs font-medium"
                        : "bg-background/90 border border-hairline text-ink rounded-bl-2xs font-normal"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Contact Card Render */}
                    {msg.contactCard && (
                      <div className="mt-3 space-y-2 border-t border-hairline pt-3 text-ink font-sans">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brass">
                          Direct Contact Channels
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          <a
                            href={`tel:${COMPANY.phones[0].replace(/\s+/g, "")}`}
                            className="flex items-center gap-2 rounded-xl border border-hairline bg-surface p-2 text-xs font-bold text-ink hover:border-brass hover:bg-brass/10 transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 text-brass shrink-0" />
                            <span className="truncate">{COMPANY.phones[0]}</span>
                          </a>
                          <a
                            href="https://wa.me/917806936475"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                          >
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                            <span>WhatsApp Sales</span>
                          </a>
                        </div>
                        <a
                          href={`mailto:${COMPANY.emails[0]}`}
                          className="flex items-center gap-2 rounded-xl border border-hairline bg-surface p-2 text-xs font-medium text-ink hover:border-brass hover:bg-brass/10 transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5 text-brass shrink-0" />
                          <span className="truncate">{COMPANY.emails[0]}</span>
                        </a>
                        <div className="flex items-start gap-2 rounded-xl bg-surface/60 p-2 text-[11px] text-muted-foreground border border-hairline/60">
                          <MapPin className="h-3.5 w-3.5 text-brass shrink-0 mt-0.5" />
                          <span>Hosur, Tamil Nadu — Branches across South India</span>
                        </div>
                        <Link
                          to="/contact"
                          onClick={() => setOpen(false)}
                          className="mt-1 flex items-center justify-center gap-1.5 w-full rounded-xl bg-brass px-3 py-2 text-xs font-bold text-ink shadow-2xs hover:bg-brass/90 transition-colors"
                        >
                          <span>Open Formal Enquiry Form</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}

                    {/* Recommended Products Render */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-hairline pt-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brass">
                          Matching Equipment
                        </div>
                        <div className="space-y-2">
                          {msg.products.map((prod) => (
                            <div
                              key={prod.name}
                              className="rounded-xl border border-hairline bg-surface/80 p-2.5 hover:border-brass/40 transition-colors"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-display font-bold text-ink truncate text-xs">
                                  {prod.name}
                                </span>
                                <span className="rounded-full bg-brass/15 border border-brass/30 px-2 py-0.5 text-[9px] font-bold text-ink shrink-0">
                                  {prod.categoryName}
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                                {prod.description}
                              </p>
                              <div className="mt-2 flex items-center gap-2 pt-1">
                                <Link
                                  to="/products/$category/$item"
                                  params={{
                                    category: prod.categorySlug,
                                    item: prod.itemSlug,
                                  }}
                                  onClick={() => setOpen(false)}
                                  className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-hairline bg-background py-1 text-[11px] font-bold text-ink hover:border-ink/40 transition-colors"
                                >
                                  <span>View Specs</span>
                                  <ChevronRight className="h-3 w-3" />
                                </Link>
                                <Link
                                  to="/contact"
                                  search={{
                                    product: prod.name,
                                    category: prod.categoryName,
                                  }}
                                  onClick={() => setOpen(false)}
                                  className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-brass/20 border border-brass/40 py-1 text-[11px] font-bold text-ink hover:bg-brass hover:text-ink transition-colors"
                                >
                                  <span>Get Quote ⚡</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="mt-1 px-1 text-[9px] text-muted-foreground/70 font-medium">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1.5 bg-background border border-hairline rounded-2xl px-3.5 py-2.5 w-fit text-muted-foreground text-xs shadow-2xs">
                  <Bot className="h-3.5 w-3.5 text-brass animate-spin" />
                  <span>Searching catalog specifications…</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="border-t border-hairline/60 bg-surface/50 px-3 py-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 w-max">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleChipClick(chip.query)}
                    className="rounded-full border border-hairline bg-background px-2.5 py-1 text-[11px] font-semibold text-ink/80 shadow-2xs hover:border-brass hover:bg-brass/10 hover:text-ink transition-all whitespace-nowrap"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="border-t border-hairline bg-background p-2.5 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pumps, seals, or contact ways…"
                className="flex-1 rounded-xl border border-input bg-surface px-3 py-2 text-xs text-ink placeholder:text-muted-foreground focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-background shadow-2xs hover:bg-ink/85 disabled:opacity-40 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 rounded-full border-2 border-brass bg-ink px-4 py-3 text-background shadow-[0_10px_30px_-5px_rgba(217,119,6,0.4)] transition-all hover:bg-ink/90 hover:shadow-[0_15px_35px_-5px_rgba(217,119,6,0.6)]"
        aria-label="Toggle AI Technical Specialist Chatbot"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-brass text-ink font-bold shadow-2xs">
          {open ? <X className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5 animate-pulse" />}
        </span>
        <span className="text-xs font-bold tracking-wide uppercase text-background">
          {open ? "Close Assistant" : "AI Specialist"}
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brass"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
