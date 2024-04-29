import "./Home.css";
import Posts from "../../components/posts/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Categories from "../../components/categories/Categories";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    
    const fetchPosts = async () => {
      const res = await axios.get(apiUrl + "/posts" + search);
      setPosts(res.data);
    };

    fetchPosts();
  }, [search]);

  return (
    <>
      <Categories />
      <div className="home">
        <Posts posts={posts} category={search.split("?")[1] == undefined? "all": search.split("?")[1].split("=")[1]}/>
      </div>
    </>
  );
}

export default Home;
