import React, { useEffect, useState } from "react";
import "./ManageProduct.css";
import useGlobalContext from "../../../hooks/useGlobalContext";
import ManageModal from "./ManageModal";

const ManageProduct = () => {
  const { setEditItem } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  const handleEdit = (item) => {
    setShowModal(true);
    setEditItem(item);
  };

  const handleDeleteProduct = (deleteId) => {
    fetch(`https://rich-gray-scallop-sari.cyclic.cloud/products/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  useEffect(() => {
    const fetching = fetch(
      "https://rich-gray-scallop-sari.cyclic.cloud/products"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
    return () => fetching;
  }, [products]);

  return (
    <>
      <ManageModal showModal={showModal} setShowModal={setShowModal} />
      <div className="m-product-container">
        {products &&
          products.map((item, index) => {
            const { category, name, imgUrl, price, oldPrice, deal, _id } = item;
            return (
              <div className="m-product-box" key={_id}>
                <span
                  className={`m-product-deal ${
                    (deal === "Sale" && "bg-green") ||
                    (deal === "Hot" && "bg-blue")
                  }`}
                >
                  {deal}
                </span>
                <div className="m-product-box-left">
                  <div className="m-product-img">
                    <img src={imgUrl} alt="product-img" />
                  </div>
                  <div>
                    <p className="m-product-ctg">{category}</p>
                    <p className="m-product-title">{name}</p>
                    <div className="m-product-box-price">
                      <p className="product-price">${price}</p>
                      <p className="product-old-price">{oldPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="m-product-box-right">
                  <button
                    className="m-product-box-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="m-product-box-btn"
                    onClick={() => handleDeleteProduct(_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ManageProduct;
