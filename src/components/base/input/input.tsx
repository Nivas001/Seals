import React from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  tooltip?: string;
  icon?: React.ElementType;
  isRequired?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, hint, tooltip, icon: Icon, isRequired, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {(label || tooltip) && (
          <div className="flex items-center gap-1.5">
            {label && (
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {label} {isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            {tooltip && (
              <span title={tooltip} className="cursor-help text-muted-foreground/60 transition hover:text-muted-foreground">
                <HelpCircle className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-4 text-muted-foreground/60">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <input
            type={type}
            ref={ref}
            required={isRequired}
            className={cn(
              "w-full rounded-full border border-ink/15 bg-background py-3 text-sm text-ink placeholder:text-muted-foreground outline-none transition focus:border-brass/70 focus:ring-2 focus:ring-brass/30",
              Icon ? "pl-11 pr-5" : "px-5",
              className
            )}
            {...props}
          />
        </div>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
