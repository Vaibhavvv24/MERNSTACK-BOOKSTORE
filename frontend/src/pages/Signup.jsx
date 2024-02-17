import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { UseAuth } from "../context/Auth";

const Signup = () => {
  //const [formData, setFormData] = useState({}); //{username:"",email:"",password:""}
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  //const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Signup, loading, error } = UseAuth();

  // const navigate = useNavigate();
  // const handleChange = (e) => {

  // setFormData({
  // ...formData, //sets formdata to the current state
  // [e.target.id]: e.target.value, //sets the id of the input to the value
  //});
  //};
  return (
    <>
      <div className="flex flex-col items-center bg-slate-200  ">
        <h1 className="text-3xl mt-10">Signup</h1>
        <form
          className="flex flex-col items-center justify-center gap-6 mt-1 w-[400px] h-[400px]"
          onSubmit={Signup}
        >
          <input
            type="text"
            placeholder="username"
            value={username}
            name="username"
            id="username"
            className="rounded-md shadow-md p-3 mt-2 w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={email}
            className="rounded-md shadow-md p-3  w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            className="rounded-md shadow-md p-3 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            type="submit"
            className="rounded-md shadow-md p-3 bg-red-400 w-full text-white cursor-pointer"
          >
            Signup
          </button>

          <Oauth />
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
