import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import ProductsPage from "./page/products";
import Navbar from "./components/header";
import Footer from "./components/footer";
import ErrorPage from "./page/error-page";
import ProductPage from "./page/product";
// import { fetchProduct } from "./utils/fetchProduct";
import LoginPage from "./page/login";
import HomePage from "./page/home";
//import RegisterPage from "./page/register";
import OrdersPage from "./page/orders";
import AddEditProductPage from "./page/add-edit-product";
import CartPage from "./page/cart";
import ProductsAdminPage from "./page/products-admin";
import CheckOutPage from "./page/check-out";
import RegisterHookFormPage from "./page/register-hook-form";
import "./lib/i18n";

function App() {
  const Layout = () => {
    const { state } = useNavigation();
    return (
      <>
        <Navbar />
        {state === "loading" ? <div role="loader">Loading</div> : null}
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/orders",
          element: <OrdersPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/check-out",
          element: <CheckOutPage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/products-admin",
          element: <ProductsAdminPage />,
        },
        {
          path: "/add-product",
          element: <AddEditProductPage />,
        },
        {
          path: "/edit-product/:id",
          element: <AddEditProductPage />,
        },
        {
          path: "/product/:id",
          element: <ProductPage />,
          // loader: fetchProduct,
        },
        {
          path: "/register",
          element: <RegisterHookFormPage />,
        },
        // {
        //   path: "/register",
        //   element: <RegisterPage />,
        // },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
