import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../reducers/auth";
import axios from "axios";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [message, setMessage] = useState(false);

  const forgPass = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/forgotPassword`,
        {
          email
        }
      );
      // console.log(res.data.token);
      dispatch(reset(res.data.token));
      setSendEmail(true);
    } catch (error) {
      console.log(error);
      setMessage(true);
    }
  };

  return (
    <>
      {sendEmail ? (
        "Email have been sent"
      ) : (
        <>
          {message ? "enter your email" : ""}
          <input
            type="email"
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={forgPass}>Send email</button>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
