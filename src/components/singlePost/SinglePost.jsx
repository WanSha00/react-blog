import "./SinglePost.css";

function SinglePost() {
  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img
            className="singlePostImg"
            src="https://images.pexels.com/photos/313719/pexels-photo-313719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <h1 className="singlePostTitle">
            Lorem ipsum dolor sit amet.
            <div className="singlePostEdit">
              <i className="singlePostEditIcon fa-solid fa-pen-to-square"></i>
              <i className="singlePostEditIcon fa-solid fa-trash"></i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span className="singlePostInfoAuthor">
              Author : <b>Nana</b>
            </span>
            <span className="singlePostInfoDate">Date : 1 hour ago</span>
          </div>
          <p className="singlePostDescription">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            velit autem perferendis commodi unde dolore nulla illum eos, placeat
            assumenda adipisci quisquam quis facilis deserunt voluptatem. Labore
            iure illum odio! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sequi quia doloremque fugiat quo aperiam placeat cum, dolor
            explicabo ullam soluta vero at blanditiis molestias tempore quos
            corrupti numquam nulla quod! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Placeat, sint vero. Provident ipsum alias animi
            praesentium voluptates distinctio quas voluptate perspiciatis
            incidunt maxime, atque officiis eveniet cupiditate doloribus
            laboriosam ex.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            velit autem perferendis commodi unde dolore nulla illum eos, placeat
            assumenda adipisci quisquam quis facilis deserunt voluptatem. Labore
            iure illum odio! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sequi quia doloremque fugiat quo aperiam placeat cum, dolor
            explicabo ullam soluta vero at blanditiis molestias tempore quos
            corrupti numquam nulla quod! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Placeat, sint vero. Provident ipsum alias animi
            praesentium voluptates distinctio quas voluptate perspiciatis
            incidunt maxime, atque officiis eveniet cupiditate doloribus
            laboriosam ex.
          </p>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
