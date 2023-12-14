import { createBrowserRouter } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import RootPage from "../pages/RootPage";
import SingleProductPage from "../pages/SingleProductPage";
import CartPage from "../pages/CartPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import OrdersPage from "../pages/OrdersPage";
import ProtectedRoute from "./protectedRoute";
import ProtectedRouteAdmin from "./protectedRouteAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProductsPage />,
      },
      {
        path: "products/:productId",
        element: <ProtectedRoute page={SingleProductPage} />,
      },
      {
        path: "dashboard",
        element: <ProtectedRouteAdmin page={DashboardPage}/>,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "profile",
        element: <ProtectedRoute page={ProfilePage}/>,
      },
      {
        path: "orders",
        element: <ProtectedRoute page={OrdersPage}/>,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
