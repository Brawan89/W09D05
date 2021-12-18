import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
// import "./style.css";
import { useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

const Home = () => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [lik, setLik] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getPosts();
    // gettAllComment();
  }, []);

  const getPosts = async () => {
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
      setPost(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  const addComment = async (id) => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/addComment`,
      {
        comment: comment,
        posts: id,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    console.log(result);
    setComment("");
    getPosts();
    window.location.reload(false);
  };

  const like = async (_id) => {
    try {
      console.log("id", _id);
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/addLikes/${_id}`,
        {
          userId: state.signIn.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setLik(res.data.like);
      getPosts();
      Swal.fire("add like", "You clicked the button!", "success");
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
      <div className="posts">
        {post.length &&
          post.map((item) => (
            <div key={item._id}>
              <div className="post">
                <img
                  id="image"
                  /*onClick={()=> goPost(item._id)}*/
                  src={item.img}
                ></img>
                {/* <h2 key={item._id}>{item.dec}</h2>   */}
              </div>
              <textarea 
              style={{width: "100%"}}
                     id="shareCommentText"
                     placeholder="Write a comment.."
                   ></textarea>
                    <button className="shareCommentButton" onClick={() => addComment(item._id)}>
                     add comment
                   </button>
              <form>
                <MdFavorite
                  className="likeIcon"
                  onClick={() => like(item._id)}
                  className={lik ? "showl" : "disabled"}
                />
              </form>
            </div>
          ))}
      </div>
    </>
  );
};
export default Home;
