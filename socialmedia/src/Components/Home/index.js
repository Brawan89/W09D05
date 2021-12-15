import React, {useEffect , useState} from 'react';
import Navbar from "../Navbar";
// import "./style.css";
import { useSelector } from "react-redux";

import axios from "axios";

 const Home = () => {
    const [post, setPost] = useState([]);

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
            `${process.env.REACT_APP_BASE_URL}/getPost`,
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
                  </div>
                 
          ))}
          </div>
        </>
    )
}
export default Home;