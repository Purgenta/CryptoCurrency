import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { authenticationSelector } from "../redux/authSlice/authSlice";
const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(authenticationSelector);
  if (!isAuthenticated) return <Navigate to={"/notauthenticated"}></Navigate>;
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
