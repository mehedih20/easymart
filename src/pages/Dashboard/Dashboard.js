import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import AddProduct from "./AddProduct/AddProduct";
import ManageProduct from "./ManageProduct/ManageProduct";
import ManageAdmin from "./ManageAdmin/ManageAdmin";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import ManageOrders from "./ManageOrders/ManageOrders";
import MyOrders from "./MyOrders/MyOrders";
import Payment from "./Payment/Payment";
import Title from "../../components/Title/Title";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";
import Overview from "./Overview/Overview";
import ManageCategories from "./ManageCategories/ManageCategories";

const superAdminNavData = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Add Product",
    link: "/dashboard/addProduct",
  },
  {
    name: "Manage Admin",
    link: "/dashboard/manageAdmin",
  },
  {
    name: "Manage Products",
    link: "/dashboard/manageProduct",
  },
  {
    name: "Manage Orders",
    link: "/dashboard/manageOrders",
  },
  {
    name: "Manage Categories",
    link: "/dashboard/manageCategories",
  },
];

const adminNavData = superAdminNavData.filter(
  (item) => item.name !== "Manage Admin"
);

const userNavData = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "My Orders",
    link: "/dashboard/myOrders",
  },
  {
    name: "Payment",
    link: "/dashboard/payment",
  },
];

const Dashboard = () => {
  const { pathname } = useLocation();
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery(
    user.email
  );

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
                {userData?.user?.role === "owner" && (
                  <>
                    {superAdminNavData.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className={`${
                          pathname === item.link && "dashboard-nav-active"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
                {userData?.user?.role === "admin" && (
                  <>
                    {adminNavData.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className={`${
                          pathname === item.link && "dashboard-nav-active"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
                {userData?.user?.role === "user" && (
                  <>
                    {userNavData.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className={`${
                          pathname === item.link && "dashboard-nav-active"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
              </nav>
              <div className="dashboard-content">
                {pathname === "/dashboard" && <Overview />}
                {pathname === "/dashboard/addProduct" && <AddProduct />}
                {pathname === "/dashboard/manageProduct" && <ManageProduct />}
                {pathname === "/dashboard/manageAdmin" && <ManageAdmin />}
                {pathname === "/dashboard/manageCategories" && (
                  <ManageCategories />
                )}
                {pathname === "/dashboard/manageOrders" && (
                  <ManageOrders dashboardUser={userData?.user} />
                )}
                {pathname === "/dashboard/myOrders" && (
                  <MyOrders dashboardUser={userData?.user} />
                )}
                {pathname === "/dashboard/payment" && <Payment />}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
