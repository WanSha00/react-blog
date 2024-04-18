import { useLocation } from "react-router-dom";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SinglePost() {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  useEffect(() => {

    const getPost = async()=>{
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
    }

    getPost();

  },[path])

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (<img
            className="singlePostImg"
            src={post.photo}
            alt=""
          />)}
          
          <h1 className="singlePostTitle">
            {post.title}
            <div className="singlePostEdit">
              <i className="singlePostEditIcon fa-solid fa-pen-to-square"></i>
              <i className="singlePostEditIcon fa-solid fa-trash"></i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span className="singlePostInfoAuthor">
              Author : 
              <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
              </Link>
              
            </span>
            <span className="singlePostInfoDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          <p className="singlePostDescription">
           {post.desc}
          </p>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
