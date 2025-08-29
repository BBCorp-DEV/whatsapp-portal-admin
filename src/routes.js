import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: DashboardLayout,
    component: lazy(() => import("src/Auth/Login/LoginPage")),
  },
 
 
  {
    component: () => <Redirect to="/404" />,
  },
];
