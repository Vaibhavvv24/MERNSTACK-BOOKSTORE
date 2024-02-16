import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profilepic from "../assets/profile.webp";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.id]: e.target.value,
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });
      const data = await res.json();
      console.log(data);
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
      setCurrentUser({});
      console.log(data);
      navigate("/signup");
      console.log(data);
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
      setCurrentUser({});
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  async function getCurrentUser() {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      setCurrentUser(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [id]);

  return (
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
            className="rounded-md shadow-md p-3  w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="rounded-md shadow-md p-3  w-full"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            defaultValue={currentUser.password}
            className="rounded-md shadow-md p-3 w-full"
            onChange={handleChange}
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
  );
};

export default Profile;
