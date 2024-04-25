import "./Profile.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { user } = useContext(Context);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    
    const fetchPosts = async () => {
      const res = await axios.get(apiUrl+
        "/posts?user=" +
          user.username +
          "&" +
          search.split("?")[1]
      );

      setPosts(res.data);
    };

    fetchPosts();
  }, [search]);

  return (
    <>
      {/* <Header /> */}
      <h1 className="profileTitle">My Profile</h1>
      <div className="profile">
        <Posts posts={posts} category={search.split("?")[1] == undefined? "all": search.split("?")[1].split("=")[1]} />
        <Sidebar path="profile" username={user.username} />
      </div>
    </>
  );
}

export default Profile;
