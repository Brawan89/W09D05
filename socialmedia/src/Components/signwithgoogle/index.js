import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

function SigninGoogle() {
  const responseSuccessGoogle = async (response) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/googlelogin`, {
        token: response.tokenId
      });
      console.log("Google signin success",res);

    } catch (error) {
      console.log(error);
    }
  };

  const responseErrorGoogle = (response) => {
    console.log("Somthing went wrong!");
  };

  return (
    <>
      <h1>Signin with Google</h1>
      <GoogleLogin
        clientId="303299576143-aiehfsg7l0jrm7313aav0smgh11g150h.apps.googleusercontent.com"
        buttonText="Signin with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default SigninGoogle;