import React from "react";
import { AiFillFire } from "react-icons/ai";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";
import { useGetProductsQuery } from "../../../../redux/features/products/productsApi";

const Hot = () => {
  const { data, isLoading } = useGetProductsQuery([
    { name: "deal", value: "Hot" },
    { name: "limit", value: "10" },
  ]);

  return (
    <div className="my-md">
      {isLoading ? (
        <ReactLoader type={"spinningBubbles"} color={"red"} />
      ) : (
        data.products && (
          <ShowProducts
            titleColor={"bg-light-red"}
            title={"Hot Deals"}
            products={data.products.data}
            icon={<AiFillFire />}
          />
        )
      )}
    </div>
  );
};

export default Hot;
