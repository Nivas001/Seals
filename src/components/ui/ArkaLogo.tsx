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
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="AARRKKAA International"
        style={{ height: size }}
        className="object-contain drop-shadow-sm transition-transform duration-300"
      />
    </div>
  );
}

export function ArkaLogoMark(props: ArkaLogoProps) {
  return <ArkaLogo {...props} variant="mark" />;
}
