import { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Sidebar({ path, username }) {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  //const {user} = useContext(Context);
  const publicFolder = import.meta.env.VITE_API_PUBLIC;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(apiUrl + "/categories");
      setCategories(res.data);
    };

    const getUser = async () => {
      const res = await axios.get(apiUrl +
        "/users/info/" + username
      );
      setUser(res.data);
    };

    getUser();
    getCategories();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src={
              user.profilePic == ""
                ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : publicFolder + user.profilePic
            }
            alt=""
          />
          <span className="username">@{user.username}</span>
          <p>{user.bio == "" ? "This user has nothing to say..." : user.bio}</p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {categories.map((c, i) => {
              return (
                <Link
                  key={i}
                  to={`/${path}/?category=${c.name}`}
                  className="link"
                >
                  <li className="sidebarListItem">{c.name}</li>
                </Link>
              );
            })}
            <Link
                
                  to={`/${path}`}
                  className="link"
                >
                  <li className="sidebarListItem">All</li>
                </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
