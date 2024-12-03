import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorPage } from "@/pages/errorPage.jsx";
import { ElvesPage } from "@/pages/elvesPage.jsx";
import { ReindeerPage } from "@/pages/reindeerPage.jsx";
import { CaloriesPage } from "@/pages/caloriesPage.jsx";
import { DashboardPage } from "@/pages/dashboardPage";
import { RoutesPage } from "@/pages/routesPage";
import { ChillZone } from "@/pages/chillZone";
import { Letters } from "@/pages/letters";
import ChildrenPage from "@/pages/childrenPage.jsx";
import App from "./App.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/elves",
        element: <ElvesPage />,
      },
      {
        path: "/reindeer",
        element: <ReindeerPage />,
      },
      {
        path: "/calories",
        element: <CaloriesPage />,
      },
      {
        path: "/navcards",
        element: <Letters />,
      },
      {
        path: "/santaroutes",
        element: <RoutesPage />,
      },
      {
        path: "/chillzone",
        element: <ChillZone />,
      },
      {
        path: "/children",
        element: <ChildrenPage /> ,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
