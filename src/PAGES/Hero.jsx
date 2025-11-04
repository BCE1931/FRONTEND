import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { saveemail, saverefershtoken, saveToken, saveusername } from "../index";

const Hero = () => {
  const navigate = useNavigate();

  const topics = [
    { name: "DSA", icon: <FaCode className="text-lg text-indigo-500" /> },
    {
      name: "My DSA Work",
      icon: <FaLaptopCode className="text-lg text-indigo-500" />,
    },
    {
      name: "OS",
      icon: <FaServer className="text-lg text-indigo-500" />,
    },
    {
      name: "CN",
      icon: <FaNetworkWired className="text-lg text-indigo-500" />,
    },
    {
      name: "APPTITUDE",
      icon: <FaCalculator className="text-lg text-indigo-500" />,
    },
    {
      name: "Add Today’s Work",
      icon: <FaPlusCircle className="text-lg text-indigo-500" />,
    },
    {
      name: "Extra Modules",
      icon: <FaPuzzlePiece className="text-lg text-indigo-500" />,
    },
    { name: "SQL", icon: <FaDatabase className="text-lg text-indigo-500" /> },
    { name: "Cloud", icon: <FaCloud className="text-lg text-indigo-500" /> },
    { name: "React", icon: <FaReact className="text-lg text-indigo-500" /> },
  ];

  const selecttopic = (ind) => {
    const selected = topics[ind].name;
    if (ind === 0) {
      navigate("/questions", { state: { work: false } });
    } else if (ind === 1) {
      navigate("/questions", { state: { work: true } });
    } else if (ind === 5) {
      navigate("/add1");
    } else {
      console.log(selected);
      navigate("/otherdisp", { state: { topic: selected } });
    }
  };

  const handleLogout = () => {
    saverefershtoken("");
    saveToken("");
    saveusername("");
    saveemail("");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col px-8 py-12 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-indigo-400 tracking-wide drop-shadow-md">
          📚 StudyStream
        </h1>
        {/* <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Logout
        </Button> */}
      </div>

      {/* Subheader */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-indigo-300">
          Choose a Topic to Begin
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Access your notes, references, and modules in one scrollable feed.
        </p>
      </div>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {topics.map((topic, ind) => (
          <Card
            key={ind}
            onClick={() => selecttopic(ind)}
            className="w-[260px] h-[150px] bg-[#0f0f10]/90 backdrop-blur-md border border-gray-800 shadow-md hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-xl"
          >
            <CardContent className="flex flex-col justify-center items-center h-full text-center space-y-3">
              <div className="flex justify-center items-center bg-indigo-500/10 w-12 h-12 rounded-full">
                {topic.icon}
              </div>
              <CardTitle className="text-lg font-semibold text-white">
                {topic.name}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      {/* <div className="mt-16 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-400 font-medium">StudyStream</span> —
          Learn. Revise. Grow.
        </p>
      </div> */}
    </div>
  );
};

export default Hero;
