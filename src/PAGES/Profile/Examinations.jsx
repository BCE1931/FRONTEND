import React from "react";
import {
  Trophy,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

const Examinations = ({ heroData }) => {
  const exams = heroData?.exams || [];

  // Helper to determine color based on score
  const getScoreColor = (score) => {
    if (score >= 80)
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 50)
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-red-400 bg-red-500/10 border-red-500/20";
  };

  if (!exams || exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 opacity-60 min-h-[400px]">
        <Trophy size={48} strokeWidth={1.5} />
        <p className="text-sm font-medium">No examination records found yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
      {exams.map((exam, i) => (
        <div
          key={exam.id || i}
          className="group flex flex-col bg-[#1a1d26] border border-white/5 rounded-[24px] p-6 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 relative overflow-hidden"
        >
          {/* Top Row: Topic & Date */}
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-lg bg-white/5 text-xs font-bold text-slate-300 uppercase tracking-wider border border-white/5">
              {exam.topic}
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-medium uppercase tracking-widest">
              <Calendar size={12} />
              {exam.date}
            </div>
          </div>

          {/* Question */}
          <h3 className="text-sm font-semibold text-slate-200 mb-6 line-clamp-2 leading-relaxed">
            {exam.question}
          </h3>

          {/* Stats Row */}
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                Score
              </span>
              <div
                className={`px-3 py-1 rounded-lg border text-sm font-bold w-fit ${getScoreColor(
                  exam.percentage
                )}`}
              >
                {exam.percentage}%
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                Result
              </span>
              {exam.percentage >= 70 ? (
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold">Passed</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-400">
                  <XCircle size={16} />
                  <span className="text-xs font-bold">Review</span>
                </div>
              )}
            </div>
          </div>

          {/* Missed Topics (Optional: Show if exists) */}
          {exam.missedtopics && (
            <div className="mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1 text-red-400">
                <AlertCircle size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wide">
                  Focus Areas
                </span>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                {exam.missedtopics}
              </p>
            </div>
          )}

          {/* Hover Effect Glow */}
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-white/5 to-transparent blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
};

export default Examinations;
