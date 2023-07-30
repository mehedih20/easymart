import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";

const AddProduct = () => {
  const [addNotificationText, setAddNotificationText] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddLoading(true);
    const newItem = {
      category: item1,
      name: item2,
      imgUrl: item3,
      price: item4,
      oldPrice: item5,
      rating: item6,
      deal: item7,
    };

    if (Object.keys(newItem).length !== 0) {
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((res) => res.json())
        .then((data) => {
          resetForm();
          setAddLoading(false);
          setAddNotificationText("Product successfully added");
          setShowNotification(true);
        });
    } else {
      setAddLoading(false);
      console.log("Not all field were filled properly");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [showNotification]);

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
        <p
          className={`addProduct-notification ${
            showNotification && "addProduct-notification-show"
          }`}
        >
          {addNotificationText}
        </p>
        <button type="submit" className="addProduct-form-btn">
          {addLoading ? <ReactLoader type={"spin"} color={"blue"} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
