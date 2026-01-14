import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Terminal,
  Server,
  Network,
  Calculator,
  Plus,
  Puzzle,
  Database,
  Cloud,
  Atom,
  Layers,
  BrainCircuit,
  Sparkles,
  PenTool,
  Shield,
  Container,
  Cpu,
  FlaskConical,
  GitBranch,
  ArrowRight,
} from "lucide-react";

const QuickModules = () => {
  const navigate = useNavigate();

  // Expanded to 16 items to create 4 full rows (4x4 grid)
  const topics = [
    // {
    //   name: "DSA",
    //   id: "dsa",
    //   icon: <Code2 className="text-white" />,
    //   gradient: "from-blue-500 to-blue-600",
    // },
    {
      name: "Dsa",
      id: "my-work",
      icon: <Code2 className="text-white" />,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "AIML",
      id: "ai",
      icon: <Cpu className="text-white" />,
      gradient: "from-fuchsia-500 to-fuchsia-600",
    },

    {
      name: "OS",
      id: "os",
      icon: <Server className="text-white" />,
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Networks",
      id: "cn",
      icon: <Network className="text-white" />,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Aptitude",
      id: "apt",
      icon: <Calculator className="text-white" />,
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Extra",
      id: "extra",
      icon: <Puzzle className="text-white" />,
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      name: "SQL",
      id: "sql",
      icon: <Database className="text-white" />,
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Cloud",
      id: "cloud",
      icon: <Cloud className="text-white" />,
      gradient: "from-sky-500 to-sky-600",
    },
    {
      name: "React",
      id: "react",
      icon: <Atom className="text-white" />,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      name: "Design",
      id: "design",
      icon: <Layers className="text-white" />,
      gradient: "from-rose-500 to-red-600",
    },
    {
      name: "Micro",
      id: "micro",
      icon: <Server className="text-white" />,
      gradient: "from-green-500 to-emerald-600",
    },

    // NEW MODULES TO FILL PAGE

    {
      name: "Git",
      id: "git",
      icon: <GitBranch className="text-white" />,
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const handleNavigation = (topic) => {
    if (topic.name === "DSA")
      navigate("/questions", { state: { work: false } });
    else if (topic.name === "My Work")
      navigate("/questions", { state: { work: true } });
    else navigate("/otherdisp", { state: { topic: topic.name } });
  };

  return (
    <div className="pb-10 space-y-8">
      {/* --- SECTION 1: EXPANDED FEATURED BLOCKS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Block 1: Log Today's Work */}
        <div
          onClick={() => navigate("/add1")}
          className="group relative p-8 bg-[#1a1d26] hover:bg-[#20242f] rounded-[32px] border border-white/5 hover:border-pink-500/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-pink-900/10 flex flex-col justify-between min-h-[220px]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PenTool className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Log Work</h3>
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mt-1">
                  Daily Tracker
                </p>
              </div>
            </div>
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-pink-50/20 transition-colors">
              <ArrowRight
                className="text-slate-400 group-hover:text-pink-400"
                size={20}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              Consistency is the key to mastery. You have logged work for{" "}
              <span className="text-white font-bold">12 days</span> in a row.
              Don't break the chain now!
            </p>
          </div>

          {/* Visual Progress Bar */}
          {/* <div className="mt-auto pt-4">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              <span>Daily Goal</span>
              {/* <span>85%</span> */}
          {/* </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 w-[85%] rounded-full"></div>
            </div>
          </div> */}
        </div>

        {/* Block 2: AI Examination Mode */}
        <div
          onClick={() => navigate("/ai-exam")}
          className="group relative p-8 bg-[#1a1d26] hover:bg-[#20242f] rounded-[32px] border border-white/5 hover:border-violet-500/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-violet-900/10 flex flex-col justify-between min-h-[220px]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                <BrainCircuit className="text-white relative z-10" size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-white">AI Exam</h3>
                  <span className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-[10px] font-bold border border-violet-500/30">
                    BETA
                  </span>
                </div>
                <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mt-1">
                  Mock Interview
                </p>
              </div>
            </div>
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-violet-500/20 transition-colors">
              <Sparkles
                className="text-slate-400 group-hover:text-violet-400"
                size={20}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              Test your knowledge with adaptive AI questions tailored to your
              weak spots. Get instant feedback and improve faster.
            </p>
          </div>

          {/* Action Button Visual */}
          <div className="mt-auto pt-4">
            <button className="w-full py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider group-hover:bg-violet-600 group-hover:text-white group-hover:border-transparent transition-all">
              Start Session
            </button>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: FULL MODULE GRID (Balanced) --- */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 ml-1">
          Learning Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, i) => (
            <div
              key={i}
              onClick={() => handleNavigation(topic)}
              className="group relative p-5 bg-[#1a1d26] hover:bg-[#20242f] rounded-[24px] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-black/20"
            >
              <div className="flex flex-col h-full gap-4">
                {/* Top: Icon Box */}
                <div className="flex justify-between items-start">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg`}
                  >
                    {React.cloneElement(topic.icon, { size: 24 })}
                  </div>
                </div>

                {/* Bottom: Text */}
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-white tracking-tight">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 group-hover:text-slate-400 transition-colors">
                    View Module
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickModules;
