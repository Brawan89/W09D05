import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ResetPassword() {
  const [newPass, setNewPass] = useState("");
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState(false);

  const state = useSelector((state) => {
    return {
      auth: state.auth.token
    };
  });

  const resetPassword = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/resetPassword`, {
        resetLink: state.auth,
        newPass
      });
      // console.log(res.data);
      setReset(true);
      localStorage.clear();
    } catch (error) {
      console.log(error);
      setMessage(true);
    }
  };
  return (
    <>
      {reset ? (
        "Reset successfully"
      ) : (
        <>
          {message ? "Somthing went wrong!" : ""}
          <input
            type="password"
            placeholder="enter your new password"
            onChange={(e) => setNewPass(e.target.value)}
          />
          <button onClick={resetPassword}>Reset password</button>
        </>
      )}
    </>
  );
}

export default ResetPassword;
