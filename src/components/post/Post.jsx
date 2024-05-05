import "./Post.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Post({ post }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [author, setAuthor] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const author = await axios.get(apiUrl + "/users/" + post.user);
      setUserPhoto(author.data.photo);
      setAuthor(author.data.username);
    };

    getUser();
  }, []);

  return (
    <>
      <div className="post">

        <div className="postTop">
        <img
          className="userPhoto"
          src={
            userPhoto == ""
              ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              : userPhoto
          }
          alt=""
        />

        <div className="details">
          <span className="postAuthor">by {author}</span>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        </div>
        

        <img className="postImg" src={post.photo} alt="" />

        <div className="postInfo">
          <div className="postCategories">
            {post.categories.map((c, i) => {
              return (
                <span key={i} className="postCategory">
                  {c}
                </span>
              );
            })}
          </div>
          <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
        </div>
        <p className="postDescription">{post.desc}</p>
      </div>
    </>
  );
}

export default Post;
