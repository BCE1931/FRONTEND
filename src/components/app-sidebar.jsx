import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronUp,
  User,
  LogOut,
  CreditCard,
  Github,
  Zap,
  LayoutGrid,
} from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Login Logic ---
  const username = localStorage.getItem("username") || "Student";
  // We check for token as per your request, or fallback to username existence
  const isLoggedIn =
    !!localStorage.getItem("token") ||
    (localStorage.getItem("username") &&
      localStorage.getItem("username").trim() !== "");

  // --- Close Dropdown on Click Outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("typeData");
    localStorage.removeItem("updatedThing");
    navigate("/");
    setIsDropdownOpen(false);
  };

  const handleNavigation = (ind, topicName) => {
    if (ind === 0) navigate("/questions", { state: { work: false } });
    else if (ind === 1) navigate("/questions", { state: { work: true } });
    else if (ind === 5) navigate("/add1");
    else navigate("/otherdisp", { state: { topic: topicName } });
  };

  // --- Topics Data ---
  const topics = [
    { name: "DSA", icon: "💻" },
    { name: "My DSA Work", icon: "📘" },
    { name: "OS", icon: "🖥️" },
    { name: "CN", icon: "🌐" },
    { name: "APPTITUDE", icon: "🧮" },
    { name: "Add Today’s Work", icon: "➕" },
    { name: "Extra Modules", icon: "🧩" },
    { name: "SQL", icon: "🗄️" },
    { name: "Cloud", icon: "☁️" },
    { name: "React", icon: "⚛️" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0f1117] border-r border-white/5 flex flex-col shrink-0 font-sans selection:bg-blue-500/30">
      {/* 1. Header / Logo */}
      <div className="flex items-center gap-3 p-6 mb-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
          S
        </div>
        <span className="font-bold text-lg text-white tracking-tight">
          StudyStream
        </span>
      </div>

      {/* 2. Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-6">
        {/* Topics Group */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            Topics
          </h3>
          <nav className="space-y-1">
            {topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index, topic.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group text-left"
              >
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                  {topic.icon}
                </span>
                <span>{topic.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Resources Group */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            Resources
          </h3>
          <a
            href="https://github.com/BCE1931/SUMMARY-LLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group"
          >
            <Github size={18} />
            <span>GitHub Code</span>
          </a>
        </div>
      </div>

      {/* 3. Footer Section */}
      <div className="p-4 mt-auto space-y-4 bg-[#0f1117] border-t border-white/5">
        {/* Optional Pro Plan Badge */}
        <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5 shadow-inner shadow-black/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold text-white uppercase">
              Pro Plan
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden mb-1">
            <div className="w-[70%] h-full bg-blue-500 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-500">12 Day Streak</p>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors border border-transparent 
                ${
                  isDropdownOpen
                    ? "bg-white/5 border-white/5"
                    : "hover:bg-white/5"
                }`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 border border-white/10">
              <User size={16} />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-bold text-slate-200 truncate">
                {isLoggedIn ? username : "Guest"}
              </p>
            </div>
            <ChevronUp
              size={16}
              className={`text-slate-500 transition-transform ${
                isDropdownOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden py-1 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-white truncate">
                      {username}
                    </p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                    <User size={16} />
                    <span>Account</span>
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                    <CreditCard size={16} />
                    <span>Billing</span>
                  </button>
                  <div className="h-px bg-white/5 my-1 mx-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="w-full text-left px-4 py-2.5 text-sm text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 flex items-center gap-2 transition-colors font-bold"
                >
                  <User size={16} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2d3748;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a5568;
        }
      `}</style>
    </aside>
  );
}
