import React from "react";
import "./MyOrders.css";
import SingleOrder from "../../../components/ShowOrders/SingleOrder";
import { useGetSingleUserOrdersQuery } from "../../../redux/features/orders/ordersApi";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";
import emptySvg from "../../../assets/empty.svg";

const MyOrders = ({ dashboardUser }) => {
  const { data, refetch, isFetching } = useGetSingleUserOrdersQuery(
    dashboardUser.email
  );

  return (
    <div className="my-orders-box">
      {isFetching && <ReactLoader type={"spin"} color={"red"} />}
      {data?.orders?.length === 0 && (
        <div className="empty-order-image">
          <h2>No orders found.</h2>
          <img src={emptySvg} alt="empty-orders" />
        </div>
      )}
      {data &&
        data.orders.map((item, index) => {
          return (
            <SingleOrder
              item={item}
              dashboardUser={dashboardUser}
              refetch={refetch}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default MyOrders;
