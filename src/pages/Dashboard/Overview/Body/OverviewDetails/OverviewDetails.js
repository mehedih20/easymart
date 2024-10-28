import { FaPen } from "react-icons/fa";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { useGetSingleUserQuery } from "../../../../../redux/features/user/userApi";
import "./OverviewDetails.css";
import AdminOverview from "../AdminOverview/AdminOverview";
import UserOverview from "../UserOverview/UserOverview";

const OverviewDetails = ({ setIsEditing }) => {
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const { data: userData } = useGetSingleUserQuery(user?.email);
  return (
    <div>
      <div className="overview-top">
        <img
          src={`${
            userData?.user?.profilePicture ||
            "https://i.ibb.co/6DddXRP/user.png"
          }`}
          alt="man-image"
        />
        <div className="overview-top-text">
          <h3>
            {userData?.user?.name} <span>({userData?.user?.role})</span>
          </h3>
          <button onClick={() => setIsEditing(true)}>
            <FaPen />
          </button>
        </div>
      </div>
      <div className="overview-bottom">
        <div className="overview-bottom-left">
          <h4>Email</h4>
          <p>{userData?.user?.email}</p>
          <h4>Phone</h4>
          <p>{userData?.user?.phoneNumber || "?"}</p>
          <h4>Address</h4>
          <p>{userData?.user?.address || "?"}</p>
        </div>
        <div className="overview-bottom-right">
          <h2>Welcome to your dashboard!</h2>
          {(userData?.user?.role === "admin" && <AdminOverview />) ||
            (userData?.user?.role === "user" && <UserOverview />)}
        </div>
      </div>
    </div>
  );
};

export default OverviewDetails;
