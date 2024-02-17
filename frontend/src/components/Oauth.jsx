import React from "react";
import { UseAuth } from "../context/Auth";

const Oauth = () => {
  const { handleGoogle } = UseAuth();
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
