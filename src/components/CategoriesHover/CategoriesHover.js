import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoriesHover.css";
import { GiImbricatedArrows } from "react-icons/gi";

const links = [
  {
    id: 1,
    title: "Milks and Diaries",
  },
  {
    id: 2,
    title: "Wines & Drinks",
  },
  {
    id: 3,
    title: "Clothing and Beauty",
  },
  {
    id: 4,
    title: "Fresh Seafood",
  },
  {
    id: 5,
    title: "Pet Foods & Toy",
  },
  {
    id: 6,
    title: "Fast food",
  },
  {
    id: 7,
    title: "Baking material",
  },
  {
    id: 8,
    title: "Vegetables",
  },
  {
    id: 9,
    title: "Fresh fruits",
  },
  {
    id: 10,
    title: "Bread juice",
  },
];

const CategoriesHover = ({ showCategories }) => {
  return (
    <div className={`category-container ${showCategories && "show-container"}`}>
      {links.map((linkItem, index) => {
        const { id, title } = linkItem;
        return (
          <NavLink key={id} to={`/category/${title}`}>
            <GiImbricatedArrows /> {title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoriesHover;
