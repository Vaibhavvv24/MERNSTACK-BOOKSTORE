import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      //   console.log(res.user.displayName);
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
        }),
      });
      const data = await result.json();
      console.log(data);

      navigate(`/profile/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogle}
        className="rounded-md shadow-md p-3 bg-red-400 w-full text-white cursor-pointer"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
