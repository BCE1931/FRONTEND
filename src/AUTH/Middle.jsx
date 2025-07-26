import React, { useState, useEffect } from "react";
import { saveusername, saveToken, saverefershtoken } from "../UTILS/Local";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Middle = () => {
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [wait, setwait] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchauth = async () => {
      try {
        const resp = await fetch(
          `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/oauth/user-info`,
          {
            credentials: "include",
          }
        );
        if (!resp.ok) {
          console.log("Error fetching auth info");
          return;
        }
        const data = await resp.json();
        console.log(data);
        setemail(data.email);
        if (data.exist === true) {
          saveusername(data.username);
          const tokenResp = await fetch(
            `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/token/tokengen/${data.username}`,
            {
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!tokenResp.ok) throw new Error("Token generation failed");

          const tokenData = await tokenResp.json();
          console.log("Token generated:", tokenData);
          saveToken(tokenData.token);
          saverefershtoken(tokenData.refreshtoken);
          navigate("/home");
        } else {
          setwait(false);
        }
      } catch (err) {
        console.log("Error in fetching auth:", err);
      }
    };
    fetchauth();
  }, [navigate]);

  const register = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/oauth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password,
            project: "trying jwt",
          }),
        }
      );
      if (!resp.ok) throw new Error("Registration failed");

      const res = await resp.json();
      console.log(res);
      if (res.exist === false) {
        const tokenResp = await fetch(
          `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/token/tokengen/${username}`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!tokenResp.ok) throw new Error("Token generation failed");

        const tokenData = await tokenResp.json();
        console.log("Token generated:", tokenData);
        saveToken(tokenData.token);
        saveusername(username);
        saverefershtoken(tokenData.refreshtoken);
        navigate("/home");
      } else {
        toast.error("Email already exists");
      }
    } catch (err) {
      console.log("Error in registration:", err);
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
        <p className="text-2xl font-bold text-gray-800">👋 Welcome!</p>

        {wait ? (
          <div className="animate-pulse space-y-3">
            <p className="text-lg font-medium text-blue-600">
              ⏳ Please wait a moment...
            </p>
            <p className="text-sm text-gray-600">
              We are processing your login
            </p>
          </div>
        ) : (
          <form onSubmit={register} className="space-y-5">
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Middle;
