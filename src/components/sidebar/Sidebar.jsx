import { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      console.log(res.data)
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
            src="https://images.pexels.com/photos/2389349/pexels-photo-2389349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                <li key={i} className="sidebarListItem">
                  {c.name}
                </li>
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
