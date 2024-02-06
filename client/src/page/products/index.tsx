import { useEffect, useState, Fragment } from "react";
import style from "./products.module.scss";
import ProductCard from "../../components/product-card";
import Grid from "../../components/grid";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { IProduct, IUser } from "../../lib/types";
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
  const currentUser = getCurrentUser();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest(
        search ? `/products${search}&sort=${sort}` : `/products?sort=${sort}`
      ).then((res) => {
        return res.data as IProduct[];
      }),
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest(`/users/${currentUser._id}`).then((res) => {
        return res.data as IUser;
      }),
    enabled: !!currentUser.username,
  });

  const isFavorite = (product: IProduct, user: IUser | undefined) => {
    if (!user) return false;
    const favorite = user.favorite?.find((e) => e == product._id);
    if (favorite) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    refetch();
  }, [sort, search, refetch]);

  if (isLoading) return <LoadingDots />;

  if (error) return "щось пішло не так";

  return (
    <article className={style.container}>
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
                  category.find(({ value }) => value === search.slice(10))?.name
                }`}</span>
              )}
            </>
          ) : null}
        </div>
        <div className={style.right}>
          <span className={style.sortBy}>{t("products.sort_by")}</span>
          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <Select defaultValue="createdAt" id="sort">
              <MenuItem value="createdAt" onClick={() => setSort("createdAt")}>
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
                <ProductCard
                  key={product._id}
                  item={product}
                  favorite={isFavorite(product, user)}
                />
              ))}
          </Grid>
        </Fragment>
      ))}
    </article>
  );
};

export default ProductsPage;
