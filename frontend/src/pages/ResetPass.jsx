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
    if (!pwd || !cpwd) {
      alert("Please fill all the fields");
      return;
    }
    if (pwd !== cpwd) {
      alert("Passwords do not match");
      return;
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
    <div className="flex flex-col justify-center items-center mt-10 ">
      <h1 className="text-3xl my-2 font-bold">Reset Password</h1>
      <div className="flex flex-col justify-center items-center w-[400px] h-[300px] gap-4 rounded-md bg-blue-400">
        <input
          type="password"
          placeholder="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="p-4 border-solid rounded-md shadow-md w-3/4"
        />
        <input
          type="password"
          placeholder="confirm password"
          value={cpwd}
          onChange={(e) => setCpwd(e.target.value)}
          className="p-4 border-solid rounded-md shadow-md w-3/4"
        />
        <button
          onClick={handleSubmit}
          className="p-3 bg-green-200 text-white rounded-md w-1/2"
        >
          Reset Password
        </button>
        <h1 className="text-xl text-red-200">{msg}</h1>
      </div>
    </div>
  );
};

export default ResetPass;
