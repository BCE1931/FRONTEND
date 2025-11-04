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

  if (!topic) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white">
        <p className="text-red-400 text-lg font-medium">
          ⚠️ No topic selected. Please go back and select one.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white px-4 py-10 overflow-y-auto">
      {submitting && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] text-white px-6 py-4 rounded-2xl shadow-lg border border-indigo-500/50">
            <p className="text-lg font-semibold animate-pulse">
              Submitting your question...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-[#0b0f1a]/80 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-[0_0_25px_rgba(99,102,241,0.2)] p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">
          {change
            ? `Modify Question in ${topic}`
            : `Add New Question to ${topic}`}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Question Title */}
          <input
            type="text"
            placeholder="Enter Question Title"
            className="p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={question}
            required
            onChange={(e) => setquestion(e.target.value)}
          />

          {/* Question Description */}
          <textarea
            className="p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none h-[180px]"
            placeholder="Enter Question Description"
            value={questioninfo}
            onChange={(e) => setquestioninfo(e.target.value)}
            required
          ></textarea>

          {/* Logic */}
          <textarea
            className="p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none h-[150px]"
            placeholder="Enter Logic"
            value={logic}
            onChange={(e) => setlogic(e.target.value)}
            required
          ></textarea>

          {/* Code (Only for DSA) */}
          {topic === "DSA" && (
            <textarea
              className="p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none h-[180px]"
              placeholder="Enter Code (optional)"
              value={code}
              onChange={(e) => setcode(e.target.value)}
            ></textarea>
          )}

          {/* Link */}
          <input
            type="text"
            placeholder="Enter Link (optional)"
            className="p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={link}
            onChange={(e) => setlink(e.target.value)}
          />

          {/* Subtopic Dropdown (Only for DSA) */}
          {topic === "DSA" && (
            <select
              className="p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={subtopic}
              onChange={(e) => setsubtopic(e.target.value)}
              required
            >
              <option value="">Select Subtopic</option>
              {subtopics.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          {/* Important */}
          <label className="flex items-center gap-3 text-sm sm:text-base">
            <input
              type="checkbox"
              checked={important}
              onChange={() => setimportant(!important)}
              className="h-5 w-5 accent-indigo-500"
            />
            Mark as Important
          </label>

          {/* Attempted (Only for DSA) */}
          {topic === "DSA" && (
            <label className="flex items-center gap-3 text-sm sm:text-base">
              <input
                type="checkbox"
                checked={attempted}
                onChange={() => setattempted(!attempted)}
                className="h-5 w-5 accent-indigo-500"
              />
              Mark as Attempted
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
