import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  //const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const params = useParams();
  // const navigate = useNavigate();
  //const { id } = params;

  async function Signup(e) {
    e.preventDefault();
    try {
      setLoading(true); //we set up a proxy for /api in package.json and now we can use it and post formdata to /api/auth/signup

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        //if data.success is false then the error is set and shown in front end
        setLoading(false);
        setError(data.message);
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(JSON.parse(localStorage.getItem("user")));
      //console.log(data);
      setLoading(false); //if data.success is true then user is logged in and error not shown
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  async function Login(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        //we set up a proxy for /api in package.json and now we can use it and post formdata to /api/auth/signup
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();
      console.log("Login wala user");

      console.log(data);
      console.log(data.user);
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

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authToken", JSON.stringify(data.token));
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate(`/profile/${data.user._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  }
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
      console.log(data.user);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authToken", JSON.stringify(data.token));
      setUser(JSON.parse(localStorage.getItem("user")));

      navigate(`/profile/${data.user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        Signup,
        setUser,
        user,
        Login,
        loading,
        error,
        handleGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, UseAuth };
