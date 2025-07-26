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
      setQuesList(data);
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
          // method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          // body: JSON.stringify({
          //   famousplace: place,
          //   date: date,
          // }),
        }
      );
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

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      {quesList.length > 0 ? (
        <>
          {/* Side Button with Question Text */}
          <button
            onClick={toggleList}
            className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 z-20 flex items-center"
          >
            <span>📋</span>
            <span className="hidden sm:inline text-sm font-medium">
              {ques.question}
            </span>
          </button>

          {/* Questions List Panel */}
          {showList && (
            <div
              className="absolute bg-white shadow-lg overflow-y-auto h-full p-4 z-10
              left-0 top-0 w-4/5 sm:w-64"
            >
              <h3 className="text-lg font-semibold mb-2">All Questions</h3>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Selected Date:</span>{" "}
                  {selectedDate}
                </p>
              </div>

              <div className="mb-4">
                <button
                  onClick={toggleDates}
                  className="w-full bg-gray-200 text-left px-3 py-2 rounded"
                >
                  {showDates ? "Hide Dates ▼" : "Show Dates ▲"}
                </button>
                {showDates && (
                  <ul className="mt-2 space-y-1 bg-green-50 rounded p-2">
                    <li
                      onClick={() => filterByDate("All")}
                      className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${
                        selectedDate === "All"
                          ? "bg-green-100 font-semibold"
                          : ""
                      }`}
                    >
                      All Dates
                    </li>
                    {days.map((d, i) => (
                      <li
                        key={i}
                        onClick={() => filterByDate(d)}
                        className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${
                          selectedDate === d ? "bg-green-100 font-semibold" : ""
                        }`}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Display Selected Topic */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Selected Topic:</span>{" "}
                  {selectedTopic}
                </p>
              </div>

              {/* Topics Dropdown */}
              <div className="mb-4">
                <button
                  onClick={toggleTopics}
                  className="w-full bg-gray-200 text-left px-3 py-2 rounded"
                >
                  {showTopics ? "Hide Topics ▼" : "Show Topics ▲"}
                </button>

                {showTopics && (
                  <ul className="mt-2 space-y-1 bg-blue-50 rounded p-2">
                    <li
                      onClick={() => filterByTopic("All")}
                      className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${
                        selectedTopic === "All"
                          ? "bg-purple-100 font-semibold"
                          : ""
                      }`}
                    >
                      All
                    </li>
                    {topics1.map((t, i) => (
                      <li
                        key={i}
                        onClick={() => filterByTopic(t.topic)}
                        className={`cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between ${
                          selectedTopic === t.topic
                            ? "bg-purple-100 font-semibold"
                            : ""
                        }`}
                      >
                        <span>{t.topic}</span>
                        <span className="text-sm text-gray-600">{t.count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ul className="space-y-2 overflow-y-auto max-h-[60vh] pr-2">
                {filteredQues.map((q, i) => (
                  <li
                    key={i}
                    onClick={() => selectQuestion(i)}
                    className={`cursor-pointer p-2 rounded flex items-center justify-between
                    ${
                      i === index
                        ? "bg-purple-200 font-semibold"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <span>{q.question}</span>
                    <span>
                      {q.important && (
                        <span className="text-red-500 ml-1">⭐</span>
                      )}
                      {q.attempted && (
                        <span className="text-green-500 ml-1">✅</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Card */}
          <div className="relative w-[450px] h-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Top half: Question and Question Info */}
              <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  {ques.question}
                </h2>
                <p className="text-sm text-gray-700 text-center">
                  {ques.questioninfo || "No additional info available"}
                </p>
              </div>

              {/* Bottom half: Logic */}
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-md font-medium mb-1">Logic</h3>
                <p className="text-sm text-gray-600">
                  {ques.logic || "No logic added yet"}
                </p>
              </div>
            </div>

            {/* Side Buttons at Bottom Right */}
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
