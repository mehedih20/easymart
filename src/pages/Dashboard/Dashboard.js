import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import AddProduct from "./AddProduct/AddProduct";
import ManageProduct from "./ManageProduct/ManageProduct";
import ManageAdmin from "./ManageAdmin/ManageAdmin";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import ManageOrders from "./ManageOrders/ManageOrders";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import MyOrders from "./MyOrders/MyOrders";
import Payment from "./Payment/Payment";
import Title from "../../components/Title/Title";

const Dashboard = () => {
  const [dasboardLoading, setDashboardLoading] = useState(true);
  const [dashboardUser, setDashboardUser] = useState(null);
  const [newProduct, setNewProduct] = useState([]);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const loaction = useLocation();

  useEffect(() => {
    fetch("https://easy-mart-server-sandy.vercel.app/products")
      .then((res) => res.json())
      .then((result) => {
        const newData = result.products.data.reverse().slice(0, 4);
        setNewProduct(newData);
      });
  }, []);

  useEffect(() => {
    fetch(`https://easy-mart-server-sandy.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardUser(data.user[0]);
        setDashboardLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container">
        <Title text="Dashboard" />
        {dasboardLoading && (
          <div style={{ textAlign: "center", margin: "10rem 0" }}>
            <ReactLoader type={"spin"} color={"red"} />
          </div>
        )}
        <div className="dashboard">
          {dashboardUser && (
            <>
              <nav className="dashboard-nav">
                {dashboardUser?.role === "owner" && (
                  <>
                    <Link to="/dashboard/addProduct">Add Product</Link>
                    <Link to="/dashboard/manageAdmin">Manage Admin</Link>
                    <Link to="/dashboard/manageProduct">Manage Products</Link>
                    <Link to="/dashboard/manageOrders">Manage Orders</Link>
                  </>
                )}
                {dashboardUser?.role === "admin" && (
                  <>
                    <Link to="/dashboard/addProduct">Add Product</Link>
                    <Link to="/dashboard/manageProduct">Manage Products</Link>
                    <Link to="/dashboard/manageOrders">Manage Orders</Link>
                  </>
                )}
                {dashboardUser?.role === "user" && (
                  <>
                    <Link to="/dashboard/myOrders">My Orders</Link>
                    <Link to="/dashboard/payment">Payment</Link>
                  </>
                )}
              </nav>
              <div className="dashboard-content">
                {loaction.pathname === "/dashboard" && (
                  <>
                    <div className="dasboard-welcome">
                      <h2>
                        Welcome to your dashboard <span>{user.name}</span> !
                      </h2>
                    </div>
                    <div>
                      {newProduct && (
                        <ShowProducts
                          page={"dashboard"}
                          title={"Recently added"}
                          products={newProduct}
                        />
                      )}
                    </div>
                  </>
                )}
                {loaction.pathname === "/dashboard/addProduct" && (
                  <AddProduct />
                )}
                {loaction.pathname === "/dashboard/manageProduct" && (
                  <ManageProduct />
                )}
                {loaction.pathname === "/dashboard/manageAdmin" && (
                  <ManageAdmin />
                )}
                {loaction.pathname === "/dashboard/manageOrders" && (
                  <ManageOrders dashboardUser={dashboardUser} />
                )}
                {loaction.pathname === "/dashboard/myOrders" && (
                  <MyOrders dashboardUser={dashboardUser} />
                )}
                {loaction.pathname === "/dashboard/payment" && <Payment />}
              </div>
            </>
          )}
          <div />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
