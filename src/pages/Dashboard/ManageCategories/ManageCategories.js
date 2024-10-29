import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/categories/categoriesApi";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";
import "./ManageCategories.css";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const ManageCategories = () => {
  const [category, setCategory] = useState("");

  const [createCategory, { isLoading: createLoading }] =
    useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categoriesData, isFetching } = useGetCategoriesQuery(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "") {
      toast.error("Category name cannot be empty");
      return;
    }
    const toastId = toast.loading("Submitting...");

    const result = await createCategory({
      categoryName: category,
    }).unwrap();

    if (result?.success) {
      toast.success(result?.message, { id: toastId });
      setCategory("");
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDelete = async (categoryId) => {
    const toastId = toast.loading("Deleting category...");
    const result = await deleteCategory(categoryId).unwrap();

    if (result?.success) {
      toast.success(result?.message, { id: toastId });
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <div className="manageAdmin-form-container mb-5">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="eg. Snacks"
          />
          <button type="submit">
            {createLoading ? (
              <ReactLoader type={"spin"} color={"red"} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      <div className="dashboard-category-container">
        {isFetching && <ReactLoader type={"spin"} color={"blue"} />}
        {categoriesData &&
          categoriesData?.categories?.map((category, index) => {
            return (
              <div key={category?._id} className="dashboard-category-box">
                <p>{index + 1}.</p>
                <p>{category?.categoryName}</p>
                <button onClick={() => handleDelete(category?._id)}>
                  <FaTrash />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageCategories;
