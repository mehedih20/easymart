import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";

const Hot = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item) => item.deal === "Hot");
        setProducts(newData);
      });
  }, []);

  return (
    <div>
      {products && (
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
