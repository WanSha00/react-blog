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

  useEffect(() => {
    console.log("profile search: " + search);
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/posts?user=" +
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
      <div className="profile">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

export default Profile;
