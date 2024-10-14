import { useState } from "react";
import "./ReviewForm.css";
import { AiFillStar } from "react-icons/ai";
import useGlobalContext from "../../hooks/useGlobalContext";
import { toast } from "sonner";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";
import { useAddProductReviewMutation } from "../../redux/features/reviews/reviewsApi";

const StarRating = ({ rating, setRating }) => {
  const handleRating = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <AiFillStar
          key={index}
          size={20}
          color={index < rating ? "gold" : "gray"}
          onClick={() => handleRating(index)}
          style={{ cursor: "pointer", marginRight: 3 }}
        />
      ))}
    </div>
  );
};

const ReviewForm = ({ productId }) => {
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const { data: userData } = useGetSingleUserQuery(user?.email);
  const [addProductReview, { data: addProductLoading }] =
    useAddProductReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("User is not logged in. Please login!");
      return;
    }
    if (user) {
      if (userData?.user?.role !== "user") {
        toast.error("Only users can leave reviews!");
        return;
      }

      if (reviewText === "" || rating === 0) {
        toast.error("Review and rating fields cannot be empty!");
        return;
      }

      const requestData = {
        productId,
        userEmail: userData?.user?.email,
        username: userData?.user?.name,
        rating,
        comment: reviewText,
      };

      const reviewToast = toast.loading("Submitting review...");
      const result = await addProductReview(requestData).unwrap();
      if (result?.success) {
        toast.success("Review submitted successfully!", { id: reviewToast });
        setReviewText("");
        setRating(0);
      } else {
        toast.error("Something went wrong!", { id: reviewToast });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="review-form">
        <textarea
          rows={10}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <StarRating rating={rating} setRating={setRating} />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
