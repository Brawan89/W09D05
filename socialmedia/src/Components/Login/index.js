import React, { useState } from "react";
import { log } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
// import { useNavigate } from "react-router-dom";
import Posts from "../Posts";
import { Link } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          userName,
          password,
        }
      );

      const data = {
        role: result.data.result.role,
        user: result.data.result,
        token: result.data.token,
      };

      console.log(result);
      dispatch(log(data));
      // navigate("/post");
    } catch (error) {
      console.log(error);
    }
  };

  
 return (
    <>
      {!state.signIn.token ? (
        <>
          <div className="top">
            <div className="container">
              <div className="brand-logo"></div>
              <div className="inputs">
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={login}>login</button>
                <p className="forgotPassword" /*onClick={forgPass}*/>
                  forgot password?
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Posts />
      )}
    </>
  );
};

export default Login;
