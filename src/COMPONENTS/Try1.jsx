import React, { useState } from "react";

const Try1 = () => {
  const [data, setdata] = useState({});
  const [fetching, setfetching] = useState(false);
  const handledata = async () => {
    try {
      const resp = await fetch(
        `https://springapp1402-awajgpegfsdkh2ce.canadacentral-01.azurewebsites.net/api/v1/`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
        }
      );

      if (resp.status === 401) {
        const suxxess = await refreshtoken();
        console.log(suxxess);
        if (suxxess) {
          return handledata();
        } else {
          toast.error("Unable to refresh token.");
          navigate("/");
          return;
        }
      }

      if (!resp.ok) {
        console.log("Error in fetching DATA IN TRY");
        return;
      }

      const data = await resp.json();
      console.log("YOUR DATA", data);
      settopics(data);
    } catch (err) {
      setdata(false);
      console.log("Error connecting to backend while fetching topics", err);
    } finally {
      setfetching(false);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <p className="text-lg md:text-xl font-semibold mb-4 text-center">
        hey this is app for trial
      </p>

      <button
        onClick={() => handledata()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full md:w-auto"
      >
        GET DATA
      </button>

      {fetching && (
        <div className="bg-yellow-200 px-4 py-2 rounded w-full md:w-auto text-center">
          <h1 className="text-lg font-bold">DATA FETCHING IS GOING ON</h1>
        </div>
      )}

      {data.length > 0 &&
        data.map((data, ind) => (
          <div
            className="mt-4 bg-white shadow rounded p-4 w-full md:w-1/2"
            key={ind}
          >
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Username:</strong> {data.username}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Auth:</strong> {data.auth}
            </p>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
            <p>
              <strong>Password:</strong> {data.password}
            </p>
            <p>
              <strong>Project:</strong> {data.project}
            </p>
            <p>
              <strong>Times:</strong> {data.times}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Try1;
