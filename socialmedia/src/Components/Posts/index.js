import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import AiTwotoneEdit from "react-icons/ai"

const Posts = () => {
    const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [updatePost, setUpdatePost] = useState("");
  const [comments, setComments] = useState([]);
  

  const state = useSelector((state) => {
    return state;
  });

  // const goPost = () => {
  //   navigate("/onePost")
  // }

  useEffect(() => {
    getAllPosts();
    // gettAllComment();
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
  const updatPost = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updatePost/${id}`,
        {
          dec: updatePost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      updatPost(state.signIn.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };

  // delete post by id
  const deletePost = async (_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deletePost/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      deletePost(state.signIn.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };


  //comment
  const gettAllComment = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getAllComments`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result);
      gettAllComment(result.data);
    } catch (error) {
      console.log(error);
    }
    // window.location.reload(false);
  };

  const addComment = async (comment , posts) => {
    try {
      const result =
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/addComment`,
        {
          comment,
          posts,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result);
      gettAllComment(state.signIn.token);
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
                  <img id="image" /*onClick={()=> goPost(item._id)}*/ src={item.img}></img>
                  <h2 key={item._id}>{item.dec}</h2>
                  <input
                    type="text"
                    onChange={(val) => {
                      setUpdatePost(val.target.value);
                    }}
                  />

                  <button onClick={() => updatPost(item._id)}>
                    {" "}
                    update Your Post{" "}
                  </button>

                  <button onClick={() => deletePost(item._id)}>Delete</button>
                  {/* <h2 key={item._id}>{item.comment}</h2> */}
                  {comments.map((cont) => (
                    <h6>
                      {cont.comment}
                    </h6>
                  ))}
                  
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    console.log("comment ", e.target[0].value, item._id);

                    addComment(e.target[0].value, item._id)
                    
                  }} >
                    <input type="text" placeholder="add comment" />

                  </form>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
export default Posts;
