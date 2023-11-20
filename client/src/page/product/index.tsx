// import { useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import style from "./product.module.scss";
import { useParams } from "react-router-dom";
import Reviews from "../../components/reviews";
import { newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";

const ProductPage = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      newRequest(`/products/${id}`).then((res) => {
        return res.data as IProduct;
      }),
  });

  return (
    <div className={style.product}>
      {isLoading ? (
        "Завантажується"
      ) : error ? (
        "Щось пішло не так"
      ) : (
        <div className={style.mainContainer}>
          <div className={style.left}>
            <span className={style.links}>Menu ⤍ Burgers</span>
            <h1>{data?.title}</h1>
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
            <h2>Склад:</h2>
            {data?.ingredients
              ? data?.ingredients.map((ing: string, ind) => (
                  <p className={style.desc} key={`${ind}${ing}`}>
                    {ing}
                  </p>
                ))
              : null}
            {data?.desc ? <p className={style.desc}>{data?.desc}</p> : null}
            <Reviews productId={id} />
          </div>
          <div className={style.right}>
            <div className={style.price}>
              <h3>{data?.title}</h3>
              <h2>{`${data?.price} ₴`}</h2>
            </div>
            <button>Додати до замовлення</button>
          </div>
        </div>
      )}
    </div>
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
