import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import Layout from "./PAGES/layout";
import Card1 from "./PAGES/Card1";
import Signup from "./PAGES/Signup";
import IntroPage from "./PAGES/IntroPage";
import Hero from "./PAGES/Hero";
import Quesdisply from "./PAGES/Quesdisply";
import Otherdisply from "./PAGES/Otherdisply";
import Selectadd from "./PAGES/Selectadd";
import Add from "./PAGES/Add";

import { Toaster } from "@/components/ui/sonner";
import Resetpwd from "./PAGES/Resetpwd";

const App = () => {
  const PublicRoute = ({ element }) => {
    return localStorage.getItem("token") ? (
      <Navigate to="/hero" replace />
    ) : (
      element
    );
  };

  const ProtectedRoute = ({ element }) => {
    return localStorage.getItem("token") ? (
      element
    ) : (
      <Navigate to="/signin" replace />
    );
  };

  const [isExamMode, setIsExamMode] = useState(
    localStorage.getItem("examMode") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsExamMode(localStorage.getItem("examMode") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        {isExamMode ? (
          <div className="app-container">
            <Routes></Routes>
          </div>
        ) : (
          <div className="app-container relative">
            <div className="top-right">
              <ModeToggle />
            </div>

            <Toaster />

            <Routes>
              <Route
                path="/"
                element={<PublicRoute element={<IntroPage />} />}
              />

              <Route
                path="/reset-password"
                element={<PublicRoute element={<Resetpwd />} />}
              />
              <Route
                path="/signin"
                element={<PublicRoute element={<Card1 />} />}
              />
              <Route
                path="/signup"
                element={<PublicRoute element={<Signup />} />}
              />

              <Route
                path="/questions"
                element={<ProtectedRoute element={<Quesdisply />} />}
              />

              <Route
                path="/otherdisp"
                element={<ProtectedRoute element={<Otherdisply />} />}
              />

              <Route
                path="/add1"
                element={<ProtectedRoute element={<Selectadd />} />}
              />

              <Route
                path="/add"
                element={<ProtectedRoute element={<Add />} />}
              />

              <Route
                path="/hero"
                element={
                  <ProtectedRoute
                    element={
                      <Layout>
                        <Hero />
                      </Layout>
                    }
                  />
                }
              />

              <Route path="*" element={<Navigate to="/signin" replace />} />

              <Route path="/middle" element={<Middle />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
