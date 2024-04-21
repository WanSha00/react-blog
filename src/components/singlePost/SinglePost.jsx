import { useLocation } from "react-router-dom";
import "./SinglePost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const publicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(user.photo);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };

    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    const updatedPost = {
      title,
      desc,
      username: user.username,
    };

    const data = new FormData();
    if (file) {
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedPost.photo = filename;
    }
    try {
      await axios.put("http://localhost:5000/api/posts/" + path, updatedPost);

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {}

      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
            <img
              className="singlePostImg"
              src={file ? URL.createObjectURL(file) : publicFolder + post.photo}
              alt=""
            />
          )}

          {updateMode && (
            <>
              <label htmlFor="fileInput">
                <i className="writeFileIcon fa-solid fa-plus"></i>
              </label>
              <input
                className="writeFile"
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}

          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {post.title}
              {post.username == user?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostEditIcon fa-solid fa-pen-to-square"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostEditIcon fa-solid fa-trash"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}

          <div className="singlePostInfo">
            <span className="singlePostInfoAuthor">
              Author :
              <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
              </Link>
            </span>
            <span className="singlePostInfoDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePostDescriptionInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDescription">{post.desc}</p>
          )}
          {updateMode && (
            <>
              <div className="editButtons">
                <button className="updateButton" onClick={handleUpdate}>
                  Update
                </button>

                <button
                  className="cancelButton"
                  onClick={() => setUpdateMode(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
