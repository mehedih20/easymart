import React from "react";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import { AiFillDollarCircle } from "react-icons/ai";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";
import { useGetProductsQuery } from "../../../../redux/features/products/productsApi";

const OnSale = () => {
  const { data, isLoading } = useGetProductsQuery([
    { name: "deal", value: "Sale" },
    { name: "limit", value: "10" },
  ]);

  return (
    <div className="my-md">
      {isLoading ? (
        <ReactLoader type={"spinningBubbles"} color={"red"} />
      ) : (
        data.products && (
          <ShowProducts
            titleColor={"bg-light-green"}
            title={"Best Selling"}
            products={data.products.data}
            icon={<AiFillDollarCircle style={{ color: "green" }} />}
          />
        )
      )}
    </div>
  );
};

export default OnSale;
