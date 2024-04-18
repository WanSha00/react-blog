import "./Home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(()=>{

    const fetchPosts = async () => {

      const res = await axios.get("http://localhost:5000/api/posts");
      
      setPosts(res.data);

    }

    fetchPosts();

  },[])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts = {posts}/>
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
