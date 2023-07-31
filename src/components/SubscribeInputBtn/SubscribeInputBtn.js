import React from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import "./SubscribeInputBtn.css";

const SubscribeInputBtn = () => {
  return (
    <div className="subs-btn-container">
      <FaRegPaperPlane />
      <input type="text" placeholder="Your email address" />
      <button className="subs-btn">Subscribe</button>
    </div>
  );
};

export default SubscribeInputBtn;
