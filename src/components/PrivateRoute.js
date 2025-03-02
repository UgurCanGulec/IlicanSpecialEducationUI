import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("token");
  return isAuthenticated && token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
