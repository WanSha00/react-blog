import Sidebar from "../../components/sidebar/Sidebar";
import "./Settings.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(user.bio);
  const [photo, setPhoto] = useState(user.photo);
  const [cloudinaryId, setCloudinaryId] = useState(user.cloudinaryId);
  const [message, setMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    document.getElementById("submit").disabled = true;

    let updatedUser = {};
    const data = new FormData();
    if (file) {
      data.append("file", file);
      try {
        const res = await axios.post(apiUrl + "/upload", data);
        updatedUser = {
          username,
          email,
          password,
          photo: res.data.url,
          cloudinaryId: res.data.id,
          bio,
        };
      } catch (error) {
        console.log(error);
      }
    } else {
      updatedUser = {
        username,
        email,
        password,
        photo,
        cloudinaryId,
        bio,
      };
    }

    try {
      await axios.put(apiUrl + "/users/" + user._id, updatedUser);
      setMessage("Profile updated. Logging out...");

      setTimeout(() => {
        handleLogout();
      }, 1500);
    } catch (error) {
      setMessage("Error.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(apiUrl + "/users/" + user._id);
      setMessage("Profile deleted. Logging out...");
      setTimeout(() => {
        handleLogout();
      }, 1500);
    } catch (error) {
      setMessage("Error.");
    }
  };

  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          <span className="msg">{message}</span>
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle" onClick={handleDelete}>
              Delete Account
            </span>
          </div>
          <form className="settingsForm" onSubmit={handleUpdate}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user.photo == ""
                    ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    : user.photo
                }
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                className="settingsPPInput"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              name=""
              id=""
              maxLength="10"
              placeholder={user.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name=""
              id=""
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name=""
              id=""
              minLength="4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Bio</label>
            <input
              type="text"
              name=""
              id=""
              placeholder={user.bio}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
            <button id="submit" className="settingsSubmit" type="submit">
              Update
            </button>
          </form>
        </div>
        <Sidebar profileId={user._id} />
      </div>
    </>
  );
}

export default Settings;
