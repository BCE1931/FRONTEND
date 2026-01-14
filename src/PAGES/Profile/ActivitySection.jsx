import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  History,
  Clock,
  Flame,
} from "lucide-react";

const ActivitySection = ({ heroData }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // --- HELPERS ---
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

  const getWorkCountForDate = (date) => {
    if (!heroData || !heroData.daily_work) return 0;
    return heroData.daily_work.filter((work) => {
      const workDate = parseDate(work.date);
      return isSameDay(workDate, date);
    }).length;
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  // --- CALENDAR LOGIC ---
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

  // --- STYLES (Updated for Premium Look) ---
  const getDayStyle = (day) => {
    const cellDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const count = getWorkCountForDate(cellDate);
    const isSelected = selectedDate && isSameDay(selectedDate, cellDate);
    const isToday = isSameDay(new Date(), cellDate);

    // Base: Rounded, Flex, Transition
    let baseClass =
      "h-10 w-full flex items-center justify-center rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer relative overflow-hidden ";

    // Border/Selection Logic
    if (isSelected) {
      baseClass += " ring-2 ring-blue-500 bg-blue-500/10 z-10 ";
    } else if (isToday) {
      baseClass += " border border-blue-500/50 text-blue-400 ";
    } else {
      baseClass += " border border-transparent ";
    }

    // Heatmap Logic (The "Contribution" Colors)
    if (count === 0) {
      return baseClass + "text-slate-500 hover:bg-white/5 hover:text-slate-300";
    }
    if (count === 1) {
      return (
        baseClass +
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
      );
    }
    if (count === 2) {
      return (
        baseClass +
        "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
      );
    }
    if (count >= 3) {
      return (
        baseClass +
        "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105"
      );
    }

    return baseClass;
  };

  // --- HISTORY LOGIC ---
  const getDisplayHistory = () => {
    if (!heroData?.daily_work) return [];
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

  const handleQuestionClick = (quesId, questionInfo, topic) => {
    navigate("/questions", {
      state: { singleQuestionMode: true, quesId, questionInfo, topic },
    });
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-full pb-6">
      {/* --- LEFT: CALENDAR CARD --- */}
      <section className="flex-1 bg-[#1a1d26] border border-white/5 rounded-[32px] p-8 flex flex-col shadow-xl shadow-black/20">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <CalendarIcon size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Activity Map
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>

          <div className="flex gap-1 bg-[#0f1117] rounded-xl p-1 border border-white/5">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-3 text-center flex-1 content-start">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <span
              key={d}
              className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2"
            >
              {d}
            </span>
          ))}

          {blanks.map((b, i) => (
            <div key={`b-${i}`} className="h-10"></div>
          ))}

          {days.map((d) => (
            <div
              key={d}
              onClick={() => {
                const clicked = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  d
                );
                setSelectedDate(
                  selectedDate && isSameDay(selectedDate, clicked)
                    ? null
                    : clicked
                );
              }}
              className={getDayStyle(d)}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center justify-end gap-3 text-[10px] font-medium text-slate-500 uppercase tracking-wider">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-emerald-500/10 border border-emerald-500/20"></div>
            <div className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500/50"></div>
            <div className="w-3 h-3 rounded bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
          </div>
          <span>More</span>
        </div>
      </section>

      {/* --- RIGHT: HISTORY LIST --- */}
      <section className="flex-1 bg-[#1a1d26] border border-white/5 rounded-[32px] p-8 flex flex-col min-h-0 shadow-xl shadow-black/20">
        {/* History Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <History size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Timeline
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {selectedDate
                ? `Entries for ${selectedDate.toLocaleDateString()}`
                : "Recent Activity"}
            </h2>
          </div>

          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {getDisplayHistory().length > 0 ? (
            getDisplayHistory().map((work, i) => (
              <div
                key={work.id || i}
                onClick={() =>
                  handleQuestionClick(work.quesid, work.workname, work.topic)
                }
                className="group p-4 rounded-2xl bg-[#0f1117] border border-white/5 hover:border-purple-500/30 flex justify-between items-center cursor-pointer transition-all duration-200 hover:translate-x-1 hover:shadow-lg hover:shadow-purple-900/10"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  {/* Icon based on Topic (Mock logic for visual) */}
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Flame size={18} />
                  </div>

                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm text-slate-200 font-semibold truncate group-hover:text-white transition-colors">
                      {work.workname}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold group-hover:text-purple-400 transition-colors">
                      {work.topic}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] font-medium text-slate-500 bg-white/5 px-2 py-1 rounded-md">
                    {new Date(work.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-50">
              <Clock size={40} strokeWidth={1.5} />
              <span className="text-sm">
                No activity recorded for this period.
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ActivitySection;
