import React from "react";
import "./FooterSubscribe.css";
import { IoPricetagsSharp } from "react-icons/io5";
import {
  TbTruckDelivery,
  TbClockDollar,
  TbDatabaseHeart,
  TbTruckReturn,
} from "react-icons/tb";
import footerSubImg from "../../../assets/Footer/Footer-subscribe.webp";
import SubscribeInputBtn from "../../SubscribeInputBtn/SubscribeInputBtn";

const footerCardData = [
  {
    id: 1,
    icon: <IoPricetagsSharp />,
    title: "Exclusive prices and offers",
    text: "Orders $25 or more",
  },
  {
    id: 2,
    icon: <TbTruckDelivery />,
    title: "Completely Free delivery",
    text: "24/7 services",
  },
  {
    id: 3,
    icon: <TbClockDollar />,
    title: "Mind blowing daily deal",
    text: "Just after you sign up",
  },
  {
    id: 4,
    icon: <TbDatabaseHeart />,
    title: "Wide collection of products",
    text: "Mega Discounts",
  },
  {
    id: 5,
    icon: <TbTruckReturn />,
    title: "One-click easy returns",
    text: "Within 10 days",
  },
];

const FooterSubscribe = () => {
  return (
    <>
      <div className="footer-sub">
        <div className="footer-sub-img">
          <img src={footerSubImg} alt="footer-subscribe-image" />
        </div>
        <div className="footer-sub-content">
          <h2>
            Stay home & get your daily
            <br /> needs from our shop
          </h2>
          <p>
            Start You'r Daily Shopping with <span>EasyMart</span>
          </p>
          <div className="footer-sub-content-btn">
            <SubscribeInputBtn />
          </div>
        </div>
      </div>
      <div className="footer-sub-bottom">
        {footerCardData.map((item) => {
          const { id, icon, title, text } = item;
          return (
            <div key={id} className="footer-services-card">
              <div className="footer-services-icon">{icon}</div>
              <div className="footer-services-text">
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FooterSubscribe;
