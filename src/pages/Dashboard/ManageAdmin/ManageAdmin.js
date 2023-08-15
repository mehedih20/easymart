import React, { useState } from "react";
import "./ManageAdmin.css";
import ReactLoader from "../../../components/ReactLoading/ReactLoader";
import useGlobalContext from "../../../hooks/useGlobalContext";

const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [formUser, setFormUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:5000/users/${text}`)
      .then((res) => res.json())
      .then((data) => {
        setFormUser(data);
        console.log(data);
        setText("");
        setLoading(false);
      })
      .catch(() => console.log("User not found!"));
  };

  const fetchUpdatedUser = () => {
    fetch(`http://localhost:5000/users/${formUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormUser(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const makeAdmin = () => {
    setLoading(true);
    fetch(`http://localhost:5000/user/makeAdmin/${formUser._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetchUpdatedUser();
        }
      });
  };

  const removeAdmin = () => {
    setLoading(true);
    fetch(`http://localhost:5000/user/removeAdmin/${formUser._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetchUpdatedUser();
        }
      });
  };

  return (
    <div className="manageAdmin">
      <div className="manageAdmin-form-container">
        <h2>Search User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="eg. johndoe@gmail.com"
          />
          <button type="submit">
            {loading && text !== "" ? (
              <ReactLoader type={"spin"} color={"red"} />
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>

      {formUser && (
        <>
          <div className="manageAdmin-user">
            <div className="manageAdmin-user-left">
              <h2>{formUser.name}</h2>
              <p>{formUser.email}</p>
            </div>
            <div className="manageAdmin-user-right">
              {formUser.role === "admin" ? (
                <button className="manageAdmin-user-btn" onClick={removeAdmin}>
                  {loading && text === "" ? (
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
                  {loading && text === "" ? (
                    <ReactLoader type={"spin"} color={"red"} />
                  ) : (
                    "Make Admin"
                  )}
                </button>
              )}
            </div>
          </div>
          <button
            className="manageAdmin-clear-btn"
            onClick={() => setFormUser(null)}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
};

export default ManageAdmin;
