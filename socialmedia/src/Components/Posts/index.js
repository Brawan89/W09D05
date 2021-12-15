import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import AiTwotoneEdit from "react-icons/ai"
import { storage } from "../firebase";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Swal from "sweetalert2";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState("");
  const [comment, setComment] = useState([]);
  const [desc, setDesc] = useState("");
  const [img, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [lik, setLik] = useState(false);
  // const [unlik, setUnLik] = useState(true);
  // const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllPosts();
    // gettAllComment();
  }, []);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            addNewPost(url);
          });
      }
    );
  };
  //

  //

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
          // img: "https://graphicriver.img.customer.envatousercontent.com/files/323806823/Avatar_preview_envato.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=5fb7fcf691c84523827c9b478b80092b",
          img: url,
          dec: desc,
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
  // const gettAllComment = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/getAllComments`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${state.signIn.token}`,
  //         },
  //       }
  //     );
  //     console.log(result);
  //     gettAllComment(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // window.location.reload(false);
  // };

  //   const addComment = async (id) => {
  //       const result = await axios.post(
  //         `${process.env.REACT_APP_BASE_URL}/addComment`,
  //         {
  //           comment: comment,
  //           posts: id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${state.signIn.token}`,
  //           },
  //         }
  //       );
  //       console.log(result);
  //       setComment("");
  // getAllPosts();
  // window.location.reload(false);
  // };
  // const likePost = async (_id) => {
  //   await axios.put(
  //     `${process.env.REACT_APP_BASE_URL}/addLikes/${posts}}`,
  //     {
  //       like: _id,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${state.signIn.token}`,
  //       },
  //     }
  //   );

  //   if (_id) setLike(true);
  //   else setLike(false);

  // };
  //

  //   const like = async (_id) => {
  //     try {
  //       console.log("id", _id);
  //       const res = await axios.put(
  //         `${process.env.REACT_APP_BASE_URL}/addLikes/${_id}`,
  //         {
  //           userId: state.signIn.userId,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${state.signIn.token}`,
  //           },
  //         }
  //       );
  //       setLik(res.data.like);
  //       getAllPosts();
  //       Swal.fire(
  //       'add like',
  //       'You clicked the button!',
  //       'success'
  // )

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <div style={{ marginTop: "0" }}>
        <Navbar />
        <br />
        <hr />
      </div>
      <div>
        <>
          <div>
            <label
              style={{
                marginLeft: "400px",
                fontSize: "20px",
                color: "rgb(197, 175, 173)",
              }}
            >
              {" "}
              Hello in your profile you can see yor picture and add picture{" "}
            </label>
            <br />
            <label style={{ marginLeft: "110px", fontSize: "20px" }}>
              Choose Photo{" "}
            </label>
            <input
              className="add"
              style={{ marginLeft: "100px", fontSize: "20px" }}
              type="file"
              name="post"
              onChange={handleChange}
            />
            <label style={{ marginLeft: "110px", fontSize: "20px" }}>
              Type your name{" "}
            </label>
            <br />
            <textarea
              style={{ marginLeft: "100px", fontSize: "20px" }}
              name="w3review"
              rows="3"
              cols="100pm"
              placeholder="add your name"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <progress
              style={{ marginLeft: "100px" }}
              value={progress}
              max="100"
            />
            <button
              className="add"
              style={{ marginLeft: "100px", fontSize: "20px" }}
              onClick={handleUpload}
            >
              {" "}
              +
            </button>
          </div>
        </>
      </div>
      <div className="posts">
        {posts.length &&
          posts.map((item) => (
            <>
              <div key={item._id}>
                <div className="post">
                  <img id="image" src={item.img}></img>
                  <h2 key={item._id}>{item.dec}</h2>
                  <div className="bin">
                    <input
                      className="bn"
                      style={{
                        marginLeft: "2px",
                        width: "140px",
                      }}
                      type="text"
                      placeholder="Change name"
                      onChange={(val) => {
                        setUpdatePost(val.target.value);
                      }}
                    />

                    <button
                      className="bn"
                      style={{  width: "100px" , fontSize:"11px",marginBottom: "10px"}}
                      onClick={() => updatPost(item._id)}
                    >
                      Change name
                    </button>
                  </div>

                  <button
                    style={{
                      marginLeft: "70px",
                      marginBottom: "10px",
                      width: "210px",
                    }}
                    onClick={() => deletePost(item._id)}
                  >
                    Delete
                  </button>
                  {/* <h2 key={item._id}>{item.comment}</h2> */}
                  {/*           
                     <textarea
                     id="shareCommentText"
                     placeholder="Write a comment.."
                   ></textarea>
                    <button className="shareCommentButton" onClick={() => addComment(item._id)}>
                     add comment
                   </button> */}
                  {/* // <h6>{cont.comment}</h6> */}

                  {/* <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("comment ", e.target[0].value, item._id);

                      addComment(e.target[0].value, item._id);
                    }}
                  >
                    <input type="text" placeholder="add comment" /> */}

                  {/* <MdFavorite
                      className="likeIcon"
                      onClick={() => like(item._id)} */}
                  {/* // className={lik ? "showl" : "disabled"} */}
                  {/* // className={unlik ? "show" : "disabled"} */}

                  {/* // /> */}

                  {/* </form> */}
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
export default Posts;
