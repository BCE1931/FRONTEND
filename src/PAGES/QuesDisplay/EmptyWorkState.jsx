import React from "react";
import { FolderOpen, Plus, Sparkles } from "lucide-react";

const EmptyWorkState = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-md mx-auto relative group">
      {/* Main Card Content */}
      {/* Changed bg-[#1a1d26] to bg-transparent and removed shadow for transparency */}
      <div className="relative bg-transparent border border-white/5 rounded-[32px] p-10 flex flex-col items-center text-center overflow-hidden">
        {/* Subtle inner top glow (Optional: kept for a bit of depth, or can be removed) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/5 blur-[50px] pointer-events-none"></div>

        {/* Icon Container */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-[#0f1117] border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <FolderOpen
              size={36}
              className="text-slate-500 group-hover:text-indigo-400 transition-colors duration-300"
              strokeWidth={1.5}
            />
          </div>

          {/* Floating Badge */}
          {/* Changed border-[#1a1d26] to border-transparent */}
          <div className="absolute -right-2 -bottom-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg border-[3px] border-transparent group-hover:rotate-12 transition-transform duration-300">
            <Plus size={16} strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-xl font-bold text-white mb-3">
          No Work Logs Found
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-[260px] mb-8">
          You haven't added any entries for this module yet. Start tracking your
          progress now!
        </p>

        {/* Action Button */}
        <button
          onClick={onNavigate}
          className="relative px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
        >
          <Sparkles size={16} className="fill-white/20" />
          <span>Add New Entry</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyWorkState;
