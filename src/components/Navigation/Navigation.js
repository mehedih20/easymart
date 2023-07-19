import React, { useState } from "react";
import headerlogo from "../../assets/EasyMart_logo.png";
import { BsCartCheck, BsCart, BsChevronDown } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import CategoriesHover from "../CategoriesHover/CategoriesHover";

const Navigation = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

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
            <button onClick={() => navigate("/login")}>
              <AiOutlineLogin /> Login
            </button>
          </div>
        </div>
        <nav className="header-nav">
          <button
            style={{ color: "var(--color-primary)" }}
            onClick={() => setShowCategories(!showCategories)}
          >
            Categories <BsChevronDown />{" "}
            <CategoriesHover showCategories={showCategories} />
          </button>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/deals">Deals</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
