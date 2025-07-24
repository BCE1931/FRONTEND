import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const [linkError, setLinkError] = useState("");
  const [questioninfo, setquestioninfo] = useState("");

  const location = useLocation();
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
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/adddsawork`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            important: important,
            logic: logic,
            code: code,
            questioninfo: questioninfo,
            attempted: attempted,
            subtopic: subtopic,
            link: link,
          }),
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        console.log(suxxess);
        if (suxxess) {
          return handleadddsa();
        } else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("error in fetching in topics");
      }
      const data = await resp.text();
      toast.success("Your Work Is Uploaded");
    } catch (err) {
      console.log("eror in connecteing to backend");
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
        toast.success("Hey You goe nwe session token");
        return true;
      }
    } catch (e) {
      console.log("error in getting refresh token");
    }
  };

  const handleaddother = async () => {
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/addotherwork`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            important: important,
            logic: logic,
            questioninfo: questioninfo,
            topic: topic,
          }),
        }
      );
      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        console.log(suxxess);
        if (suxxess) {
          return handleadddsa();
        } else {
          toast.error("Unable to refresh token.");
          navigate("/");
        }
      }
      if (!resp.ok) {
        console.log("error in fetching in topics");
      }
      const data = await resp.text();
      toast.success("Your Work Is Uploaded");
    } catch (err) {
      console.log("eror in connecteing to backend");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (topic == "DSA") {
      handleadddsa();
    } else {
      handleaddother();
    }
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
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Add New Question to {topic}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="p-3 border rounded-md w-full"
          placeholder="Enter QuestionHeading"
          value={question}
          required={true}
          onChange={(e) => setquestion(e.target.value)}
        />

        {/* Question textarea */}
        <textarea
          className="p-3 border rounded-md w-full h-[200px] resize-y overflow-y-auto"
          placeholder="Enter Question"
          value={questioninfo}
          onChange={(e) => setquestioninfo(e.target.value)}
          required
        ></textarea>

        {/* Logic textarea */}
        <textarea
          className="p-3 border rounded-md w-full h-[150px] resize-y overflow-y-auto"
          placeholder="Enter Logic"
          value={logic}
          onChange={(e) => setlogic(e.target.value)}
          required
        ></textarea>

        {/* Code textarea (only for DSA) */}
        {topic === "DSA" && (
          <textarea
            className="p-3 border rounded-md w-full h-[200px] resize-y overflow-y-auto"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setcode(e.target.value)}
          ></textarea>
        )}

        {/* Link input */}
        <input
          type="text"
          className="p-3 border rounded-md w-full"
          placeholder="Enter Link"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
        {/* {linkError && <p className="text-red-500 m-0">{linkError}</p>} */}

        {/* Subtopic dropdown (only for DSA) */}
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

        {/* Important checkbox */}
        <label className="flex items-center gap-2 text-lg">
          <input
            type="checkbox"
            checked={important}
            onChange={() => setimportant(!important)}
          />
          Important {important ? "✅" : "⬜"}
        </label>

        {/* Attempted checkbox (only for DSA) */}
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
  );
};

export default Add;
