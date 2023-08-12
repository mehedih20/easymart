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

const Dashboard = () => {
  const [dasboardLoading, setDashboardLoading] = useState(true);
  const [dashboardUser, setDashboardUser] = useState(null);
  const [newProduct, setNewProduct] = useState([]);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const loaction = useLocation();
  // console.log(user);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.reverse().slice(0, 4);
        setNewProduct(newData);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const dbUser = data.filter((item) => item.email === user.email);
        setDashboardUser(dbUser[0]);
        setDashboardLoading(false);
        console.log(dashboardUser);
      });
  }, []);

  return (
    <>
      {dasboardLoading && (
        <div style={{ textAlign: "center", margin: "10rem 0" }}>
          <ReactLoader type={"spin"} color={"red"} />
        </div>
      )}

      <div className="dashboard container">
        {dashboardUser && (
          <>
            <nav className="dashboard-nav">
              {dashboardUser.role === "admin" ? (
                <>
                  <Link to="/dashboard/addProduct">Add Product</Link>
                  <Link to="/dashboard/manageAdmin">Manage Admin</Link>
                  <Link to="/dashboard/manageProduct">Manage Products</Link>
                  <Link to="/dashboard/manageOrders">Manage Orders</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard/manageOrders">My Orders</Link>
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
              {loaction.pathname === "/dashboard/addProduct" && <AddProduct />}
              {loaction.pathname === "/dashboard/manageProduct" && (
                <ManageProduct />
              )}
              {loaction.pathname === "/dashboard/manageAdmin" && (
                <ManageAdmin />
              )}
              {loaction.pathname === "/dashboard/manageOrders" && (
                <ManageOrders />
              )}
              {loaction.pathname === "/dashboard/myOrders" && <MyOrders />}
              {loaction.pathname === "/dashboard/payment" && <Payment />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
