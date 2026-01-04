import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Terminal,
  Server,
  Network,
  Calculator,
  PlusCircle,
  Puzzle,
  Database,
  Cloud,
  Atom,
  Calendar,
  History,
  BookOpen,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers,
  Users,
  CheckCircle2,
} from "lucide-react";

//THINGS TO DO IN THIS PAGE
//NAVIDATING TO WORK PAGES
//FETCHING REVISE TOPICS
//DIFFICULTY LEVEL FETHCING
//HISTORY FETCHING
//PREVIOS YEAR VALENDER FETCHING

const Hero = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  // Mock data for days where work was done (Green markers)
  const workDoneDates = [2, 6, 8, 12, 15, 20, 22, 25, 28];

  const topics = [
    { name: "DSA", icon: <Code2 size={18} />, color: "text-blue-400" },
    {
      name: "My DSA Work",
      icon: <Terminal size={18} />,
      color: "text-purple-400",
    },
    { name: "OS", icon: <Server size={18} />, color: "text-indigo-400" },
    { name: "CN", icon: <Network size={18} />, color: "text-emerald-400" },
    {
      name: "APPTITUDE",
      icon: <Calculator size={18} />,
      color: "text-orange-400",
    },
    {
      name: "Add Today’s Work",
      icon: <PlusCircle size={18} />,
      color: "text-pink-400",
    }, // Index 5
    {
      name: "Extra Modules",
      icon: <Puzzle size={18} />,
      color: "text-yellow-400",
    },
    { name: "SQL", icon: <Database size={18} />, color: "text-cyan-400" },
    { name: "Cloud", icon: <Cloud size={18} />, color: "text-sky-400" },
    { name: "React", icon: <Atom size={18} />, color: "text-blue-500" },
    {
      name: "System Design",
      icon: <Layers size={18} />,
      color: "text-red-400",
    },
    {
      name: "Microservices",
      icon: <Server size={18} />,
      color: "text-green-400",
    },
  ];

  // --- NAVIGATION LOGIC ADDED HERE ---
  const selecttopic = (ind) => {
    // ind 0 = DSA, ind 1 = My DSA Work, ind 5 = Add Today's Work
    if (ind === 0) navigate("/questions", { state: { work: false } });
    else if (ind === 1) navigate("/questions", { state: { work: true } });
    else if (ind === 5) navigate("/add1");
    else navigate("/otherdisp", { state: { topic: topics[ind].name } });
  };

  const difficultyLevels = [
    {
      level: "Hard",
      color: "bg-red-500",
      glow: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
      percentage: "45%",
    },
    {
      level: "Medium",
      color: "bg-yellow-500",
      glow: "shadow-[0_0_8px_rgba(234,179,8,0.5)]",
      percentage: "65%",
    },
    {
      level: "Easy",
      color: "bg-green-500",
      glow: "shadow-[0_0_8px_rgba(34,197,94,0.5)]",
      percentage: "80%",
    },
  ];

  // Calendar Logic
  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Helper to check styling for a specific day
  const getDayStyle = (day) => {
    if (day === 4 && currentDate.getMonth() === 0) {
      return "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400";
    }
    if (workDoneDates.includes(day)) {
      return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]";
    }
    return "text-gray-500 hover:bg-white/5";
  };

  return (
    <div className="h-screen w-full bg-[#0a0a0c] text-white p-6 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-5 px-1 shrink-0">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          StudyStream Analytics
        </h1>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">
            Active Session
          </span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* COL 1: TOPICS LIST (Left - Span 4) */}
        <div className="lg:col-span-4 h-full min-h-0">
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4 text-indigo-400 shrink-0">
              <BookOpen size={20} />
              <h2 className="font-semibold text-sm uppercase tracking-wider">
                Quick Modules
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  onClick={() => selecttopic(i)} // --- CLICK HANDLER ADDED HERE ---
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-xl bg-black/40 ${topic.color}`}
                    >
                      {topic.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                      {topic.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COL 2: CALENDAR & REVISE TOPICS (Middle - Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full min-h-0">
          {/* Calendar Section (Reduced Height: 45%) */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col h-[45%] relative overflow-hidden">
            <div className="flex justify-between items-center mb-3 shrink-0">
              <div className="flex items-center gap-2 text-indigo-400">
                <Calendar size={18} />
                <h2 className="font-semibold text-sm uppercase">Calendar</h2>
              </div>
              <div className="flex gap-2 items-center bg-black/20 rounded-lg p-1">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1 hover:text-white text-gray-400"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold w-24 text-center">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1 hover:text-white text-gray-400"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center flex-1 content-start">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span
                  key={d}
                  className="text-[10px] text-gray-600 font-bold h-6 flex items-center justify-center"
                >
                  {d}
                </span>
              ))}
              {blanks.map((b, i) => (
                <div key={`b-${i}`} className="h-8"></div>
              ))}
              {days.map((d) => (
                <div
                  key={d}
                  className={`h-8 w-full flex items-center justify-center rounded-lg text-xs transition-all cursor-pointer ${getDayStyle(
                    d
                  )}`}
                >
                  {d}
                </div>
              ))}
            </div>
          </section>

          {/* Revise Topics (Increased Height: 55%) */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[55%] flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3 text-purple-400 shrink-0">
              <Atom size={18} />
              <h2 className="font-semibold text-sm uppercase">Revise Topics</h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {[
                "Linked List Reversal",
                "Binary Tree Search",
                "SQL Joins",
                "React UseEffect",
                "System Design Basics",
                "Graph Algorithms",
                "Dynamic Programming",
                "OS Scheduling",
              ].map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full shrink-0 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-shadow"></div>
                  <span className="text-xs text-gray-300 truncate group-hover:text-white">
                    {topic}
                  </span>
                  <CheckCircle2
                    size={12}
                    className="ml-auto text-gray-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl text-[10px] font-bold transition-all shrink-0">
              START REVISION SESSION
            </button>
          </section>
        </div>

        {/* COL 3: DIFFICULTY, FEATURES, HISTORY (Right - Span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full min-h-0">
          {/* Difficulty */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 shrink-0">
            <div className="flex items-center gap-2 mb-4 text-orange-400">
              <BarChart3 size={16} />
              <h2 className="font-semibold text-xs uppercase">Difficulty</h2>
            </div>
            <div className="space-y-4">
              {difficultyLevels.map((item) => (
                <div key={item.level} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${item.color} ${item.glow}`}
                      ></div>
                      <span className="text-[10px] text-gray-400">
                        {item.level}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: item.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature Things */}
          <section className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/20 rounded-3xl p-5 flex-1 flex flex-col justify-center min-h-0">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-orange-500/10 rounded text-orange-400 shrink-0">
                  <Zap size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-200">
                    Spaced Repetition
                  </h3>
                  <p className="text-[10px] text-gray-500">Very Powerful 🔥</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-500/10 rounded text-blue-400 shrink-0">
                  <Code2 size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-200">
                    Code-Only Mode
                  </h3>
                  <p className="text-[10px] text-gray-500">For DSA / SQL</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-pink-500/10 rounded text-pink-400 shrink-0">
                  <Users size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-200">
                    Social Features
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    Compete with friends
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Previous Activity */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 h-[30%] flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 shrink-0">
              <History size={16} />
              <h2 className="font-semibold text-xs uppercase">History</h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-black/20 border border-white/5 flex justify-between items-center group hover:bg-black/40"
                >
                  <span className="text-[11px] text-gray-400 italic">
                    Completed Module {i}
                  </span>
                  <span className="text-[9px] text-gray-600">{i}h ago</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
      `,
        }}
      />
    </div>
  );
};

export default Hero;
