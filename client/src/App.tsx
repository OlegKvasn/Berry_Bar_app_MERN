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
import RegisterPage from "./page/register";
import OrdersPage from "./page/orders";
import AddEditProductPage from "./page/add-edit-product";
import CartPage from "./page/cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsAdminPage from "./page/products-admin";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    const { state } = useNavigation();
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        {state === "loading" ? <div role="loader">Loading</div> : null}
        <Outlet />
        <Footer />
      </QueryClientProvider>
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
