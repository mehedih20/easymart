import React from "react";
import NewProducts from "./Body/NewProducts/NewProducts";
import OnSale from "./Body/OnSale/OnSale";
import Hot from "./Body/Hot/Hot";

const Home = () => {
  return (
    <div className="container home-container">
      <Hot />
      <OnSale />
      <NewProducts />
    </div>
  );
};

export default Home;
