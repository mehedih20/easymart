import React, { useEffect, useState } from "react";
import "./About.css";
import welcomeImg from "../../assets/About/about-welcome-img.webp";
import welcomeSlide1 from "../../assets/About/Slider/about-slide-1.webp";
import welcomeSlide2 from "../../assets/About/Slider/about-slide-2.webp";
import welcomeSlide3 from "../../assets/About/Slider/about-slide-3.webp";
import welcomeSlide4 from "../../assets/About/Slider/about-slide-4.webp";
import welcomeSlide5 from "../../assets/About/Slider/about-slide-5.webp";
import serviceIcon1 from "../../assets/About/Icons/about-icon-1.webp";
import serviceIcon2 from "../../assets/About/Icons/about-icon-2.webp";
import serviceIcon3 from "../../assets/About/Icons/about-icon-3.webp";
import serviceIcon4 from "../../assets/About/Icons/about-icon-4.webp";
import serviceIcon5 from "../../assets/About/Icons/about-icon-5.webp";
import serviceIcon6 from "../../assets/About/Icons/about-icon-6.webp";
import developerImg from "../../assets/About/developer-img1.webp";
import Title from "../../components/Title/Title";

const welcomeSliderImages = [
  welcomeSlide1,
  welcomeSlide2,
  welcomeSlide3,
  welcomeSlide4,
  welcomeSlide5,
];

const serviceData = [
  {
    id: 1,
    icon: serviceIcon1,
    title: "Best Prices & Offers",
    description:
      "EasyMart delivers unbeatable value with the best prices and exclusive offers on a wide range of products. Enjoy substantial savings on quality items, with deals that are regularly updated to ensure you always get the most for your money.",
  },
  {
    id: 2,
    icon: serviceIcon2,
    title: "Wide Assortment",
    description:
      "We offer a diverse selection of products to meet all your needs. From electronics to fashion, and home essentials to beauty, our extensive assortment ensures you’ll find everything you’re looking for in one place.",
  },
  {
    id: 3,
    icon: serviceIcon3,
    title: "Free Delivery",
    description:
      "Enjoy the convenience of free delivery on your purchases. No hidden costs, just straightforward, fast, and reliable service that brings your favorite products right to your doorstep.",
  },
  {
    id: 4,
    icon: serviceIcon4,
    title: "Great Daily Deal",
    description:
      "Discover incredible savings with EasyMart's Great Daily Deal, offering limited-time discounts on popular products. These daily specials provide exceptional value, making it easier than ever to snag the best deals on the items you love.",
  },
  {
    id: 5,
    icon: serviceIcon5,
    title: "100% Satisfaction",
    description:
      "EasyMart is dedicated to 100% customer satisfaction. We ensure that every shopping experience meets your expectations, with quality products and reliable service. If something isn't right, our team is here to make it right.",
  },
  {
    id: 6,
    icon: serviceIcon6,
    title: "Easy Returns",
    description:
      "Shopping here is risk-free with our easy returns policy. If you’re not completely satisfied with your purchase, returning it is a simple and hassle-free process, giving you peace of mind with every order.",
  },
];

const About = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSlide < 2) {
        setActiveSlide(activeSlide + 1);
      }
      if (activeSlide === 2) {
        setActiveSlide(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <div className="container">
      <Title text="About" />
      <div className="about-welcome">
        <div className="about-welcome-left">
          <div className="welcome-img">
            <img src={welcomeImg} alt="welcome-img" />
          </div>
        </div>
        <div className="about-welcome-right">
          <div className="about-welcome-right-text">
            <h2>Welcome to EasyMart</h2>
            <p>
              EasyMart is an ecommerce web application designed to provide a
              smooth and intuitive shopping experience. It offers a wide range
              of products, add items to their cart, and complete their purchases
              with just a few clicks. The platform ensures a seamless and secure
              shopping process, with features like user account management,
              order tracking, and various payment options to accommodate
              different customer needs.
            </p>
            <p>
              We offer a comprehensive admin panel that simplifies the
              management of products, orders. The application is built to handle
              high volumes of traffic while maintaining fast load times and
              reliable performance.
            </p>
          </div>
          <div className="about-welcome-right-slider">
            <div className="welcome-slider-container">
              {welcomeSliderImages.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`slide-item ${
                      activeSlide > 0 && index < activeSlide && "slide-hide"
                    }`}
                  >
                    <img src={item} alt="slide-img" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="about-services">
        <div className="about-title">
          <h3>Our serices</h3>
        </div>
        <div className="about-services-container">
          {serviceData.map((item) => {
            const { id, title, icon, description } = item;
            return (
              <div className="about-services-box" key={id}>
                <img src={icon} alt="services-icon" />
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="about-developer">
        <div className="about-title">
          <h3>Developer</h3>
          <div className="about-developer-container">
            <div className="about-developer-text">
              <h3>Meet our developer</h3>
              <p>
                Hello! I am Mehedi Hasan, a mern-stack developer pursuing my
                undergraduate degree in Computer Science and Engineering.
                <br /> <br />
                It is great fun for me to create modern web applications with
                the latest technologies available in tech market. I am using the
                most popular JavaScript library React for the frontend along
                with some css and component library like Bootstrap,Tailwind and
                Material UI. On the otherhand, for backend I am using NodeJs
                with the help of Express.
                <br /> As a mern stack developer, most of the time I use MongoDb
                as database for full-stack applications. But occasionally I use
                Firebase Realtime Database.
              </p>
            </div>
            <div className="about-developer-img">
              <img src={developerImg} alt="developer-img" />
              <div className="about-developer-img-text">
                <h3>Mehedi Hasan</h3>
                <p>Founder and Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
