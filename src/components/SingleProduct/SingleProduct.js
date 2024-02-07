import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../ReactLoading/ReactLoader";
import Title from "../Title/Title";
import { useGetSingleProductQuery } from "../../redux/features/products/productsApi";
import { toast } from "sonner";
import { useAddToCartMutation } from "../../redux/features/cart/cartApi";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

const SingleProduct = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(productId);
  const [addItemToCart, { isLoading: addToCartLoading }] =
    useAddToCartMutation();
  const { data: userData } = useGetSingleUserQuery(user?.email);

  const reRating = (rating) => {
    const starArr = [];
    for (let i = 0; i < parseInt(rating); i++) {
      starArr.push(<AiFillStar />);
    }
    return starArr;
  };

  const addToCart = async () => {
    if (!user) {
      toast.error("You must login into your account first!");
      return;
    }
    if (productQuantity < 1) {
      toast.error("Cannot add to cart. Quantity cannot be 0!");
      return;
    }
    const newCartItem = {
      email: user.email,
      data: {
        productId,
        productQuantity: Number(productQuantity),
      },
    };

    const result = await addItemToCart(newCartItem);

    if (result.data.success) {
      toast.success(result.data.message);
    } else {
      toast.error("Something went wrong. Try again");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      {isLoading && <ReactLoader type={"spin"} color={"green"} />}
      {data?.product && (
        <Title
          text={`Categories/${data.product.category}/${data.product.name}`}
        />
      )}
      <div className="singleProduct-container">
        {data?.product && (
          <>
            <div className="singleProduct-left">
              <img src={data.product.imgUrl} alt="single-product" />
            </div>
            <div className="singleProduct-right">
              <h3 className="product-title">{data.product?.name}</h3>
              <p className="product-ctg">{data.product?.category}</p>
              <p className="product-rating">
                {reRating(data.product.rating).map((item, index) => {
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
                <p className="product-price">${data.product?.price}</p>
                <p className="product-old-price">{data.product?.oldPrice}</p>
              </div>
              {!(
                userData?.user?.role === "owner" ||
                userData?.user?.role === "admin"
              ) && (
                <div>
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
                      <span>Total: </span>$
                      {data.product.price * productQuantity}
                    </p>
                  )}
                </div>
              )}
              {(userData?.user?.role === "owner" ||
                userData?.user?.role === "admin") && (
                <div style={{ marginBottom: "30px" }}></div>
              )}
              <div className="single-item-btn-container">
                {!(
                  userData?.user?.role === "owner" ||
                  userData?.user?.role === "admin"
                ) && (
                  <>
                    <button className="addCart-btn" onClick={addToCart}>
                      {addToCartLoading ? (
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
                  </>
                )}

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
