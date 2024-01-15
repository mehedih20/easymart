import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../ReactLoading/ReactLoader";
import Title from "../Title/Title";

const SingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [addCartLoading, setAddCartLoading] = useState(false);
  const { productId } = useParams();
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const navigate = useNavigate();
  const { setNotification } = useGlobalContext();

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
    setAddCartLoading(true);
    const newCartItem = {
      productId,
      productQuantity: Number(productQuantity),
    };
    fetch(`https://easy-mart-server-sandy.vercel.app/cart/${user.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAddCartLoading(false);
          setNotification(data.message);
        } else {
          setAddCartLoading(false);
          setNotification("Something went wrong. Try again");
        }
      });
  };

  useEffect(() => {
    setProduct(null);
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`https://easy-mart-server-sandy.vercel.app/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="container">
      {loading && <ReactLoader type={"spin"} color={"green"} />}
      {product && (
        <Title text={`Categories/${product.category}/${product.name}`} />
      )}
      <div className="singleProduct-container">
        {product && (
          <>
            <div className="singleProduct-left">
              <img src={product.imgUrl} alt="single-product" />
            </div>
            <div className="singleProduct-right">
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
              <div className="single-item-btn-container">
                <button className="addCart-btn" onClick={addToCart}>
                  {addCartLoading ? (
                    <ReactLoader type={"spin"} color={"red"} />
                  ) : (
                    "Add to Cart"
                  )}
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
