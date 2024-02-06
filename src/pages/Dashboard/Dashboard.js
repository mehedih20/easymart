import React from "react";
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
import { useGetProductsQuery } from "../../redux/features/products/productsApi";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

const Dashboard = () => {
  const loaction = useLocation();
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery(
    user.email
  );
  const { data, isLoading: dataLoading } = useGetProductsQuery([
    { name: "limit", value: 0 },
  ]);

  let productData = [];
  if (data?.products) {
    productData = [...data?.products?.data].reverse().slice(0, 4);
  }

  return (
    <>
      <div className="container">
        <Title text="Dashboard" />
        {userLoading && (
          <div style={{ textAlign: "center", margin: "10rem 0" }}>
            <ReactLoader type={"spin"} color={"red"} />
          </div>
        )}
        <div className="dashboard">
          {!userLoading && (
            <>
              <nav className="dashboard-nav">
                {userData?.user.role === "owner" && (
                  <>
                    <Link to="/dashboard/addProduct">Add Product</Link>
                    <Link to="/dashboard/manageAdmin">Manage Admin</Link>
                    <Link to="/dashboard/manageProduct">Manage Products</Link>
                    <Link to="/dashboard/manageOrders">Manage Orders</Link>
                  </>
                )}
                {userData?.user.role === "admin" && (
                  <>
                    <Link to="/dashboard/addProduct">Add Product</Link>
                    <Link to="/dashboard/manageProduct">Manage Products</Link>
                    <Link to="/dashboard/manageOrders">Manage Orders</Link>
                  </>
                )}
                {userData?.user.role === "user" && (
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
                      {!dataLoading && (
                        <ShowProducts
                          page={"dashboard"}
                          title={"Recently added"}
                          products={productData}
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
                  <ManageOrders dashboardUser={userData?.user} />
                )}
                {loaction.pathname === "/dashboard/myOrders" && (
                  <MyOrders dashboardUser={userData?.user} />
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
