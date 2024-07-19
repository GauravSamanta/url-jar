import { useContext } from "react";
import { UserContext } from "../utils/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { user } = useContext(UserContext);
  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/login"></Navigate>;
}
