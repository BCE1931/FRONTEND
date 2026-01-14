import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Cpu,
  Server,
  Network,
  Calculator,
  Puzzle,
  Database,
  Cloud,
  Atom,
  Layers,
  GitBranch,
  Loader2,
  ChevronLeft,
  Play,
  Maximize2,
  AlertCircle,
  Bot,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

// CONFIG
const BASE_URL = "http://localhost:8080";

const SelectionPage = () => {
  const navigate = useNavigate();

  // --- STATE ---
  // Step 0: Topics -> Step 1: Questions -> Step 2: Select Mode -> Step 3: Confirmation
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [examMode, setExamMode] = useState(null); // 'normal' or 'ai'

  // --- TOPICS DATA ---
  const topics = [
    {
      name: "Dsa",
      id: "my-work",
      icon: <Code2 className="text-white" />,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "AIML",
      id: "ai",
      icon: <Cpu className="text-white" />,
      gradient: "from-fuchsia-500 to-fuchsia-600",
    },
    {
      name: "OS",
      id: "os",
      icon: <Server className="text-white" />,
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Networks",
      id: "cn",
      icon: <Network className="text-white" />,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Aptitude",
      id: "apt",
      icon: <Calculator className="text-white" />,
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Extra",
      id: "extra",
      icon: <Puzzle className="text-white" />,
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      name: "SQL",
      id: "sql",
      icon: <Database className="text-white" />,
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Cloud",
      id: "cloud",
      icon: <Cloud className="text-white" />,
      gradient: "from-sky-500 to-sky-600",
    },
    {
      name: "React",
      id: "react",
      icon: <Atom className="text-white" />,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      name: "Design",
      id: "design",
      icon: <Layers className="text-white" />,
      gradient: "from-rose-500 to-red-600",
    },
    {
      name: "Micro",
      id: "micro",
      icon: <Server className="text-white" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      name: "Git",
      id: "git",
      icon: <GitBranch className="text-white" />,
      gradient: "from-red-500 to-orange-500",
    },
  ];

  // --- STEP 1: FETCH QUESTIONS ---
  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/v1/getwork/${topic.name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setQuestionsList(data);
          setStep(1);
        } else {
          toast.error("No questions found for this topic.");
        }
      } else {
        toast.error("Failed to fetch questions. Check connection.");
      }
    } catch (error) {
      console.error("Error fetching work:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: SELECT QUESTION ---
  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setStep(2); // Go to Mode Selection
  };

  // --- STEP 3: SELECT MODE ---
  const handleModeSelect = (mode) => {
    setExamMode(mode);
    setStep(3); // Go to Final Confirmation
  };

  // --- STEP 4: START EXAM ---
  const handleStartExam = () => {
    if (!selectedQuestion || !examMode) return;

    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.log("Full screen denied:", err);
      });
    }

    // Determine props based on selection
    const isAi = examMode === "ai";

    navigate("/exam", {
      state: {
        id: selectedQuestion.id,
        question: selectedQuestion.question,
        logic: selectedQuestion.logic,
        topic: selectedTopic.name,
        ai: isAi, // ai=true if AI mode selected
        normal: !isAi, // normal=true if Normal mode selected
      },
    });
  };

  // --- RENDER HELPERS ---
  const renderLoading = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0f1117] text-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4 relative z-10" />
      <h2 className="text-xl font-bold animate-pulse relative z-10">
        Fetching Questions...
      </h2>
      <p className="text-gray-500 text-sm mt-2 relative z-10">
        Connecting to {selectedTopic?.name} database
      </p>
    </div>
  );

  if (loading) return renderLoading();

  return (
    <div className="min-h-screen w-full bg-[#0f1117] text-white p-6 font-sans relative overflow-hidden selection:bg-indigo-500/30">
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none z-0" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {step === 0
                ? "Select Module"
                : step === 1
                ? `${selectedTopic?.name} Questions`
                : step === 2
                ? "Select Mode"
                : "Confirm Session"}
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              {step === 0
                ? "Choose a topic to begin"
                : step === 1
                ? "Pick a challenge"
                : step === 2
                ? "How do you want to practice?"
                : "Ready to start?"}
            </p>
          </div>
        </div>

        {/* --- VIEW 0: TOPIC GRID --- */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {topics.map((topic, i) => (
              <div
                key={i}
                onClick={() => handleTopicSelect(topic)}
                className="group relative p-5 bg-[#1a1d26]/80 backdrop-blur-sm hover:bg-[#20242f] rounded-[24px] border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex flex-col h-full gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {React.cloneElement(topic.icon, { size: 24 })}
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-white tracking-tight">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 group-hover:text-slate-400 transition-colors uppercase tracking-wide">
                      Load Questions
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW 1: QUESTION LIST --- */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto space-y-3 pb-10">
            {questionsList.map((q) => (
              <div
                key={q.id}
                onClick={() => handleQuestionSelect(q)}
                className="p-4 bg-[#1a1d26]/80 backdrop-blur-sm hover:bg-[#252a36] border border-white/5 rounded-xl cursor-pointer transition-all flex items-center gap-4 group hover:border-indigo-500/30"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-sm font-mono text-gray-400 border border-white/5 group-hover:border-indigo-500/30 group-hover:text-indigo-400 shadow-inner">
                  #{q.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-medium text-gray-200 group-hover:text-white line-clamp-2">
                    {q.question}
                  </h3>
                </div>
                <ChevronLeft
                  className="rotate-180 text-gray-600 group-hover:text-indigo-400 transition-colors"
                  size={20}
                />
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW 2: MODE SELECTION --- */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Normal Mode Card */}
              <div
                onClick={() => handleModeSelect("normal")}
                className="group relative p-8 bg-[#1a1d26]/80 backdrop-blur-md hover:bg-[#20242f] rounded-[32px] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10 flex flex-col items-center text-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20">
                  <FileText size={40} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Normal Mode
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Standard examination environment. Focus on solving the
                    question without AI assistance.
                  </p>
                </div>
                <div className="mt-auto pt-4 w-full">
                  <button className="w-full py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all">
                    Select Normal
                  </button>
                </div>
              </div>

              {/* AI Mode Card */}
              <div
                onClick={() => handleModeSelect("ai")}
                className="group relative p-8 bg-[#1a1d26]/80 backdrop-blur-md hover:bg-[#20242f] rounded-[32px] border border-white/5 hover:border-fuchsia-500/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-fuchsia-500/10 flex flex-col items-center text-center gap-6"
              >
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wide">
                  Beta
                </div>
                <div className="w-20 h-20 rounded-full bg-fuchsia-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-fuchsia-500/20">
                  <Bot size={40} className="text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    AI Mode
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Interactive session with AI feedback. Get hints, optimize
                    your solution, and learn faster.
                  </p>
                </div>
                <div className="mt-auto pt-4 w-full">
                  <button className="w-full py-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 font-bold uppercase tracking-wider group-hover:bg-fuchsia-600 group-hover:text-white group-hover:border-transparent transition-all">
                    Select AI Mode
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 3: CONFIRMATION & FULLSCREEN --- */}
        {step === 3 && selectedQuestion && (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="w-full max-w-lg bg-[#1a1d26]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Internal Glow for Card */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent ${
                  examMode === "ai" ? "via-fuchsia-500" : "via-indigo-500"
                } to-transparent opacity-50`}
              ></div>

              <div className="text-center space-y-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center border shadow-[0_0_30px_rgba(0,0,0,0.2)] ${
                    examMode === "ai"
                      ? "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"
                      : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                  }`}
                >
                  <Maximize2 size={36} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Start {examMode === "ai" ? "AI" : "Normal"} Session
                  </h2>
                  <p className="text-gray-400 text-sm">
                    You are about to start a session for{" "}
                    <span
                      className={`font-bold ${
                        examMode === "ai"
                          ? "text-fuchsia-400"
                          : "text-indigo-400"
                      }`}
                    >
                      {selectedTopic.name}
                    </span>
                    .
                  </p>
                </div>

                <div className="bg-[#0f1117] p-5 rounded-xl text-left border border-white/5 shadow-inner">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">
                    Selected Question
                  </p>
                  <p className="text-sm font-mono text-gray-300 line-clamp-3 leading-relaxed">
                    {selectedQuestion.question}
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/10">
                  <AlertCircle
                    className="text-yellow-500 shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-xs text-yellow-200/70 text-left leading-relaxed">
                    Clicking Start will trigger <strong>Full Screen</strong>{" "}
                    mode. Please do not exit full screen until you complete the
                    session.
                  </p>
                </div>

                <button
                  onClick={handleStartExam}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r text-white font-bold text-sm tracking-widest uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3
                        ${
                          examMode === "ai"
                            ? "from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 shadow-fuchsia-500/20"
                            : "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/20"
                        }`}
                >
                  <Play size={18} fill="currentColor" />
                  Begin Exam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionPage;
