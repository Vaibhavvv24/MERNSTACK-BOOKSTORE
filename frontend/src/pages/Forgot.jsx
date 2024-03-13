import React, { useState } from "react";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForgot = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      setLoading(true);
      const res = await fetch("/api/user/forgotpwd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      setLoading(false);
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl mt-10">Enter your email to reset password</h1>
      <form className="flex flex-col items-center justify-center gap-4 h-[300px] w-[400px] bg-blue-400">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 border-solid rounded-md shadow-md w-3/4"
        />
        <button
          onClick={handleForgot}
          className="p-3 bg-green-200 text-white rounded-md w-1/2"
        >
          Submit
        </button>
        <h1>{loading ? "loading..." : ""}</h1>
        <p className="text-red-500">{message}</p>
      </form>
    </div>
  );
};

export default Forgot;
