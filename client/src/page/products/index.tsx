import { useEffect, useState, Fragment } from "react";
import style from "./products.module.scss";
import ProductCard from "../../components/product-card";
import Grid from "../../components/grid";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";
import { category } from "../../lib/data";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingDots from "../../components/loading";

const pattern = /(?:category+)/;

const ProductsPage = () => {
  const [sort, setSort] = useState("createdAt");
  const { search } = useLocation();
  const { t, i18n } = useTranslation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest(
        search ? `/products${search}&sort=${sort}` : `/products?sort=${sort}`
      ).then((res) => {
        return res.data as IProduct[];
      }),
  });

  useEffect(() => {
    refetch();
  }, [sort, search, refetch]);
  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : error ? (
        "щось пішло не так"
      ) : (
        <main className={style.container}>
          <nav className={style.menu}>
            <div className={style.left}>
              {pattern.test(search) ? (
                <>
                  <Link to="/products">{t("products.menu")}</Link>
                  {i18n.language === "en" ? (
                    <span className={style.cat}>{` ⤍  ${
                      category.find(({ value }) => value === search.slice(10))
                        ?.name_en
                    }`}</span>
                  ) : (
                    <span className={style.cat}>{` ⤍  ${
                      category.find(({ value }) => value === search.slice(10))
                        ?.name
                    }`}</span>
                  )}
                </>
              ) : null}
            </div>
            <div className={style.right}>
              <span className={style.sortBy}>{t("products.sort_by")}</span>
              <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
                <Select defaultValue="createdAt" id="sort">
                  <MenuItem
                    value="createdAt"
                    onClick={() => setSort("createdAt")}
                  >
                    {t("products.new_first")}
                  </MenuItem>
                  <MenuItem value="sales" onClick={() => setSort("sales")}>
                    {t("products.most_popular")}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </nav>
          {category.map((cat) => (
            <Fragment key={cat.value}>
              {!search ? (
                <h1>{i18n.language === "en" ? cat.name_en : cat.name}</h1>
              ) : null}
              <Grid>
                {data
                  ?.filter((prod) => prod.category === cat.value)
                  .map((product) => (
                    <ProductCard key={product._id} item={product} />
                  ))}
              </Grid>
            </Fragment>
          ))}
        </main>
      )}
    </>
  );
};

export default ProductsPage;
