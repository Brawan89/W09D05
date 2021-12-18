import React from "react";
import { logout } from "./../../reducers/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    localStorage.clear();
    dispatch(logout({ token: "" }));
    navigate("/login");
  };

  return (
    <>
      <div className="nav"> 
     <button onClick={signout}>logout</button>
      </div>
      <div className="menu">
        <ul>
             <NavLink to="/home">
            <li className="logo">
              <img src="" />
            </li>
          </NavLink>

          <NavLink to="/home" className="links">
            <li>Home</li>
          </NavLink>
          <NavLink to="/login" className="links">
            <li>Profile</li>
          </NavLink>
              </ul>
     </div>
      
    </>
  );
};

export default Navbar;
