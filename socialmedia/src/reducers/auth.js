const initState = {
    token: ""
  };
  
  const auth = (state = initState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "RESET":
        localStorage.setItem("resetToken", payload);
        return { token: payload };
  
      case "ACTIVE":
        localStorage.setItem("activeToken", payload);
        return { token: payload };
  
      default:
        let resetTokenStorage = localStorage.getItem("resetToken");
        let activeTokenStorage = localStorage.getItem("activeToken");
        if (resetTokenStorage) return { token: resetTokenStorage };
        if (activeTokenStorage) return { token: activeTokenStorage };
        else return state;
    }
  };
  
  export default auth;
  
  export const reset = (data) => {
    return {
      type: "RESET",
      payload: data
    };
  };
  
  export const active = (data) => {
    return {
      type: "ACTIVE",
      payload: data
    };
  };
  