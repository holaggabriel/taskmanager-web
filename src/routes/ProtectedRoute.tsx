// ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser, clearUser } from "../redux/userSlice";
import { userService } from "../services/userService";
import type { JSX } from "react/jsx-runtime";
import type { RootState } from "../redux/store";

interface Props { children: JSX.Element; }

export const ProtectedRoute = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (location.pathname !== "/tasks") {
        setLoading(false); // no hacemos fetch en otras rutas
        return;
      }

      try {
        const res = await userService.getMyData();
        if (res.success && res.user) {
          dispatch(setUser(res.user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [dispatch, location.pathname]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/signin" />;

  return children;
};
