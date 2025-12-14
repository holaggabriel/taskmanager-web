import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userService } from "../services/userService";
import type { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await userService.getMyData();
        setAuthenticated(res.success);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) return <p></p>;
  if (!authenticated) return <Navigate to="/signin" />;

  return children;
};
