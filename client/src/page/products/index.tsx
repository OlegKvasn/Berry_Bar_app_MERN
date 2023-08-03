import { useEffect, useState } from "react";
import { Product as ProductModel } from "../../types/models";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:5000/api/products/", {
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
  return (
    <>
      <div>{JSON.stringify(products)}</div>
      <Link to="/product/1">Pizza Hut</Link>
    </>
  );
};

export default ProductsPage;
