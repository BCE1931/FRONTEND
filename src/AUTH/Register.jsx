import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saverefershtoken, saveToken, saveusername } from "../UTILS/Local";

const Register = () => {
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();

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
      if (res.exist === false) {
        const tokenResp = await fetch(
          `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/token/tokengen/${username}`,
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Register
        </h1>

        <div className="space-y-4 mb-6">
          <a
            href="https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/oauth2/authorization/google"
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-3"
            />
            <span className="text-gray-700">Register with Google</span>
          </a>

          <a
            href="https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/oauth2/authorization/github"
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5 mr-3"
            />
            <span className="text-gray-700">Register with GitHub</span>
          </a>
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-400">or</span>
        </div>

        <form onSubmit={register} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setname(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/" className="text-green-700 hover:underline">
            Have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
