import React from "react";
import { useNavigate } from "react-router-dom";
import { Atom, Bookmark, ArrowRight, Layers } from "lucide-react";

const ImportantTopics = ({ heroData }) => {
  const navigate = useNavigate();

  const handleQuestionClick = (quesId, questionInfo, topic) => {
    if (!quesId) {
      console.warn("Question ID is missing!");
      return;
    }
    navigate("/questions", {
      state: { singleQuestionMode: true, quesId, questionInfo, topic },
    });
  };

  // Safe access to the list
  const list = heroData?.revise_topics || [];

  return (
    <div className="h-full flex flex-col">
      <section className="flex-1 bg-[#1a1d26] border border-white/5 rounded-[32px] p-8 flex flex-col shadow-xl shadow-black/20 overflow-hidden relative">
        {/* --- Header --- */}
        <div className="flex items-center justify-between mb-8 shrink-0 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Bookmark size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Saved for Later
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Revision List
            </h2>
          </div>

          {/* Count Badge */}
          <div className="px-4 py-2 rounded-2xl bg-[#0f1117] border border-white/5 flex items-center gap-2">
            <span className="text-2xl font-bold text-white leading-none">
              {list.length}
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Pending
            </span>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar relative z-10">
          {list.length > 0 ? (
            list.map((item, i) => {
              // SAFETY CHECK: Skip invalid items
              if (!item) return null;

              // Handle property name variations (Backend often sends lowercase or PascalCase)
              const id = item.QuesId || item.quesid || item.id;
              const info =
                item.questioninfo || item.questionInfo || "Untitled Question";
              const topic = item.topic || "General";

              return (
                <div
                  key={id || i}
                  onClick={() => handleQuestionClick(id, info, topic)}
                  className="group relative p-5 rounded-2xl bg-[#0f1117] border border-white/5 hover:border-purple-500/40 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-900/10 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    {/* Status Indicator */}
                    <div className="mt-1 w-2 h-2 rounded-full bg-purple-500/40 group-hover:bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-colors shrink-0" />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug line-clamp-2">
                        {info}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-colors">
                          {topic}
                        </span>
                      </div>
                    </div>

                    {/* Hover Icon */}
                    <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={18} className="text-purple-400" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // --- Empty State ---
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Layers
                  size={32}
                  className="text-slate-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-bold text-slate-300">
                All Caught Up!
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                You have no topics marked for revision.
              </p>
            </div>
          )}
        </div>

        {/* --- Bottom Action --- */}
        <div className="mt-6 pt-6 border-t border-white/5 shrink-0 relative z-10">
          <button
            disabled={list.length === 0}
            className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all
              ${
                list.length > 0
                  ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20"
                  : "bg-white/5 text-slate-500 cursor-not-allowed"
              }
            `}
          >
            <Atom size={16} />
            <span>Start Revision Session</span>
          </button>
        </div>

        {/* Background Decorative Gradient */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      </section>
    </div>
  );
};

export default ImportantTopics;
