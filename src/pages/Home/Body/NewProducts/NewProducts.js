import React, { useEffect, useState } from "react";
import { BiSolidRocket } from "react-icons/bi";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";

const NewProducts = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProductLoading(true);
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item) => item.deal === "New");
        setProducts(newData);
        setProductLoading(false);
      })
      .catch(() => {
        setProductLoading(false);
      });
  }, []);

  return (
    <div className="my-md">
      {products && productLoading ? (
        <ReactLoader type={"spinningBubbles"} color={"red"} />
      ) : (
        <ShowProducts
          titleColor={"bg-light-blue"}
          title={"New Products"}
          products={products}
          icon={
            <BiSolidRocket style={{ color: "#FFA41B", marginLeft: "1rem" }} />
          }
        />
      )}
    </div>
  );
};

export default NewProducts;
