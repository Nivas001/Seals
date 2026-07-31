import React from "react";

export interface ArkaLogoProps {
  size?: number;
  className?: string;
  variant?: "mark" | "full" | "stacked";
}

export function ArkaLogo({
  size = 36,
  className = "",
  variant = "full",
}: ArkaLogoProps) {
  // The new logo is a stacked design with text included.
  // We scale it slightly larger since the height includes the text.
  const adjustedSize = variant === "full" ? size * 1.4 : size;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="AARRKKAA International"
        style={{ height: adjustedSize }}
        className="object-contain drop-shadow-sm transition-transform duration-300"
      />
    </div>
  );
}
