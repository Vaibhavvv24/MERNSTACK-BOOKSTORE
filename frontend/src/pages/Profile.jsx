import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profilepic from "../assets/profile.webp";
import { UseAuth } from "../context/Auth";

const Profile = () => {
  //const [currentUser, setCurrentUser] = useState({});
  //const [loading, setLoading] = useState(false);
  //const params = useParams();
  // const navigate = useNavigate();
  //const { id } = params;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = params;
  //const { user, handleDelete, handleUpdate, handleLogout, loading } = UseAuth();
  async function getCurrentUser() {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      console.log(data);
      setUser(data);
      setUsername(data.username);
      setEmail(data.email);
      setPassword(data.password);

      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${id}`, {
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
      setUser(data);
      //setUsername(data.username);
      //setEmail(data.email);
      //setPassword(data.password);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUser({});
      //setEmail("");
      //setPassword("");
      //setUsername("");

      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser({});
      //setEmail("");
      //setPassword("");
      //setUsername("");
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl my-10">Profile</h1>
        <h1>Welcome {user.username}</h1>
        <h2>{user.email}</h2>
        <h2>{user.password}</h2>
      </div>

      <div className="text-center my-10 ">
        <h1 className="text-2xl my-10">Your Profile</h1>
        <div className="flex justify-center items-center ">
          <form className="flex flex-col gap-2 w-1/2 ">
            <div className="flex justify-center">
              <img src={Profilepic} alt="profile" className="w-48 h-48" />
            </div>
            <input
              type="text"
              placeholder="username"
              id="username"
              value={username}
              name="username"
              //value={username}
              className="rounded-md shadow-md p-3  w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              defaultValue={user.email}
              className="rounded-md shadow-md p-3  w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              defaultValue={user.password}
              className="rounded-md shadow-md p-3 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loading}
              type="submit"
              className="rounded-md shadow-md p-3 bg-red-400 w-full text-white cursor-pointer"
              onClick={handleUpdate}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <div className="flex justify-between">
              <div className="">
                <button className="text-red-400" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              <div>
                <button className="text-red-400" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
