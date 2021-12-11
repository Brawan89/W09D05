import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [updatePost, setUpdatePost] = useState("");

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

  // edit task
  const updateTask = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updatePost/${id}`,
        {
       
          // img: "https://media.istockphoto.com/vectors/pretty-girl-avatar-flat-cartoon-style-vector-illustration-vector-id1140166223?k=20&m=1140166223&s=170667a&w=0&h=wgeq7igZ8rP0WrzCBGJL70dLF9bPri1nrMXNerQ6kOA=",
          dec: updatePost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
        
      );
      updatePost(state.signIn.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);

  };

   // delete post by id
   const deleteTask = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/deletePost/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      deleteTask(state.signIn.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);

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
        <button
          className="addBtn"
          onClick={addNewPost}
          style={{ color: "white", fontSize: "20px" }}
        >
          +
        </button>
      </div>
      <div className="posts">
        {posts.length &&
          posts.map((item) => (
            <>
              <div key={item._id}>
                <div className="post">
                  <img id="image" src={item.img}></img>
                  <h2 key={item._id}>{item.dec}</h2>
                  <input
                    type="text"
                    onChange={(val) => {
                      setUpdatePost(val.target.value);
                    }}
                  />
                  <button onClick={() => updateTask(item._id)}>
                    {" "}
                    update Your Post{" "}
                  </button>
                  <button onClick={() => deleteTask(item._id)}>Delete</button>

                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
export default Post;
