/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SingleOrder from "../../../components/ShowOrders/SingleOrder";

const MyOrders = ({ dashboardUser }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch(
      `https://easy-mart-server-sandy.vercel.app/orders/${dashboardUser.email}`
    )
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

export default MyOrders;
