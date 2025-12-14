import type { ReactNode } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"; // nueva importación
import HomePage from "./pages/HomePage";

export interface RouteType {
  path: string;
  element: ReactNode;
  requiresAuth?: boolean;
}

export const routes: RouteType[] = [
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/home", element: <HomePage />, requiresAuth: true },
];
