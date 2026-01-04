import React from "react";
import { Button } from "@/components/ui/button";

const WorkHeader = ({ topic, days, selectedDate, filterByDate }) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800 bg-black/60 backdrop-blur-lg z-30">
      <h1 className="text-2xl font-semibold text-indigo-400 tracking-wide truncate">
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
  );
};

export default WorkHeader;
