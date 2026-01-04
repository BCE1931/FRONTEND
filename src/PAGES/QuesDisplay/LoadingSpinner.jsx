import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-lg text-indigo-300 font-semibold">
        Fetching your records...
      </h2>
      <p className="text-sm text-gray-400 mt-1">
        Please wait while your questions load.
      </p>
    </div>
  );
};

export default LoadingSpinner;
