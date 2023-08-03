import { useLoaderData, useParams } from "react-router-dom";

interface LoaderProductData {
  name: string;
  weight: string;
  id: string;
}
const ProductPage = () => {
  const { id } = useParams();
  const { name, weight, id: mid } = useLoaderData() as LoaderProductData;

  return (
    <>
      <h1>Product Page</h1>
      <p>Product Id: {id}</p>
      <p>
        {mid}:{name}:{weight}
      </p>
    </>
  );
};

export default ProductPage;
