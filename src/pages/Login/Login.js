import React, { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isUser, setIsUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello World");
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>{isUser ? "Login" : "Sign Up"}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {isUser ? null : <input type="text" placeholder="Name" />}
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {isUser ? null : (
            <input type="password" placeholder="Re-enter password" />
          )}
          <button className="login-btn" type="submit">
            Submit
          </button>

          <p>_ _ _ _ _ _</p>

          <button className="google-btn">
            <FcGoogle style={{ marginRight: "1rem", marginTop: "-0.3rem" }} />{" "}
            {isUser ? "Google Login" : "Sign up with Google"}
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
