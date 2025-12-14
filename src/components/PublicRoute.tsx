// PublicRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import type { RootState } from "../redux/store";

interface Props { children: JSX.Element; }

export const PublicRoute = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (user) return <Navigate to="/home" />;
  return children;
};
