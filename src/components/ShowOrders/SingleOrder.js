import React from "react";
import "./SingleOrder.css";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../redux/features/orders/ordersApi";
import { toast } from "sonner";

const SingleOrder = ({ item, dashboardUser, refetch }) => {
  const {
    _id,
    status,
    email,
    productName,
    productImg,
    productQuantity,
    orderAddress,
  } = item;
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteUserOrder] = useDeleteOrderMutation();

  const approveOrder = async () => {
    const toastId = toast.loading("Updating order status. Please wait...");
    await updateOrderStatus(_id);
    toast.success("Order status updated", { id: toastId });
    refetch();
  };

  const deleteOrder = async () => {
    const toastId = toast.loading("Cancelling order. Please wait...");
    await deleteUserOrder(_id);
    toast.success("Order Canceled", { id: toastId });
    refetch();
  };

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
        {orderAddress && <p>Delivery address: {orderAddress}</p>}
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
            onClick={approveOrder}
          >
            {status === "shipped" ? "Approved" : "Approve"}
          </button>
        )}
        {dashboardUser?.role === "user" && status === "pending" && (
          <button
            className="cart-rmv-btn"
            disabled={status === "shipped" ? true : false}
            onClick={deleteOrder}
          >
            {status === "pending" && "Cancel Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
