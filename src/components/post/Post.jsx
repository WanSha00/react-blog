import "./Post.css";
import {Link} from "react-router-dom";

function Post({ post }) {
  const publicFolder = import.meta.env.VITE_API_PUBLIC;

  return (
    <>
      <div className="post">
        {post.photo && <img className="postImg" src={publicFolder + post.photo} alt="" />}

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
          
          <hr />
          <div className="details">
          <span className="postAuthor">by {post.username}</span>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          </div>
          
        </div>
        <p className="postDescription">{post.desc}</p>
      </div>
    </>
  );
}

export default Post;
