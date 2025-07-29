import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = ({ name, role, skills, goal, isDone, setIsDone }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

  const API_URL =
    "https://router.huggingface.co/novita/v3/openai/chat/completions";

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          messages: [
            {
              role: "user",
              content: `Create a 1-sentence elevator pitch for someone named ${name}, a ${role}, who is skilled in ${skills}, and wants to ${goal}`,
            },
          ],
          model: "mistralai/mistral-7b-instruct",
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData(
        response.data.choices[0]?.message?.content || "No pitch generated."
      );
    } catch (err) {
      setError(err);
      console.log(err);
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
