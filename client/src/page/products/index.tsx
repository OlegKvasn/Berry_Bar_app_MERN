import { useEffect, useState } from "react";
import style from "./products.module.scss";
import ProductCard from "../../components/product-card";
import Grid from "../../components/grid";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const { search } = useLocation();
  console.log(search);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest(
        search ? `/products${search}&sort=${sort}` : `/products?sort=${sort}`
      ).then((res) => {
        return res.data as IProduct[];
      }),
  });

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, refetch]);
  return (
    <>
      <div className={style.products}>
        <div className={style.container}>
          <span className={style.links}>Menu ⤍ Burgers</span>
          <h1>Burgers</h1>
          <div className={style.menu}>
            <div className={style.left}>Меню</div>
            <div className={style.right}>
              <span className={style.sortBy}>Сортувати за:</span>
              <span className={style.sortType}>
                {sort === "sales" ? "Найпопулярніше" : "Найновіше"}
              </span>
              <img
                src="./img/down.png"
                alt="down"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className={style.rightMenu}>
                  {sort === "sales" ? (
                    <span onClick={() => reSort("createdAt")}> Найновіше</span>
                  ) : (
                    <span onClick={() => reSort("sales")}>
                      {" "}
                      Найпопулярніше{" "}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <Grid>
            {isLoading
              ? "Завантаження"
              : error
              ? "щось пішло не так"
              : data?.map((product) => (
                  <ProductCard key={product._id} item={product} />
                ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
