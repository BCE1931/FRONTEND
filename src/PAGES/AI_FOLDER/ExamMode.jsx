import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  FileText,
  PenTool,
  Send,
  Loader2,
  CheckCircle2,
  Bot,
  ArrowLeft,
  Lightbulb,
  Maximize2,
  User,
} from "lucide-react";
import BASE_URL from "@/UTILS/config";

const ExamMode = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- STATE ---
  const { id, question, logic, topic, ai, normal } = location.state || {};
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  // Redirect if no state found
  useEffect(() => {
    if (!location.state) {
      toast.error("Invalid session. Redirecting...");
      navigate("/hero");
    }
  }, [location, navigate]);

  // --- HANDLERS ---
  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast.error("Please write an answer before submitting.");
      return;
    }

    setIsSubmitting(true);

    if (normal) {
      // --- NORMAL MODE ---
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        toast.success("Answer submitted successfully!");
      }, 800);
    } else {
      // --- AI MODE ---
      try {
        const token = localStorage.getItem("token");
        const payload = {
          questionId: id,
          question: question,
          logic: logic,
          answer: answer,
          topic: topic,
        };

        const response = await axios.post(`${BASE_URL}/api/v1/ai`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setAiFeedback(response.data);
        setIsSubmitted(true);
        toast.success("AI Analysis Complete");
      } catch (error) {
        console.error("AI Submission Error:", error);
        toast.error("Failed to analyze answer. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleExit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((e) => console.log(e));
    }
    navigate("/hero");
  };

  const handleGoToProfile = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((e) => console.log(e));
    }
    navigate("/hero", { state: { activeTab: "activity" } }); // Optional: Redirect to activity tab
    toast.info("Check your Activity page later for results.");
  };

  if (!location.state) return null;

  return (
    <div className="min-h-screen h-screen w-full bg-[#0b0f1a] text-slate-200 flex flex-col font-sans overflow-hidden relative">
      {/* --- AI LOADING OVERLAY (When Submitting in AI Mode) --- */}
      {isSubmitting && ai && (
        <div className="absolute inset-0 z-50 bg-[#0b0f1a]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full animate-pulse"></div>
            <Bot
              size={64}
              className="text-fuchsia-500 relative z-10 animate-bounce"
            />
          </div>

          <h2 className="text-2xl font-bold text-white mt-8 mb-2">
            Analyzing Your Answer
          </h2>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            AI mode takes time to deeply analyze your logic, optimization, and
            code quality. Please wait...
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-fuchsia-400 bg-fuchsia-500/10 px-4 py-2 rounded-full border border-fuchsia-500/20">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Processing...
              </span>
            </div>

            <div className="h-px w-16 bg-white/10 my-2"></div>

            <button
              onClick={handleGoToProfile}
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm group"
            >
              <User size={16} />
              <span className="group-hover:underline">
                Go to Profile & Check Later
              </span>
            </button>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="h-16 shrink-0 border-b border-white/5 bg-[#0f1117] flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={handleExit}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
            title="Exit Exam"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              {ai ? (
                <Bot size={16} className="text-fuchsia-500" />
              ) : (
                <PenTool size={16} className="text-indigo-500" />
              )}
              {ai ? "AI Assessment" : "Standard Exam"}
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Topic: {topic}
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-[10px] font-bold text-red-400 uppercase">
            Live Session
          </span>
        </div>
      </header>

      {/* --- MAIN SPLIT CONTENT --- */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* --- LEFT PANEL: QUESTION --- */}
        <div className="w-full md:w-1/2 h-full flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-[#0b0f1a] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent opacity-30"></div>

          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-[#0f1117]/50">
            <FileText size={16} className="text-indigo-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Problem Statement
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-6">
                {question}
              </h2>
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                <p className="text-xs text-indigo-300/80 leading-relaxed">
                  <span className="font-bold">Note:</span> Please provide a
                  detailed explanation covering the core concepts,
                  implementation details (if applicable), and time complexity
                  analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: ANSWER INPUT --- */}
        <div className="w-full md:w-1/2 h-full flex flex-col bg-[#0f1117] relative">
          {/* Header / Tabs */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0f1117]">
            <div className="flex items-center gap-2">
              <PenTool
                size={16}
                className={ai ? "text-fuchsia-400" : "text-emerald-400"}
              />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Your Solution
              </span>
            </div>
            {isSubmitted && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                SUBMITTED
              </span>
            )}
          </div>

          {/* Input Area or Result Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {!isSubmitted ? (
              // --- EDIT MODE ---
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                disabled={isSubmitting} // Disable input while submitting
                className="flex-1 w-full h-full bg-transparent p-6 md:p-8 text-slate-200 resize-none focus:outline-none focus:bg-[#151921] transition-colors font-mono text-sm leading-relaxed placeholder:text-slate-600 disabled:opacity-50"
                spellCheck="false"
              />
            ) : (
              // --- RESULT MODE ---
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-6">
                {/* User Answer Review */}
                <div className="opacity-60 hover:opacity-100 transition-opacity">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Your Answer
                  </h3>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                    {answer}
                  </div>
                </div>

                {/* NORMAL MODE: Show Logic */}
                {normal && logic && (
                  <div className="animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={18} className="text-yellow-400" />
                      <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                        Reference Logic
                      </h3>
                    </div>
                    <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/10 text-slate-200 text-sm leading-7 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                      {logic}
                    </div>
                  </div>
                )}

                {/* AI MODE: Show Feedback */}
                {ai && aiFeedback && (
                  <div className="animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot size={18} className="text-fuchsia-400" />
                      <h3 className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest">
                        AI Feedback
                      </h3>
                    </div>
                    <div className="p-5 rounded-2xl bg-fuchsia-500/5 border border-fuchsia-500/10 text-slate-200 text-sm leading-7 shadow-[0_0_30px_rgba(217,70,239,0.05)] whitespace-pre-wrap">
                      {typeof aiFeedback === "object"
                        ? JSON.stringify(aiFeedback, null, 2)
                        : aiFeedback}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer / Submit Action */}
            {!isSubmitted && (
              <div className="p-4 border-t border-white/5 bg-[#0b0f1a] flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-all 
                      ${
                        isSubmitting
                          ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                          : ai
                          ? "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Answer
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4a5568; }
      `,
        }}
      />
    </div>
  );
};

export default ExamMode;
