import "./Home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Categories from "../../components/categories/Categories";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    console.log("home search: " + search)
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
    };

    fetchPosts();
  }, [search]);

  return (
    <>
      {/* <Header /> */}
      <Categories />
      <div className="home">
        <Posts posts={posts} category={search.split("?")[1] == undefined? "all": search.split("?")[1].split("=")[1]}/>
        {/* <Sidebar /> */}
      </div>
    </>
  );
}

export default Home;
