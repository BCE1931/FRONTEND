import React, { useState, useEffect } from "react";
import {
  getToken,
  getrefershtoken,
  saverefershtoken,
  saveToken,
} from "../UTILS/Local";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

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

  if (!topic) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <p className="text-red-600">
          No topic selected. Please go back and select a topic.
        </p>
      </div>
    );
  }

  const refreshtoken = async () => {
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/token/refresh`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ refreshtoken: getrefershtoken() }),
        }
      );
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
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/getwork/${topic}`,
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
    setShowList(true); // Automatically show list after selecting date
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

  const toggleList = () => {
    setShowList(!showList);
  };

  const selectQuestion = (i) => {
    setIndex(i);
    setShowList(false);
  };

  const ques = filteredQues[index] || {};

  const toggleModify = () => {
    navigate("/add", { state: { topic: topic, change: true, ques: ques } });
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white relative">
      {/* Top Navbar with Dates */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
          <button
            onClick={() => filterByDate("All")}
            className={`flex-shrink-0 px-3 py-1 rounded-full ${
              selectedDate === "All"
                ? "bg-purple-500 text-white"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {days.map((date, i) => (
            <button
              key={i}
              onClick={() => filterByDate(date)}
              className={`flex-shrink-0 px-3 py-1 rounded-full ${
                selectedDate === date
                  ? "bg-purple-500 text-white"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-center relative">
        {quesList.length > 0 ? (
          <>
            {/* Toggle Sidebar Button */}
            <button
              onClick={toggleList}
              className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 z-20 flex items-center"
            >
              <span>📋</span>
              <span className="hidden sm:inline text-sm font-medium ml-2">
                {ques.question}
              </span>
            </button>

            {/* Sidebar Question List */}
            {showList && (
              <div className="absolute bg-white text-black shadow-lg overflow-y-auto h-full p-4 z-10 left-0 top-0 w-4/5 sm:w-64">
                <h3 className="text-lg font-semibold mb-3">
                  Questions on:{" "}
                  <span className="text-purple-600 font-bold">
                    {selectedDate}
                  </span>
                </h3>
                <ul className="space-y-2 overflow-y-auto max-h-[70vh] pr-2">
                  {filteredQues.map((q, i) => (
                    <li
                      key={i}
                      onClick={() => selectQuestion(i)}
                      className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                        i === index
                          ? "bg-purple-200 font-semibold"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <span>{q.question || `Question ${i + 1}`}</span>
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

            {/* Question Card */}
            <div className="relative w-[450px] h-full bg-white text-black rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Top half: Question and Info */}
                <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
                  <h2 className="text-lg font-semibold mb-2 text-center whitespace-pre-wrap">
                    {ques.question || "No question text"}
                  </h2>
                  <p className="text-sm text-gray-700 text-center whitespace-pre-wrap">
                    {ques.questioninfo || "No additional info available"}
                  </p>
                </div>

                {/* Bottom half: Logic */}
                <div className="flex-1 overflow-y-auto p-4">
                  <h3 className="text-md font-medium mb-1">Logic</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {ques.logic || "No logic added yet"}
                  </p>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 flex flex-col gap-4">
                <button
                  onClick={toggleModify}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3"
                >
                  ✏️
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-white text-xl animate-pulse">
              Loading questions...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Otherdisply;
