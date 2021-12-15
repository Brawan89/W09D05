import React, { useState } from "react";
import { log } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { useNavigate , Link } from "react-router-dom";
import Posts from "../Posts";
import { AiFillGoogleSquare } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

const Login = () => {

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
        dispatch(log(data))

      } catch (error) {
        console.log(error);
      }
    };
  //
  

  // const googleLogin = () => {
  //   popupTools.popup(
  //     `${process.env.REACT_APP_BASE_URL}/auth/google`,
  //     "Google Login",
  //     { width: 400, height: 600 },
  //     function (err, user) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         dispatch(
  //           log({
  //             role: user.result.role.role,
  //             token: user.token,
  //             user: user.result,
  //           })
  //         );
  //         navigate("/");
  //       }
  //     }
  //   );
  // };
  //
  const google = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/auth/google`, "_self");
  };

  const facebook = () => {
    window.open("http://localhost:4000/auth/facebook", "_self");
  };

  return (
    <>
      {!state.signIn.token ? (
        <>
          <div className="top">
            <div className="container" style={{ width: "500px" }}>
              <div className="brand-logo"></div>
              <div className="brand-title">Login</div>
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
                <button onClick={login} style={{ color: "rgb(106,73,70)" }}>
                  login
                </button>
                <Link to="/forgettenPassword">
                  <p> forgot password?</p>
                </Link>
              </div>
              <div>
                <ul>
                  <li>
                    <AiFillGoogleSquare onClick={google} />
                  </li>
                  {/* <li>
                <AiFillFacebook onClick={facebook}/>
                </li> */}
                </ul>
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
