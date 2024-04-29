import { useLocation } from "react-router-dom";
import "./SinglePost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function SinglePost() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { user } = useContext(Context);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [cloudinaryId, setCloudinaryId] = useState("");

  const [postCategories, setPostCategories] = useState([]);
  const [categoriesMenu, setCategoriesMenu] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(apiUrl + "/categories");
      setCategoriesMenu(res.data);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(apiUrl + "/posts/" + postId);
      const author = await axios.get(apiUrl + "/users/" + res.data.user);

      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setUpdatedCategories(res.data.categories);
      setEditPhoto(res.data.photo), setCloudinaryId(res.data.cloudinaryId);

      setPostCategories(res.data.categories);
      setAuthorName(author.data.username);
    };

    getPost();
  }, []);

  const handleChange = (e) => {
    let isChecked = e.target.checked;

    if (isChecked) {
      setUpdatedCategories([...updatedCategories, e.target.id]);
    } else {
      setUpdatedCategories(updatedCategories.filter((c) => c != e.target.id));
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(apiUrl + "/posts/" + post._id);
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    let updatedPost = {};
    const data = new FormData();
    if (file) {
      data.append("file", file);
      try {
        const res = await axios.post(apiUrl + "/upload", data);
        updatedPost = {
          title,
          desc,
          categories: updatedCategories,
          photo: res.data.url,
          cloudinaryId: res.data.id,
        };
      } catch (error) {
        console.log(error);
      }
    } else {
      updatedPost = {
        title,
        desc,
        categories: updatedCategories,
        photo,
        cloudinaryId,
      };
    }

    try {
      await axios.put(apiUrl + "/posts/" + post._id, updatedPost);
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
              src={file ? URL.createObjectURL(file) : post.photo}
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

          <div className="postCategories">
            {postCategories.map((c, i) => {
              return (
                <span key={i} className="postCategory">
                  {c}
                </span>
              );
            })}
          </div>

          {updateMode && (
            <>
              {categoriesMenu.map((c, i) => {
                return (
                  <>
                    <div key={i} className="checkboxWrapper">
                      <input
                        type="checkbox"
                        id={c.name}
                        name="categories"
                        value={c.name}
                        onChange={handleChange}
                        checked={
                          updatedCategories.includes(c.name) ? true : false
                        }
                      />
                      <label htmlFor={c.name}>{c.name}</label>
                    </div>
                  </>
                );
              })}
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
              {authorName == user?.username && (
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
              <Link to={"/profile/" + post.user} className="link">
                <b> {authorName}</b>
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
                <button
                  className="updateButton"
                  onClick={handleUpdate}
                  disabled={updatedCategories.length == 0 ? true : false}
                >
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
