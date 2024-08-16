import React from "react";
import "./MyOrders.css";
import SingleOrder from "../../../components/ShowOrders/SingleOrder";
import { useGetSingleUserOrdersQuery } from "../../../redux/features/orders/ordersApi";

const MyOrders = ({ dashboardUser }) => {
  const { data, refetch } = useGetSingleUserOrdersQuery(dashboardUser.email);

  return (
    <div className="my-orders-box">
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
