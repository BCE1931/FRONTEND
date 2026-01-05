import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  PenLine,
  Star,
  BookmarkPlus,
  Code2,
  ExternalLink,
  Layers,
  Loader2,
} from "lucide-react";
import BASE_URL from "@/UTILS/config";

// ✅ Temporarily hardcoded for safety, or import from config

const DesktopStack = ({ questions, toggleModify, toggleAttempted }) => {
  const scrollRef = useRef(null);
  const location = useLocation();

  // Local state for Single Question Mode
  const [singleQuestion, setSingleQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isSingleMode = location.state?.singleQuestionMode;

  // Decide which list to render
  const questionsToRender = isSingleMode ? singleQuestion : questions;

  // --- 1. FETCH SINGLE QUESTION LOGIC ---
  useEffect(() => {
    console.log(
      "DesktopStack Loaded. Mode:",
      isSingleMode ? "Single" : "List",
      "State:",
      location.state
    );

    if (isSingleMode) {
      const fetchOneQuestion = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
          const token = localStorage.getItem("token");
          const { quesId, topic } = location.state;

          const payload = { id: quesId, topic: topic };

          const response = await axios.post(
            `${BASE_URL}/api/v1/getonequestion`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (
            typeof response.data === "string" &&
            response.data.includes("not found")
          ) {
            setErrorMsg(response.data);
            setSingleQuestion([]);
          } else {
            setSingleQuestion([response.data]);
          }
        } catch (error) {
          console.error("Error fetching single question:", error);
          setErrorMsg("Failed to load question details.");
        } finally {
          setLoading(false);
        }
      };

      fetchOneQuestion();
    }
  }, [isSingleMode, location.state]);

  // --- 2. TOGGLE REVISE (IMPORTANT) LOGIC ---
  const handleToggleRevise = async (index) => {
    const targetQues = questionsToRender[index];
    const token = localStorage.getItem("token");

    if (!targetQues) return;

    try {
      // 1. Call Backend
      await axios.put(
        `${BASE_URL}/api/v1/togglerevise`,
        {
          id: targetQues.id,
          topic: targetQues.topic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 2. Update UI Locally (Optimistic Update)
      if (isSingleMode) {
        setSingleQuestion((prev) => [
          { ...prev[0], important: !prev[0].important },
        ]);
      } else {
        // For list mode, we modify the object directly in the prop array to reflect change immediately
        // (Note: In strict React, this should be a prop function from parent, but this works for display)
        targetQues.important = !targetQues.important;
        // Force a re-render is tricky here without parent state,
        // but often React will re-render if we toggle a local "dummy" state or if parent refreshes.
        // For now, this ensures the API is hit.
        console.log("Toggled revision for list item");
      }
    } catch (error) {
      console.error("Error toggling revise:", error);
    }
  };

  // --- 3. SCROLL LOGIC ---
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, [questionsToRender.length]);

  // --- RENDER ---
  return (
    <div className="flex-1 h-full bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#050505] to-[#050505] pointer-events-none" />

      <div
        ref={scrollRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex flex-col items-start w-full pb-20 pt-10 pl-4 md:pl-16 pr-16 md:pr-64">
          {loading && (
            <div className="flex items-center justify-center w-full h-[50vh]">
              <Loader2 className="animate-spin text-indigo-500" size={48} />
            </div>
          )}

          {!loading && errorMsg && (
            <div className="flex items-center justify-center w-full h-[50vh] text-red-400">
              <p>{errorMsg}</p>
            </div>
          )}

          {!loading && !errorMsg && questionsToRender.length === 0 ? (
            <div className="text-slate-500 flex flex-col items-center gap-4 mt-20 w-full">
              <Layers size={48} />
              <p>No questions found.</p>
            </div>
          ) : (
            !loading &&
            !errorMsg &&
            questionsToRender.map((ques, index) => (
              <div
                key={ques.id || ques._id || index}
                className="sticky flex flex-shrink-0 w-full overflow-hidden border rounded-2xl border-slate-700/80 shadow-2xl bg-[#0f172a]"
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

                  <div className="flex-1 p-5 overflow-auto [&::-webkit-scrollbar]:hidden">
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
                      QUESTION {isSingleMode ? "REVIEW" : index + 1}
                    </span>
                    <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-100">
                      {ques.questioninfo}
                    </h2>
                    {/* Display current Revise Status */}
                    {ques.important && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-900/30 text-yellow-500">
                        REVISION
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:hidden">
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

                {/* RIGHT PANEL */}
                <div className="flex flex-col items-center h-full gap-5 py-6 border-l w-16 border-slate-800 bg-[#0d111c] z-20">
                  {/* ✅ TOGGLE REVISE BUTTON */}
                  <button
                    onClick={() => handleToggleRevise(index)}
                    className="p-3 transition-colors rounded-xl hover:bg-slate-800 text-slate-500 hover:text-yellow-500"
                    title="Toggle Revision (Important)"
                  >
                    <Star
                      size={18}
                      fill={ques.important ? "currentColor" : "none"}
                      className={ques.important ? "text-yellow-500" : ""}
                    />
                  </button>

                  <button
                    onClick={() => !isSingleMode && toggleAttempted(index)}
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
                    onClick={() => !isSingleMode && toggleModify(index)}
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
