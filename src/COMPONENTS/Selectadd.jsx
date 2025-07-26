import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Selectadd = () => {
  const [opt, setopt] = useState("");
  const options = ["DSA", "OS", "CN", "APPTITUDE", "SQL", "CLOUD"];
  const navigate = useNavigate();

  const handleoptions = (ind) => {
    console.log(options[ind]);
    setopt(options[ind]);
    navigate("/add", { state: { opt: options[ind] } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <p className="text-xl font-semibold mb-6">Select a Topic to Add</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
        {options.map((option, ind) => (
          <button
            key={ind}
            onClick={() => handleoptions(ind)}
            className="py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            {option}
          </button>
        ))}
      </div>

      {opt && (
        <p className="mt-6 text-green-700 font-medium">
          Selected Option: {opt}
        </p>
      )}
    </div>
  );
};

export default Selectadd;
