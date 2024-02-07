import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import "./ShowProducts.css";
import { Link, useNavigate } from "react-router-dom";

const ShowProducts = ({ title, products, page, icon, titleColor }) => {
  const navigate = useNavigate();
  const reRating = (rating) => {
    const starArr = [];
    for (let i = 0; i < parseInt(rating); i++) {
      starArr.push(<AiFillStar />);
    }
    return starArr;
  };

  return (
    <div className="show-container">
      {page !== "category" && page !== "products" && (
        <h2 className={`show-title ${titleColor}`}>
          {title} <span>{icon}</span>
        </h2>
      )}
      <div className="showproduct-container">
        {products &&
          products.map((item) => {
            const {
              category,
              name,
              imgUrl,
              price,
              oldPrice,
              deal,
              _id,
              rating,
            } = item;
            return (
              <div className="product-box" key={_id}>
                <div className="product-img">
                  <img src={imgUrl} alt="product-img" />
                </div>
                {deal && (
                  <span
                    className={`deal ${
                      (deal === "Sale" && "bg-green") ||
                      (deal === "Hot" && "bg-red")
                    }`}
                  >
                    {deal}
                  </span>
                )}
                <p className="product-ctg">{category}</p>
                <Link to={`/product/${_id}`} className="product-title">
                  {name}
                </Link>

                <div className="product-box-bottom">
                  <p className="product-rating">
                    {reRating(rating).map((item, index) => {
                      return <span key={index}>{item}</span>;
                    })}
                  </p>
                  <div className="product-box-bottom-price-container">
                    <div className="product-box-bottom-price">
                      <p className="product-price">${price}</p>
                      <p className="product-old-price">{oldPrice}</p>
                    </div>
                    {page !== "dashboard" && (
                      <button
                        className="product-box-bottom-btn"
                        onClick={() => navigate(`/product/${_id}`)}
                      >
                        <BsCart /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowProducts;
