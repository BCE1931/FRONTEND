import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaNetworkWired,
  FaCalculator,
  FaPlusCircle,
  FaPuzzlePiece,
  FaDatabase,
  FaCloud,
  FaReact,
} from "react-icons/fa";

const Home = () => {
  const topics = [
    { name: "DSA", icon: <FaCode className="text-xl text-teal-600" /> },
    {
      name: "MY DSA WORK",
      icon: <FaLaptopCode className="text-xl text-teal-600" />,
    },
    { name: "OS", icon: <FaServer className="text-xl text-teal-600" /> },
    { name: "CN", icon: <FaNetworkWired className="text-xl text-teal-600" /> },
    {
      name: "APPTITUDE",
      icon: <FaCalculator className="text-xl text-teal-600" />,
    },
    {
      name: "ADD TODAY WORK",
      icon: <FaPlusCircle className="text-xl text-teal-600" />,
    },
    {
      name: "EXTRA MODULES",
      icon: <FaPuzzlePiece className="text-xl text-teal-600" />,
    },
    { name: "SQL", icon: <FaDatabase className="text-xl text-teal-600" /> },
    { name: "CLOUD", icon: <FaCloud className="text-xl text-teal-600" /> },
    { name: "REACT", icon: <FaReact className="text-xl text-teal-600" /> },
  ];

  const navigate = useNavigate();

  const selecttopic = (ind) => {
    console.log(topics[ind].name);
    if (ind === 0) {
      navigate("/questions", { state: { work: false } });
      console.log(topics[ind].name);
    } else if (ind == 1) {
      navigate("/questions", { state: { work: true } });
    } else if (ind == 5) {
      navigate("/add1");
    } else {
      // Navigate directly to scroll page with selected topic
      navigate("/otherdisp", { state: { topic: topics[ind].name } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-8">📚 My Topics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {topics.map((topic, ind) => (
          <button
            key={ind}
            onClick={() => selecttopic(ind)}
            className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center space-x-3 text-emerald-700 font-semibold text-lg hover:bg-emerald-50 hover:shadow-lg transition"
          >
            {topic.icon}
            <span>{topic.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
