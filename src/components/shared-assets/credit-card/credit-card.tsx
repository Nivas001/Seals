import React from "react";
import { cn } from "@/lib/utils";

type CardType = "brand-dark" | "gradient-strip" | "apple-titanium" | "glass";

interface CreditCardProps {
  type?: CardType;
  company: string;
  cardNumber: string;
  cardHolder: string;
  cardExpiration: string;
  showMastercard?: boolean;
  className?: string;
}

export default function CreditCard({
  type = "brand-dark",
  company,
  cardNumber,
  cardHolder,
  cardExpiration,
  showMastercard = false,
  className,
}: CreditCardProps) {
  // Define styles based on the type
  const typeStyles: Record<CardType, string> = {
    "brand-dark":
      "bg-gradient-to-br from-[#1c1c1e] to-[#000000] text-white border border-[#333336] shadow-2xl shadow-black/40",
    "gradient-strip":
      "bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7] shadow-xl shadow-black/5 overflow-hidden",
    "apple-titanium":
      "bg-gradient-to-br from-[#d4d4d8] via-[#e4e4e7] to-[#a1a1aa] text-[#1d1d1f] border border-[#f4f4f5] shadow-xl shadow-black/10",
    glass:
      "bg-white/10 backdrop-blur-xl text-white border border-white/20 shadow-2xl shadow-black/20",
  };

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[340px] flex-col justify-between rounded-2xl p-6 transition-transform duration-500 hover:scale-[1.02] sm:max-w-[380px] h-[220px] sm:h-[240px]",
        typeStyles[type],
        className
      )}
    >
      {/* Background elements for specific styles */}
      {type === "gradient-strip" && (
        <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#FF9500] via-[#FF2D55] to-[#5856D6]" />
      )}
      {type === "glass" && (
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/30 blur-3xl" />
      )}

      {/* Top section: Company & Contactless */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-display text-lg font-semibold tracking-tight">
          {company}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          <path
            d="M8.5 6C11 8.5 11 15.5 8.5 18M12 4.5C15.5 8 15.5 16 12 19.5M15.5 3C20 8.5 20 15.5 15.5 21"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Middle section: Chip */}
      <div className="relative z-10 mt-4">
        <div className="h-10 w-12 rounded-md border border-current/20 opacity-80 mix-blend-overlay flex flex-col justify-evenly px-1">
          <div className="h-[1px] w-full bg-current/20" />
          <div className="h-[1px] w-full bg-current/20" />
          <div className="h-[1px] w-full bg-current/20" />
        </div>
      </div>

      {/* Bottom section: Details */}
      <div className="relative z-10 mt-auto flex flex-col gap-3">
        <div className="font-mono text-xl tracking-[0.15em] opacity-90 sm:text-2xl">
          {cardNumber}
        </div>
        <div className="flex items-end justify-between opacity-70">
          <div className="flex flex-col">
            <div className="text-[10px] font-medium tracking-widest uppercase opacity-60 mb-0.5">Cardholder</div>
            <div className="text-xs font-semibold tracking-widest uppercase">
              {cardHolder}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-medium tracking-widest uppercase opacity-60 mb-0.5">Expires</div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest">
                {cardExpiration}
              </span>
              {showMastercard && (
                <div className="flex items-center -mr-1">
                  <div className="h-6 w-6 rounded-full bg-[#EB001B] mix-blend-multiply opacity-90" />
                  <div className="h-6 w-6 rounded-full bg-[#F79E1B] mix-blend-multiply -ml-2.5 opacity-90" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
