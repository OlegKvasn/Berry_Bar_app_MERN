import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import ProductsPage from "./page/products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./page/errorPage";
// import ProductPage from "./page/product";
// import { fetchProduct } from "./utils/fetchProduct";
import LoginPage from "./page/login";
import HomePage from "./page/home";
import RegisterPage from "./page/register";
import OrdersPage from "./page/orders";
import AddProductPage from "./page/addProduct";

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
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/add-product",
          element: <AddProductPage />,
        },
        // {
        //   path: "/product/:id",
        //   element: <ProductPage />,
        //   loader: fetchProduct,
        // },
        {
          path: "/register",
          element: <RegisterPage />,
        },
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
