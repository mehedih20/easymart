import "./Notfound.css";
import notFoundSvg from "../../assets/not-found.svg";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="not-found-container">
        <img src={notFoundSvg} alt="Not Found" />
        <Link to="/">
          <button>
            <FaHome /> Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
