import { createBrowserRouter } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import RootPage from "../pages/RootPage";
import SingleProductPage from "../pages/SingleProductPage";

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
    ],
  },
]);

export default router;
