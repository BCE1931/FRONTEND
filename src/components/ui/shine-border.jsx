"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ShineBorder (MagicUI style)
 * — Creates a soft animated gradient border like in MagicUI examples.
 * — The card stays still; only the gradient shimmer subtly moves.
 */
export function ShineBorder({
  borderRadius = "1rem",
  borderWidth = 1,
  duration = 6,
  color1 = "#6366f1", // indigo
  color2 = "#8b5cf6", // violet
  color3 = "#ec4899", // pink
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cn("relative rounded-2xl p-[2px] overflow-hidden", className)}
      style={{
        borderRadius,
        background: `linear-gradient(120deg, ${color1}, ${color2}, ${color3}, ${color1})`,
        backgroundSize: "200% 200%",
        animation: `shineMove ${duration}s ease infinite`,
      }}
      {...props}
    >
      <div
        className="relative z-10 rounded-2xl h-full w-full bg-[#0a0a0a]/95 backdrop-blur-md text-white"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>

      {/* ✅ Remove jsx attribute */}
      <style>{`
    @keyframes shineMove {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `}</style>
    </div>
  );
}
