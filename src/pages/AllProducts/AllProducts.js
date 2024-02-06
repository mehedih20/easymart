import React, { useState } from "react";
import "./AllProducts.css";
import Title from "../../components/Title/Title";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "../../redux/features/products/productsApi";

const sortByData = ["name", "price", "rating", "none"];
const sortOrderData = ["asc", "desc"];

const AllProducts = () => {
  const [productOptions, setProductOptions] = useState({
    deal: "",
    categories: [],
    sortBy: "",
    sortOrder: "",
    page: 1,
  });
  const { data: categoryData, isLoading } =
    useGetProductCategoriesQuery(undefined);
  const { data: productData, isFetching } = useGetProductsQuery(
    [
      { name: "deal", value: productOptions.deal },
      { name: "categories", value: productOptions.categories },
      { name: "sortBy", value: productOptions.sortBy },
      { name: "sortOrder", value: productOptions.sortOrder },
      { name: "page", value: productOptions.page },
    ],
    { skip: isLoading }
  );

  const totalItems = productData?.products.meta.total;
  const limit = productData?.products.meta.limit;
  const pages = Math.ceil(totalItems / limit);

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
            {categoryData?.categories.map((category) => (
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
          {isFetching ? (
            <ReactLoader type={"spin"} color={"red"} />
          ) : (
            productData?.products && (
              <ShowProducts
                titleColor={"bg-light-red"}
                title={""}
                page="products"
                products={productData?.products.data}
              />
            )
          )}
          <div className="product-pages">
            {Array.from({ length: pages }, (_, index) => (
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  productData?.products.meta.page === index + 1 &&
                  "pages-btn-selected"
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
