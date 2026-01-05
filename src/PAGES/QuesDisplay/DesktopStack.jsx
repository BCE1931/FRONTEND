import React, { useEffect, useRef } from "react";
import {
  CheckCircle,
  PenLine,
  Star,
  BookmarkPlus,
  Code2,
  ExternalLink,
  Layers,
} from "lucide-react";

const DesktopStack = ({ questions, toggleModify, toggleAttempted }) => {
  const scrollRef = useRef(null);

  // ✅ Show LAST card on initial load
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    });
  }, [questions.length]);

  return (
    <div className="flex-1 h-full bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#050505] to-[#050505] pointer-events-none" />

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex flex-col items-start w-full pb-20 pt-10 pl-4 md:pl-16 pr-16 md:pr-64">
          {questions.length === 0 ? (
            <div className="text-slate-500 flex flex-col items-center gap-4 mt-20 w-full">
              <Layers size={48} />
              <p>No questions found.</p>
            </div>
          ) : (
            questions.map((ques, index) => (
              <div
                key={ques._id || index}
                className="sticky flex flex-shrink-0 w-full overflow-hidden
                border rounded-2xl border-slate-700/80 shadow-2xl bg-[#0f172a]"
                style={{
                  top: `${index * 30 + 20}px`,
                  height: "75vh",
                  marginBottom: "5vh",
                  zIndex: index + 1,
                }}
              >
                {/* LEFT PANEL */}
                <div className="w-[40%] h-full border-r border-slate-800 bg-[#0b0f19] flex flex-col">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Code2 size={16} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Source Code
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                  </div>

                  <div className="flex-1 p-5 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {ques.code ? (
                      <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-300">
                        {ques.code}
                      </pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50 text-slate-600">
                        <Code2 size={40} strokeWidth={1} />
                        <span className="text-[10px] uppercase tracking-widest">
                          No Code Snippet
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CENTER PANEL */}
                <div className="flex flex-col flex-1 h-full bg-[#151b2b]">
                  <div className="px-8 py-6 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-[#151b2b]">
                    <span className="px-2 py-1 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 tracking-wider">
                      QUESTION {index + 1}
                    </span>
                    <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-100">
                      {ques.questioninfo}
                    </h2>
                  </div>

                  <div className="flex-1 p-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {ques.question && (
                      <p className="pl-4 text-sm border-l-2 border-slate-700 text-slate-400">
                        {ques.question}
                      </p>
                    )}

                    <div className="bg-[#0f1420] rounded-xl p-6 border border-slate-800 shadow-inner">
                      <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">
                        Logic & Approach
                      </h3>
                      <p className="text-base leading-7 text-slate-300 whitespace-pre-wrap">
                        {ques.logic || "No logic recorded yet."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ✅ RIGHT PANEL (RESTORED & ACTIVE) */}
                <div className="flex flex-col items-center h-full gap-5 py-6 border-l w-16 border-slate-800 bg-[#0d111c] z-20">
                  <button className="p-3 transition-colors rounded-xl hover:bg-slate-800 text-slate-500 hover:text-yellow-500">
                    <Star
                      size={18}
                      fill={ques.important ? "currentColor" : "none"}
                      className={ques.important ? "text-yellow-500" : ""}
                    />
                  </button>

                  <button
                    onClick={toggleAttempted}
                    className={`p-3 rounded-xl hover:bg-slate-800 transition-colors ${
                      ques.attempted
                        ? "text-emerald-500"
                        : "text-slate-500 hover:text-emerald-400"
                    }`}
                  >
                    <CheckCircle size={18} />
                  </button>

                  <div className="w-6 h-[1px] bg-slate-800 my-1" />

                  <button
                    onClick={toggleModify}
                    className="p-3 transition-colors rounded-xl hover:bg-slate-800 text-slate-500 hover:text-indigo-400"
                  >
                    <PenLine size={18} />
                  </button>

                  <a
                    href={ques.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 transition-colors rounded-xl hover:bg-slate-800 text-slate-500 hover:text-blue-400"
                  >
                    <ExternalLink size={18} />
                  </a>

                  <div className="flex-1" />

                  <button className="p-3 transition-colors rounded-xl hover:bg-slate-800 text-slate-500 hover:text-purple-400">
                    <BookmarkPlus size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopStack;
