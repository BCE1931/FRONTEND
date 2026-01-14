import React, { useEffect, useState } from "react";
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
import { Sparkles, Lock, Mail, User, Chrome, Eye, EyeOff } from "lucide-react";

// ✅ IMPORTING YOUR BACKGROUND ASSET
import BackgroundImg from "../assets/backdroung_image.png";

const Signup = () => {
  const navigate = useNavigate();

  // 🔹 OTP SIGNUP LOGIC (UNCHANGED)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Password Visibility State
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // 🔁 Restore state after refresh
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const otpFlag = localStorage.getItem("otpSent");

    if (savedEmail) setEmail(savedEmail);
    if (otpFlag === "true") setOtpSent(true);
  }, []);

  // 📩 Request OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/otp/signup-otp-req`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("email", email);
        localStorage.setItem("otpSent", "true");
        setOtpSent(true);
        setMessage("OTP sent to your email");
      } else {
        setMessage(data);
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Validate OTP
  const validateOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/otp/signup-otp-validation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshtoken);

        localStorage.removeItem("email");
        localStorage.removeItem("otpSent");

        navigate("/home");
      } else {
        setMessage(data.message || "OTP validation failed");
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
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

      {/* 2. CENTERED GLASS CARD CONTAINER */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* ✅ Transparent Card (Matches Card1 Style) */}
        <Card className="border-none shadow-none bg-transparent backdrop-blur-none">
          {/* Note: In Card1 you removed border/shadow completely, so I did the same here */}

          {/* Header Section */}
          <CardHeader className="space-y-2 text-center pt-10 pb-2">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 backdrop-blur-sm">
                <Sparkles size={24} />
              </div>
            </div>
            <CardTitle className="text-4xl font-black tracking-tight text-white drop-shadow-xl">
              {otpSent ? "Verify Email" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base drop-shadow-md">
              {otpSent
                ? `Enter the code sent to ${email}`
                : "Join ReviScroll today."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* 🔹 GOOGLE SIGNUP (Only show if OTP not sent) */}
            {!otpSent && (
              <>
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
              </>
            )}

            {/* 🔹 SIGNUP FORM */}
            {!otpSent ? (
              <form onSubmit={requestOtp} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs font-bold uppercase tracking-wide ml-1 drop-shadow-md">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="student@example.com"
                      className="pl-12 h-12 bg-black/40 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Username Input */}
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs font-bold uppercase tracking-wide ml-1 drop-shadow-md">
                    Username
                  </Label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="johndoe123"
                      className="pl-12 h-12 bg-black/40 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Password Input with Toggle */}
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs font-bold uppercase tracking-wide ml-1 drop-shadow-md">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 bg-black/40 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl transition-all backdrop-blur-sm"
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] mt-4 backdrop-blur-md"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              // 🔹 OTP VERIFICATION FORM
              <form onSubmit={validateOtp} className="space-y-5">
                <p className="text-sm text-zinc-400 text-center bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                  Code sent to:{" "}
                  <span className="text-white font-semibold">{email}</span>
                </p>

                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs font-bold uppercase tracking-wide ml-1 drop-shadow-md">
                    One-Time Password
                  </Label>
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="text-center text-2xl tracking-[0.5em] h-14 bg-black/40 border-white/20 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl transition-all backdrop-blur-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] mt-4 backdrop-blur-md"
                >
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </Button>
              </form>
            )}

            {message && (
              <p
                className={`text-center text-sm font-medium mt-2 p-2 rounded-lg backdrop-blur-md ${
                  message.includes("success") || message.includes("sent")
                    ? "text-emerald-400 bg-emerald-900/20 border border-emerald-500/20"
                    : "text-red-400 bg-red-900/20 border border-red-500/20"
                }`}
              >
                {message}
              </p>
            )}

            <div className="text-center text-sm text-zinc-400 mt-4 drop-shadow-md">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-white font-semibold hover:underline decoration-purple-500 underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
