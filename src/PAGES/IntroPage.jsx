import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { IconCloud } from "@/components/ui/icon-cloud"; // ✅ Corrected for your structure

// ✅ Tech Stack logos
const slugs = [
  // "typescript",
  "javascript",
  // "dart",
  "java",
  "react",
  // "flutter",
  // "android",
  "html5",
  "css3",
  "nodedotjs",
  // "express",
  // "nextdotjs",
  // "prisma",
  "amazonaws",
  // "postgresql",
  // "firebase",
  // "nginx",
  "vercel",
  // "testinglibrary",
  // "jest",
  // "cypress",
  "docker",
  "git",
  // "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  // "sonarqube",
  "figma",
];

// ✅ Social icons
const Icons = {
  email: (props) => <MailIcon {...props} />,
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
      />
    </svg>
  ),
  x: (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932Z"
      />
    </svg>
  ),
  github: (props) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8..."
      />
    </svg>
  ),
};

// ✅ Social links data
const SOCIALS = {
  GitHub: { name: "GitHub", url: "#", icon: Icons.github },
  LinkedIn: { name: "LinkedIn", url: "#", icon: Icons.linkedin },
  X: { name: "X", url: "#", icon: Icons.x },
  Email: { name: "Send Email", url: "#", icon: Icons.email },
};

export default function IntroPage() {
  const navigate = useNavigate();
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white px-6 md:px-20">
      {/* 🧠 LEFT SIDE: Project Title + Buttons + Socials */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:w-1/2">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
          ReviScroll <br />
          Your Personalized Learning Feed
        </h1>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <ShimmerButton
            onClick={() => navigate("/signin")}
            className="px-8 py-3 shadow-2xl hover:opacity-90 transition-all duration-200"
          >
            <span className="text-center text-sm font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
              Sign In
            </span>
          </ShimmerButton>

          <ShimmerButton
            onClick={() => navigate("/signup")}
            className="px-8 py-3 shadow-2xl hover:opacity-90 transition-all duration-200"
          >
            <span className="text-center text-sm font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
              Sign Up
            </span>
          </ShimmerButton>
        </div>

        {/* Social Dock */}
        <TooltipProvider>
          <Dock direction="middle">
            {Object.entries(SOCIALS).map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <social.icon className="size-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>

      {/* ⚙️ RIGHT SIDE: Icon Cloud */}
      <div className="flex items-center justify-center mt-10 md:mt-0 md:w-1/2">
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
          <IconCloud images={images} />
        </div>
      </div>
    </div>
  );
}
