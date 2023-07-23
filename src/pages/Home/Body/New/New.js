import React, { useEffect, useState } from "react";
import { AiFillFire, AiFillStar } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import "./New.css";

const New = () => {
  const [products, setProducts] = useState([]);

  const reRating = (rating) => {
    const starArr = [];
    for (let i = 0; i < parseInt(rating); i++) {
      starArr.push(<AiFillStar />);
    }
    return starArr;
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <div className="new-container">
      <h2 className="new-title">
        New Products{" "}
        <span>
          <AiFillFire />
        </span>
      </h2>
      <div className="newproduct-container">
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
                <span
                  className={`deal ${
                    (deal === "Sale" && "bg-green") ||
                    (deal === "Hot" && "bg-blue")
                  }`}
                >
                  {deal}
                </span>
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
                  <button className="product-box-bottom-btn">
                    <BsCart /> Add
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default New;
