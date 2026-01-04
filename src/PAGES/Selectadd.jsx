import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mapping topics to specific colors and icons for better visual distinction
const TOPIC_CONFIG = {
  DSA: {
    color: "from-blue-500 to-cyan-500",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    label: "Data Structures",
  },
  OS: {
    color: "from-emerald-500 to-teal-500",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    label: "Operating Systems",
  },
  CN: {
    color: "from-purple-500 to-pink-500",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    label: "Networks",
  },
  APTITUDE: {
    color: "from-amber-500 to-orange-500",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    label: "Logic & Math",
  },
  SQL: {
    color: "from-indigo-500 to-violet-500",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    label: "Database",
  },
  CLOUD: {
    color: "from-sky-400 to-blue-600",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 15a4 4 0 011-7.87 5.5 5.5 0 0110.88-2.48A5.5 5.5 0 0121 12a5.5 5.5 0 01-5.5 5.5H7a4 4 0 01-4-4z"
        />
      </svg>
    ),
    label: "AWS / Azure",
  },
  REACT: {
    color: "from-cyan-400 to-blue-500",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        />
      </svg>
    ),
    label: "Frontend",
  },
};

const Selectadd = () => {
  const [opt, setOpt] = useState("");
  const options = ["DSA", "OS", "CN", "APTITUDE", "SQL", "CLOUD", "REACT"];
  const navigate = useNavigate();

  const handleOptions = (ind) => {
    const selectedOption = options[ind];
    setOpt(selectedOption);

    // Tiny delay to show the selection animation before navigating
    setTimeout(() => {
      navigate("/add", {
        state: { topic: selectedOption, change: false, ques: "" },
      });
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-5xl z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
            Add New Knowledge
          </h1>
          <p className="text-neutral-400 max-w-md mx-auto text-lg">
            Select a domain to contribute your question or finding.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {options.map((option, ind) => {
            const config = TOPIC_CONFIG[option] || {
              color: "from-gray-500 to-gray-600",
              label: "General",
            };
            const isActive = opt === option;

            return (
              <button
                key={ind}
                onClick={() => handleOptions(ind)}
                className={`group relative p-6 rounded-2xl border border-white/5 bg-[#18181b]/60 backdrop-blur-md 
                hover:bg-[#27272a] transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center
                ${
                  isActive
                    ? "ring-2 ring-indigo-500 scale-95"
                    : "hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
                }
                `}
              >
                {/* Icon Circle */}
                <div
                  className={`p-4 rounded-full bg-gradient-to-br ${config.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {config.icon}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {option}
                  </h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mt-1">
                    {config.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Selectadd;
