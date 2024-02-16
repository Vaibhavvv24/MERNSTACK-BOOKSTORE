import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <li>
            <Link to="/login">Login</Link>
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
