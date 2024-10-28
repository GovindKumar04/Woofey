import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function Navbar({ onSignupClick }) {
  const [menu, setmenu] = useState("home");
  return (
    <div className="flex items-center shadow min-w-full min-h-20 fixed z-30 ">
      <img
        src={assets.logo}
        alt=""
        className="max-w-60 max-h-10 ml-20 rounded-xl"
      />
      <ul className="flex mx-auto space-x-20">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Home
          </NavLink>
        </li>
        

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Contact us
          </NavLink>
        </li>
      </ul>
      <div className="flex mx-auto space-x-10">
        <img src={assets.search_icon} alt="" />
        <NavLink
        to="/cart">
          
          <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="fixed w-2 h-2 bg-red-700 rounded top-5 ml-2.5"></div>
          </div>
        </NavLink>

        <button className=" m-0 w-24 h-9 p-0 bg-gray-200 rounded-3xl">
          <NavLink
            onClick={onSignupClick}
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Sign up
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default Navbar;