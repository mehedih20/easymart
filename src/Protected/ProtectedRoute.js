import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext";
import ReactLoader from "../components/ReactLoading/ReactLoader";

const ProtectedRoute = ({ children }) => {
  const { firebase } = useGlobalContext();
  const { user, reloadLoading } = firebase;
  const location = useLocation();

  if (reloadLoading) {
    <ReactLoader type={"spin"} color={"red"} />;
    return;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
