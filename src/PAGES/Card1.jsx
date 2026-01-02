import React, { useRef } from "react";
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
import { MagicCard } from "@/components/ui/magic-card";
import BASE_URL from "../UTILS/config";

const Card1 = () => {
  const emailref = useRef(null);
  const pwdref = useRef(null);
  const navigate = useNavigate();

  // 🔹 LOGIC FROM SECOND FILE (UNCHANGED)
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.05),transparent_60%)]"></div>

      <Card className="w-full max-w-sm border-none bg-transparent shadow-none relative z-10">
        <MagicCard
          gradientColor="#141414"
          className="p-0 rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.1)] border border-gray-800"
        >
          <CardHeader className="border-b border-gray-800 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-indigo-300">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-400">
              Access your account securely
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* 🔹 GOOGLE LOGIN (FROM SECOND FILE) */}
            <Button
              type="button"
              onClick={() => {
                window.location.href = `${BASE_URL}/oauth2/authorization/google`;
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              Login with Google
            </Button>

            {/* 🔹 LOGIN FORM */}
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  type="email"
                  ref={emailref}
                  id="email"
                  placeholder="enter email"
                  className="bg-gray-800/80 text-white border-gray-700"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pwd" className="text-gray-300">
                  Password
                </Label>
                <Input
                  type="password"
                  ref={pwdref}
                  id="pwd"
                  placeholder="enter password"
                  className="bg-gray-800/80 text-white border-gray-700"
                  required
                />
              </div>

              <div className="flex justify-between text-sm text-gray-400">
                <Link
                  to="/reset-password"
                  className="text-indigo-400 hover:underline"
                >
                  Forgot password?
                </Link>

                <Link to="/signup" className="text-indigo-400 hover:underline">
                  Register / Sign Up
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Card1;
