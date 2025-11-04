import React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="top-center"
      expand
      richColors
      closeButton
      duration={4000}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="w-4 h-4 text-green-400" />,
        info: <InfoIcon className="w-4 h-4 text-blue-400" />,
        warning: <TriangleAlertIcon className="w-4 h-4 text-amber-400" />,
        error: <OctagonXIcon className="w-4 h-4 text-rose-400" />,
        loading: (
          <Loader2Icon className="w-4 h-4 animate-spin text-indigo-400" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "bg-[#0b0f1a]/90 backdrop-blur-xl border border-indigo-500/40 text-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.4)] rounded-xl px-4 py-3 transition-all duration-300",
          title: "text-indigo-300 font-semibold tracking-wide",
          description: "text-gray-400 text-sm",
          icon: "opacity-90",
          success: "border-green-400/40",
          error: "border-rose-500/40",
          warning: "border-amber-400/40",
          info: "border-blue-400/40",
        },
      }}
      style={{
        "--normal-bg": "rgba(15, 23, 42, 0.95)",
        "--normal-text": "#e2e8f0",
        "--normal-border": "rgba(99, 102, 241, 0.4)",
        "--border-radius": "12px",
      }}
      {...props}
    />
  );
};

export { Toaster };
