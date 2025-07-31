import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saverefershtoken, saveToken, saveusername } from "../UTILS/Local";
import BASE_URL from "../UTILS/config.js";

const LoginPage = () => {
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const [provider, setprovider] = useState(false);
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
        console.log(tokenData.token);
        console.log(tokenData.refreshtoken);
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
        toast.error("Try logging in with Google or GitHub");
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Sign In
        </h1>

        <div className="space-y-4 mb-6">
          <a
            href="${BASE_URL}/oauth2/authorization/google"
            onClick={() => setprovider(true)}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-3"
            />
            <span className="text-gray-700">Sign in with Google</span>
          </a>

          <a
            href="${BASE_URL}/oauth2/authorization/github"
            onClick={() => setprovider(true)}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5 mr-3"
            />
            <span className="text-gray-700">Sign in with GitHub</span>
          </a>
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-400">or</span>
        </div>

        <form onSubmit={login} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setname(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register / Sign Up
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
