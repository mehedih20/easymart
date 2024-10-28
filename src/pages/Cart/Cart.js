import React, { useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import "./Cart.css";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import Title from "../../components/Title/Title";
import { toast } from "sonner";
import {
  useEmptyUserCartMutation,
  useGetUserCartQuery,
  useRemoveCartItemMutation,
} from "../../redux/features/cart/cartApi";
import { useCreateUserOrderMutation } from "../../redux/features/orders/ordersApi";
import { getRatingStars } from "../../utils/getRatingStars";

const Cart = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const [prices, setPrices] = useState({
    itemPrice: 0,
    tax: 0,
    total: 0,
  });
  const [address, setAddress] = useState("");
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch,
  } = useGetUserCartQuery(user.email);
  const [removeUserCartItem, { isLoading: removeLoading }] =
    useRemoveCartItemMutation();

  const removeCartItem = async (id) => {
    const removeObj = {
      email: user.email,
      id,
    };
    const result = await removeUserCartItem(removeObj);

    if (result.data.success) {
      toast.success(result.data.message);
      refetch();
    } else {
      toast.error("Something went wrong");
    }
  };

  const handlePlaceOrder = () => {
    if (address === "" || prices.itemPrice === 0) {
      window.alert("Cart or address cannot be empty!");
      return;
    }
    setModalOpen(true);
  };

  useEffect(() => {
    if (cartData?.cart) {
      const prices = cartData?.cart?.cartItems?.map((item) => {
        return parseInt(item.productId.price) * item.productQuantity;
      });
      const sum = prices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      const tax = parseFloat((sum * 0.15).toFixed(2));
      const total = sum + tax;
      setPrices((prev) => ({ ...prev, itemPrice: sum, tax, total }));
    }
  }, [cartData?.cart]);

  return (
    <>
      {cartData && (
        <>
          {modalOpen && (
            <ConfirmModal
              userEmail={user?.email}
              cartItems={cartData?.cart.cartItems}
              address={address}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              confirmLoading={confirmLoading}
              setConfirmLoading={setConfirmLoading}
            />
          )}
          <div className="container">
            <Title text="Cart" />

            <div className="cart-container">
              <div className="cart-left">
                {(cartLoading || removeLoading) && (
                  <div className="cart-loading-overlay">
                    <ReactLoader type={"spin"} color={"green"} />
                  </div>
                )}
                {cartData.cart === null ||
                cartData?.cart?.cartItems?.length === 0 ? (
                  <h2 className="cart-empty-text">Your cart is empty!</h2>
                ) : (
                  cartData?.cart?.cartItems?.map((item, index) => {
                    const { productId, productQuantity, _id } = item;
                    return (
                      <div className="cart-item-box" key={index}>
                        <div className="cart-item-img">
                          <img src={productId.imgUrl} alt={productId.name} />
                        </div>
                        <div className="cart-item-text">
                          <h4>{productId.name}</h4>
                          <p className="product-rating">
                            {getRatingStars(productId?.rating).map(
                              (item, index) => {
                                return <span key={index}>{item}</span>;
                              }
                            )}
                          </p>
                          <p>${productId.price}</p>
                          <p>Quantity: {productQuantity}</p>
                          <button
                            className="cart-rmv-btn"
                            onClick={() => removeCartItem(_id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="cart-right">
                <h2>{`Total:  ${
                  cartData?.cart === null ||
                  cartData?.cart?.cartItems?.length === 0
                    ? "$0"
                    : prices.total
                }`}</h2>
                <p>Items price: ${prices.itemPrice}</p>
                <p>Tax: ${prices.tax}</p>
                <p>Delivery charges: Free</p>
                <div className="cart-right-delivery">
                  <p>Enter delivery address:</p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="eg. 123 street,Montreal,Canada"
                  />
                </div>
                <div className="cart-right-payment">
                  <p>Payment method:</p>
                  <label>
                    <input
                      type="radio"
                      value="Cash on delivery"
                      defaultChecked
                    />
                    Cash on delivery
                  </label>
                </div>
                <button className="cart-right-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const ConfirmModal = ({ userEmail, address, cartItems, setModalOpen }) => {
  const [createUserOrder, { isLoading: createOrderLoading }] =
    useCreateUserOrderMutation();
  const [emptyUserCart, { isLoading: emptyCartLoading }] =
    useEmptyUserCartMutation();

  const confirmOrder = async () => {
    const orders = cartItems?.map((item) => {
      const { productQuantity, productId } = item;
      return {
        email: userEmail,
        productImg: productId.imgUrl,
        productName: productId.name,
        orderAddress: address,
        productQuantity,
        productId,
        status: "pending",
      };
    });

    const orderResult = await createUserOrder(orders);

    if (orderResult.data.success) {
      await emptyUserCart(userEmail);
      toast.success("Order placed. Check progress in My Order!");
      setModalOpen(false);
    }
  };

  return (
    <div className="confirm-modal-container">
      <div className="confirm-modal">
        <h2>Confirm Order</h2>
        <button className="cart-right-btn" onClick={confirmOrder}>
          {createOrderLoading || emptyCartLoading ? (
            <ReactLoader type={"spin"} color={"red"} />
          ) : (
            "Yes"
          )}
        </button>
        {!(createOrderLoading || emptyCartLoading) && (
          <button
            className="cart-right-btn"
            onClick={() => setModalOpen(false)}
          >
            No
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
