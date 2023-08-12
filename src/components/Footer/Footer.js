import React from "react";
import FooterSubscribe from "./FooterSubscribe/FooterSubscribe";
import FooterLinks from "./FooterLinks/FooterLinks";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div style={{ marginTop: "auto" }} className="container">
      {location.pathname.slice(0, 10) !== "/dashboard" && (
        <>
          {location.pathname !== "/login" && <FooterSubscribe />}
          <FooterLinks />
        </>
      )}
      <div className="footer-bottom">
        <span>
          Copyright&copy; 2023 EasyMart | All rights reseverd | Coded by Mehedi
          Hasan
        </span>
        <span>Helpline: +123-444-555 | +123-666-777</span>
      </div>
    </div>
  );
};

export default Footer;
