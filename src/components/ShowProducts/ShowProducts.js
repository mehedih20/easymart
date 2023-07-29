import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import "./ShowProducts.css";

const ShowProducts = ({ title, products, page, icon, titleColor }) => {
  const reRating = (rating) => {
    const starArr = [];
    for (let i = 0; i < parseInt(rating); i++) {
      starArr.push(<AiFillStar />);
    }
    return starArr;
  };

  return (
    <div className="show-container">
      <h2 className={`show-title ${titleColor}`}>
        {title} <span>{icon}</span>
      </h2>
      <div className="showproduct-container">
        {products &&
          products.map((item, index) => {
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
                <p className="product-title">{name}</p>
                <p className="product-rating">
                  {reRating(rating).map((item, index) => {
                    return <span key={index}>{item}</span>;
                  })}
                </p>
                <div className="product-box-bottom">
                  <div className="product-box-bottom-price">
                    <p className="product-price">${price}</p>
                    <p className="product-old-price">{oldPrice}</p>
                  </div>
                  {page !== "dashboard" && (
                    <button className="product-box-bottom-btn">
                      <BsCart /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowProducts;
