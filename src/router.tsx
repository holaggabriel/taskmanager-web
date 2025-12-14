import type { ReactNode } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"; // nueva importación
import UserListPage from "./pages/UserListPage";

export interface RouteType {
  path: string;
  element: ReactNode;
  requiresAuth?: boolean;
}

export const routes: RouteType[] = [
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/users", element: <UserListPage />, requiresAuth: true },
];
