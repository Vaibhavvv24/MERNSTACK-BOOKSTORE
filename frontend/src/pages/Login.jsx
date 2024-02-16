import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        //we set up a proxy for /api in package.json and now we can use it and post formdata to /api/auth/signup
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data + "Login success");
      if (data.success === false) {
        //if data.success is false then the error is set and shown in front end
        setLoading(false);
        setError(data.message);
        // Show error in front end

        return;
      }
      // setLoading(false); //if data.success is true then user is logged in and error not shown
      setError(null);
      setLoading(false);

      navigate(`/profile/${data._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Login;
