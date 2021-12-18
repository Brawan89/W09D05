import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Nav from "./../Nav";
import "./style.css";
import axios from "axios";


const Users = () => {
  const [getAllUsers, setGetAllUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const state = useSelector((state) => {
    return state;
  });
  const getUsers = async () => {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/allusers`, {
      headers: {
        Authorization: `Bearer ${state.signIn.token}`,
      },
    });
    console.log(result.data);
    setGetAllUsers(result.data);
  };
 //soft delete 
  const delUsers = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/delusers/${_id}`, {
        headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
      });
      delUsers(state.signIn.token);
      // getAllUsers();
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };

  return (
    <>
      <Nav />
        {getAllUsers &&
          getAllUsers.map((e) => {
            return (
              <div>
                <div key={e._id}>
                  <button className="del" onClick={() => delUsers(e._id)}>
                    delete user!
                  </button>
              </div>
         </div>
            )})
}
         </>
  );
};
export default Users;