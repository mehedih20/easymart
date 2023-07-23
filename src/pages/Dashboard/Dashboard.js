import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import AddProduct from "./AddProduct/AddProduct";
import ManageProduct from "./ManageProduct/ManageProduct";
import ManageAdmin from "./ManageAdmin/ManageAdmin";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../../components/ReactLoading/ReactLoader";

const Dashboard = () => {
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const loaction = useLocation();

  return (
    <div className="dashboard container">
      <nav className="dashboard-nav">
        <Link to="/dashboard/addProduct">Add Product</Link>
        <Link to="/dashboard/manageAdmin">Manage Admin</Link>
        <Link to="/dashboard/manageProduct">Manage Products</Link>
      </nav>
      <div className="dashboard-content">
        {loaction.pathname === "/dashboard" && (
          <div className="dasboard-welcome">
            <h2>
              Welcome to your dashboard <span>{user.name}</span> !
            </h2>
          </div>
        )}
        {loaction.pathname === "/dashboard/addProduct" && <AddProduct />}
        {loaction.pathname === "/dashboard/manageProduct" && <ManageProduct />}
        {loaction.pathname === "/dashboard/manageAdmin" && <ManageAdmin />}
      </div>
    </div>
  );
};

export default Dashboard;
