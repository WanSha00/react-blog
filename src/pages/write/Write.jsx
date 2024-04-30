import { useContext, useEffect, useState } from "react";
import "./Write.css";
import { Context } from "../../context/Context";
import axios from "axios";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(apiUrl + "/categories");
      setAllCategories(res.data);
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setCategories([...categories, e.target.id]);
    } else {
      setCategories(categories.filter((c) => c != e.target.id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await axios.post(apiUrl + "/upload", data);

      const newPost = {
        title,
        desc,
        user: user._id,
        categories,
        photo: res.data.url,
        cloudinaryId: res.data.id,
      };

      const newPostRes = await axios.post(apiUrl + "/posts", newPost);
      setLoading(false);
      window.location.replace("/post/" + newPostRes.data._id);
    } catch (error) {
      setMessage("Error.")
    }
  };

  return (
    <>
    <span>{message}</span>
      <div className="write">
        <img
          className="writeImg"
          src={
            file
              ? URL.createObjectURL(file)
              : "https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
        />
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeFileIcon fa-solid fa-plus"></i>
            </label>
            <input
              className="writeFile"
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className="writeInput"
              type="text"
              placeholder="Title"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="writeFormGroup">
            {allCategories.map((c, i) => {
              return (
                <>
                  <div key={i} className="checkboxWrapper">
                    <input
                      type="checkbox"
                      id={c.name}
                      name="categories"
                      value={c.name}
                      onChange={handleChange}
                    />
                    <label htmlFor={c.name}>{c.name}</label>
                  </div>
                </>
              );
            })}
          </div>

          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            className="writeSubmit"
            type="submit"
            disabled={categories.length == 0 || !file || loading==true ? true : false}
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default Write;
