import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPass = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [msg, setmsg] = useState("");
  const handleSubmit = async () => {
    if (pwd !== cpwd) {
      alert("Passwords do not match");
    }
    const res = await fetch(`/api/user/resetpwd/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: pwd,
      }),
    });
    const data = await res.json();
    setmsg(data.message);
    console.log(data);
  };
  return (
    <div>
      <input
        type="password"
        placeholder="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <input
        type="password"
        placeholder="confirm password"
        value={cpwd}
        onChange={(e) => setCpwd(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <h1>{msg}</h1>
    </div>
  );
};

export default ResetPass;
