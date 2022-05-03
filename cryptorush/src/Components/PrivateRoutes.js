import React from "react";
import { Navigate } from "react-router-dom";

import { UserAuth } from "../firebase/Auth";

const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();
  if (!currentUser) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
