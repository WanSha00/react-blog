import { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState("all");
  const {search} = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(apiUrl + "/categories");
      setCategories(res.data);
    };

    getCategories();
  }, []);

  return (
    <>
      <div className="categories">
        <ul className="categoriesList">
          <Link to='/' className="link">
          <li className={
                    "all" == selectedItem || search==""
                      ? "categoriesListItem checked"
                      : "categoriesListItem"
                  }
                  onClick={() => handleItemClick("all")}>All</li>
          </Link>
          
          {categories.map((c, i) => {
            return (
              <Link key={i} to={`/?category=${c.name}`} className="link">
                <li
                  className={
                    i == selectedItem && search!=""
                      ? "categoriesListItem checked"
                      : "categoriesListItem"
                  }
                  onClick={() => handleItemClick(i)}
                >
                  {c.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Categories;
