import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../ReactLoading/ReactLoader";

const SingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const reRating = (rating) => {
    const starArr = [];
    for (let i = 0; i < parseInt(rating); i++) {
      starArr.push(<AiFillStar />);
    }
    return starArr;
  };

  const addToCart = () => {
    if (!user) {
      setNotification("You must login into your account first!");
      return;
    }
    if (productQuantity < 1) {
      setNotification("Invalid action. Quantity cannot be 0!");
      return;
    }
    const newCartItem = {
      itemId: new Date().getTime().toString(),
      productId,
      productQuantity,
      productName: product.name,
      productPrice: product.price,
      productImg: product.imgUrl,
    };
    fetch(
      `https://rich-gray-scallop-sari.cyclic.cloud/user/cart/${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCartItem),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setNotification("Product added to cart");
        } else {
          setNotification("Something went wrong. Try again");
        }
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [notification]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`https://rich-gray-scallop-sari.cyclic.cloud/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading && <ReactLoader type={"spin"} color={"green"} />}
      {product && (
        <h2 className="singleProduct-title">
          <span>/{product?.category}/ </span>
          {product?.name}
        </h2>
      )}
      <div className="singleProduct-container">
        {product && (
          <>
            <div className="singleProduct-left">
              <img src={product.imgUrl} alt="singleProduct-image" />
            </div>
            <div className="singleProduct-right">
              {notification.length !== 0 && (
                <h3 className="singleProduct-notification">{notification}</h3>
              )}
              <h3 className="product-title">{product?.name}</h3>
              <p className="product-ctg">{product?.category}</p>
              <p className="product-rating">
                {reRating(product.rating).map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
              </p>
              <p className="singleProduct-desc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
                nobis distinctio libero corporis recusandae eum vel quis et
                accusamus animi? Explicabo incidunt rerum ut esse cupiditate
                veritatis eligendi aliquid nihil natus quis fugiat, mollitia
                iure soluta praesentium eos tempora nobis.
              </p>
              <div className="product-box-bottom-price singleProduct-price-box">
                <p className="product-price">${product?.price}</p>
                <p className="product-old-price">{product?.oldPrice}</p>
              </div>
              <div className="singleProduct-quantity">
                <p>Quantity: </p>
                <div className="singleProduct-quantity-box">
                  <button
                    onClick={() => {
                      productQuantity > 0 &&
                        setProductQuantity(productQuantity - 1);
                    }}
                  >
                    -
                  </button>
                  <span>{productQuantity}</span>
                  <button
                    onClick={() => setProductQuantity(productQuantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              {productQuantity > 0 && (
                <p className="singleProduct-total">
                  <span>Total: </span>${product.price * productQuantity}
                </p>
              )}
              <button className="addCart-btn" onClick={addToCart}>
                Add to Cart
              </button>
              <button
                className="addCart-btn cart-btn"
                onClick={() => navigate("/cart")}
              >
                Cart
              </button>
              <button className="addCart-btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
