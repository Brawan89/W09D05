import React, { useState } from "react";
import "./style.css";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function register
  const register = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          userName,
          email,
          password,
          role: "61b0a2b9da0dc03b9e2f2f6e",
        }
      );
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">Register</div>
        <div className="inputs">
          <input
            type="text"
            name="text"
            placeholder="user name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button onClick={register} style={{ color: "rgb(106,73,70)" }}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
