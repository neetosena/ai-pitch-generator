import React, { useState } from "react";
import useFetch from "../assets/hooks/useFetch";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import AiMessage from "./AiMessage";

const PitchForm = () => {
  const [prompt, setPrompt] = useState({
    name: "",
    role: "",
    skills: "",
    goal: "",
  });
  const [isDone, setIsDone] = useState(false);
  const { isLoading, data } = useFetch({ ...prompt, isDone, setIsDone });

  console.log("data:", data);
  console.log(isDone);

  const notify = () =>
    toast("Please fill in all fields", { position: "top-center" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(prompt).every(
      (val) => val.trim() !== ""
    );
    if (allFieldsFilled) {
      setIsDone(true);
    } else {
      notify();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPrompt((prevPrompt) => {
      return {
        ...prevPrompt,
        [name]: value,
      };
    });
  };
  console.log(prompt);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full px-5 flex flex-col gap-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={prompt.name}
          className="input stretch-elements"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          onChange={handleChange}
          value={prompt.role}
          className="input stretch-elements"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills/Tech"
          onChange={handleChange}
          value={prompt.skills}
          className="input stretch-elements"
        />
        <input
          type="text"
          name="goal"
          placeholder="Career Goal"
          onChange={handleChange}
          value={prompt.goal}
          className="input stretch-elements"
        />
        <button type="submit" className="btn btn-primary stretch-elements">
          {isLoading ? "Generating..." : "Send"}
        </button>
      </form>
      {!isLoading && <Loading />}
      {data ? <AiMessage data={data} isDone={isDone} /> : <ToastContainer />}
    </>
  );
};
export default PitchForm;
