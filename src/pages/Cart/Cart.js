import React, { useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import "./Cart.css";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import Title from "../../components/Title/Title";

const Cart = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const [itemPrice, setItemPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [address, setAddress] = useState("");

  const removeCartItem = (id) => {
    setCartLoading(true);
    setConfirmLoading(true);
    fetch(
      `https://easy-mart-server-sandy.vercel.app/cart/${user.email}/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCartLoading(false);
        setConfirmLoading(false);
      });
  };

  const handlePlaceOrder = () => {
    if (address === "" || itemPrice === 0) {
      window.alert("Cart or address cannot be empty!");
      return;
    }
    setModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      setCartLoading(true);
      fetch(`https://easy-mart-server-sandy.vercel.app/cart/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cart?.cartItems.length > 0) {
            setCartItems(data.cart?.cartItems);
          } else {
            setCartItems(null);
          }
          setCartLoading(false);
        });
    }
  }, [user, confirmLoading]);

  useEffect(() => {
    if (cartItems) {
      const prices = cartItems.map((item) => {
        return parseInt(item.productId.price) * item.productQuantity;
      });
      let sum = prices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      setItemPrice(sum);
      setTax(sum * 0.15);
    }
  }, [cartItems]);

  return (
    <>
      {modalOpen && (
        <ConfirmModal
          userEmail={user?.email}
          cartItems={cartItems}
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
            {cartLoading && (
              <div className="cart-loading-overlay">
                <ReactLoader type={"spin"} color={"green"} />
              </div>
            )}
            {(cartItems === null || cartItems?.length === 0) && (
              <h2 className="cart-empty-text">Your cart is empty!</h2>
            )}
            {cartItems?.map((item, index) => {
              const { productId, productQuantity } = item;
              return (
                <div className="cart-item-box" key={index}>
                  <div className="cart-item-img">
                    <img src={productId.imgUrl} alt={productId.name} />
                  </div>
                  <div className="cart-item-text">
                    <h4>{productId.name}</h4>
                    <p>Price: ${productId.price}</p>
                    <p>Quantity: {productQuantity}</p>
                    <button
                      className="cart-rmv-btn"
                      onClick={() => removeCartItem(productId._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-right">
            <h2>{`Total:  ${
              cartItems === null || cartItems?.length === 0
                ? "$0"
                : itemPrice + tax + 20
            }`}</h2>
            <p>Items price: ${itemPrice}</p>
            <p>Tax: ${tax}</p>
            <p>{`Delivery charges: ${
              cartItems === null || cartItems?.length === 0 ? "$0" : "$20"
            }`}</p>
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
                <input type="radio" value="Cash on delivery" defaultChecked />
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
  );
};

const ConfirmModal = ({
  userEmail,
  cartItems,
  setModalOpen,
  confirmLoading,
  setConfirmLoading,
}) => {
  const { setNotification } = useGlobalContext();

  const confirmOrder = () => {
    const orders = cartItems.map((item) => {
      const { productQuantity, productId } = item;
      return {
        email: userEmail,
        productImg: productId.imgUrl,
        productName: productId.name,
        productQuantity,
        productId,
        status: "pending",
      };
    });
    setConfirmLoading(true);

    fetch("https://easy-mart-server-sandy.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
      })
      .catch((error) => console.error(error));

    fetch(
      `https://easy-mart-server-sandy.vercel.app/cart/${userEmail}/orderConfirmed`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setConfirmLoading(false);
        setModalOpen(false);
        setNotification("Order placed. Check progress in My Order!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="confirm-modal-container">
      <div className="confirm-modal">
        <h2>Confirm Order</h2>
        <button className="cart-right-btn" onClick={confirmOrder}>
          {confirmLoading ? <ReactLoader type={"spin"} color={"red"} /> : "Yes"}
        </button>
        {!confirmLoading && (
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
