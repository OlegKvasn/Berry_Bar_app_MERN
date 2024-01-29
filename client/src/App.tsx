import style from "./app.module.scss";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
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
import Cart from "./components/cart";
import ProductsAdminPage from "./page/products-admin";
import CheckOutPage from "./page/check-out";
import RegisterHookFormPage from "./page/register-hook-form";
import "./lib/i18n";
import { getCartState } from "./lib/redux/open-cart-slice";
import { useSelector } from "react-redux";

function App() {
  const Layout = () => {
    const isOpenCart = useSelector(getCartState);
    const { state } = useNavigation();

    return (
      <>
        <ScrollRestoration />
        <Navbar />
        {state === "loading" ? <div role="loader">Loading</div> : null}

        <main
          className={style.mainContent}
          data-cart={isOpenCart ? "open" : "close"}
        >
          <Outlet />
          <Cart />
          <Footer />
        </main>
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
