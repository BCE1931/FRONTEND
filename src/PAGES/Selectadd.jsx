import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Selectadd = () => {
  const [opt, setOpt] = useState("");
  const options = ["DSA", "OS", "CN", "APTITUDE", "SQL", "CLOUD", "REACT"];
  const navigate = useNavigate();

  const handleOptions = (ind) => {
    setOpt(options[ind]);
    navigate("/add", {
      state: { topic: options[ind], change: false, ques: "" },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white p-6 relative overflow-hidden">
      {/* 🌟 Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 tracking-wide mb-2">
          Select a Topic to Add
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Choose the subject area where you want to add your question.
        </p>
      </div>

      {/* 🧭 Option Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl">
        {options.map((option, ind) => (
          <button
            key={ind}
            onClick={() => handleOptions(ind)}
            className={`py-3 px-5 rounded-xl font-medium text-lg shadow-lg transition-all duration-300 
              ${
                opt === option
                  ? "bg-indigo-600 scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  : "bg-[#1e293b]/70 hover:bg-[#334155] hover:scale-105"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* ✅ Selected Topic */}
      {opt && (
        <div className="mt-10 text-center animate-fade-in">
          <p className="text-indigo-300 text-lg font-semibold">
            Selected Topic: <span className="text-white">{opt}</span>
          </p>
        </div>
      )}

      {/* ✨ Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default Selectadd;
