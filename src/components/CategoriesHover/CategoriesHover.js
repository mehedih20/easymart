import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoriesHover.css";
import { AiOutlineSend } from "react-icons/ai";
import { useGetProductCategoriesQuery } from "../../redux/features/products/productsApi";

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
  const { data } = useGetProductCategoriesQuery(undefined);

  return (
    <div className={`category-container ${showCategories && "show-container"}`}>
      {data?.categories.map((linkItem, index) => {
        return (
          <NavLink key={index} to={`/category/${linkItem}`}>
            <AiOutlineSend style={{ marginRight: "5px" }} /> {linkItem}
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoriesHover;
