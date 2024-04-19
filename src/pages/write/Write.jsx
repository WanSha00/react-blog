import { useContext, useDebugValue, useState } from "react";
import "./Write.css";
import { Context } from "../../context/Context";
import axios from "axios";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState(["life"]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      desc,
      username: user.username,
      categories,
    };
    
    const data = new FormData();
    if (file) {
      
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {}
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <input className="writeFile" type="file" id="fileInput" onChange={e=>setFile(e.target.files[0])}/>
            <input
              className="writeInput"
              type="text"
              placeholder="Title"
              autoFocus={true}
              onChange={e=>setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              onChange={e=>setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default Write;
