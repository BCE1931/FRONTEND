import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Calendar,
  Bookmark,
  BarChart2,
  Zap,
  X,
  User,
  LogOut,
  CreditCard,
  Settings,
  ChevronUp,
  ClipboardCheck,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check login status based on token presence
  const isLoggedIn = !!localStorage.getItem("token");

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Ensure token is removed
    localStorage.removeItem("username");
    localStorage.removeItem("typeData");
    localStorage.removeItem("updatedThing");
    navigate("/");
    setIsDropdownOpen(false);
  };

  const menuItems = [
    { id: "modules", label: "Modules", icon: <Grid size={18} /> },
    { id: "activity", label: "Activity", icon: <Calendar size={18} /> },
    { id: "important", label: "Revision", icon: <Bookmark size={18} /> },
    { id: "stats", label: "Analytics", icon: <BarChart2 size={18} /> },
    { id: "exams", label: "Examinations", icon: <ClipboardCheck size={18} /> },
  ];

  return (
    <>
      <aside
        className={`
            fixed md:static inset-y-0 left-0 z-50
            w-64 h-full bg-[#0f1117] border-r border-white/5
            flex flex-col transition-transform duration-300 ease-in-out
            ${
              isOpen
                ? "translate-x-0 shadow-2xl"
                : "-translate-x-full md:translate-x-0"
            }
        `}
      >
        {/* Top Header Area */}
        <div className="flex items-center justify-between p-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              S
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              StudyStream
            </span>
          </div>

          {/* CLOSE BUTTON (Mobile Only) */}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                            ${
                              isActive
                                ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                            }
                        `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* --- BOTTOM SECTION --- */}
        <div className="p-4 mt-auto space-y-4">
          {/* Pro Plan Card (Streak) */}
          {/* <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/5 shadow-inner shadow-black/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">Pro Plan</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden mb-1">
              <div className="w-[70%] h-full bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400">12 Day Streak</p>
          </div> */}

          {/* User Profile / Login Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 border border-white/10 group-hover:border-white/20">
                <User size={18} />
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-bold text-slate-200 truncate">
                  {isLoggedIn
                    ? localStorage.getItem("username") || "Student"
                    : "Guest"}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {isLoggedIn ? "View Profile" : "Click to Sign In"}
                </p>
              </div>
              <ChevronUp
                size={16}
                className={`text-slate-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1a1d26] border border-white/10 rounded-xl shadow-xl shadow-black/50 overflow-hidden py-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                {isLoggedIn ? (
                  <>
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
                    className="w-full text-left px-4 py-2.5 text-sm text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 flex items-center gap-2 transition-colors font-semibold"
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
