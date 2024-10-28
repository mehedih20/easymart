import React from "react";
import "./ManageOrders.css";
import SingleOrder from "../../../components/ShowOrders/SingleOrder";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/ordersApi";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";

const ManageOrders = ({ dashboardUser }) => {
  const { data, refetch } = useGetAllOrdersQuery(undefined);

  return (
    <div className="manage-orders-container">
      {!data && <ReactLoader type={"spin"} color={"red"} />}
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

export default ManageOrders;
