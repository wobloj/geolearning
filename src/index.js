import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import "./index.css";
import HomePage from "./pages/HomePage";
import WorldMapPreview from "./pages/WorldMapPreview";
import Quiz from "./pages/Quiz";
import Map from "./pages/Map";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/quiz/:continent",
      element: <Quiz />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/map",
      element: <WorldMapPreview />,
      children: [
        {
          path: "/map/:continent",
          element: <Map />,
        },
      ],
    },
  ],
  {
    basename: "/geolearning",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
