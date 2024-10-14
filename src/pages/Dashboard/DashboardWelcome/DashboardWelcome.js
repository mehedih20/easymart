import { useState } from "react";
import useGlobalContext from "../../../hooks/useGlobalContext";
import {
  useGetSingleUserQuery,
  useUpdateUserInfoMutation,
} from "../../../redux/features/user/userApi";
import "./DashboardWelcome.css";
import { toast } from "sonner";

const DashboardWelcome = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const { data: userData } = useGetSingleUserQuery(user?.email);
  const [editedValues, setEditedValues] = useState({
    name: userData?.user?.name,
    profilePicture: userData?.user?.profilePicture,
    address: userData?.user?.address,
    phoneNumber: userData?.user?.phoneNumber,
  });
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleInputChange = (e, key) => {
    setEditedValues({ ...editedValues, [key]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editedValues.name === "") {
      toast.error("Name cannot be empty");
      return;
    }
    const requestObj = {
      id: userData?.user?._id,
      data: editedValues,
    };
    console.log(requestObj);

    const submitToast = toast.loading("Submitting...");
    const result = await updateUserInfo(requestObj).unwrap();

    if (result?.success) {
      toast.success(result?.message, { id: submitToast });
    } else {
      toast.error("Something went wrong", { id: submitToast });
    }

    setIsEditing(false);
  };

  return (
    <div>
      <div className="dasboard-welcome">
        <h2>Welcome to your dashboard!</h2>
      </div>
      {isEditing ? (
        <form className="dashboard-content-info" onSubmit={handleFormSubmit}>
          <div className="dashboard-content-text">
            <h3>Name</h3>
            <input
              type="text"
              value={editedValues.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div className="dashboard-content-text">
            <h3>Photo</h3>
            <input
              type="text"
              value={editedValues.profilePicture}
              onChange={(e) => handleInputChange(e, "profilePicture")}
            />
          </div>
          <div className="dashboard-content-text">
            <h3>Address</h3>
            <input
              type="text"
              value={editedValues.address}
              onChange={(e) => handleInputChange(e, "address")}
            />
          </div>
          <div className="dashboard-content-text">
            <h3>Number</h3>
            <input
              type="text"
              value={editedValues.phoneNumber}
              onChange={(e) => handleInputChange(e, "phoneNumber")}
            />
          </div>
          <button type="submit">Submit</button>
          <button onClick={() => setIsEditing(false)} type="button">
            Cancel
          </button>
        </form>
      ) : (
        <div className="dashboard-user-content">
          <div className="dashboard-user-image">
            <img
              src={`${
                userData?.user?.profilePicture ||
                "https://i.ibb.co/6DddXRP/user.png"
              }`}
              alt="man-image"
            />
          </div>
          <div className="dashboard-content-info">
            <div className="dashboard-content-text">
              <h3>Name</h3>
              <p>{userData?.user?.name}</p>
            </div>
            <div className="dashboard-content-text">
              <h3>Email</h3>
              <p>{userData?.user?.email}</p>
            </div>
            <div className="dashboard-content-text">
              <h3>Role</h3>
              <p>{userData?.user?.role}</p>
            </div>
            <div className="dashboard-content-text">
              <h3>Address</h3>
              <p>{userData?.user?.address || "?"}</p>
            </div>
            <div className="dashboard-content-text">
              <h3>Number</h3>
              <p>{userData?.user?.phoneNumber || "?"}</p>
            </div>

            <button onClick={() => setIsEditing(true)}>Edit Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardWelcome;
