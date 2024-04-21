import "./TopBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function TopBar() {
  const {user, dispatch} = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const handleLogout = ()=>{

    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");

  }


  return (
    <>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fa-brands fa-square-facebook"></i>
          <i className="topIcon fa-brands fa-square-x-twitter"></i>
          <i className="topIcon fa-brands fa-square-pinterest"></i>
          <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            {/* <li className="topListItem">
              <Link className="link" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/contact">
                CONTACT
              </Link>
            </li> */}
            <li className="topListItem">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <>
            <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.profilePic == "" ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : publicFolder + user.profilePic}
              alt=""
            />
              </Link>
           
            <span>Hello, {user.username}!</span>
            </>
          ) : (
            ""
            // <ul className="topList">
            //   <li className="topListItem">
            //     <Link className="link" to="/login">
            //       LOGIN
            //     </Link>
            //   </li>
            //   <li className="topListItem">
            //     <Link className="link" to="/register">
            //       REGISTER
            //     </Link>
            //   </li>
            // </ul>
          )}
          {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
          
        </div>
      </div>
    </>
  );
}

export default TopBar;
