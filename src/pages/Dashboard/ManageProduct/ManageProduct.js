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
import ManageSingleProduct from "../../../components/ManageSingleProduct/ManageSingleProduct";

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

  const handleDelete = async (deleteId) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
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
          data?.products?.data?.map((item) => (
            <ManageSingleProduct
              item={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
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
