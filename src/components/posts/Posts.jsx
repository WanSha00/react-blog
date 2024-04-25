import Post from "../post/Post";
import "./Posts.css";

function Posts({posts,category}){
    return <>

    <div className="posts">
            
        {posts.length>0 ? posts.map(post => <Post key={post._id} post={post}/>) : <span>{`No posts found in ${category}.`}</span>}
       
      
    </div>
    
    </>;
}

export default Posts;