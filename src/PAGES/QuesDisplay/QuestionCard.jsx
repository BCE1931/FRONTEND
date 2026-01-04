import React from "react";
import { Button } from "@/components/ui/button";

const QuestionCard = ({
  ques,
  toggleModify,
  toggleAttempted,
  toggleWork,
  showList,
  handleMainClick,
}) => {
  return (
    <main
      className="flex-1 flex justify-center items-center px-4 sm:px-8 ml-0 sm:ml-72 transition-all duration-300"
      onClick={handleMainClick}
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
          <h3 className="text-md font-medium text-indigo-400 mb-2">Logic</h3>
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
  );
};

export default QuestionCard;
