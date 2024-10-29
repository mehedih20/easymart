import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoriesHover.css";
import { AiOutlineSend } from "react-icons/ai";
import { useGetProductCategoriesQuery } from "../../redux/features/products/productsApi";

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
