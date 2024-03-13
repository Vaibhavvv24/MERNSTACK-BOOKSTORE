import React, { useState } from "react";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForgot = async () => {
    console.log(email);
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
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgot}>Submit</button>
      <h1>{loading ? "loading..." : ""}</h1>
      <p>{message}</p>
    </div>
  );
};

export default Forgot;
