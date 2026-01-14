import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  BrainCircuit,
  History,
  Sparkles,
  ArrowRight,
  Zap,
  PlusCircle,
  Monitor,
  ChevronDown,
  CheckCircle2,
  Code2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ IMPORTING YOUR ASSETS
import BackgroundImg from "../assets/backdroung_image.png";

import MobileFeedImg from "../assets/MobileFeedImg.png";
import DesktopStackImg from "../assets/DesktopStackImg.png";
import AnalyticsImg from "../assets/AnalyticsImg.png";
import AddEntryImg from "../assets/AddEntryImg.png";

// --- DATA: SLIDES WITH FULL CONTENT ---
const slides = [
  {
    id: "hero",
    content: (navigate) => (
      <div className="text-center max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-purple-500/50 bg-purple-500/10 backdrop-blur-md text-purple-200 font-semibold text-sm"
        >
          <Sparkles size={16} className="text-yellow-400" />
          <span>v1.0 is Live</span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-none text-white drop-shadow-2xl">
          Stop Studying. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Start Scrolling.
          </span>
        </h1>

        <p className="text-xl md:text-3xl text-zinc-300 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
          ReviScroll turns your boring notes into an <b>addictive feed</b>.{" "}
          <br />
          Upload, swipe, and let our <b>AI Logic Checker</b> grade your
          understanding.
        </p>

        <div className="flex justify-center gap-6 pt-8">
          <Button
            onClick={() => navigate("/signup")}
            className="h-16 px-12 text-xl bg-white text-black hover:scale-105 transition-transform rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Get Started <Zap className="ml-2 fill-black" />
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            variant="outline"
            className="h-16 px-12 text-xl border-zinc-400 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 rounded-full"
          >
            Log In
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "mobile",
    content: () => (
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto w-full px-6">
        <div className="flex-1 space-y-8 text-left">
          {/* CHANGED COLOR TO SKY BLUE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold uppercase tracking-widest text-sm backdrop-blur-md">
            <Smartphone size={16} /> Infinite Mobile Feed
          </div>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Your Notes. <br />
            <span className="text-sky-500">Reimagined as Reels.</span>
          </h2>

          <p className="text-xl text-zinc-200 leading-relaxed">
            Why should Instagram have all the fun? We convert your static text
            into a vibrant, vertical scroll. Filter by 'DSA', 'Math', or 'Cloud'
            and swipe your way to mastery on mobile.
          </p>

          <ul className="space-y-4 text-lg">
            {[
              "Vertical Swipe UX (Like TikTok/Reels)",
              "Dark Mode Optimized for Late Night Study",
              "Topic Filtering & Search",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="text-sky-500" size={24} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex justify-center relative">
          <div className="absolute inset-0 bg-sky-500/20 blur-[80px] rounded-full pointer-events-none"></div>
          <img
            src={MobileFeedImg}
            className="relative z-10 max-h-[70vh] rounded-3xl border-4 border-zinc-700/50 shadow-2xl"
            alt="Mobile View"
          />
        </div>
      </div>
    ),
  },
  {
    id: "desktop",
    content: () => (
      <div className="flex flex-col md:flex-row-reverse items-center gap-16 max-w-7xl mx-auto w-full px-6">
        <div className="flex-1 space-y-8 text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold uppercase tracking-widest text-sm backdrop-blur-md ml-auto">
            <Monitor size={16} /> Desktop Power Station
          </div>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Split Screen <br />
            <span className="text-indigo-500">Beast Mode.</span>
          </h2>

          <p className="text-xl text-zinc-200 leading-relaxed">
            On laptop? We switch to 'Beast Mode'. View question cards
            side-by-side. Compare algorithms, debug logic, and organize your
            thoughts without tab switching.
          </p>

          <ul className="space-y-4 text-lg flex flex-col items-end">
            {[
              "Drag & Drop Card Interface",
              "Split View for comparing concepts",
              "Optimized for large screens",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-zinc-300 flex-row-reverse"
              >
                <CheckCircle2 className="text-indigo-500" size={24} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex justify-center relative">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>
          <img
            src={DesktopStackImg}
            className="relative z-10 rounded-xl shadow-2xl border border-white/20"
            alt="Desktop View"
          />
        </div>
      </div>
    ),
  },
  {
    id: "ai",
    content: () => (
      <div className="text-center max-w-5xl mx-auto space-y-10 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold uppercase tracking-widest text-sm backdrop-blur-md">
          <BrainCircuit size={16} /> AI Logic Validator
        </div>

        <h2 className="text-5xl md:text-8xl font-black text-white drop-shadow-lg">
          Don't memorize. <br />
          <span className="text-cyan-400">Understand.</span>
        </h2>

        <p className="text-2xl text-zinc-200 max-w-3xl mx-auto leading-relaxed">
          In Exam Mode, we hide the answers. You type your logic, and{" "}
          <span className="text-cyan-400 font-bold">Mistral 7B AI</span>{" "}
          compares it against your original note. It's like having a private
          tutor 24/7.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-lg text-zinc-300">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="text-cyan-400" /> AI Grades Accuracy
            (0-100%)
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="text-cyan-400" /> Highlights Missed
            Keywords
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="text-cyan-400" /> Stores Attempt History
          </span>
        </div>

        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
          className="rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] mx-auto max-h-[35vh] mt-8"
          alt="AI Brain"
        />
      </div>
    ),
  },
  {
    id: "analytics_add",
    content: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto w-full px-6 items-center">
        {/* Analytics Card */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <History className="text-orange-500" size={32} />
            <h3 className="text-3xl font-bold text-white drop-shadow-md">
              Progress Analytics
            </h3>
          </div>
          <p className="text-zinc-200 leading-relaxed text-lg">
            Stop guessing if you are ready. Track your consistency with
            GitHub-style heatmaps.
          </p>
          <ul className="space-y-3 text-zinc-300">
            <li className="flex gap-2 items-center">
              <CheckCircle2 size={20} className="text-orange-500" /> Daily
              Streak Tracking
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 size={20} className="text-orange-500" /> Difficulty
              Level Breakdown
            </li>
          </ul>
          <img
            src={AnalyticsImg}
            className="rounded-xl border border-white/20 w-full shadow-2xl"
            alt="Analytics"
          />
        </div>

        {/* Add Entry Card */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-emerald-500" size={32} />
            <h3 className="text-3xl font-bold text-white drop-shadow-md">
              Rapid Injection
            </h3>
          </div>
          <p className="text-zinc-200 leading-relaxed text-lg">
            Easily add new questions. Tag them by subject, set difficulty, and
            add source material.
          </p>
          <ul className="space-y-3 text-zinc-300">
            <li className="flex gap-2 items-center">
              <CheckCircle2 size={20} className="text-emerald-500" /> Quick Add
              Interface
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 size={20} className="text-emerald-500" /> Tagging
              System (DSA, SQL)
            </li>
          </ul>
          <img
            src={AddEntryImg}
            className="rounded-xl border border-white/20 w-full shadow-2xl"
            alt="Add Entry"
          />
        </div>
      </div>
    ),
  },
  {
    id: "cta",
    content: (navigate) => (
      <div className="text-center max-w-4xl mx-auto p-16">
        {/* REMOVED BLACK BACKGROUND ABOVE */}
        <h2 className="text-5xl md:text-8xl font-black mb-8 text-white drop-shadow-2xl">
          Ready to <br /> Scroll?
        </h2>

        <Button
          onClick={() => navigate("/signup")}
          className="h-24 px-16 text-3xl bg-white text-black hover:scale-110 transition-transform rounded-full font-bold shadow-[0_0_60px_rgba(255,255,255,0.4)]"
        >
          Launch App <ArrowRight className="ml-4" size={40} />
        </Button>

        <div className="flex justify-center gap-10 mt-16 text-zinc-400">
          <Code2 size={28} className="hover:text-white cursor-pointer" />
          <Share2 size={28} className="hover:text-white cursor-pointer" />
          <Monitor size={28} className="hover:text-white cursor-pointer" />
        </div>
        <p className="mt-8 text-zinc-500">
          © 2026 ReviScroll Inc. Vengadamangalam HQ.
        </p>
      </div>
    ),
  },
];

export default function IntroPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isScrollingRef = useRef(false);

  // --- SCROLL HANDLING ---
  const handleScroll = useCallback(
    (event) => {
      if (isScrollingRef.current) return;
      if (Math.abs(event.deltaY) < 30) return;

      if (event.deltaY > 0) {
        if (currentSlide < slides.length - 1) {
          isScrollingRef.current = true;
          setCurrentSlide((prev) => prev + 1);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        }
      } else {
        if (currentSlide > 0) {
          isScrollingRef.current = true;
          setCurrentSlide((prev) => prev - 1);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        }
      }
    },
    [currentSlide]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black font-sans text-white">
      {/* 1. FIXED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={BackgroundImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </div>

      {/* 2. SLIDE CONTENT SWITCHER */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            {slides[currentSlide].content(navigate)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. NAVIGATION DOTS */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full border border-white/20 ${
              currentSlide === index
                ? "bg-purple-500 w-4 h-4 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                : "bg-white/10 w-3 h-3 hover:bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* 4. SCROLL HINT */}
      <AnimatePresence>
        {currentSlide === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-zinc-400 pointer-events-none"
          >
            <span className="text-xs uppercase tracking-widest font-bold">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={32} className="text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
