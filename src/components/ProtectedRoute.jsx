import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(Authcontext);
  //first job is to make the page wait until loading is false
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
