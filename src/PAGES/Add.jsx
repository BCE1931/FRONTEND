import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getToken,
  getrefershtoken,
  saverefershtoken,
  saveToken,
} from "../index";
import { toast } from "sonner";
import BASE_URL from "../UTILS/config";

const Add = () => {
  // --- LOGIC STARTS (UNCHANGED) ---
  const [question, setquestion] = useState("");
  const [logic, setlogic] = useState("");
  const [code, setcode] = useState("");
  const [link, setlink] = useState("");
  const [subtopic, setsubtopic] = useState("");
  const [important, setimportant] = useState(false);
  const [attempted, setattempted] = useState(false);
  const [questioninfo, setquestioninfo] = useState("");
  const [submitting, setsubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;
  const change = location.state?.change;
  const ques = location.state?.ques;

  useEffect(() => {
    if (change && ques) {
      setquestion(ques.question || "");
      setlogic(ques.logic || "");
      setcode(ques.code || "");
      setlink(ques.link || "");
      setattempted(ques.attempted || false);
      setimportant(ques.important || false);
      setsubtopic(ques.subtopic || "");
      setquestioninfo(ques.questioninfo || "");
    }
  }, [change, ques]);

  const subtopics = [
    "Array",
    "Dynamic Programming",
    "Graph",
    "Hashing",
    "Linked List",
    "Matrix",
    "Sorting",
    "String",
    "Stack",
    "Tree",
    "Heap",
    "Binary-Bit Manipulation",
    "Arrays & Hashing",
    "Two Pointers",
    "Sliding Window",
    "Binary Search",
    "Heap / Priority Queue",
    "Backtracking",
    "Graphs",
    "1-D Dynamic Programming",
    "2-D Dynamic Programming",
    "Greedy",
    "Bit Manipulation",
  ];

  const refreshtoken = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/token/refresh`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ refreshtoken: getrefershtoken() }),
      });
      if (resp.status === 200) {
        const data = await resp.json();
        saveToken(data.token);
        saverefershtoken(data.refreshtoken);
        toast.success("New session token generated");
        return true;
      }
    } catch {
      console.log("Error getting refresh token");
    }
  };

  const handleadddsa = async () => {
    setsubmitting(true);
    try {
      const resp = await fetch(`${BASE_URL}/api/v1/adddsawork`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question,
          important,
          logic,
          code,
          questioninfo,
          attempted,
          subtopic,
          link,
        }),
      });
      if (resp.status === 401) {
        const success = await refreshtoken();
        if (success) return handleadddsa();
        toast.error("Unable to refresh token.");
        return navigate("/");
      }
      toast.success("Your Work Is Uploaded");
      resetForm();
    } catch {
      toast.error("Error connecting to backend");
    } finally {
      setsubmitting(false);
    }
  };

  const handleaddother = async () => {
    setsubmitting(true);
    try {
      const resp = await fetch(`${BASE_URL}/api/v1/addotherwork`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question,
          important,
          logic,
          questioninfo,
          topic,
        }),
      });
      if (resp.status === 401) {
        const success = await refreshtoken();
        if (success) return handleaddother();
        toast.error("Unable to refresh token.");
        return navigate("/");
      }
      toast.success("Your Work Is Uploaded");
      resetForm();
    } catch {
      toast.error("Error connecting to backend");
    } finally {
      setsubmitting(false);
    }
  };

  const handlechange = async () => {
    setsubmitting(true);
    try {
      const resp = await fetch(`${BASE_URL}/api/v1/modify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question,
          important,
          logic,
          code,
          questioninfo,
          attempted,
          subtopic,
          link,
        }),
      });
      if (resp.status === 401) {
        const success = await refreshtoken();
        if (success) return handlechange();
        toast.error("Unable to refresh token.");
        return navigate("/");
      }
      toast.success("Your Work Is Updated");
      resetForm();
    } catch {
      toast.error("Error while updating");
    } finally {
      setsubmitting(false);
    }
  };

  const resetForm = () => {
    setquestion("");
    setquestioninfo("");
    setlogic("");
    setcode("");
    setimportant(false);
    setlink("");
    setattempted(false);
    setsubtopic("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (change) handlechange();
    else if (!change && topic === "DSA") handleadddsa();
    else handleaddother();
  };
  // --- LOGIC ENDS ---

  if (!topic) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#09090b] text-white">
        <p className="text-red-400 text-lg font-medium bg-red-900/10 px-6 py-4 rounded-xl border border-red-900/50">
          ⚠️ No topic selected. Please go back and select one.
        </p>
      </div>
    );
  }

  // --- NEW UI LAYOUT STARTS ---
  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-200 selection:bg-indigo-500/30 pb-12">
      {/* Loading Overlay */}
      {submitting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-400 font-medium animate-pulse">
              Saving your work...
            </p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {change ? "Edit Entry" : "Create Entry"}
            </h1>
            <p className="text-sm text-neutral-500">
              Adding to <span className="text-indigo-400">{topic}</span>
            </p>
          </div>
          {/* Top Right Actions */}
          <button
            onClick={handleSubmit}
            className="hidden sm:block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-900/20 text-sm"
          >
            {submitting ? "Saving..." : change ? "Save Changes" : "Publish"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT COLUMN: Metadata & Settings (Sticky on Desktop) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#18181b] rounded-2xl p-6 border border-white/5 shadow-sm sticky top-24">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                Basic Info
              </h3>

              <div className="space-y-4">
                {/* Question Title */}
                <div className="group">
                  <label className="text-xs text-neutral-500 mb-1 block group-focus-within:text-indigo-400">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Two Sum"
                    className="w-full bg-[#27272a] border border-transparent focus:border-indigo-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all outline-none"
                    value={question}
                    required
                    onChange={(e) => setquestion(e.target.value)}
                  />
                </div>

                {/* Subtopic (DSA Only) */}
                {topic === "DSA" && (
                  <div className="group">
                    <label className="text-xs text-neutral-500 mb-1 block group-focus-within:text-indigo-400">
                      Subtopic
                    </label>
                    <select
                      className="w-full bg-[#27272a] border border-transparent focus:border-indigo-500/50 rounded-lg px-4 py-2.5 text-sm text-white transition-all outline-none appearance-none"
                      value={subtopic}
                      onChange={(e) => setsubtopic(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {subtopics.map((sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Link */}
                <div className="group">
                  <label className="text-xs text-neutral-500 mb-1 block group-focus-within:text-indigo-400">
                    Reference URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full bg-[#27272a] border border-transparent focus:border-indigo-500/50 rounded-lg px-4 py-2.5 text-sm text-indigo-300 placeholder-neutral-600 transition-all outline-none font-mono"
                    value={link}
                    onChange={(e) => setlink(e.target.value)}
                  />
                </div>

                {/* Toggles */}
                <div className="pt-4 flex flex-col gap-3">
                  <label className="flex items-center justify-between p-3 rounded-lg bg-[#27272a]/50 border border-white/5 cursor-pointer hover:bg-[#27272a] transition">
                    <span className="text-sm font-medium text-neutral-300">
                      Important
                    </span>
                    <input
                      type="checkbox"
                      checked={important}
                      onChange={() => setimportant(!important)}
                      className="w-5 h-5 accent-indigo-500 rounded"
                    />
                  </label>

                  {topic === "DSA" && (
                    <label className="flex items-center justify-between p-3 rounded-lg bg-[#27272a]/50 border border-white/5 cursor-pointer hover:bg-[#27272a] transition">
                      <span className="text-sm font-medium text-neutral-300">
                        Attempted
                      </span>
                      <input
                        type="checkbox"
                        checked={attempted}
                        onChange={() => setattempted(!attempted)}
                        className="w-5 h-5 accent-green-500 rounded"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Only Submit Button */}
            <button
              type="submit"
              className="sm:hidden w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold"
            >
              {submitting ? "Saving..." : "Save Entry"}
            </button>
          </div>

          {/* RIGHT COLUMN: Heavy Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="bg-[#18181b] rounded-2xl p-1 border border-white/5 shadow-sm">
              <div className="px-5 py-3 border-b border-white/5">
                <h3 className="text-sm font-medium text-neutral-300">
                  Problem Description
                </h3>
              </div>
              <textarea
                className="w-full h-40 bg-transparent text-neutral-200 p-5 outline-none resize-none text-base leading-relaxed placeholder-neutral-600"
                placeholder="Describe the problem statement here..."
                value={questioninfo}
                onChange={(e) => setquestioninfo(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Logic Card */}
            <div className="bg-[#18181b] rounded-2xl p-1 border border-white/5 shadow-sm">
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-500">
                  Logic & Approach
                </h3>
              </div>
              <textarea
                className="w-full h-48 bg-transparent text-neutral-200 p-5 outline-none resize-y text-base font-mono leading-relaxed placeholder-neutral-600"
                placeholder="Explain your thought process..."
                value={logic}
                onChange={(e) => setlogic(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Code Card (DSA Only) */}
            {topic === "DSA" && (
              <div className="bg-[#18181b] rounded-2xl p-1 border border-white/5 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5 bg-[#121214]">
                  <h3 className="text-sm font-medium text-emerald-500">
                    Solution Code
                  </h3>
                </div>
                <textarea
                  className="w-full h-96 bg-[#0c0c0e] text-emerald-100 p-5 outline-none resize-y text-sm font-mono leading-relaxed placeholder-neutral-700"
                  placeholder="// Paste your solution code here"
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Add;
