import React, { useState } from "react";
import "./ManageProduct.css";
import useGlobalContext from "../../../hooks/useGlobalContext";
import ManageModal from "./ManageModal";
import {
  useDeleteSingleProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/products/productsApi";
import { toast } from "sonner";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";

const ManageProduct = () => {
  const { setEditItem } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetProductsQuery([
    { name: "page", value: page },
  ]);
  const [deleteSingleProduct] = useDeleteSingleProductMutation();

  const totalItems = data?.products?.meta?.total;
  const limit = data?.products?.meta?.limit;
  const pages = Math.ceil(totalItems / limit);

  const handleEdit = (item) => {
    setShowModal(true);
    setEditItem(item);
  };

  const handleDeleteProduct = async (deleteId) => {
    const toastId = toast.loading("Deleting product");
    const result = await deleteSingleProduct(deleteId);

    if (result.data.success) {
      toast.success(result.data.message, { id: toastId });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ManageModal showModal={showModal} setShowModal={setShowModal} />
      <div className="m-product-container">
        {isFetching ? (
          <ReactLoader type={"spin"} color={"red"} />
        ) : (
          data?.products?.data?.map((item) => {
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
          })
        )}
        <div
          className="product-pages"
          style={{ height: "100px", marginTop: "auto" }}
        >
          {Array.from({ length: pages }, (_, index) => (
            <button
              onClick={() => setPage(index + 1)}
              className={`${
                data?.products?.meta?.page === index + 1 && "pages-btn-selected"
              }`}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
