import { useState } from "react";
import React from "react";
import Try1 from "./COMPONENTS/Try1";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./AUTH/LoginPage";
import Middle from "./AUTH/Middle";
import Register from "./AUTH/Register";
import { ToastContainer } from "react-toastify";
import Home from "./COMPONENTS/Home";
import Selecction from "./COMPONENTS/Selecction";
import Quesdisply from "./COMPONENTS/Quesdisply";
import Add from "./COMPONENTS/Add";
import Selectadd from "./COMPONENTS/Selectadd";
import Otherdisply from "./COMPONENTS/Otherdisply";
import Navbar from "./COMPONENTS/Navbar";

function App() {
  const PublicRoute = ({ element }) => {
    return localStorage.getItem("username") ? (
      <Navigate to="/home" replace />
    ) : (
      element
    );
  };

  const ProtectedRoute = ({ element }) => {
    return localStorage.getItem("username") ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <BrowserRouter>
      <div>
        <ToastContainer />
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<PublicRoute element={<LoginPage />} />} />
          <Route
            path="/register"
            element={<PublicRoute element={<Register />} />}
          />
          <Route
            path="/middle"
            element={<PublicRoute element={<Middle />} />}
          />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/selection"
            element={<ProtectedRoute element={<Selecction />} />}
          />
          <Route
            path="/otherdisp"
            element={<ProtectedRoute element={<Otherdisply />} />}
          />
          <Route
            path="/questions"
            element={<ProtectedRoute element={<Quesdisply />} />}
          />
          <Route
            path="/add1"
            element={<ProtectedRoute element={<Selectadd />} />}
          />
          <Route path="/add" element={<ProtectedRoute element={<Add />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
