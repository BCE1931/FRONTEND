import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/ui/magic-card";
import BASE_URL from "../UTILS/config";

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
      const res = await fetch("https://myserverapp.tech/otp/signup-otp-req", {
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
      const res = await fetch(
        "https://myserverapp.tech/otp/signup-otp-validation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            otp,
          }),
        }
      );

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000] relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(99,102,241,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.06),transparent_60%)]"></div>

      <Card className="w-full max-w-sm border-none bg-transparent shadow-none relative z-10">
        <MagicCard className="p-0 rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-xl border border-gray-800">
          <CardHeader className="border-b border-gray-800 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-indigo-300">
              Sign Up
            </CardTitle>
            <CardDescription className="text-gray-400">
              Create your account securely
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* 🔹 GOOGLE SIGNUP / LOGIN */}
            <Button
              type="button"
              onClick={() => {
                window.location.href = `${BASE_URL}/oauth2/authorization/google`;
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              Continue with Google
            </Button>

            <div className="text-center text-gray-500 text-sm">or</div>

            {!otpSent ? (
              <form onSubmit={requestOtp} className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={validateOtp} className="grid gap-4">
                <p className="text-sm text-gray-400">Email: {email}</p>
                <Input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Verify OTP
                </Button>
              </form>
            )}

            {message && (
              <p className="text-center text-sm text-red-400">{message}</p>
            )}
          </CardContent>

          <CardFooter className="border-t border-gray-800 p-4 text-sm text-gray-400 flex justify-center">
            <Link to="/signin" className="text-indigo-400 hover:underline">
              Already have an account? Sign In
            </Link>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Signup;
