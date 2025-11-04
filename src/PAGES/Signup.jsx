import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { MagicCard } from "@/components/ui/magic-card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import BASE_URL from "../UTILS/config.js";
import {
  saveusername,
  saveToken,
  saveemail,
  saverefershtoken,
} from "@/index.js";
const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(`${BASE_URL}/oauth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          project: "trying jwt",
        }),
      });

      if (!resp.ok) throw new Error("Registration failed");
      const res = await resp.json();
      if (res.exist === false) {
        const tokenResp = await fetch(
          `${BASE_URL}/token/tokengen/${username}`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!tokenResp.ok) throw new Error("Token creation failed");

        const tokenData = await tokenResp.json();
        saveToken(tokenData.token);
        saveusername(username);
        saverefershtoken(tokenData.refreshtoken);
        navigate("/home");
      } else {
        toast.error("Email already exists");
      }
    } catch (e) {
      console.log("Error in register:", e);
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      register(event);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000] relative overflow-hidden text-white">
      {/* 🔹 Softer background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(99,102,241,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.06),transparent_60%)]"></div>

      {/* 🔹 Sign Up Card */}
      <Card className="w-full max-w-sm border-none bg-transparent shadow-none relative z-10">
        <MagicCard
          gradientColor="#141414"
          className="p-0 rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.1)] border border-gray-800"
        >
          <CardHeader className="border-b border-gray-800 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-indigo-300 drop-shadow-sm">
              Sign Up
            </CardTitle>
            <CardDescription className="text-gray-400">
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form
              onSubmit={register}
              onKeyDown={handleKeyDown}
              className="grid gap-4"
            >
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="bg-gray-800/80 text-white border-gray-700 focus:ring-indigo-500 disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setname(e.target.value)}
                  className="bg-gray-800/80 text-white border-gray-700 focus:ring-indigo-500 disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="bg-gray-800/80 text-white border-gray-700 focus:ring-indigo-500 disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              {/* 🔹 Button with Spinner */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full font-semibold mt-4 transition-all ${
                  loading
                    ? "bg-indigo-500 cursor-not-allowed opacity-80"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-gray-800 p-4 flex justify-between text-sm text-gray-400">
            <a href="#" className="text-indigo-400 hover:underline">
              Forgot password?
            </a>
            <Link to="/signin" className="text-indigo-400 hover:underline">
              Already have an account?
            </Link>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Signup;
