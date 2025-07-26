import React, { useState, useEffect } from "react";
import {
  getToken,
  getrefershtoken,
  saverefershtoken,
  saveToken,
} from "../UTILS/Local";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

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

  // Touch swipe logic
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEndY(e.touches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStartY || !touchEndY) return;

    const distance = touchStartY - touchEndY;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setIndex((prev) => (prev < filteredQues.length - 1 ? prev + 1 : prev));
      } else {
        setIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    }

    setTouchStartY(null);
    setTouchEndY(null);
  };

  const topics = [
    /* ... your full topics list as before ... */
  ];

  const toggleDates = () => {
    setShowDates(!showDates);
  };

  const getquestions = async () => {
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/questions`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return getquestions();
        toast.error("Unable to refresh token.");
        navigate("/");
      }
      if (!resp.ok) return console.log("Error in fetching questions");
      const data = await resp.json();
      setQuesList(data);
      setFilteredQues(data);
    } catch (err) {
      console.log("Error connecting to backend while fetching questions");
    }
  };

  const refreshtoken = async () => {
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            refreshtoken: getrefershtoken(),
          }),
        }
      );
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
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/getdsawork`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return getworkquestions();
        toast.error("Unable to refresh token.");
        navigate("/");
      }
      if (!resp.ok) return console.log("Error in fetching questions");
      const data = await resp.json();
      const uniqueDates = [...new Set(data.map((item) => item.date))];
      setdays(uniqueDates);
      setQuesList(data);
      setFilteredQues(data);
    } catch (err) {
      console.log("Error connecting to backend while fetching questions");
    }
  };

  const getworktopics = async () => {
    try {
      const topic = "DSA";
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/topics/${topic}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return getworktopics();
        toast.error("Unable to refresh token.");
        navigate("/");
      }
      if (!resp.ok) return console.log("error in fetching in topics");
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
  };

  const toggleWork = () => {
    console.log("Toggle work/normal");
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
    setIndex(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      {quesList.length > 0 ? (
        <>
          <button
            onClick={toggleList}
            className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 z-20 flex items-center"
          >
            <span>📋</span>
            <span className="hidden sm:inline text-sm font-medium">
              {ques.question}
            </span>
          </button>

          {showList && (
            <div className="absolute bg-white shadow-lg overflow-y-auto h-full p-4 z-10 left-0 top-0 w-4/5 sm:w-64">
              {/* Sidebar with date/topic filters */}
              {/* ... unchanged from your existing code ... */}
            </div>
          )}

          <div
            className="relative w-[450px] h-full bg-white rounded-xl shadow-lg overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  {ques.question}
                </h2>
                <p className="text-sm text-gray-700 text-center">
                  {ques.questioninfo || "No additional info available"}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-md font-medium mb-1">Logic</h3>
                <p className="text-sm text-gray-600">
                  {ques.logic || "No logic added yet"}
                </p>
              </div>
            </div>

            <div className="absolute right-4 bottom-4 flex flex-col gap-4">
              <button
                onClick={toggleAttempted}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
              >
                ✅
              </button>

              <a
                href={ques.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 flex items-center justify-center"
              >
                🔗
              </a>

              <button
                onClick={toggleWork}
                className={`${
                  ques.work ? "bg-yellow-400" : "bg-gray-400"
                } hover:opacity-80 text-white rounded-full p-3`}
              >
                🛠️
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white">Loading questions...</p>
      )}
    </div>
  );
};

export default Quesdisply;
