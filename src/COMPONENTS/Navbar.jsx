import React from "react";
import {
  saveemail,
  saverefershtoken,
  saveToken,
  saveusername,
} from "../UTILS/Local";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    saverefershtoken("");
    saveToken("");
    saveusername("");
    saveemail("");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          <button
            onClick={handlelogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-semibold py-2 px-4 sm:px-5 rounded-full transition duration-200 shadow-md"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
