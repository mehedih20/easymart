import React, { useEffect, useState } from "react";
import "./ManageModal.css";
import useGlobalContext from "../../../hooks/useGlobalContext";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";
import { useUpdateSingleProductMutation } from "../../../redux/features/products/productsApi";
import { toast } from "sonner";

const ManageModal = ({ showModal, setShowModal }) => {
  const { editItem, setEditItem } = useGlobalContext();
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [item4, setItem4] = useState("");
  const [item5, setItem5] = useState("");
  const [item6, setItem6] = useState("");
  const [item7, setItem7] = useState("");

  const [updateSingleProduct, { isLoading }] = useUpdateSingleProductMutation();

  const handleCancel = () => {
    setShowModal(false);
    setEditItem(null);
    setItem1("");
    setItem2("");
    setItem3("");
    setItem4("");
    setItem5("");
    setItem6("");
    setItem7("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedObj = {
      id: editItem?._id,
      data: {
        category: item1,
        name: item2,
        imgUrl: item3,
        price: Number(item4),
        oldPrice: Number(item5),
        rating: Number(item6),
        deal: item7,
      },
    };

    const result = await updateSingleProduct(editedObj);
    if (result.data.success) {
      toast.success(result.data.message);
    } else {
      toast.error("Something went wrong");
    }

    handleCancel();
  };

  useEffect(() => {
    if (editItem !== null) {
      const { category, name, imgUrl, price, oldPrice, rating, deal } =
        editItem;
      setItem1(category);
      setItem2(name);
      setItem3(imgUrl);
      setItem4(price);
      setItem5(oldPrice);
      setItem6(rating);
      setItem7(deal);
    }
  }, [editItem]);

  return (
    <div className={`manage-modal-container ${!showModal && "modal-hide"}`}>
      {editItem && (
        <div className="manage-modal">
          <div className="addProduct-container">
            <h2>Edit Product</h2>
            <form className="addProduct-form" onSubmit={handleSubmit}>
              <div className="addProduct-form-container">
                <p>Category</p>
                <select
                  name="category"
                  id="category"
                  value={item1}
                  onChange={(e) => setItem1(e.target.value)}
                >
                  <option disabled value="">
                    {" "}
                    -- select an option --{" "}
                  </option>
                  <option value="Milks and Diaries">Milks and Diaries</option>
                  <option value="Bevereges & Drinks">Bevereges & Drinks</option>
                  <option value="Clothing and Beauty">
                    Clothing and Beauty
                  </option>
                  <option value="Fresh Seafood">Fresh Seafood</option>
                  <option value="Pet Foods & Toy">Pet Foods & Toy</option>
                  <option value="Fast food">Fast food</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fresh fruits">Fresh fruits</option>
                </select>
                <p>Name</p>
                <input
                  type="text"
                  placeholder="Eg. Chips"
                  value={item2}
                  onChange={(e) => setItem2(e.target.value)}
                />
                <p>Image Url</p>
                <input
                  type="text"
                  placeholder="https://imgbb.com/dfgf..."
                  value={item3}
                  onChange={(e) => setItem3(e.target.value)}
                />
                <p>Price</p>
                <input
                  type="text"
                  placeholder="Eg. 45"
                  value={item4}
                  onChange={(e) => setItem4(e.target.value)}
                />
                <p>Old Price</p>
                <input
                  type="text"
                  placeholder="Eg. 50"
                  value={item5}
                  onChange={(e) => setItem5(e.target.value)}
                />
                <p>Rating (out of 5)</p>
                <input
                  type="text"
                  placeholder="Eg. 4"
                  value={item6}
                  onChange={(e) => setItem6(e.target.value)}
                />
                <p>Deal</p>
                <select
                  name="=deal"
                  id="=deal"
                  value={item7}
                  onChange={(e) => setItem7(e.target.value)}
                >
                  <option disabled selected value="">
                    {" "}
                    -- select an option --{" "}
                  </option>
                  <option value="Hot">Hot</option>
                  <option value="Sale">Sale</option>
                  <option value="New">New</option>
                </select>
              </div>
              <button type="submit" className="addProduct-form-btn">
                {isLoading ? (
                  <ReactLoader type={"spin"} color={"blue"} />
                ) : (
                  "Submit"
                )}
              </button>
              <button
                className="addProduct-form-btn modal-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
          {/* <div className="addProduct-container">
            <h2>Edit Product</h2>
            <form className="addProduct-form" onSubmit={handleSubmit}>
              <div className="addProduct-form-container">
                <div className="form-left">
                  <p>Category</p>
                  <p>Name</p>
                  <p>Image Url</p>
                  <p>Price</p>
                  <p>Old Price</p>
                  <p>Rating (out of 5)</p>
                  <p>Deal</p>
                </div>
                <div className="form-right">
                  <select
                    name="category"
                    id="category"
                    value={item1}
                    onChange={(e) => setItem1(e.target.value)}
                  >
                    <option value="Milks and Diaries">Milks and Diaries</option>
                    <option value="Bevereges & Drinks">
                      Bevereges & Drinks
                    </option>
                    <option value="Clothing and Beauty">
                      Clothing and Beauty
                    </option>
                    <option value="Fresh Seafood">Fresh Seafood</option>
                    <option value="Pet Foods & Toy">Pet Foods & Toy</option>
                    <option value="Fast food">Fast food</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fresh fruits">Fresh fruits</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Eg. Chips"
                    value={item2}
                    onChange={(e) => setItem2(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="https://imgbb.com/dfgf..."
                    value={item3}
                    onChange={(e) => setItem3(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Eg. 45"
                    value={item4}
                    onChange={(e) => setItem4(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Eg. 50"
                    value={item5}
                    onChange={(e) => setItem5(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Eg. 4"
                    value={item6}
                    onChange={(e) => setItem6(e.target.value)}
                  />
                  <select
                    name="=deal"
                    id="=deal"
                    value={item7}
                    onChange={(e) => setItem7(e.target.value)}
                  >
                    <option value="Hot">Hot</option>
                    <option value="Sale">Sale</option>
                    <option value="New">New</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="addProduct-form-btn">
                {isLoading ? (
                  <ReactLoader type={"spin"} color={"red"} />
                ) : (
                  "Submit"
                )}
              </button>
              <button
                className="addProduct-form-btn modal-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ManageModal;
