import "./TopBar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Categories from "../categories/Categories";

function TopBar() {
  const { user, dispatch } = useContext(Context);
  const {pathname} = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="topWrap">
        <div className="top"> 
        {user && (
          <div className="menu">
            <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
          </div>
        )}

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
        {user && isMenuOpen && (
        <div className="popupMenu">
          <ul className="menuList">
            <Link className="link" to="/">
              <i className="menuListItem fa-solid fa-house"></i>
            </Link>

            <Link className="link" to="/write">
              <i className="menuListItem fa-solid fa-pen-nib"></i>
            </Link>
            <Link className="link" to={"/profile/" + user._id}>
              <i className="menuListItem fa-solid fa-user"></i>
            </Link>

            <i
              className="menuListItem fa-solid fa-power-off"
              onClick={handleLogout}
            ></i>
          </ul>
        </div>
      )}
      {(user && pathname=="/") && (<Categories/>)}
        
      </div>
      
    </>
  );
}

export default TopBar;
