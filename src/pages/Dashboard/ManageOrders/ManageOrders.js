import React, { useEffect, useState } from "react";
import "./ManageOrders.css";
import SingleOrder from "../../../components/ShowOrders/SingleOrder";

const ManageOrders = ({ dashboardUser }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch("https://easy-mart-server-sandy.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => setOrderData(data.orders));
  }, []);

  return (
    <div>
      {orderData &&
        orderData.map((item, index) => {
          return (
            <SingleOrder
              item={item}
              dashboardUser={dashboardUser}
              setOrderData={setOrderData}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default ManageOrders;
