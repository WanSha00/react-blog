import "./TopBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function TopBar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <span>{import.meta.env.VITE_APP_NAME}</span>
          <i className="topIcon fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <div className="topCenter">
          {user && (
            <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            
              <li className="topListItem">
                <Link className="link" to={"/profile/" + user._id}>
                  PROFILE
                </Link>
              </li>
            

            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          </ul>
          )}
          
        </div>
        <div className="topRight">
          {user ? (
            <>
              <Link className="link" to="/settings">
                <img
                  className="topImg"
                  src={
                    user.photo == ""
                    ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    : user.photo
                  }
                  alt=""
                />
              </Link>

              <span>Hello, {user.username}!</span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default TopBar;
