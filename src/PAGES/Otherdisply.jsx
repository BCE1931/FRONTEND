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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Otherdisply = () => {
  const [quesList, setQuesList] = useState([]);
  const [filteredQues, setFilteredQues] = useState([]);
  const [index, setIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [days, setdays] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const topic = location.state?.topic;

  useEffect(() => {
    console.log(topic);
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

  const getworkquestions = async () => {
    try {
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
      const uniqueDates = [...new Set(data.map((item) => item.date))];
      setdays(uniqueDates);
      setQuesList(data);
      setFilteredQues(data);
    } catch {
      console.log("Error fetching questions");
    }
  };

  useEffect(() => {
    getworkquestions();
  }, []);

  const filterByDate = (date) => {
    setSelectedDate(date);
    const filtered =
      date === "All" ? quesList : quesList.filter((q) => q.date === date);
    setFilteredQues(filtered);
    setIndex(0);
    setShowList(true);
  };

  const ques = filteredQues[index] || {};

  const toggleModify = () => {
    navigate("/add", { state: { topic: topic, change: true, ques: ques } });
  };

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

  // ⬆️⬇️ Swipe gesture detection like Instagram stories
  useEffect(() => {
    let startY = 0;
    let endY = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      endY = e.changedTouches[0].clientY;
      const diff = startY - endY;

      if (Math.abs(diff) > 50) {
        // Swipe up
        if (diff > 0) {
          setIndex((prev) =>
            prev < filteredQues.length - 1 ? prev + 1 : prev
          );
        }
        // Swipe down
        else {
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

  return (
    <div className="relative flex flex-col min-h-[100dvh] sm:h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white overflow-hidden">
      {/* 🔹 Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/40 backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-indigo-400 tracking-wide">
          📘 {topic}
        </h1>
        <div className="flex space-x-2 overflow-x-auto scrollbar-thin">
          <Button
            onClick={() => filterByDate("All")}
            variant={selectedDate === "All" ? "default" : "outline"}
            className={`text-sm px-4 py-1 ${
              selectedDate === "All"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "border-gray-700 text-gray-300 hover:text-white"
            }`}
          >
            All
          </Button>
          {days.map((date, i) => (
            <Button
              key={i}
              onClick={() => filterByDate(date)}
              variant={selectedDate === date ? "default" : "outline"}
              className={`text-sm px-4 py-1 ${
                selectedDate === date
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "border-gray-700 text-gray-300 hover:text-white"
              }`}
            >
              {date}
            </Button>
          ))}
        </div>
      </header>

      {/* 🔹 Main Content */}
      <main className="flex-1 flex justify-center items-center relative p-4 sm:p-8">
        {quesList.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <p className="text-gray-300 text-sm">Fetching your records...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl flex flex-col sm:flex-row gap-6"
          >
            {/* Sidebar */}
            {/* Sidebar — moved to extreme left and made slightly taller */}
            <motion.aside
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`absolute left-0 top-0 bottom-0 bg-[#0b1121]/90 backdrop-blur-xl border border-gray-800 rounded-r-2xl p-4 w-[270px] sm:w-[280px] shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 ${
                showList ? "block" : "hidden sm:block"
              }`}
            >
              <h2 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                🗂️ Questions
              </h2>
              <ScrollArea className="h-[78vh] pr-2 space-y-2">
                {filteredQues.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIndex(i);
                      setShowList(false);
                    }}
                    className={`cursor-pointer p-3 rounded-lg text-sm transition-all ${
                      i === index
                        ? "bg-indigo-600/80 text-white font-semibold"
                        : "hover:bg-gray-800 text-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{q.question}</span>
                      <div className="flex gap-1">
                        {q.important && <Badge>⭐</Badge>}
                        {q.attempted && <Badge variant="secondary">✅</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </motion.aside>

            {/* Question Card */}
            {/* Question Card — reduced width */}
            <Card className="w-[60%] bg-[#0b0f1a]/80 border border-gray-800 shadow-[0_0_25px_rgba(99,102,241,0.25)] rounded-3xl overflow-hidden backdrop-blur-xl text-white mx-auto">
              <CardHeader className="border-b border-gray-700 p-5">
                <CardTitle className="text-lg font-semibold text-indigo-300 text-center">
                  {ques.question || "No question text"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-[65vh] sm:h-[70vh] overflow-hidden">
                {/* Question Info */}
                <ScrollArea className="flex-1 border-b border-gray-800 p-4 overflow-y-auto">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {ques.questioninfo || "No additional info available."}
                  </p>
                </ScrollArea>

                {/* Logic */}
                <ScrollArea className="flex-1 p-4 overflow-y-auto">
                  <h3 className="text-md font-medium text-indigo-400 mb-2">
                    Logic
                  </h3>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {ques.logic || "No logic added yet."}
                  </p>
                </ScrollArea>
              </CardContent>

              {/* Floating Action */}
              <div className="absolute right-5 bottom-5 flex gap-3">
                <Button
                  onClick={toggleModify}
                  className="bg-yellow-500 hover:bg-yellow-600 rounded-full p-3 shadow-lg"
                >
                  ✏️
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Otherdisply;
