import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = ({ name, role, skills, goal, isDone, setIsDone }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const LAMBDA_API_URL = import.meta.env.VITE_LAMBDA_API_URL;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        LAMBDA_API_URL,
        {
          name,
          role,
          skills,
          goal,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Full Lambda response:", response.data);
      const parseBody =
        typeof response.data.body === "string"
          ? JSON.parse(response.data.body)
          : response.data.body;

      console.log("parseBody: ", parseBody);
      setData(parseBody?.message || "No pitch generated.");
    } catch (err) {
      console.log(err);
      console.error("Fetch error:", err.response?.data || err.message);
      setData("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setIsDone(false);
    }
  };

  useEffect(() => {
    if (name && role && skills && goal && isDone) {
      fetchData();
    }
  }, [isDone]);

  return { isLoading, data };
};
export default useFetch;
