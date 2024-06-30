import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import HomePage from "./pages/HomePage";
import WorldMapPreview from "./pages/WorldMapPreview";
import Quiz from "./pages/Quiz";
import Map from "./pages/Map";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import reportWebVitals from "./reportWebVitals";
import Loading from "./components/Loading";

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
      path: "/quiz",
      element: <Quiz />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/loading",
      element: <Loading />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
