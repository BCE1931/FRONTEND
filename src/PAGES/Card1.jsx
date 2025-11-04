import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { MagicCard } from "@/components/ui/magic-card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saverefershtoken, saveToken, saveusername } from "../index";
import BASE_URL from "../UTILS/config.js";

const Card1 = () => {
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const [provider, setprovider] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!provider) return;

    const fetchProvider = async () => {
      try {
        const resp = await fetch(`${BASE_URL}/oauth/authlogin`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!resp.ok) throw new Error("Error fetching auth username");
        const data = await resp.text();
        saveusername(data);

        const tokenResp = await fetch(`${BASE_URL}/token/tokengen/${data}`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!tokenResp.ok) throw new Error("Token generation failed");
        const tokenData = await tokenResp.json();
        saveToken(tokenData.token);
        saverefershtoken(tokenData.refreshtoken);
        navigate("/home");
      } catch (e) {
        console.log("Error in OAuth token creation");
        toast.error("OAuth login failed.");
      } finally {
        setprovider(false);
      }
    };
    fetchProvider();
  }, [provider, navigate]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(`${BASE_URL}/oauth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          project: "trying jwt",
        }),
      });
      if (!resp.ok) throw new Error("Error in login");

      const res = await resp.json();
      if (!res.auth) {
        toast.warning("Try logging in with Google or GitHub");
      } else if (!res.password) {
        toast.error("Incorrect password");
      } else if (!res.username) {
        toast.error("Username does not exist");
      } else {
        saveToken(res.token);
        saverefershtoken(res.refreshtoken);
        saveusername(username);
        navigate("/home");
      }
    } catch (e) {
      console.log("Login failed", e);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      login(event);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000] relative overflow-hidden">
      {/* 🔹 Soft glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.05),transparent_60%)]"></div>

      {/* 🔹 Login Card */}
      <Card className="w-full max-w-sm border-none bg-transparent shadow-none relative z-10">
        <MagicCard
          gradientColor="#141414"
          className="p-0 rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.1)] border border-gray-800"
        >
          <CardHeader className="border-b border-gray-800 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-indigo-300 drop-shadow-sm">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-400">
              Access your account securely
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form
              onSubmit={login}
              onKeyDown={handleKeyDown}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setname(e.target.value)}
                  className="bg-gray-800/80 text-white border-gray-700 focus:ring-indigo-500 disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="bg-gray-800/80 text-white border-gray-700 focus:ring-indigo-500 disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <a href="#" className="text-indigo-400 hover:underline">
                  Forgot password?
                </a>
                <Link to="/signup" className="text-indigo-400 hover:underline">
                  Register / Sign Up
                </Link>
              </div>

              {/* 🔹 Button with internal spinner only */}
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
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Card1;
