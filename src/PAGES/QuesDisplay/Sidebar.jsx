import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Sidebar = ({
  showList,
  selectedDate,
  showDates,
  days,
  toggleDates,
  filterByDate,
  selectedTopic,
  showTopics,
  topics1,
  toggleTopics,
  filterByTopic,
  filteredQues,
  currentIndex,
  selectQuestion,
}) => {
  useEffect(() => {
    console.log("hi hti sis side bar");
  }, []);
  return (
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
                    <span className="text-gray-400 text-sm">{t.count}</span>
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
                i === currentIndex
                  ? "bg-indigo-600/70 font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <span className="truncate text-sm">{q.question}</span>
              <span className="flex items-center">
                {q.important && (
                  <span className="text-yellow-400 ml-1">⭐</span>
                )}
                {q.attempted && <span className="text-green-400 ml-1">✅</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
