import React, { useState } from "react";
import "./AddProduct.css";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";
import { useAddSingleProductMutation } from "../../../redux/features/products/productsApi";
import { toast } from "sonner";

const validateData = (data) => {
  // Check if category, name, imgUrl, and deal are not empty
  if (!data.category || !data.name || !data.imgUrl || !data.deal) {
  }

  // Check if price, oldPrice, and rating are valid numbers
  if (
    typeof data.price !== "number" ||
    typeof data.oldPrice !== "number" ||
    typeof data.rating !== "number"
  ) {
    return false;
  }

  // Check if price and oldPrice are non-negative
  if (data.price <= 0 || data.oldPrice <= 0) {
    return false;
  }
  return true;
};

const AddProduct = () => {
  const [addSingleProduct, { isLoading }] = useAddSingleProductMutation();

  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [item4, setItem4] = useState("");
  const [item5, setItem5] = useState("");
  const [item6, setItem6] = useState("");
  const [item7, setItem7] = useState("");

  const resetForm = () => {
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
    const newItem = {
      category: item1,
      name: item2,
      imgUrl: item3,
      price: Number(item4),
      oldPrice: Number(item5),
      rating: Number(item6),
      deal: item7,
    };

    if (validateData(newItem)) {
      const result = await addSingleProduct(newItem);
      if (result.data.success) {
        toast.success(result.data.message);
        resetForm();
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.warning("Not all field were filled properly");
    }
  };

  return (
    <div className="addProduct-container">
      <h2>Add Product</h2>
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
              <option disabled value="">
                {" "}
                -- select an option --{" "}
              </option>
              <option value="Milks and Diaries">Milks and Diaries</option>
              <option value="Bevereges & Drinks">Bevereges & Drinks</option>
              <option value="Clothing and Beauty">Clothing and Beauty</option>
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
              <option disabled selected value="">
                {" "}
                -- select an option --{" "}
              </option>
              <option value="Hot">Hot</option>
              <option value="Sale">Sale</option>
              <option value="New">New</option>
            </select>
          </div>
        </div>
        <button type="submit" className="addProduct-form-btn">
          {isLoading ? <ReactLoader type={"spin"} color={"blue"} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
