import "./Post.css";

function Post() {
  return (
    <>
      <div className="post">
        <img
          className="postImg"
          src="https://images.pexels.com/photos/313719/pexels-photo-313719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <div className="postInfo">
          <div className="postCategories">
            <span className="postCategory">Music</span>
            <span className="postCategory">Life</span>
          </div>
          <span className="postTitle">Lorem ipsum dolor sit amet.</span>
          <hr />
          <span className="postDate">1 hour ago</span>
        </div>
        <p className="postDescription">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit laudantium fugiat corporis pariatur ducimus rem, minima doloremque voluptate vero? Nobis, quaerat fugit. Ducimus neque eligendi tenetur voluptate aliquam esse voluptas.</p>
      </div>
    </>
  );
}

export default Post;
