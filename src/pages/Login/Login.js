import React, { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useNavigate, useLocation } from "react-router-dom";
import ReactLoader from "../../components/ReactLoading/ReactLoader";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isUser, setIsUser] = useState(false);
  //----------
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  //----------
  const { firebase } = useGlobalContext();
  const { googleSignIn, createNewUser, signInUser, loading, notification } =
    firebase;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUser) {
      if (name && email && password && rePassword && password === rePassword) {
        createNewUser(name, email, password);
      }
    }
    if (isUser && email && password) {
      signInUser(email, password, navigate, from);
    }
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
  };

  const handleGoogleSignIn = () => {
    googleSignIn(navigate, from);
  };

  return (
    <div>
      <div className="login-container">
        <h2>{isUser ? "Login" : "Sign Up"}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {isUser ? null : (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isUser ? null : (
            <input
              type="password"
              value={rePassword}
              placeholder="Re-enter password"
              onChange={(e) => setRePassword(e.target.value)}
            />
          )}
          <button className="login-btn" type="submit">
            {loading ? <ReactLoader type={"spin"} color={"red"} /> : "Submit"}
          </button>

          {notification && <span>{notification}</span>}
          <p>_ _ _ _ _ _</p>

          <button className="google-btn" onClick={handleGoogleSignIn}>
            <FcGoogle style={{ marginRight: "1rem", marginTop: "-0.3rem" }} />
            Google
          </button>
          <p className="login-bottom-text">
            {isUser ? "Don't have an account?" : "Already an user?"}{" "}
            <button onClick={() => setIsUser(!isUser)}>
              {isUser ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
