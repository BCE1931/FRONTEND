import React, { useState, useEffect } from "react";
import {
  getToken,
  getrefershtoken,
  saverefershtoken,
  saveToken,
} from "../../index";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../UTILS/config";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react"; // Make sure to install lucide-react or use standard emojis

// Sub-components
import LoadingSpinner from "./LoadingSpinner";
import EmptyWorkState from "./EmptyWorkState";
import Sidebar from "./Sidebar";
import QuestionCard from "./QuestionCard";
import DesktopStack from "./DesktopStack"; // Import the new component

const Quesdisply = () => {
  const [quesList, setQuesList] = useState([]);
  const [filteredQues, setFilteredQues] = useState([]);
  const [index, setIndex] = useState(0);

  // UI State
  const [showList, setShowList] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showDates, setShowDates] = useState(false);

  // Filter State
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [topics1, settopics1] = useState([]);
  const [days, setdays] = useState([]);

  // View/Device State
  const [isFetching, setisFetching] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' or 'classic'

  const navigate = useNavigate();
  const location = useLocation();

  // Hardcoded topics (preserved from your code)
  const topics = [
    { topic: "Array", count: 18 },
    { topic: "Dynamic Programming", count: 16 },
    { topic: "Graph", count: 11 },
    { topic: "Hashing", count: 4 },
    { topic: "Interval", count: 6 },
    { topic: "Linked List", count: 21 },
    { topic: "Matrix", count: 7 },
    { topic: "Design", count: 5 },
    { topic: "Sorting", count: 5 },
    { topic: "String", count: 15 },
    { topic: "Stack", count: 12 },
    { topic: "Tree", count: 17 },
    { topic: "Heap", count: 6 },
    { topic: "Binary-Bit Manipulation", count: 5 },
    { topic: "Arrays & Hashing", count: 9 },
    { topic: "Two Pointers", count: 5 },
    { topic: "Sliding Window", count: 6 },
    { topic: "Binary Search", count: 7 },
    { topic: "Trees", count: 15 },
    { topic: "Tries", count: 3 },
    { topic: "Heap / Priority Queue", count: 7 },
    { topic: "Backtracking", count: 9 },
    { topic: "Graphs", count: 13 },
    { topic: "Advanced Graphs", count: 6 },
    { topic: "1-D Dynamic Programming", count: 12 },
    { topic: "2-D Dynamic Programming", count: 11 },
    { topic: "Greedy", count: 8 },
    { topic: "Intervals", count: 6 },
    { topic: "Math & Geometry", count: 8 },
    { topic: "Bit Manipulation", count: 7 },
  ];

  // --- Device Detection Logic ---
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768;
      setIsDesktop(desktop);
      // If we switch to mobile, force 'classic' view.
      // If desktop, we keep the user's preference or default to carousel.
      if (!desktop) {
        setViewMode("classic");
      } else if (viewMode === "classic" && desktop) {
        // Optional: Reset to carousel on resize to desktop, or keep "classic"
        // setViewMode("carousel");
      }
    };

    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleViewMode = () => {
    if (isDesktop) {
      setViewMode((prev) => (prev === "carousel" ? "classic" : "carousel"));
    }
  };

  // --- API & Logic Functions (Preserved) ---
  const toggleDates = () => setShowDates(!showDates);
  const toggleList = () => setShowList(!showList);
  const toggleTopics = () => setShowTopics(!showTopics);

  const getquestions = () => {
    // Existing logic commented out in your code, keeping strictly as provided
    console.log("tying to fetch question");
  };

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
    } catch (e) {
      console.log("Error in getting refresh token");
    }
  };

  const getworkquestions = async () => {
    try {
      setisFetching(true);
      const resp = await fetch(`${BASE_URL}/api/v1/getdsawork`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return getworkquestions();
        else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) console.log("Error in fetching questions");
      const data = await resp.json();
      const uniqueDates = [...new Set(data.map((item) => item.date))];
      setdays(uniqueDates);
      setQuesList(data);
      setFilteredQues(data);
    } catch (err) {
      console.log("Error connecting to backend while fetching questions");
    } finally {
      setisFetching(false);
    }
  };

  const getworktopics = async () => {
    try {
      const topic = "DSA";
      const resp = await fetch(`${BASE_URL}/api/v1/topics/${topic}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return getworktopics();
        else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) console.log("error in fetching in topics");
      const data = await resp.json();
      const subtopics = data.map((item) => ({
        topic: item.subtopic,
        count: item.ques,
      }));
      settopics1(subtopics);
    } catch (err) {
      console.log("error in connected to backend while fetching in topics");
    }
  };

  useEffect(() => {
    if (location.state?.work) {
      getworktopics();
      getworkquestions();
    } else {
      getquestions();
      settopics1(topics);
    }
  }, [location.state]);

  const filterByDate = (date) => {
    setSelectedDate(date);
    setShowDates(false);
    if (date === "All") {
      setFilteredQues(quesList);
      getworktopics();
    } else {
      const filtered = quesList.filter((q) => q.date === date);
      setFilteredQues(filtered);
      const subtopics = filtered.map((item) => ({
        topic: item.subtopic,
        count: 1,
      }));
      const uniqueSubtopics = [
        ...new Map(subtopics.map((item) => [item.topic, item])).values(),
      ];
      settopics1(uniqueSubtopics);
    }
    setIndex(0);
  };

  const toggleModify = () => {
    navigate("/add", { state: { topic: "DSA", change: true, ques: ques } });
  };

  const toggleAttempted = () => console.log("Mark as attempted");
  const toggleWork = () => console.log("Toggle work/normal");

  const selectQuestion = (i) => {
    setIndex(i);
    setShowList(false);
  };

  const filterByTopic = (topic) => {
    setSelectedTopic(topic);
    toggleTopics();
    if (topic === "All") {
      setFilteredQues(quesList);
    } else {
      const filtered = quesList.filter((q) => q.subtopic === topic);
      setFilteredQues(filtered);
    }
    setIndex(0);
  };

  const handlenavigate = () => {
    navigate("/add", { state: { topic: "DSA", changes: false, ques: "" } });
  };

  // Keyboard navigation
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

  // Touch navigation
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
        if (diff > 0)
          setIndex((prev) =>
            prev < filteredQues.length - 1 ? prev + 1 : prev
          );
        else setIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [filteredQues.length]);

  const handleMainClick = () => {
    if (showList && window.innerWidth < 640) setShowList(false);
  };

  const ques = filteredQues[index] || {};
  const nextQues = filteredQues[index + 1] || null;

  return (
    <div className="relative flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white overflow-hidden">
      {/* 🔄 Loading State */}
      {isFetching ? (
        <LoadingSpinner />
      ) : quesList && Array.isArray(quesList) && quesList.length === 0 ? (
        <EmptyWorkState onNavigate={handlenavigate} />
      ) : quesList.length > 0 ? (
        <>
          {/* --- VIEW MODE TOGGLER (Desktop Only) --- */}
          {isDesktop && (
            <div className="fixed top-4 right-4 z-50">
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

          {/* --- CONDITIONAL RENDERING --- */}

          {/* 1. Classic Mobile/Sidebar View */}
          {(viewMode === "classic" || !isDesktop) && (
            <>
              {/* Sidebar Toggle for Mobile */}
              <Button
                onClick={toggleList}
                className="fixed top-4 left-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-40 sm:hidden"
              >
                {showList ? "✖️" : "📋"}
              </Button>

              <Sidebar
                showList={showList}
                selectedDate={selectedDate}
                showDates={showDates}
                days={days}
                toggleDates={toggleDates}
                filterByDate={filterByDate}
                selectedTopic={selectedTopic}
                showTopics={showTopics}
                topics1={topics1}
                toggleTopics={toggleTopics}
                filterByTopic={filterByTopic}
                filteredQues={filteredQues}
                currentIndex={index}
                selectQuestion={selectQuestion}
              />

              <QuestionCard
                ques={ques}
                toggleModify={toggleModify}
                toggleAttempted={toggleAttempted}
                toggleWork={toggleWork}
                showList={showList}
                handleMainClick={handleMainClick}
              />
            </>
          )}

          {/* 2. Desktop Stacked Carousel View */}
          {viewMode === "carousel" && isDesktop && (
            <DesktopStack
              questions={filteredQues}
              nextQues={nextQues}
              toggleModify={toggleModify}
              toggleAttempted={toggleAttempted}
              toggleWork={toggleWork}
            />
          )}
        </>
      ) : (
        <p className="text-gray-400 text-center w-full">Loading questions...</p>
      )}
    </div>
  );
};

export default Quesdisply;
