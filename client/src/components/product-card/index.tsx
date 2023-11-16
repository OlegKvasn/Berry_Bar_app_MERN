import { Link } from "react-router-dom";
import style from "./productCard.module.scss";
import Grid from "../grid";
import { IProduct } from "../../lib/types";

const ProductCard = ({ item }: { item: IProduct }) => {
  return (
    <Grid.Item>
      <Link to={`/product/${item._id}`}>
        <div className={style.mainContainer}>
          <img src={item.cover} alt={item.title} />
          <div className={style.info}>
            <h3 className={style.title}>{item.title}</h3>
            <p className={style.desc}>{item.desc}</p>
            <div className={style.star}>
              <img src="./img/star.png" alt="star" />
              <span>
                {!isNaN(item.totalStars / item.starNumber) &&
                  Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>
          </div>
          <hr />
          <div className={style.details}>
            <img src="./img/heart.png" alt="star" />
            <div className={style.price}>
              <span>Від</span>
              <h2>${item.price}</h2>
            </div>
          </div>
        </div>
      </Link>
    </Grid.Item>
  );
};

export default ProductCard;
