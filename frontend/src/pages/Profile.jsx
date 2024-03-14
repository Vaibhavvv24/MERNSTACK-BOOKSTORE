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

  //const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const { user, setUser } = UseAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({ currentUser });
  //const params = useParams();
  //const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangeupdate = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setFormData(data);
      //setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("user")));
      //setUsername(data.username);
      //setEmail(data.email);
      //setPassword(data.password);
    } catch (error) {
      console.log(error);
    }
  };

  //const { id } = params;
  //const { user, handleDelete, handleUpdate, handleLogout, loading } = UseAuth();
  async function getCurrentUser() {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/${currentUser._id}`);
      const data = await res.json();
      console.log(data);
      setFormData(data);

      //setUsername(data.username);
      //setEmail(data.email);
      //setPassword(data.password);

      setLoading(false);
      console.log("get current user");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setFormData({});
      localStorage.removeItem("user");
      //setUser({});
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
      setFormData({});
      localStorage.removeItem("user");

      //setEmail("");
      //setPassword("");
      //setUsername("");
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("form wala");
  console.log(formData);
  console.log("user wala");
  console.log(user);

  return (
    <>
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
              defaultValue={currentUser.username}
              name="username"
              //value={username}
              className="rounded-md shadow-md p-3  w-full"
              onChange={handleChangeupdate}
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              defaultValue={currentUser.email}
              className="rounded-md shadow-md p-3  w-full"
              onChange={handleChangeupdate}
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              defaultValue={currentUser.password}
              className="rounded-md shadow-md p-3 w-full"
              onChange={handleChangeupdate}
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
