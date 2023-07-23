import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext";

const ProtectedRoute = ({ children }) => {
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
