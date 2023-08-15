import React, { useEffect, useState } from "react";
import "./ManageOrders.css";
import ShowOrders from "../../../components/ShowOrders/ShowOrders";

const ManageOrders = ({ dashboardUser }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const approveOrder = (id) => {
    setLoading(true);
    fetch(`https://easymart-server.onrender.com/orders/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("https://easymart-server.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrderData(data));
  }, [approveOrder]);

  return (
    <div>
      {orderData && (
        <ShowOrders
          data={orderData}
          dashboardUser={dashboardUser}
          approveOrder={approveOrder}
          setLoading={setLoading}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ManageOrders;
