import React from "react";
import { Button } from "@/components/ui/button";

const EmptyWorkState = ({ onNavigate }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center bg-white/10 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-4 w-full">
      <h2 className="text-xl font-semibold text-indigo-400">
        No Previous Work Found
      </h2>
      <p className="text-gray-300 text-sm max-w-sm">
        You haven’t added any work yet. Let’s start now!
      </p>
      <Button
        onClick={onNavigate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg"
      >
        ➕ Add New Work
      </Button>
    </div>
  );
};

export default EmptyWorkState;
