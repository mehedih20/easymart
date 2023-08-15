import React from "react";
import "./ShowOrders.css";

const ShowOrders = ({ data, dashboardUser, approveOrder, loading }) => {
  return (
    <div>
      {data.map((item, index) => {
        const { _id, status, email, productName, productImg, productQuantity } =
          item;
        return (
          <div className="cart-item-box" key={index}>
            <div className="cart-item-img">
              <img src={productImg} alt={productName} />
            </div>
            <div className="cart-item-text">
              <h4>{productName}</h4>
              {dashboardUser?.role === "admin" ||
                (dashboardUser?.role === "administrator" && <p>{email}</p>)}
              <p>Quantity: {productQuantity}</p>
              <p className="order-status">
                Status: <span>{status ? "shipped" : "Not shipped yet"}</span>
              </p>
              {(dashboardUser?.role === "admin" ||
                dashboardUser?.role === "administrator") && (
                <button
                  className="cart-rmv-btn"
                  disabled={status ? true : false}
                  onClick={() => approveOrder(_id)}
                >
                  {status ? "Approved" : `${loading ? "Wait..." : "Approve"}`}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowOrders;
