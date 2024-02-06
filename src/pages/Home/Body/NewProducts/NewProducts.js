import React from "react";
import { BiSolidRocket } from "react-icons/bi";
import ShowProducts from "../../../../components/ShowProducts/ShowProducts";
import ReactLoader from "../../../../components/ReactLoading/ReactLoader";
import { useGetProductsQuery } from "../../../../redux/features/products/productsApi";

const NewProducts = () => {
  const { data, isLoading } = useGetProductsQuery([
    { name: "deal", value: "New" },
    { name: "limit", value: "10" },
  ]);

  return (
    <div className="my-md">
      {isLoading ? (
        <ReactLoader type={"spinningBubbles"} color={"red"} />
      ) : (
        data.products && (
          <ShowProducts
            titleColor={"bg-light-blue"}
            title={"New Products"}
            products={data.products.data}
            icon={
              <BiSolidRocket style={{ color: "#FFA41B", marginLeft: "1rem" }} />
            }
          />
        )
      )}
    </div>
  );
};

export default NewProducts;
