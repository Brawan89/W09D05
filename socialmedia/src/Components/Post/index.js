import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };
    //add new post
    const addNewPost = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/createPosts`,
          {
            img: "https://graphicriver.img.customer.envatousercontent.com/files/323806823/Avatar_preview_envato.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=5fb7fcf691c84523827c9b478b80092b", 
            dec: post,
          },
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        // dispatch(addNewTask(result.data));
        getAllPosts(state.signIn.token);
  
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <div style={{ marginTop: "0" }}>
        <Navbar />
        <br />
        <hr />
      </div>
      <div>
        <input
        type="text"
        name="post"
          onChange={(e) => setPost(e.target.value)}
          placeholder="add Post"
        />
        <button className="addBtn" onClick={addNewPost} style={{color: "white" , fontSize: "20px"}}>
         +
        </button>
      </div>
      <div className="posts">
        {posts.length &&
          posts.map((item) => (
            <div key={item._id}>
              <div className="post">
                <img id="image" src={item.img}></img>
                <h2>{item.dec}</h2>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Post;
