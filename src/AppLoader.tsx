import { useEffect, useState, type JSX } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/userSlice";
import { userService } from "./services/userService";

export const AppLoader = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
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
    initUser();
  }, [dispatch]);

  if (loading) return <p>Cargando sesión...</p>;
  return children;
};
