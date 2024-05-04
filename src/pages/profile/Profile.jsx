import "./Profile.css";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { pathname, search } = useLocation();
  const { user } = useContext(Context);
  const profileId = pathname.split("/")[2];
  const [authorName, setAuthorName] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(apiUrl + "/users/" + profileId);
      setAuthorName(res.data.username);
    };

    getUser();
  }, [pathname]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        apiUrl + "/posts?user=" + profileId + "&" + search.split("?")[1]
      );

      setPosts(res.data);
    };

    fetchPosts();
  }, [pathname, search]);

  return (
    <>
      <h1 className="profilePageTitle">
        {pathname.split("/")[2] == user._id
          ? "My Profile"
          : `${authorName}'s page`}
      </h1>
      <div className="profile">
        <ProfileInfo profileId={profileId}/>
        <Posts
          posts={posts}
          category={
            search.split("?")[1] == undefined
              ? "all"
              : search.split("?")[1].split("=")[1]
          }
        />
        <Sidebar className="sidebar" profileId={profileId} />
      </div>
    </>
  );
}

export default Profile;
