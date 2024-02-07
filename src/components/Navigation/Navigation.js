/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import headerlogo from "../../assets/EasyMart-logo.webp";
import {
  BsCartCheck,
  BsCart,
  BsChevronDown,
  BsHeadphones,
} from "react-icons/bs";
import {
  AiOutlineLogin,
  AiOutlineSearch,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import CategoriesHover from "../CategoriesHover/CategoriesHover";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";
import { toast } from "sonner";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSkip, setIsSkip] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { firebase } = useGlobalContext();
  const { auth, signOut, user, setUser } = firebase;
  const { pathname } = useLocation();
  const { data } = useGetProductsQuery(
    [{ name: "searchTerm", value: searchText }],
    { skip: isSkip }
  );
  const { data: userData } = useGetSingleUserQuery(user?.email);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign out successful");
      })
      .catch((error) => console.log(error));
    setUser(null);
    navigate("/");
  };

  const handleNavigateSearchItem = (id) => {
    navigate(`/product/${id}`);
    setSearchText("");
  };

  const onChange = (e) => {
    if (e.target.value !== "") {
      setSearchText(e.target.value);
      setIsSkip(false);
    } else {
      setSearchText(e.target.value);
      setIsSkip(true);
    }
  };

  useEffect(() => {
    let linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showNavigation) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showNavigation]);

  return (
    <header>
      <div className="container">
        <div className="header-top">
          <div className="header-top-left">
            <img src={headerlogo} alt="header-logo" />
            <div className="header-top-search">
              <input
                type="search"
                placeholder="Search for items.."
                value={searchText}
                onChange={onChange}
              />
              <button>
                <AiOutlineSearch />
              </button>
              {data?.products && (
                <div
                  className={`header-top-search-result ${
                    !searchText && "display-none"
                  }`}
                >
                  {data.products.data.map((item) => {
                    return (
                      <div>
                        <img src={item.imgUrl} alt="" height="80" width="60" />
                        <p onClick={() => handleNavigateSearchItem(item._id)}>
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="header-top-right">
            {!(
              userData?.user?.role === "owner" ||
              userData?.user?.role === "admin"
            ) && (
              <button onClick={() => navigate("/cart")}>
                {isCartEmpty ? <BsCart /> : <BsCartCheck />} Cart
              </button>
            )}
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
            <div className="header-nav-left-btn-container">
              <button
                className="header-nav-left-btn"
                style={{ color: "var(--color-primary)" }}
                onClick={() => setShowCategories(!showCategories)}
              >
                <BiCategory style={{ marginRight: "1rem" }} /> Categories{" "}
                <BsChevronDown />{" "}
                <CategoriesHover showCategories={showCategories} />
              </button>
              <button
                className={`${showNavigation && "nav-btn-rotate"}`}
                onClick={() => setShowNavigation(!showNavigation)}
              >
                <GiHamburgerMenu />
              </button>
            </div>
            <div
              className="header-nav-left-link-container"
              ref={linksContainerRef}
            >
              <ul className="header-nav-left-links" ref={linksRef}>
                <NavLink
                  className={`${pathname === "/" && "color-primary"}`}
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={`${pathname === "/products" && "color-primary"}`}
                  to="/products"
                >
                  Products
                </NavLink>
                <NavLink
                  className={`${pathname === "/about" && "color-primary"}`}
                  to="/about"
                >
                  About
                </NavLink>
                <NavLink
                  className={`${pathname === "/contact" && "color-primary"}`}
                  to="/contact"
                >
                  Contact
                </NavLink>
                {user && (
                  <NavLink
                    className={`${
                      pathname === "/dashboard" && "color-primary"
                    }`}
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                )}
              </ul>
            </div>
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
