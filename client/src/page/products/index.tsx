import { useEffect, useState } from "react";
import style from "./products.module.scss";
import ProductCard from "../../components/product-card";
import Grid from "../../components/grid";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";
import { category } from "../../lib/data";

const pattern = /(?:category+)/;

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const { search } = useLocation();

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
  }, [sort, search, refetch]);
  return (
    <>
      <main className={style.container}>
        <nav className={style.menu}>
          <div className={style.left}>
            {pattern.test(search) ? (
              <>
                <Link to="/products">Menu</Link>
                <span className={style.cat}>{` ⤍ ${
                  category.find(({ value }) => value === search.slice(10))?.name
                }`}</span>
              </>
            ) : null}
          </div>
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
                  <span onClick={() => reSort("sales")}> Найпопулярніше </span>
                )}
              </div>
            )}
          </div>
        </nav>
        {!pattern.test(search) ? <h1>Pizza (temp)</h1> : null}
        <Grid>
          {isLoading
            ? "Завантаження"
            : error
            ? "щось пішло не так"
            : data?.map((product) => (
                <ProductCard key={product._id} item={product} />
              ))}
        </Grid>
      </main>
    </>
  );
};

export default ProductsPage;
