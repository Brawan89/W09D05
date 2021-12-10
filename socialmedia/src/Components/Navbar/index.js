import React from "react";
import { logout } from "./../../reducers/login";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css"

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signout = () => {
    localStorage.clear();
    dispatch(logout({ token: "" }));
    navigate("/login");
  };

  return (
    <div className="nav">
      <button onClick={signout}>logout</button>
    </div>
  );
};

export default Navbar;
