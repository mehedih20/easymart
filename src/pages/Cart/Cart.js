import React, { useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import "./Cart.css";
import ReactLoader from "../../components/ReactLoading/ReactLoader";

const Cart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const [itemPrice, setItemPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [address, setAddress] = useState("");

  const removeCartItem = (item) => {
    setCartLoading(true);
    fetch(
      `https://easymart-server.onrender.com/user/cart/removeItem/${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCartLoading(false);
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
      fetch(`https://easymart-server.onrender.com/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data.cart);
        });
    }
  }, [user, removeCartItem]);

  useEffect(() => {
    if (cartItems) {
      const prices = cartItems.map((item) => {
        return parseInt(item.productPrice) * item.productQuantity;
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
        />
      )}
      <div className="container">
        <h2 className="cart-title">
          <span>/</span> Cart
        </h2>
        {cartLoading && (
          <div style={{ margin: "2rem 0" }}>
            <ReactLoader type={"spin"} color={"green"} />
          </div>
        )}

        <div className="cart-container">
          <div className="cart-left">
            {(!cartItems || cartItems?.length === 0) && (
              <h2 className="cart-empty-text">Your cart is empty!</h2>
            )}
            {cartItems?.map((item, index) => {
              const {
                itemId,
                productName,
                productImg,
                productPrice,
                productQuantity,
              } = item;
              return (
                <div className="cart-item-box" key={index}>
                  <div className="cart-item-img">
                    <img src={productImg} alt={productName} />
                  </div>
                  <div className="cart-item-text">
                    <h4>{productName}</h4>
                    <p>Price: ${productPrice}</p>
                    <p>Quantity: {productQuantity}</p>
                    <button
                      className="cart-rmv-btn"
                      onClick={() => removeCartItem(item)}
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
              !cartItems || cartItems?.length === 0
                ? "$0"
                : itemPrice + tax + 20
            }`}</h2>
            <p>Items price: ${itemPrice}</p>
            <p>Tax: ${tax}</p>
            <p>{`Delivery charges: ${
              !cartItems || cartItems?.length === 0 ? "$0" : "$20"
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

const ConfirmModal = ({ userEmail, cartItems, setModalOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const confirmOrder = () => {
    const orders = cartItems.map((item) => {
      const { productImg, productName, productQuantity, productId } = item;
      return {
        email: userEmail,
        productImg,
        productName,
        productQuantity,
        productId,
      };
    });
    setConfirmLoading(true);

    orders.forEach((item) => {
      fetch("https://easymart-server.onrender.com/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.acknowledged);
        })
        .catch((error) => console.error(error));
    });

    fetch(
      `https://easymart-server.onrender.com/cart/orderConfirmed/${userEmail}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setConfirmLoading(false);
        console.log(data.acknowledged);
      })
      .catch((error) => console.error(error));

    setModalOpen(false);
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
