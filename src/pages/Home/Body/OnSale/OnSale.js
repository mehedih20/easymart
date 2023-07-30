import React, { useEffect, useState } from "react";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import { AiFillDollarCircle } from "react-icons/ai";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";

const OnSale = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProductLoading(true);
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item) => item.deal === "Sale");
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
          titleColor={"bg-light-green"}
          title={"Best Selling"}
          products={products}
          icon={<AiFillDollarCircle style={{ color: "green" }} />}
        />
      )}
    </div>
  );
};

export default OnSale;
