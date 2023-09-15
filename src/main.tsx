import React from "react";
import ReactDOM from "react-dom/client";

import Signin from "./pages/Signin.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
