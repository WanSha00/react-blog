import { useEffect, useState } from "react";
import "./ProfileInfo.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function ProfileInfo({ profileId }) {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [selectedItem, setSelectedItem] = useState("all");
  const { search } = useLocation();
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

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <div className="profileInfo">
        <div className="profileInfoTop">
          <img
            src={
              user.photo == ""
                ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : user.photo
            }
            alt=""
          />
          <div className="profileDetails">
            <span>@{user.username}</span>
            <p>
              {user.bio == "" ? "This user has nothing to say..." : user.bio}
            </p>
          </div>
        </div>

        <div className="profileCategories">
          <ul>
            <Link to={`/profile/${profileId}`} className="link">
              <li
                className={
                  "all" == selectedItem || search == ""
                    ? "profileCatChecked"
                    : ""
                }
                onClick={() => handleItemClick("all")}
              >
                All
              </li>
            </Link>
            {categories.map((c, i) => {
              return (
                <Link
                  key={i}
                  to={`/profile/${profileId}?category=${c.name}`}
                  className="link"
                >
                  <li
                    className={
                      i == selectedItem && search != ""
                        ? "profileCatChecked"
                        : ""
                    }
                    onClick={() => handleItemClick(i)}
                  >
                    {c.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
