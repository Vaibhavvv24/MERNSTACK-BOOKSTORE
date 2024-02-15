import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({}); //{username:"",email:"",password:""}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    //
    setFormData({
      ...formData, //sets formdata to the current state
      [e.target.id]: e.target.value, //sets the id of the input to the value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); //we set up a proxy for /api in package.json and now we can use it and post formdata to /api/auth/signup

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        //if data.success is false then the error is set and shown in front end
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false); //if data.success is true then user is logged in and error not shown
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center bg-slate-200  ">
        <h1 className="text-3xl mt-10">Signup</h1>
        <form
          className="flex flex-col items-center justify-center gap-6 mt-1 w-[400px] h-[400px]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="username"
            id="username"
            className="rounded-md shadow-md p-3 mt-2 w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="rounded-md shadow-md p-3  w-full"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="rounded-md shadow-md p-3 w-full"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            type="submit"
            className="rounded-md shadow-md p-3 bg-red-400 w-full text-white cursor-pointer"
          >
            Signup
          </button>

          {/* <Oauth /> */}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default Signup;
