import React from "react";
import ReactDOM from "react-dom/client";

import Signin from "./pages/Signin.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider, PrivateComponent } from "./AuthProvider.tsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: (
      <PrivateComponent>
        <LandingPage />
      </PrivateComponent>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
