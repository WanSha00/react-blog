import "./Author.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

function Author() {
  const [posts, setPosts] = useState([]);
  const {pathname, search } = useLocation();  
  const username = pathname.split("/")[2];

  useEffect(() => {
    
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/posts?user=" +
          username +
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
      <h1 className="authorTitle">{`${username}'s Page`}</h1>
      <div className="profile">
        <Posts posts={posts} />
        <Sidebar path={`author/${username}`} username={username}/>
      </div>
    </>
  );
}

export default Author;
