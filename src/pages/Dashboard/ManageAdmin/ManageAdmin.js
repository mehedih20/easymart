import React, { useState } from "react";
import "./ManageAdmin.css";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";
import {
  useChangeUserRoleMutation,
  useGetSingleUserQuery,
} from "../../../redux/features/user/userApi";

const ManageAdmin = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const { data: userData, isFetching, refetch } = useGetSingleUserQuery(email);
  const [changeUserRole, { isLoading }] = useChangeUserRoleMutation();

  const handleUserSearch = (e) => {
    e.preventDefault();
    setEmail(() => text);
  };

  const makeAdmin = async () => {
    const data = {
      id: userData.user._id,
      body: {
        role: "admin",
      },
    };
    await changeUserRole(data);
    refetch();
  };
  const removeAdmin = async () => {
    const data = {
      id: userData.user._id,
      body: {
        role: "user",
      },
    };
    await changeUserRole(data);
    refetch();
  };

  return (
    <div className="manageAdmin">
      <div className="manageAdmin-form-container">
        <h2>Search User</h2>
        <form onSubmit={handleUserSearch}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="eg. johndoe@gmail.com"
          />
          <button type="submit">
            {isFetching ? (
              <ReactLoader type={"spin"} color={"red"} />
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>

      {userData?.user && (
        <>
          <div className="manageAdmin-user">
            <div className="manageAdmin-user-left">
              <h2>{userData.user.name}</h2>
              <p>
                {userData.user.email}({userData.user.role})
              </p>
            </div>
            {userData.user.role !== "owner" && (
              <div className="manageAdmin-user-right">
                {userData.user.role === "admin" ? (
                  <button
                    className="manageAdmin-user-btn"
                    onClick={removeAdmin}
                  >
                    {isLoading ? (
                      <ReactLoader type={"spin"} color={"green"} />
                    ) : (
                      "Remove Admin"
                    )}
                  </button>
                ) : (
                  <button
                    className="manageAdmin-user-btn green-btn"
                    onClick={makeAdmin}
                  >
                    {isLoading ? (
                      <ReactLoader type={"spin"} color={"red"} />
                    ) : (
                      "Make Admin"
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAdmin;
