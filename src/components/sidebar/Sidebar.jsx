import { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";


function Sidebar() {
  const [categories, setCategories] = useState([]);
  const {user} = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    };

    getCategories();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src={user.profilePic == "" ? "https://images.pexels.com/photos/978503/pexels-photo-978503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : publicFolder + user.profilePic}
            alt=""
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo magnam,
            accusamus molestias perspiciatis error autem cupiditate possimus
            quos accusantium aliquam consectetur assumenda, impedit officia
            eveniet dicta? Atque delectus sunt iusto!
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {categories.map((c, i) => {
              return (
                <Link key={i} to={`/?category=${c.name}`} className="link">
                  <li  className="sidebarListItem">
                  {c.name}
                </li>
                </Link>
                
              );
            })}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
