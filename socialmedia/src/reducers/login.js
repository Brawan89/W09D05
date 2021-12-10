const instialState = {
  token: "",
};

//reduce function
const signIn = (state = instialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { token } = payload;
      localStorage.setItem("token", token);
      return { token };

    case "LOGOUT":
      localStorage.clear();
      return { token: "" };

    default:
      const tokenStorage = localStorage.getItem("token");
      if (tokenStorage) return { token: tokenStorage };
      else return state;
  }
};

export default signIn;

export const log = (data) => {
  console.log("From the reduce", data);
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data, // { user: null , token: "" }
  };
};
