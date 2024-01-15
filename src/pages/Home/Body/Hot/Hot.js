import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";

const Hot = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProductLoading(true);
    const fetching = fetch(
      "https://easy-mart-server-sandy.vercel.app/products?deal=Hot"
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = data.products.data.slice(0, 10);
        setProducts(newData);
        setProductLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setProductLoading(false);
        window.scrollTo(0, 0);
      });

    return () => fetching;
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
