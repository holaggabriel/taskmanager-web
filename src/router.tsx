// routes.ts
import type { ReactElement } from "react";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";
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

  { path: "/home", element: <HomePage />, requiresAuth: true },
  { path: "/tasks", element: <Tasks />, requiresAuth: true },
  { path: "/trash", element: <Trash />, requiresAuth: true },
  { path: "/profile", element: <Profile />, requiresAuth: true },

  { path: "*", element: <NotFound /> },
];
