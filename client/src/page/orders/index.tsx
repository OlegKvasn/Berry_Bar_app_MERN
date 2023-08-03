import { useEffect, useState } from "react";
import { Product } from "../../types/models";

const OrdersPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:5000/api/orders/", {
          method: "GET",
        });
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    }
    loadProducts();
  }, []);
  return <div>{JSON.stringify(products)}</div>;
};

export default OrdersPage;
