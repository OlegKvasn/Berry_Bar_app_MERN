import axios from "axios";
import { baseURL } from "./utils";
import { IProduct } from "./types";
import { useEffect, useState } from "react";

// not used
export const useValidateProduct = (id: string | undefined) => {
  const [validProduct, setValidProduct] = useState<IProduct | undefined>(
    undefined
  );

  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${baseURL}products`);
          const data = res.data as IProduct[];
          const vID = data?.find(({ _id }) => _id === id);
          setValidProduct(vID);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProducts();
    }
  }, [id]);

  return validProduct;
};
