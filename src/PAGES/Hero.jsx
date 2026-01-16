import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  Users,
  CheckCircle2,
  Loader2,
  Layers,
} from "lucide-react";
import BASE_URL from "@/UTILS/config";

// Ideally, this comes from your config or .env

const Hero = () => {
  const navigate = useNavigate();

  // State for API Data
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for Calendar & Interaction
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // If null, show all history

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store auth token
        const response = await axios.get(`${BASE_URL}/api/v1/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHeroData(response.data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- 2. DATA PROCESSING HELPERS ---

  // Convert "YYYY-MM-DD" string to JS Date object for comparison, ignoring time
  const parseDate = (dateStr) => {
    const d = new Date(dateStr);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Group work by date for the Calendar Heatmap
  const getWorkCountForDate = (date) => {
    if (!heroData || !heroData.daily_work) return 0;
    return heroData.daily_work.filter((work) => {
      const workDate = parseDate(work.date);
      return isSameDay(workDate, date);
    }).length;
  };

  // Get Styling based on intensity (GitHub style)
  const getDayStyle = (day) => {
    // Construct the actual date object for this specific day cell
    const cellDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const count = getWorkCountForDate(cellDate);
    const isSelected = selectedDate && isSameDay(selectedDate, cellDate);
    const isToday = isSameDay(new Date(), cellDate);

    let baseClass = "cursor-pointer transition-all border border-transparent ";

    // Selection Border
    if (isSelected) baseClass += " ring-2 ring-indigo-400 z-10 ";
    else if (isToday) baseClass += " border-indigo-500/50 ";

    // Heatmap Colors
    if (count === 0) return baseClass + "text-gray-600 hover:bg-white/5";
    if (count === 1)
      return (
        baseClass +
        "bg-emerald-900/40 text-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.1)]"
      );
    if (count === 2)
      return (
        baseClass +
        "bg-emerald-600/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
      );
    if (count >= 3)
      return (
        baseClass +
        "bg-emerald-500/60 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] font-bold"
      );

    return baseClass;
  };

  // --- 3. NAVIGATION HANDLERS ---

  const selecttopic = (ind) => {
    if (ind === 0) navigate("/questions", { state: { work: false } });
    else if (ind === 1) navigate("/questions", { state: { work: true } });
    else if (ind === 5) navigate("/add1");
    else navigate("/otherdisp", { state: { topic: topics[ind].name } });
  };

  // Redirect to a specific question (used by Revise Topics & History)
  const handleQuestionClick = (quesId, questionInfo, topic) => {
    // We navigate to /questions (DesktopStack)
    // We pass specific state so the component knows to filter or show just this one
    navigate("/questions", {
      state: {
        singleQuestionMode: true,
        quesId: quesId,
        questionInfo: questionInfo,
        topic: topic,
      },
    });
  };

  // --- 4. DATA PREPARATION FOR RENDERING ---

  // History List Logic
  const getDisplayHistory = () => {
    if (!heroData?.daily_work) return [];

    // If a date is selected on calendar, filter by that. Otherwise show all (limit 10)
    let sortedWork = [...heroData.daily_work].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    if (selectedDate) {
      return sortedWork.filter((w) =>
        isSameDay(parseDate(w.date), selectedDate)
      );
    }
    return sortedWork;
  };

  // Difficulty Logic
  const getDifficultyStats = () => {
    const levels = heroData?.levelsRepo || {
      HardLevelCount: 0,
      MediumLevelCount: 0,
      EasyLevelCount: 0,
    };
    const total =
      levels.HardLevelCount + levels.MediumLevelCount + levels.EasyLevelCount ||
      1; // avoid divide by 0

    return [
      {
        level: "Hard",
        color: "bg-red-500",
        glow: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
        percentage: `${(levels.HardLevelCount / total) * 100}%`,
        count: levels.HardLevelCount,
      },
      {
        level: "Medium",
        color: "bg-yellow-500",
        glow: "shadow-[0_0_8px_rgba(234,179,8,0.5)]",
        percentage: `${(levels.MediumLevelCount / total) * 100}%`,
        count: levels.MediumLevelCount,
      },
      {
        level: "Easy",
        color: "bg-green-500",
        glow: "shadow-[0_0_8px_rgba(34,197,94,0.5)]",
        percentage: `${(levels.EasyLevelCount / total) * 100}%`,
        count: levels.EasyLevelCount,
      },
    ];
  };

  // Static Topics Config
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
    },
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

  // Calendar Date Math
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

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0a0a0c] text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

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
            {heroData?.daily_work?.length || 0} Sessions Logged
          </span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* COL 1: TOPICS LIST */}
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
                  onClick={() => selecttopic(i)}
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

        {/* COL 2: CALENDAR & REVISE TOPICS */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full min-h-0">
          {/* Calendar Section */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col h-[45%] relative overflow-hidden">
            <div className="flex justify-between items-center mb-3 shrink-0">
              <div className="flex items-center gap-2 text-indigo-400">
                <Calendar size={18} />
                <h2 className="font-semibold text-sm uppercase">
                  Activity Map
                </h2>
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
                  onClick={() => {
                    const clickedDate = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      d
                    );
                    // Toggle selection: if already selected, clear it
                    if (selectedDate && isSameDay(selectedDate, clickedDate)) {
                      setSelectedDate(null);
                    } else {
                      setSelectedDate(clickedDate);
                    }
                  }}
                  className={`h-8 w-full flex items-center justify-center rounded-lg text-xs ${getDayStyle(
                    d
                  )}`}
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Legend for Heatmap */}
            <div className="mt-2 flex items-center gap-2 justify-end text-[9px] text-gray-500">
              <span>Less</span>
              <div className="w-2 h-2 rounded bg-white/5"></div>
              <div className="w-2 h-2 rounded bg-emerald-900/40"></div>
              <div className="w-2 h-2 rounded bg-emerald-600/40"></div>
              <div className="w-2 h-2 rounded bg-emerald-500/60"></div>
              <span>More</span>
            </div>
          </section>

          {/* Revise Topics Section */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[55%] flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3 text-purple-400 shrink-0">
              <Atom size={18} />
              <h2 className="font-semibold text-sm uppercase">
                Important Topics
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {heroData?.revise_topics && heroData.revise_topics.length > 0 ? (
                heroData.revise_topics.map((item, i) => (
                  <div
                    key={item.id || i}
                    onClick={() =>
                      handleQuestionClick(
                        item.QuesId,
                        item.questioninfo,
                        item.topic
                      )
                    }
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full shrink-0 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-shadow"></div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs text-gray-300 truncate group-hover:text-white font-medium">
                        {item.questioninfo}
                      </span>
                      <span className="text-[10px] text-gray-500 uppercase">
                        {item.topic}
                      </span>
                    </div>
                    <CheckCircle2
                      size={12}
                      className="ml-auto text-gray-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-xs text-center mt-10">
                  No topics marked for revision
                </div>
              )}
            </div>
            <button className="mt-4 w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl text-[10px] font-bold transition-all shrink-0">
              START REVISION SESSION
            </button>
          </section>
        </div>

        {/* COL 3: DIFFICULTY, FEATURES, HISTORY */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full min-h-0">
          {/* Difficulty */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 shrink-0">
            <div className="flex items-center gap-2 mb-4 text-orange-400">
              <BarChart3 size={16} />
              <h2 className="font-semibold text-xs uppercase">Difficulty</h2>
            </div>
            <div className="space-y-4">
              {getDifficultyStats().map((item) => (
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
                    <span className="text-[10px] font-bold text-gray-300">
                      {item.count}
                    </span>
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
            </div>
          </section>

          {/* Previous Activity / History */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 h-[30%] flex flex-col min-h-0 transition-all">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-2 text-emerald-400">
                <History size={16} />
                <h2 className="font-semibold text-xs uppercase">
                  {selectedDate
                    ? `Activity: ${selectedDate.toLocaleDateString()}`
                    : "History"}
                </h2>
              </div>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-[9px] text-gray-500 hover:text-white underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {getDisplayHistory().length > 0 ? (
                getDisplayHistory().map((work, i) => (
                  <div
                    key={work.id || i}
                    onClick={() =>
                      handleQuestionClick(
                        work.quesid,
                        work.workname,
                        work.topic
                      )
                    }
                    className="p-3 rounded-xl bg-black/20 border border-white/5 flex justify-between items-center group hover:bg-black/40 cursor-pointer"
                  >
                    <div className="flex flex-col overflow-hidden max-w-[70%]">
                      <span className="text-[11px] text-gray-300 font-medium truncate">
                        {work.workname}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {work.topic}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-600 shrink-0">
                      {new Date(work.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-[10px] text-gray-600 mt-4">
                  {selectedDate
                    ? "No work recorded this day."
                    : "No history found."}
                </div>
              )}
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
