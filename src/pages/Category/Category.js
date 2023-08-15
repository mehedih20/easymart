import React, { useEffect, useState } from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../components/ReactLoading/ReactLoader";

const Category = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const { catName } = useParams();

  useEffect(() => {
    setCategoryLoading(true);
    fetch("https://easymart-server.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item) => item.category === catName);
        setCategoryProduct(newData);
        console.log(newData);
        console.log(catName);
        setCategoryLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setCategoryLoading(false);
      });
  }, [catName]);

  return (
    <div className="container">
      <h2 className="category-title bg-light-green">
        Categories/ <span>{catName}</span>
      </h2>
      {categoryLoading ? (
        <ReactLoader type={"spinningBubbles"} color={"red"} />
      ) : (
        <ShowProducts products={categoryProduct} title={""} page={"category"} />
      )}
    </div>
  );
};

export default Category;
