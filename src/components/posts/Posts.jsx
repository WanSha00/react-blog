import Post from "../post/Post";
import "./Posts.css";

function Posts({posts}){
    return <>

    <div className="posts">
            
        {posts.length>0 ? posts.map(post => <Post key={post._id} post={post}/>) : <span>No posts found.</span>}
       
      
    </div>
    
    </>;
}

export default Posts;