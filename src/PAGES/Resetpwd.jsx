import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/ui/magic-card";
import BASE_URL from "../UTILS/config";

const Resetpwd = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Restore state after refresh
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    const otpFlag = localStorage.getItem("otpSent");
    const verifiedFlag = localStorage.getItem("otpVerified");

    if (savedEmail) setEmail(savedEmail);
    if (otpFlag === "true") setOtpSent(true);
    if (verifiedFlag === "true") setOtpVerified(true);
  }, []);

  // 📩 Send OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/otp/pwd-reset-otp-req`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.text();
      if (res.ok) {
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("otpSent", "true");
        setOtpSent(true);
        setMessage("OTP sent to your email");
      } else setMessage(data);
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Verify OTP
  const validateOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/otp/pwd-otp-req-validation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("resetEmail"),
          otp,
        }),
      });
      const data = await res.text();
      if (res.ok) {
        localStorage.setItem("otpVerified", "true");
        setOtpVerified(true);
        setMessage("OTP verified");
      } else setMessage(data);
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/otp/pwd-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("resetEmail"),
          password,
        }),
      });
      const data = await res.text();
      if (res.ok) {
        localStorage.clear();
        setMessage("Password reset successful");
        navigate("/signin");
      } else setMessage(data);
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000]">
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      <Card className="w-full max-w-sm bg-transparent border-none">
        <MagicCard className="rounded-2xl p-6 bg-[#0b0f1a]/90 backdrop-blur-xl border border-gray-800">
          <CardHeader>
            <CardTitle className="text-center text-indigo-300">
              Reset Password
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {!otpSent && (
              <form onSubmit={requestOtp} className="space-y-4">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button className="w-full">Send OTP</Button>
              </form>
            )}

            {otpSent && !otpVerified && (
              <form onSubmit={validateOtp} className="space-y-4">
                <Input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Verify OTP
                </Button>
              </form>
            )}

            {otpVerified && (
              <form onSubmit={resetPassword} className="space-y-4">
                <Input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Reset Password
                </Button>
              </form>
            )}

            {message && (
              <p className="text-center text-sm text-red-400">{message}</p>
            )}
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Resetpwd;
