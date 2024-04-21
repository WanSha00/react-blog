import Sidebar from "../../components/sidebar/Sidebar";
import "./Settings.css";
import { useState,useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function Settings() {

  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(user.bio);
  const [success, setSuccess] = useState(false);
  const publicFolder = "http://localhost:5000/images/";

  const handleLogout = ()=>{

    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");

  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    let updatedUser;
    if(password){
      updatedUser = {
        userID:user._id,
        username,
        email,
        password,
        bio
      };
    }else{
      updatedUser = {
        userID:user._id,
        username,
        email,
        bio
      };
    }   
    
    const data = new FormData();
    if (file) {
      
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      
    }

    try {
      await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
      setSuccess(true);
      setTimeout(() => {
        handleLogout();
      }, 2500);
      
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {}
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async()=>{

    try {
      await axios.delete("http://localhost:5000/api/users/" + user._id, {
        data: { userID: user._id },
      });
      setTimeout(() => {
        handleLogout();
      }, 2500);
    } catch (error) {}
      
  }

  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleUpdate}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file
                  ? URL.createObjectURL(file)
                  : user.profilePic? publicFolder + user.profilePic : "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input type="file" className="settingsPPInput" id="fileInput" onChange={e=>setFile(e.target.files[0])}/>
            </div>
            <label>Username</label>
            <input type="text" name="" id="" placeholder={user.username} value={username} onChange={e=>setUsername(e.target.value)} required/>
            <label>Email</label>
            <input type="email" name="" id=""  placeholder={user.email} value={email} onChange={e=>setEmail(e.target.value)} required/>
            <label>Password</label>
            <input type="password" name="" id="" onChange={e=>setPassword(e.target.value)}/>
            <label>Bio</label>
            <input type="text" name="" id="" placeholder={user.bio} value={bio} onChange={e=>setBio(e.target.value)} required/>
            <button className="settingsSubmit" type="submit">Update</button>
            {success && <span className="msg">Profile has been updated. Logging out...</span>}
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Settings;
