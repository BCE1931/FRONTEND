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
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";

const Quesdisply = () => {
  const [quesList, setQuesList] = useState([]);
  const [filteredQues, setFilteredQues] = useState([]);
  const [index, setIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [topics1, settopics1] = useState([]);
  const [days, setdays] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showDates, setShowDates] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [isFetching, setisFetching] = useState(false);

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

  const toggleDates = () => {
    setShowDates(!showDates);
  };
  const getquestions = async () => {
    try {
      setisFetching(true);
      const resp = await fetch(`${BASE_URL}/api/v1/questions`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) {
          return getquestions();
        } else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("Error in fetching questions");
      }
      const data = await resp.json();
      setQuesList(data);
      setFilteredQues(data);
    } catch (err) {
      console.log("Error connecting to backend while fetching questions");
    } finally {
      setisFetching(false);
    }
  };

  const refreshtoken = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/token/refresh`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          refreshtoken: getrefershtoken(),
        }),
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

  const ques = filteredQues[index] || {};

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
        if (suxxess) {
          return getworkquestions();
        } else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("Error in fetching questions");
      }
      const data = await resp.json();
      console.log(data);
      const uniqueDates = [...new Set(data.map((item) => item.date))];
      setdays(uniqueDates);
      // setQuesList(data);
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
        // method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "application/json",
        },
        // body: JSON.stringify({
        //   famousplace: place,
        //   date: date,
        // }),
      });
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        console.log(suxxess);
        if (suxxess) {
          return getworktopics();
        } else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("error in fetching in topics");
      }
      // console.log(resp);
      const data = await resp.json();
      console.log("YOUR TOPICS", data);
      const subtopics = data.map((item) => ({
        topic: item.subtopic,
        count: item.ques,
      }));
      console.log("SUBTOPICS ONLY", subtopics);
      settopics1(subtopics);
    } catch (err) {
      console.log("error in connected to backend while fetching in topics");
    }
  };

  // const getworkdays=

  useEffect(() => {
    if (location.state?.work) {
      getworktopics();
      getworkquestions();
      // getworkdays();
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
      getworktopics(); // Reset topics to all
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

  const toggleAttempted = () => {
    console.log("Mark as attempted");
    // handle attempted toggle logic here
  };

  const toggleWork = () => {
    console.log("Toggle work/normal");
    // handle work toggle logic here
  };

  const toggleList = () => {
    setShowList(!showList);
  };

  const toggleTopics = () => {
    setShowTopics(!showTopics);
  };

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
    setIndex(0); // Reset index to show first question of filtered list
  };

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

  const handlenavigate = () => {
    navigate("/add", { state: { topic: "DSA", changes: false, ques: "" } });
  };

  return (
    <div className="relative flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0a0a0a] text-white overflow-hidden">
      {/* 🔄 Loading State */}
      {isFetching ? (
        <div className="flex flex-col justify-center items-center text-center w-full">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-lg text-indigo-300 font-semibold">
            Fetching your records...
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Please wait while your questions load.
          </p>
        </div>
      ) : quesList && Array.isArray(quesList) && quesList.length === 0 ? (
        // ❌ No Previous Work Found
        <div className="flex flex-col justify-center items-center text-center bg-white/10 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-4 w-full">
          <h2 className="text-xl font-semibold text-indigo-400">
            No Previous Work Found
          </h2>
          <p className="text-gray-300 text-sm max-w-sm">
            You haven’t added any work yet. Let’s start now!
          </p>
          <Button
            onClick={() => handlenavigate()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg"
          >
            ➕ Add New Work
          </Button>
        </div>
      ) : quesList.length > 0 ? (
        <>
          {/* 📋 Sidebar Toggle Button */}
          <Button
            onClick={() => setShowList(!showList)}
            className="fixed top-4 left-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-40 sm:hidden"
          >
            {showList ? "✖️" : "📋"}
          </Button>

          {/* 🧭 Sidebar */}
          <aside
            className={`fixed left-0 top-0 h-full w-64 sm:w-72 bg-[#0b1121]/90 backdrop-blur-md 
          border-r border-gray-800 shadow-lg flex flex-col overflow-hidden transition-transform duration-300 
          z-30 ${
            showList ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
          >
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-semibold text-indigo-400 mb-4 flex items-center gap-2">
                <span>📘</span> Questions
              </h2>

              {/* Filters */}
              <div className="space-y-3">
                {/* Date Filter */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Selected Date: {selectedDate}
                  </p>
                  <Button
                    onClick={toggleDates}
                    className="w-full text-left bg-gray-800/70 hover:bg-gray-700 text-gray-100 rounded-lg text-sm"
                  >
                    {showDates ? "Hide Dates ▲" : "Show Dates ▼"}
                  </Button>
                  {showDates && (
                    <ul className="mt-2 bg-gray-900/70 rounded-lg p-2 max-h-[100px] overflow-y-auto scrollbar-visible">
                      <li
                        onClick={() => filterByDate("All")}
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
                          selectedDate === "All" ? "bg-indigo-600" : ""
                        }`}
                      >
                        All Dates
                      </li>
                      {days.map((d, i) => (
                        <li
                          key={i}
                          onClick={() => filterByDate(d)}
                          className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
                            selectedDate === d ? "bg-indigo-600" : ""
                          }`}
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Topic Filter */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Selected Topic: {selectedTopic}
                  </p>
                  <Button
                    onClick={toggleTopics}
                    className="w-full text-left bg-gray-800/70 hover:bg-gray-700 text-gray-100 rounded-lg text-sm"
                  >
                    {showTopics ? "Hide Topics ▲" : "Show Topics ▼"}
                  </Button>
                  {showTopics && (
                    <ul className="mt-2 bg-gray-900/70 rounded-lg p-2 max-h-[100px] overflow-y-auto scrollbar-visible">
                      <li
                        onClick={() => filterByTopic("All")}
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
                          selectedTopic === "All" ? "bg-indigo-600" : ""
                        }`}
                      >
                        All
                      </li>
                      {topics1.map((t, i) => (
                        <li
                          key={i}
                          onClick={() => filterByTopic(t.topic)}
                          className={`cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-between ${
                            selectedTopic === t.topic ? "bg-indigo-600" : ""
                          }`}
                        >
                          <span>{t.topic}</span>
                          <span className="text-gray-400 text-sm">
                            {t.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Questions List */}
              <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-1 scrollbar-visible">
                {filteredQues.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => selectQuestion(i)}
                    className={`cursor-pointer p-2 rounded-lg flex justify-between items-center transition-all ${
                      i === index
                        ? "bg-indigo-600/70 font-semibold"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    <span className="truncate text-sm">{q.question}</span>
                    <span className="flex items-center">
                      {q.important && (
                        <span className="text-yellow-400 ml-1">⭐</span>
                      )}
                      {q.attempted && (
                        <span className="text-green-400 ml-1">✅</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 🧠 Main Question Card */}
          <main
            className="flex-1 flex justify-center items-center px-4 sm:px-8 ml-0 sm:ml-72 transition-all duration-300"
            onClick={() => {
              if (showList && window.innerWidth < 640) setShowList(false);
            }}
          >
            <div className="relative w-full sm:w-[500px] h-[90vh] bg-[#0b0f1a]/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-[0_0_25px_rgba(99,102,241,0.2)] flex flex-col overflow-hidden">
              {/* --- Top Half: Question Section --- */}
              <div className="flex-1 max-h-[50%] p-6 overflow-y-auto scrollbar-visible border-b border-gray-700">
                <h2 className="text-lg font-semibold text-center mb-3 text-indigo-300">
                  {ques.question}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {ques.questioninfo || "No additional info available"}
                </p>
              </div>

              {/* --- Bottom Half: Logic Section --- */}
              <div className="flex-1 max-h-[50%] p-6 overflow-y-auto scrollbar-visible">
                <h3 className="text-md font-medium text-indigo-400 mb-2">
                  Logic
                </h3>
                <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {ques.logic || "No logic added yet"}
                </p>
              </div>

              {/* --- Floating Buttons --- */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <Button
                  onClick={toggleModify}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-md"
                >
                  ✏️
                </Button>
                <Button
                  onClick={toggleAttempted}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-md"
                >
                  ✅
                </Button>
                <a
                  href={ques.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-md flex items-center justify-center"
                >
                  🔗
                </a>
                <Button
                  onClick={toggleWork}
                  className={`${
                    ques.work ? "bg-yellow-400" : "bg-gray-600"
                  } hover:opacity-90 text-white rounded-full p-3 shadow-md`}
                >
                  🛠️
                </Button>
              </div>
            </div>
          </main>
        </>
      ) : (
        <p className="text-gray-400 text-center w-full">Loading questions...</p>
      )}
    </div>
  );
};

export default Quesdisply;
