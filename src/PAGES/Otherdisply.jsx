import React, { useState, useEffect } from "react";
import {
  getToken,
  getrefershtoken,
  saverefershtoken,
  saveToken,
} from "../index";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../UTILS/config";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Loader2, Copy } from "lucide-react"; // Updated icons
import { motion } from "framer-motion";

// Sub-components
import WorkHeader from "./QuesDisplay/WorkHeader";
import EmptyWorkState from "./QuesDisplay/EmptyWorkState";
import LoadingSpinner from "./QuesDisplay/LoadingSpinner";
import DesktopStack from "./QuesDisplay/DesktopStack";
import CompareView from "./QuesDisplay/CompareView";

const Otherdisply = () => {
  const [quesList, setQuesList] = useState([]);
  const [filteredQues, setFilteredQues] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("All");
  const [days, setdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompareMode, setIsCompareMode] = useState(false);

  // --- Code 1 Specific State ---
  const [showList, setShowList] = useState(false);

  // --- Code 2 Logic: Device & View State ---
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' or 'detailed'

  const navigate = useNavigate();
  const location = useLocation();
  const topic = location.state?.topic;

  // --- Code 2 Logic: Device Detection ---
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768;
      setIsDesktop(desktop);
      // Logic: If mobile, FORCE detailed view.
      // If desktop, respect user choice (defaults to carousel).
      if (!desktop) {
        setViewMode("detailed");
        setIsCompareMode(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Code 2 Logic: Toggle Function ---
  const toggleViewMode = () => {
    if (isDesktop) {
      setViewMode((prev) => (prev === "carousel" ? "detailed" : "carousel"));
    }
  };

  useEffect(() => {
    console.log("Selected Topic:", topic);
  }, []);

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        <Card className="bg-black/60 border border-gray-700 shadow-lg p-8">
          <CardTitle className="text-red-400 text-lg font-semibold">
            ⚠️ No topic selected
          </CardTitle>
          <p className="text-gray-300 mt-3">
            Please go back and choose a topic to view your notes.
          </p>
        </Card>
      </div>
    );
  }

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

  const handlenavigate = () => {
    navigate("/add", { state: { topic: topic, changes: false, ques: "" } });
  };

  const getworkquestions = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `${BASE_URL}/api/v1/getwork/${encodeURIComponent(topic)}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
        }
      );

      if (resp.status === 401) {
        const success = await refreshtoken();
        if (success) return getworkquestions();
        toast.error("Unable to refresh token.");
        return navigate("/");
      }

      const data = await resp.json();

      if (!data || data.length === 0) {
        setQuesList([]);
        toast.info(`No records found for ${topic}.`);
        setLoading(false);
        return;
      }

      const uniqueDates = [...new Set(data.map((item) => item.date))];
      setdays(uniqueDates);
      setQuesList(data);
      setFilteredQues(data);
    } catch (error) {
      console.log("Error fetching questions", error);
      toast.error("Error fetching questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getworkquestions();
  }, []);

  const handleCompareClick = () => {
    setIsCompareMode(true);
  };

  const filterByDate = (date) => {
    setSelectedDate(date);
    const filtered =
      date === "All" ? quesList : quesList.filter((q) => q.date === date);
    setFilteredQues(filtered);
    setIndex(0);
    // On mobile, show list after filtering to let user pick
    if (!isDesktop) setShowList(true);
  };

  const toggleModify = (specificQues = null) => {
    const targetQues =
      specificQues && specificQues._id ? specificQues : filteredQues[index];

    if (targetQues) {
      navigate("/add", {
        state: { topic: topic, change: true, ques: targetQues },
      });
    }
  };

  const toggleAttempted = (specificQues) => {
    toast.info("Attempted status toggle clicked");
  };

  // --- Logic: Swipe Navigation (Unified) ---
  useEffect(() => {
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e) => {
      // Only enable vertical swipe nav in Desktop Stack mode or Question View
      // We don't want to mess up scrolling in the list view
      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      const elapsed = Date.now() - startTime;
      const minDistance = 120;
      const maxTime = 500;

      if (Math.abs(diff) >= minDistance && elapsed <= maxTime) {
        if (diff > 0) {
          setIndex((prev) =>
            prev < filteredQues.length - 1 ? prev + 1 : prev
          );
        } else {
          setIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [filteredQues.length]);

  // --- Logic: Keyboard Navigation (Unified) ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === "ArrowDown") {
        setIndex((prev) => (prev < filteredQues.length - 1 ? prev + 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredQues.length]);

  // Define current question for the Code 1 view logic
  const ques = filteredQues[index] || {};

  return (
    <div className="relative flex flex-col h-[100dvh] sm:h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white overflow-hidden">
      {isCompareMode && isDesktop && (
        <CompareView
          question={filteredQues} // Passing the array as 'question' per your request
          onClose={() => setIsCompareMode(false)}
          toggleModify={toggleModify} // Required by DesktopStack
          toggleAttempted={toggleAttempted} // Required by DesktopStack
        />
      )}
      {/* --- Code 2 Logic: Toggle Button (Desktop Only) --- */}
      {isDesktop && !loading && filteredQues.length > 0 && (
        <div className="fixed top-20 right-4 z-50 flex gap-3">
          <Button
            onClick={handleCompareClick}
            variant="outline"
            className="bg-gray-900/80 backdrop-blur border-gray-700 text-green-400 hover:bg-green-900/30 flex gap-2 items-center rounded-full px-4"
          >
            <Copy size={16} /> Compare
          </Button>
          <Button
            onClick={toggleViewMode}
            variant="outline"
            className="bg-gray-900/80 backdrop-blur border-gray-700 text-indigo-400 hover:bg-indigo-900/30 flex gap-2 items-center rounded-full px-4"
          >
            {viewMode === "carousel" ? (
              <>
                <Smartphone size={16} /> Switch to Split View
              </>
            ) : (
              <>
                <Monitor size={16} /> Switch to Stack View
              </>
            )}
          </Button>
        </div>
      )}

      {/* Header */}
      <WorkHeader
        topic={topic}
        days={days}
        selectedDate={selectedDate}
        filterByDate={filterByDate}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center items-stretch relative p-0 overflow-hidden h-full">
        {loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <LoadingSpinner />
          </div>
        ) : filteredQues.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full p-6">
            <EmptyWorkState onNavigate={handlenavigate} />
          </div>
        ) : (
          <>
            {/* --- VIEW MODE 1: DESKTOP STACK (CAROUSEL) --- */}
            {viewMode === "carousel" && isDesktop ? (
              <DesktopStack
                questions={filteredQues}
                toggleModify={toggleModify}
                toggleAttempted={toggleAttempted}
                index={index}
              />
            ) : (
              /* --- VIEW MODE 2: SPLIT/LIST VIEW (For Mobile & Desktop Detailed) --- */
              <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-6 h-full p-3 sm:p-6">
                {/* Sidebar */}
                <motion.aside
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`h-full bg-[#0b1121]/95 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 w-[260px] sm:w-[280px] shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 z-20 ${
                    showList
                      ? "block fixed left-0 top-0 h-full w-[85%] z-50 m-0 rounded-none sm:rounded-2xl sm:relative sm:w-[280px]"
                      : "hidden sm:block"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                      🗂️ Questions
                    </h2>
                    {/* Close button for mobile sidebar */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="sm:hidden text-gray-400 hover:text-white"
                      onClick={() => setShowList(false)}
                    >
                      ✕
                    </Button>
                  </div>

                  <ScrollArea className="h-[calc(100%-3rem)] pr-2 space-y-2">
                    {filteredQues.map((q, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setIndex(i);
                          setShowList(false);
                        }}
                        className={`cursor-pointer p-3 rounded-lg text-sm transition-all border border-transparent ${
                          i === index
                            ? "bg-indigo-600/80 text-white font-semibold shadow-md border-indigo-500/50"
                            : "hover:bg-gray-800 text-gray-300 hover:border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-center gap-2">
                          <span className="truncate flex-1">
                            {q.questioninfo}
                          </span>
                          <div className="flex gap-1 shrink-0">
                            {q.important && (
                              <Badge
                                variant="outline"
                                className="border-yellow-500/50 text-yellow-500 text-[10px] px-1"
                              >
                                ⭐
                              </Badge>
                            )}
                            {q.attempted && (
                              <Badge
                                variant="secondary"
                                className="bg-green-500/20 text-green-400 text-[10px] px-1"
                              >
                                ✅
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </motion.aside>

                {/* Overlay for mobile sidebar */}
                {showList && (
                  <div
                    className="fixed inset-0 bg-black/60 z-40 sm:hidden backdrop-blur-sm"
                    onClick={() => setShowList(false)}
                  />
                )}

                {/* Question Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 h-full flex flex-col relative"
                >
                  {/* Mobile: Button to open Sidebar */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="sm:hidden mb-2 self-start border-gray-700 bg-gray-900/50 text-indigo-300 backdrop-blur-md"
                    onClick={() => setShowList(true)}
                  >
                    📂 Select Question
                  </Button>

                  <Card className="flex-1 h-full bg-[#0b0f1a]/80 border border-gray-800 shadow-[0_0_25px_rgba(99,102,241,0.25)] rounded-3xl overflow-hidden backdrop-blur-xl text-white flex flex-col">
                    <CardHeader className="border-b border-gray-700 px-3 py-2 sm:px-4 sm:py-3 bg-black/20">
                      <CardTitle className="text-base sm:text-lg font-medium text-indigo-300 text-center leading-snug truncate">
                        {ques.questioninfo || "No question text"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1 overflow-hidden p-0">
                      {/* Top Half: Question Info */}
                      <ScrollArea className="flex-1 border-b border-gray-800 p-4 overflow-y-auto overflow-x-hidden">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                          📌 Question
                        </h3>
                        <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed break-words">
                          {ques.question || "No additional info available."}
                        </p>
                      </ScrollArea>

                      {/* Bottom Half: Logic */}
                      <ScrollArea className="flex-1 p-4 overflow-y-auto overflow-x-hidden bg-black/10">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                          💡 Logic
                        </h3>
                        <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed break-words font-mono">
                          {ques.logic || "No logic added yet."}
                        </p>
                      </ScrollArea>
                    </CardContent>

                    {/* Edit Button */}
                    <div className="absolute right-5 bottom-5 z-10">
                      <Button
                        onClick={() => toggleModify(ques)}
                        className="bg-yellow-500 hover:bg-yellow-600 rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
                      >
                        ✏️
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Otherdisply;
