import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DasboardPage from "./pages/dashboard/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) return redirect("/");
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.access_token) return redirect("/");
      return null;
    },
  },
  {
    path: "/",
    element: <DasboardPage />,
    loader: () => {
      if (!localStorage.access_token) return redirect("/login");
      return null;
    },
    children: [
      {
        path: "",
        element: <h1>Hello this Home</h1>,
      },
    ],
  },
]);

export default router;
