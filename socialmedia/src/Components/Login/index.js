import React, { useState } from "react";
import axios from "axios";
import "./style.css"
 const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const login = async () => {
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/login`,
            {
              userName,
              password,
            }
          );
        
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <>
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
          </div>
          </div>
        </>
    )
}

export default Login;