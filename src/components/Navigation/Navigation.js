import React, { useState } from "react";
import headerlogo from "../../assets/EasyMart-logo.webp";
import {
  BsCartCheck,
  BsCart,
  BsChevronDown,
  BsFire,
  BsHeadphones,
} from "react-icons/bs";
import {
  AiOutlineLogin,
  AiOutlineSearch,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import CategoriesHover from "../CategoriesHover/CategoriesHover";
import useGlobalContext from "../../hooks/useGlobalContext";

const Navigation = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { firebase } = useGlobalContext();
  const { auth, signOut, user, setUser } = firebase;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <div className="header-top">
          <div className="header-top-left">
            <img src={headerlogo} alt="header-logo" />
            <div className="header-top-search">
              <input type="search" placeholder="Search for items.." />
              <button>
                <AiOutlineSearch />
              </button>
            </div>
          </div>
          <div className="header-top-right">
            <button onClick={() => navigate("/cart")}>
              {isCartEmpty ? <BsCart /> : <BsCartCheck />} Cart
            </button>
            {user ? (
              <button onClick={handleLogout}>
                <AiOutlineLogout /> Log out
              </button>
            ) : (
              <button onClick={() => navigate("/login")}>
                <AiOutlineLogin /> Login / Sign up
              </button>
            )}
            {user && <p>{user.name}</p>}
          </div>
        </div>
        <nav className="header-nav">
          <div className="header-nav-left">
            <button
              className="header-nav-left-btn"
              style={{ color: "var(--color-primary)" }}
              onClick={() => setShowCategories(!showCategories)}
            >
              <BiCategory style={{ marginRight: "1rem" }} /> Categories{" "}
              <BsChevronDown />{" "}
              <CategoriesHover showCategories={showCategories} />
            </button>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/deals">
              <BsFire className="deal-icon" /> Deals
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          </div>
          <div className="header-nav-right">
            <BsHeadphones />
            <div className="header-nav-right-text">
              <p>+123-444-555</p>
              <small>24/7 Support Center</small>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
