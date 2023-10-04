import { createBrowserRouter } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import RootPage from "../pages/RootPage";
import SingleProductPage from "../pages/SingleProductPage";
import CartPage from "../pages/CartPage";
import UsersPage from "../pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProductsPage />,
      },
      {
        path: "products/:productId",
        element: <SingleProductPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
