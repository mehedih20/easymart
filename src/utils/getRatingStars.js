import { AiFillStar } from "react-icons/ai";

export const getRatingStars = (rating) => {
  const starArr = [];
  for (let i = 0; i < parseInt(rating); i++) {
    starArr.push(<AiFillStar className="color-primary" />);
  }
  return starArr;
};
