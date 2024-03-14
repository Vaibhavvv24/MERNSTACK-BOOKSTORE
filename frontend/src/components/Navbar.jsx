import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/Auth";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  //const { user } = UseAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  //console.log(currentUser.user);
  const navigate = useNavigate();
  //console.log(user);

  function navigateToCart() {
    navigate(`/cart/${currentUser._id}`);
    window.location.reload();
  }
  return (
    <nav className="bg-blue-200">
      <div className="flex ">
        <div className="flex">
          <Link to="/">
            <img
              src="booklogo.jpeg"
              alt="logo"
              className="w-36 h-24 mx-4 my-3"
            />
          </Link>
        </div>
        <ul className=" mx-48 flex justify-between items-center gap-14">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/sell">Sell your books</Link>
          </li>
          {currentUser && (
            <li>
              <Link to={`/profile/${currentUser._id}`}>
                <div className="flex gap-2">
                  <FaRegUserCircle size={30} />
                  <p>{currentUser.username}</p>
                </div>
              </Link>
            </li>
          )}

          {!currentUser && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <button onClick={navigateToCart}>
              <IoCartOutline size={30} />
            </button>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
