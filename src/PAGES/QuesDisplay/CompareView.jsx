import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopStack from "./DesktopStack"; // Ensure path is correct

const CompareView = ({
  question = [],
  onClose,
  toggleModify,
  toggleAttempted,
}) => {
  if (!question || question.length === 0) return null;

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const handleNav = (side, direction) => {
    if (side === "left") {
      const newIndex = leftIndex + direction;
      if (newIndex >= 0 && newIndex < question.length) setLeftIndex(newIndex);
    } else {
      const newIndex = rightIndex + direction;
      if (newIndex >= 0 && newIndex < question.length) setRightIndex(newIndex);
    }
  };

  const SplitPane = ({ index, side }) => (
    <div className="flex-1 flex flex-col h-full bg-[#0b0f1a] relative overflow-hidden group">
      {/* Header Overlay */}
      <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-300 pointer-events-none">
        {index + 1} / {question.length}
      </div>

      <div className="flex-1 relative w-full h-full">
        <div className="absolute inset-0">
          <DesktopStack
            questions={question}
            index={index}
            toggleModify={toggleModify}
            toggleAttempted={toggleAttempted}
            isCompareMode={true} // 👈 THIS TRIGGERS THE FULL-WIDTH LAYOUT
          />
        </div>

        {/* Controls Overlay */}
        <div className="absolute inset-x-6 bottom-8 flex justify-between z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto rounded-full w-12 h-12 bg-black/60 border-white/20 text-white hover:bg-indigo-600 backdrop-blur-md transition-all hover:scale-110"
            onClick={() => handleNav(side, -1)}
            disabled={index === 0}
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto rounded-full w-12 h-12 bg-black/60 border-white/20 text-white hover:bg-indigo-600 backdrop-blur-md transition-all hover:scale-110"
            onClick={() => handleNav(side, 1)}
            disabled={index === question.length - 1}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-[#0b0f1a] flex flex-col animate-in fade-in zoom-in-95 duration-200">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#0a0a0a] border-b border-white/10 shrink-0 z-50">
        <h2 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
          <Minimize2 size={18} className="text-indigo-500" />
          Split View Mode
        </h2>
        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-400 transition-colors flex items-center gap-2 border border-white/5 text-xs font-bold uppercase tracking-wider"
        >
          Close <X size={16} />
        </button>
      </div>

      {/* Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        <SplitPane index={leftIndex} side="left" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-40 hidden md:block -translate-x-1/2 pointer-events-none"></div>
        <SplitPane index={rightIndex} side="right" />
      </div>
    </div>
  );
};

export default CompareView;
