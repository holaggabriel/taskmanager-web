import type { ReactNode } from "react";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";

export interface RouteType {
  path: string;
  element: ReactNode;
  requiresAuth?: boolean;
}

export const routes: RouteType[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/users", element: <UserListPage />, requiresAuth: true },
];
