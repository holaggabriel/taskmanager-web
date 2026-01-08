// ProtectedRoute.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import type { RootState } from "../redux/store";

interface Props { children: JSX.Element; }

export const ProtectedRoute = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  useEffect(() => {
  }, [dispatch, location.pathname]);

  if (!user) return <Navigate to="/signin" />;

  return children;
};
