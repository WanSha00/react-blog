import { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar({ profileId }) {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(apiUrl + "/categories");
      setCategories(res.data);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(apiUrl + "/users/" + profileId);
      setUser(res.data);
    };

    getUser();
  }, [profileId]);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src={
              user.profilePic == ""
                ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : user.profilePic
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
                  to={`/profile/${profileId}?category=${c.name}`}
                  className="link"
                >
                  <li className="sidebarListItem">{c.name}</li>
                </Link>
              );
            })}
            <Link to={`/profile/${profileId}`} className="link">
              <li className="sidebarListItem">All</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
