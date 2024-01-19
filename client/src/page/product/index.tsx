// import { useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import style from "./product.module.scss";
import { useParams } from "react-router-dom";
import Reviews from "../../components/reviews";
import { newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import { addToCart } from "../../lib/redux/cart-slice";
import { useTranslation } from "react-i18next";
import LoadingDots from "../../components/loading";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      newRequest(`/products/${id}`).then((res) => {
        return res.data as IProduct;
      }),
  });

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={style.product}>
      {isLoading ? (
        <LoadingDots />
      ) : error ? (
        "Щось пішло не так"
      ) : (
        <div className={style.mainContainer}>
          <div className={style.left}>
            <span className={style.links}>Menu ⤍ Burgers</span>
            <h1>{i18n.language === "en" ? data?.title_en : data?.title}</h1>
            <img
              className={style.mainImage}
              src={data?.cover}
              alt={`${data?.title} image`}
            />
            {data && !isNaN(data.totalStars / data.starNumber) ? (
              <div className={style.stars}>
                {Array(Math.round(data.totalStars / data.starNumber))
                  .fill(1)
                  .map((item, i) => (
                    <img src="/img/star.png" alt="star" key={`${i}${item}`} />
                  ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
              </div>
            ) : null}
            {i18n.language === "en" ? IngredientsEn(data) : IngredientsUk(data)}
            <p className={style.desc}>
              {i18n.language === "en" ? data?.desc_en : data?.desc}
            </p>
            <Reviews productId={id} />
          </div>
          <div className={style.right}>
            <div className={style.price}>
              <h3>{i18n.language === "en" ? data?.title_en : data?.title}</h3>
              <h2>{`${data?.price} ₴`}</h2>
            </div>
            {data ? (
              <button onClick={() => handleAddToCart(data)}>
                {t("product.add_btn")}
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

const IngredientsUk = (product: IProduct | undefined) => {
  if (!product) return null;
  if (!product.ingredients) return null;
  if (product.ingredients.length < 1) return null;

  return (
    <>
      <h2>Склад:</h2>
      {product.ingredients.map((ing: string, ind) => (
        <p className={style.desc} key={`${ind}${ing}`}>
          {ing}
        </p>
      ))}
    </>
  );
};

const IngredientsEn = (product: IProduct | undefined) => {
  if (!product) return null;
  if (!product.ingredients_en) return null;
  if (product.ingredients_en.length < 1) return null;

  return (
    <>
      <h2>Ingredients:</h2>
      {product.ingredients_en.map((ing: string, ind) => (
        <p className={style.desc} key={`${ind}${ing}`}>
          {ing}
        </p>
      ))}
    </>
  );
};

// interface LoaderProductData {
//   name: string;
//   weight: string;
//   id: string;
// }
// const ProductPage = () => {
//   const { id } = useParams();
//   const { name, weight, id: mid } = useLoaderData() as LoaderProductData;

//   return (
//     <>
//       <h1>Product Page</h1>
//       <p>Product Id: {id}</p>
//       <p>
//         {mid}:{name}:{weight}
//       </p>
//     </>
//   );
// };

export default ProductPage;
