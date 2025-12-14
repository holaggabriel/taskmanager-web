import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
