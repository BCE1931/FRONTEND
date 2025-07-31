import React, { useEffect, useState } from "react";
import { getToken, getrefershtoken, saverefershtoken } from "../UTILS/Local";
import BASE_URL from "../UTILS/config";

const Selecction = () => {
  const [topics, settopics] = useState({});
  const topic = "dsa";
  useEffect(() => {
    const gettopics = async () => {
      try {
        const resp = await fetch(`${BASE_URL}/api/v1/topics/${topic}`, {
          // method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          // body: JSON.stringify({
          //   famousplace: place,
          //   date: date,
          // }),
        });
        if (resp.status === 401) {
          const suxxess = await refreshtoken();
          console.log(suxxess);
          if (suxxess) {
            return gettopics();
          } else {
            toast.error("Unable to refresh token.");
            navigate("/");
          }
        }
        if (!resp.ok) {
          console.log("error in fetching in topics");
        }
        // console.log(resp);
        const data = await resp.json();
        console.log("YOUR TOPICS", data);
        settopics(data);
      } catch (err) {
        console.log("error in connected to backend while fetching in topics");
      }
    };
    gettopics();
  }, []);

  const refreshtoken = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/token/refresh`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          refreshtoken: getrefershtoken(),
        }),
      });
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

  const handletopic = (topic) => {
    console.log(topic);
    //  NAVIGATET OT HTAT TOPIC
  };
  return (
    <div>
      <p>HEY THIS IS SELECTION PAGE</p>
      {topics.length > 0 &&
        topics.map((topic, ind) => (
          <div key={ind}>
            <button onClick={() => handletopic(topic.subtopic)}>
              {topic.subtopic}
            </button>
            <p>{topic.ques}</p>
          </div>
        ))}
    </div>
  );
};

export default Selecction;
