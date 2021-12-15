import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import zxcvbn from "zxcvbn";
import generator from "generate-password";
import axios from "axios";
import { active } from "../../reducers/auth";
import { useDispatch } from "react-redux";

const Register = () => {
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
    } catch (error) {
      console.log(error);
    }
  };


  //stronge pass
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLable = () => {
    switch (testResult.score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fear";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePassColors = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "10px",
  });

  return (
    <>
      <div className="top">
        <div className="container" style={{ width: "500px" }}>
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
            <div className="pass">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="progress" style={{ height: "10px" }}>
                <div className="progress-bar" style={changePassColors()}></div>
              </div>
              <p style={{ color: funcProgressColor() }}>{createPassLable()}</p>

              <button onClick={register} style={{ color: "rgb(106,73,70)" }}>
                Register
              </button>
              <p>
                Do you already have an account?
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
