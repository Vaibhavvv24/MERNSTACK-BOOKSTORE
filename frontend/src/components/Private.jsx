import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../context/Auth";

const Private = () => {
  const { user } = UseAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return currentUser ? <Outlet /> : <Navigate to="/login" />; //if user is not logged in then navigate to login page
  // else return <Outlet />
};

export default Private;
