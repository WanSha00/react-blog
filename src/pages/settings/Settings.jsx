import Sidebar from "../../components/sidebar/Sidebar";
import "./Settings.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Settings() {

  const {user} = useContext(Context);

  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form className="settingsForm">
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input type="file" className="settingsPPInput" id="fileInput" />
            </div>
            <label>Username</label>
            <input type="text" name="" id="" placeholder="New username"/>
            <label>Email</label>
            <input type="email" name="" id="" placeholder="New email"/>
            <label>Password</label>
            <input type="password" name="" id=""/>
            <button className="settingsSubmit">Update</button>
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Settings;
