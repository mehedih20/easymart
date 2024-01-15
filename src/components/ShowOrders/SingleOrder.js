/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import "./SingleOrder.css";

const SingleOrder = ({ item, dashboardUser, setOrderData }) => {
  const [loading, setLoading] = useState(false);
  const { _id, status, email, productName, productImg, productQuantity } = item;

  const approveOrder = useCallback((id) => {
    setLoading(true);
    fetch(`https://easy-mart-server-sandy.vercel.app/orders/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        fetch(
          `https://easy-mart-server-sandy.vercel.app/orders/${dashboardUser.email}`
        )
          .then((res) => res.json())
          .then((data) => setOrderData(data.orders));
      });
  }, []);

  const deleteOrder = useCallback((id) => {
    setLoading(true);
    fetch(`https://easy-mart-server-sandy.vercel.app/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        fetch(
          `https://easy-mart-server-sandy.vercel.app/orders/${dashboardUser.email}`
        )
          .then((res) => res.json())
          .then((data) => setOrderData(data.orders));
      });
  }, []);

  return (
    <div className="cart-item-box">
      <div className="cart-item-img">
        <img src={productImg} alt={productName} />
      </div>
      <div className="cart-item-text">
        <h4>{productName}</h4>
        {(dashboardUser?.role === "admin" ||
          dashboardUser?.role === "owner") && <p>{email}</p>}
        <p>Quantity: {productQuantity}</p>
        <p className="order-status">
          Status:{" "}
          <span className={`${status === "shipped" && "bg-green"}`}>
            {status === "shipped" ? "shipped" : "Not shipped yet"}
          </span>
        </p>
        {(dashboardUser?.role === "admin" ||
          dashboardUser?.role === "owner") && (
          <button
            className="cart-rmv-btn"
            disabled={status === "shipped" ? true : false}
            onClick={() => approveOrder(_id)}
          >
            {status === "shipped"
              ? "Approved"
              : `${loading ? "Wait..." : "Approve"}`}
          </button>
        )}
        {dashboardUser?.role === "user" && status === "pending" && (
          <button
            className="cart-rmv-btn"
            disabled={status === "shipped" ? true : false}
            onClick={() => deleteOrder(_id)}
          >
            {status === "pending" && "Delete"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
