import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BASE_URL from "../UTILS/config";
import { Sparkles, Lock, Mail, Chrome, Eye, EyeOff } from "lucide-react";

// ✅ IMPORTING YOUR BACKGROUND ASSET
import BackgroundImg from "../assets/backdroung_image.png";

const Card1 = () => {
  const emailref = useRef(null);
  const pwdref = useRef(null);
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // 🔹 LOGIC (UNCHANGED)
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const pwd = pwdref.current.value;

    const data = {
      email: email,
      password: pwd,
    };

    axios
      .post(`${BASE_URL}/authentication/login`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === "User logged in successfully") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshtoken", response.data.refreshtoken);
          navigate("/hero");
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("finally block is execution");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden font-sans text-white">
      {/* 1. FIXED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={BackgroundImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </div>

      {/* 2. COMPLETELY TRANSPARENT CONTAINER */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* ✅ Card has NO background, NO border, NO shadow */}
        <Card className="border-none shadow-none bg-transparent">
          {/* Header Section */}
          <CardHeader className="space-y-2 text-center pt-10 pb-2">
            <div className="flex justify-center mb-2">
              {/* Floating Icon */}
              <div className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 backdrop-blur-sm">
                <Sparkles size={24} />
              </div>
            </div>
            <CardTitle className="text-4xl font-black tracking-tight text-white drop-shadow-xl">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base drop-shadow-md">
              Enter your details to continue scrolling.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* 🔹 GOOGLE LOGIN */}
            <Button
              type="button"
              onClick={() => {
                window.location.href = `${BASE_URL}/oauth2/authorization/google`;
              }}
              variant="outline"
              className="w-full h-12 bg-white/5 border-white/20 hover:bg-white/10 text-white hover:text-white transition-all rounded-xl font-medium flex gap-3 items-center justify-center group backdrop-blur-sm"
            >
              <Chrome
                size={18}
                className="group-hover:text-blue-400 transition-colors"
              />
              Continue with Google
            </Button>

            <div className="relative flex items-center gap-4">
              <div className="h-px bg-white/20 flex-1"></div>
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold drop-shadow-sm">
                Or Email
              </span>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            {/* 🔹 LOGIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-zinc-300 text-xs font-bold uppercase tracking-wide ml-1 drop-shadow-md"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <Input
                    type="email"
                    ref={emailref}
                    id="email"
                    placeholder="student@example.com"
                    // Input remains slightly visible so user sees where to type
                    className="pl-12 h-12 bg-black/40 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label
                    htmlFor="pwd"
                    className="text-zinc-300 text-xs font-bold uppercase tracking-wide drop-shadow-md"
                  >
                    Password
                  </Label>
                  <Link
                    to="/reset-password"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors drop-shadow-md"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    ref={pwdref}
                    id="pwd"
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-12 bg-black/40 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl transition-all backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] mt-4 backdrop-blur-md"
              >
                Sign In
              </Button>

              <div className="text-center text-sm text-zinc-400 mt-4 drop-shadow-md">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-white font-semibold hover:underline decoration-purple-500 underline-offset-4"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Card1;
