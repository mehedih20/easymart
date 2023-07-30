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
    title: "Bevereges & Drinks",
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
    title: "Snacks",
  },
  {
    id: 8,
    title: "Electronics",
  },
  {
    id: 9,
    title: "Vegetables",
  },
  {
    id: 10,
    title: "Fresh fruits",
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
