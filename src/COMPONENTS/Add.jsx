import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getToken,
  getrefershtoken,
  saverefershtoken,
  saveToken,
} from "../UTILS/Local";
import { toast } from "react-toastify";

const Add = () => {
  const [question, setquestion] = useState("");
  const [logic, setlogic] = useState("");
  const [code, setcode] = useState("");
  const [link, setlink] = useState("");
  const [subtopic, setsubtopic] = useState("");
  const [important, setimportant] = useState(false);
  const [attempted, setattempted] = useState(false);
  const [questioninfo, setquestioninfo] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.opt;

  const subtopics = [
    "Array",
    "Dynamic Programming",
    "Graph",
    "Hashing",
    "Interval",
    "Linked List",
    "Matrix",
    "Design",
    "Sorting",
    "String",
    "Stack",
    "Tree",
    "Heap",
    "Binary-Bit Manipulation",
    "Arrays & Hashing",
    "Two Pointers",
    "Sliding Window",
    "Binary Search",
    "Trees",
    "Tries",
    "Heap / Priority Queue",
    "Backtracking",
    "Graphs",
    "Advanced Graphs",
    "1-D Dynamic Programming",
    "2-D Dynamic Programming",
    "Greedy",
    "Intervals",
    "Math & Geometry",
    "Bit Manipulation",
  ];

  const handleadddsa = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/adddsawork`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question,
            important,
            logic,
            code,
            questioninfo,
            attempted,
            subtopic,
            link,
          }),
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return handleadddsa();
        else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("error in fetching in topics");
      }
      await resp.text();
      toast.success("Your Work Is Uploaded");
    } catch (err) {
      console.log("error in connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const handleaddother = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/addotherwork`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question,
            important,
            logic,
            questioninfo,
            topic,
          }),
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        if (suxxess) return handleaddother();
        else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("error in fetching in topics");
      }
      await resp.text();
      toast.success("Your Work Is Uploaded");
    } catch (err) {
      console.log("error in connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const refreshtoken = async () => {
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            refreshtoken: getrefershtoken(),
          }),
        }
      );
      if (resp.status === 200) {
        const data = await resp.json();
        saveToken(data.token);
        saverefershtoken(data.refreshtoken);
        toast.success("Hey You got new session token");
        return true;
      }
    } catch (e) {
      console.log("error in getting refresh token");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    topic === "DSA" ? handleadddsa() : handleaddother();
  };

  if (!topic) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <p className="text-red-600">
          No topic selected. Please go back and select a topic.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white text-black px-6 py-4 rounded shadow-lg text-center">
            <p className="text-lg font-semibold">Submitting your question...</p>
          </div>
        </div>
      )}

      {/* Main form container (dimmed if loading) */}
      <div
        className={`max-w-lg mx-auto p-4 transition-opacity duration-300 ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Add New Question to {topic}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="p-3 border rounded-md w-full"
            placeholder="Enter Question Heading"
            value={question}
            required
            onChange={(e) => setquestion(e.target.value)}
          />

          <textarea
            className="p-3 border rounded-md w-full h-[200px] resize-y overflow-y-auto"
            placeholder="Enter Question"
            value={questioninfo}
            onChange={(e) => setquestioninfo(e.target.value)}
            required
          ></textarea>

          <textarea
            className="p-3 border rounded-md w-full h-[150px] resize-y overflow-y-auto"
            placeholder="Enter Logic"
            value={logic}
            onChange={(e) => setlogic(e.target.value)}
            required
          ></textarea>

          {topic === "DSA" && (
            <textarea
              className="p-3 border rounded-md w-full h-[200px] resize-y overflow-y-auto"
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setcode(e.target.value)}
            ></textarea>
          )}

          <input
            type="text"
            className="p-3 border rounded-md w-full"
            placeholder="Enter Link"
            value={link}
            onChange={(e) => setlink(e.target.value)}
          />

          {topic === "DSA" && (
            <select
              className="p-3 border rounded-md w-full"
              value={subtopic}
              onChange={(e) => setsubtopic(e.target.value)}
              required
            >
              <option value="">Select Subtopic</option>
              {subtopics.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          <label className="flex items-center gap-2 text-lg">
            <input
              type="checkbox"
              checked={important}
              onChange={() => setimportant(!important)}
            />
            Important {important ? "✅" : "⬜"}
          </label>

          {topic === "DSA" && (
            <label className="flex items-center gap-2 text-lg">
              <input
                type="checkbox"
                checked={attempted}
                onChange={() => setattempted(!attempted)}
              />
              Attempted {attempted ? "✅" : "⬜"}
            </label>
          )}

          <button
            type="submit"
            className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
