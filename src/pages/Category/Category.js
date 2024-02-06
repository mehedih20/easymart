import React from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";

const Category = () => {
  const { catName } = useParams();
  const { data, isFetching } = useGetProductsQuery([
    { name: "categories", value: catName },
    { name: "limit", value: "0" },
  ]);

  return (
    <div className={`container ${isFetching && "mb-5"}`}>
      <h2 className="category-title bg-light-green">
        Categories/ <span>{catName}</span>
      </h2>
      {isFetching ? (
        <ReactLoader type={"spinningBubbles"} color={"red"} />
      ) : (
        <ShowProducts
          products={data.products.data}
          title={""}
          page={"category"}
        />
      )}
    </div>
  );
};

export default Category;
