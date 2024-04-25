import { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
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
                    "all" == selectedItem
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
                    i == selectedItem
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
