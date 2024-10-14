import { AiFillStar } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import "./Reviews.css";
import { useGetProductReviewsQuery } from "../../redux/features/reviews/reviewsApi";
import { getFormattedDate } from "../../utils/getFormatedDate";
import emptySvg from "../../assets/empty.svg";

const reRating = (rating) => {
  const starArr = [];
  for (let i = 0; i < parseInt(rating); i++) {
    starArr.push(<AiFillStar />);
  }
  return starArr;
};

const Reviews = ({ productId }) => {
  const { data: reviewsData } = useGetProductReviewsQuery(productId);
  console.log(reviewsData?.reviews);

  return (
    <div className="reviews-container">
      {reviewsData?.reviews.length === 0 && (
        <>
          <h3 className="empty-reviews-text">
            No reviews yet. Be the first one to write a review!
          </h3>
          <div className="empty-reviews-image">
            <img src={emptySvg} alt="empty-svg" />
          </div>
        </>
      )}
      {reviewsData?.reviews.map((review) => {
        const { username, rating, comment, createdAt, _id } = review;

        return (
          <div className="single-review" key={_id}>
            <div className="single-review-icon">
              <CiUser />
            </div>
            <div className="single-review-content">
              <div className="single-review-content-heading">
                <h4>{username}</h4>
                <p>{getFormattedDate(createdAt)}</p>
              </div>
              <p className="product-rating">
                {reRating(rating).map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
              </p>
              <p>{comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
