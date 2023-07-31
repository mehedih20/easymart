import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";

const Hot = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProductLoading(true);
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item) => item.deal === "Hot").slice(0, 10);
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
          titleColor={"bg-light-red"}
          title={"Hot Deals"}
          products={products}
          icon={<AiFillFire />}
        />
      )}
    </div>
  );
};

export default Hot;
