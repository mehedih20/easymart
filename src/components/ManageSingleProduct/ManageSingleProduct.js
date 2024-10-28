import "./ManageSingleProduct.css";

const ManageSingleProduct = ({ item, handleDelete, handleEdit }) => {
  const { category, name, imgUrl, price, oldPrice, deal, _id } = item;

  return (
    <div className="m-product-box">
      <span
        className={`m-product-deal ${
          (deal === "Sale" && "bg-green") || (deal === "Hot" && "bg-blue")
        }`}
      >
        {deal}
      </span>
      <div className="m-product-box-left">
        <div className="m-product-img">
          <img src={imgUrl} alt="product-img" />
        </div>
        <div className="m-product-content">
          <p className="m-product-ctg">{category}</p>
          <p className="m-product-title">{name}</p>
          <div className="m-product-box-price">
            <p className="product-price">${price}</p>
            <p className="product-old-price">{oldPrice}</p>
          </div>
        </div>
      </div>
      <div className="m-product-box-right">
        <button className="m-product-box-btn" onClick={() => handleEdit(item)}>
          Edit
        </button>
        <button className="m-product-box-btn" onClick={() => handleDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManageSingleProduct;
