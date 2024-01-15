import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import Title from "../../components/Title/Title";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import ShowProducts from "../../components/ShowProducts/ShowProducts";

const sortByData = ["name", "price", "rating", "none"];
const sortOrderData = ["asc", "desc"];

const AllProducts = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState([]);
  const [productOptions, setProductOptions] = useState({
    deal: "",
    categories: [],
    sortBy: "",
    sortOrder: "",
    page: 1,
  });

  const handleDealChange = (e) => {
    setProductOptions((prev) => ({
      ...prev,
      deal: e.target.value,
    }));
  };

  const handleCategoryChange = (category) => {
    const isSelected = productOptions?.categories?.includes(category);

    if (isSelected) {
      setProductOptions((prev) => ({
        ...prev,
        categories: prev.categories.filter((item) => item !== category),
      }));
    } else {
      setProductOptions((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
  };

  const handleSortByChange = (e) => {
    setProductOptions((prev) => ({
      ...prev,
      sortBy: e.target.value,
    }));
  };

  const handleSortOrderChange = (e) => {
    setProductOptions((prev) => ({
      ...prev,
      sortOrder: e.target.value,
    }));
  };

  const handlePageChange = (value) => {
    setProductOptions((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Fetching products
  useEffect(() => {
    window.scrollTo(0, 0);
    setProductLoading(true);
    const fetching = fetch(
      `https://easy-mart-server-sandy.vercel.app/products?deal=${productOptions.deal}&categories=${productOptions.categories}&sortBy=${productOptions.sortBy}&sortOrder=${productOptions.sortOrder}&page=${productOptions.page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        // Calculating pages
        const totalItems = data.products.meta.total;
        const limit = data.products.meta.limit;
        setPages(Math.ceil(totalItems / limit));
        setProductLoading(false);
      })
      .catch(() => {
        setProductLoading(false);
      });

    return () => fetching;
  }, [productOptions]);

  // Fetching product categories
  useEffect(() => {
    const fetching = fetch(
      "https://easy-mart-server-sandy.vercel.app/products/categories"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });

    return () => fetching;
  }, []);

  return (
    <div className="container">
      <Title text="Products" />

      <div className="products-container">
        <div className="products-container-left">
          {/* Deals button */}
          <div className="deals-btn">
            <label htmlFor="productStatus">Deals</label>
            <select
              id="productStatus"
              name="productStatus"
              value={productOptions.deal}
              onChange={handleDealChange}
            >
              <option value="">All</option>
              <option value="Sale">Sale</option>
              <option value="Hot">Hot</option>
              <option value="New">New</option>
            </select>
          </div>

          {/* Categories Checkbox */}
          <div className="categories-check">
            <p>Categories</p>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  value={category}
                  checked={productOptions.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>

          {/* sortBy radio btn */}
          <div className="radio-check">
            <p>Sort By</p>
            {sortByData.map((item, index) => {
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="sortingOption"
                    value={item}
                    checked={productOptions.sortBy === item}
                    onChange={handleSortByChange}
                  />
                  {item}
                </label>
              );
            })}
          </div>

          {/* sortOrder radio btn */}
          <div className="radio-check">
            <p>Sort Order</p>
            {sortOrderData.map((item, index) => {
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="sortOrderOption"
                    value={item}
                    checked={productOptions.sortOrder === item}
                    onChange={handleSortOrderChange}
                  />
                  {item === "asc" ? "low to high" : "high to low"}
                </label>
              );
            })}
          </div>
        </div>

        {/* Product container */}
        <div className="products-container-right">
          {products && productLoading ? (
            <ReactLoader type={"spin"} color={"red"} />
          ) : (
            <ShowProducts
              titleColor={"bg-light-red"}
              title={""}
              page="products"
              products={products.data}
            />
          )}
          <div className="product-pages">
            {Array.from({ length: pages }, (_, index) => (
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  products.meta.page === index + 1 && "pages-btn-selected"
                }`}
                key={index}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
