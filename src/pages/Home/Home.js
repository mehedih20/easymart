import NewProducts from "./Body/NewProducts/NewProducts";
import OnSale from "./Body/OnSale/OnSale";
import Hot from "./Body/Hot/Hot";
import Banner from "./Body/Banner/Banner";

const Home = () => {
  return (
    <div className="container">
      <Banner />
      <Hot />
      <OnSale />
      <NewProducts />
    </div>
  );
};

export default Home;
