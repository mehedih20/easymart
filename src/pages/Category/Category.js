import React from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { catName } = useParams();
  return <div>Category: {catName}</div>;
};

export default Category;
