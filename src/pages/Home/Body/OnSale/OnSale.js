import React, { useEffect, useState } from "react";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import { AiFillDollarCircle } from "react-icons/ai";

const OnSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item) => item.deal === "Sale");
        setProducts(newData);
      });
  }, []);

  return (
    <div>
      {products && (
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
