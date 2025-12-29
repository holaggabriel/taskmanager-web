// PublicRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface Props { children: JSX.Element; }

export const PublicRoute = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // Solo redirige si el usuario está logueado y está en ruta pública
  const publicPaths = ["/signin", "/signup"];
  if (user && publicPaths.includes(location.pathname)) {
    return <Navigate to="/tasks" />;
  }

  return children;
};
