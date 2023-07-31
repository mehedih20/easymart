import React from "react";
import "./FooterLinks.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";
import { AiOutlineMail, AiOutlineClockCircle } from "react-icons/ai";
import footerLogo from "../../../assets/EasyMart-logo.webp";
import footerDownload from "../../../assets/downloadLink.webp";

const FooterLinks = () => {
  return (
    <>
      <div className="footer-links-container">
        <div className="footer-links-address">
          <img src={footerLogo} alt="footer-logo" />
          <h4>All you need in one place</h4>
          <p>
            <span className="footer-icon">
              <FaLocationDot />
            </span>{" "}
            <span>Address</span> : 5171 W Campbell Ave Kent,
            <br /> Utah 53127 United States
          </p>
          <p>
            <span className="footer-icon">
              <FaHeadphonesAlt />
            </span>{" "}
            <span>Call Us</span> : (+91) - 540-025-124553
          </p>
          <p>
            <span className="footer-icon">
              <AiOutlineMail />
            </span>{" "}
            <span>Email</span> : sale@Nest.com United States
          </p>
          <p>
            <span className="footer-icon">
              <AiOutlineClockCircle />
            </span>{" "}
            <span>Hours</span> : 10:00 - 18:00, Mon - Sat
          </p>
        </div>
        {/* --------------------------- */}
        <div className="footer-links">
          <h2>Company</h2>
          <p>About Us</p>
          <p>Delivery Information</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
          <p>Contact Us</p>
          <p>Support Center</p>
          <p>Carrers</p>
        </div>
        <div className="footer-links">
          <h2>Account</h2>
          <p>Sign In</p>
          <p>View Cart</p>
          <p>My Wishlist</p>
          <p>Track My Order</p>
          <p>Help Ticket</p>
          <p>Shipping Details</p>
          <p>Compare Products</p>
        </div>
        <div className="footer-links">
          <h2>Coporate</h2>
          <p>Become a Vendor</p>
          <p>Affiliate Program</p>
          <p>Farm Business</p>
          <p>Farm Careers</p>
          <p>Our Suppliers</p>
          <p>Accessibility</p>
          <p>Promotions</p>
        </div>
        <div className="footer-links">
          <h2>Popular</h2>
          <p>Milk and Dairy</p>
          <p>Butter and Margarine</p>
          <p>Rice substitutes</p>
          <p>Fresh fruits</p>
          <p>Electronics and technologies</p>
          <p>Coffee and tea</p>
          <p>Fashion and beauty</p>
        </div>
        {/* ----------------------------- */}
        <div className="footer-links">
          <h2>Install App</h2>
          <p>From Apple Store and Google Play</p>
          <div className="footer-links-download">
            <img src={footerDownload} alt="download-link" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Copyright&copy; 2023 EasyMart | All rights reseverd | Coded by Mehedi
          Hasan
        </span>
        <span>Helpline: +123-444-555 | +123-666-777</span>
      </div>
    </>
  );
};

export default FooterLinks;
