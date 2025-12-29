// routes.ts
import type { ReactElement } from "react";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import Tasks from "@/pages/Tasks";
import Trash from "@/pages/Trash";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

export interface RouteType {
  path: string;
  element: ReactElement;
  requiresAuth?: boolean;
}

export const routes: RouteType[] = [
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/tasks", element: <Tasks />, requiresAuth: true },
  { path: "/trash", element: <Trash />, requiresAuth: true },
  { path: "/profile", element: <Profile />, requiresAuth: true },
  { path: "*", element: <NotFound /> },
];
