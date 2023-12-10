import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/pages/App";
import Task from "./components/pages/Task";
import Contact from "./components/pages/Contact";
import DashboardHome from "./components/pages/DashboardHome";
import Users from "./components/pages/Users";
import Settings from "./components/pages/Settings";
import UserDetails from "./components/pages/UserDetails";
import UserList from "./components/pages/UserList";
import Login from "./components/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tasks",
    element: <Task />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
    children: [
      {
        path: "/dashboard",
        element: <Users />,
        children: [
          {
            path: "",
            element: <UserList />
          },
          {
            path: "/dashboard/:matthew",
            element: <UserDetails />,
          }
        ]
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
