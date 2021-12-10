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
            img: post, 
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
          onChange={(e) => setPost(e.target.value)}
          placeholder="add Tasks"
        />
        <button className="addBtn" onClick={addNewPost}>
          Add New Task
        </button>
      </div>
      <div className="posts">
        {posts.length &&
          posts.map((item) => (
            <div key={item._id}>
              <div className="post">
                <img id="image" src={item.img}></img>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Post;
