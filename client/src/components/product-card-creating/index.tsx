import style from "./productCardCreating.module.scss";
import { INITIAL_STATE } from "../../lib/product-reducer";
import { category as categoryList } from "../../lib/data";

type TInitialState = typeof INITIAL_STATE;

const ProductCardCreating = ({
  title,
  category,
  cover,
  ingredients,
  desc,
  salePrice,
  price,
}: TInitialState) => {
  return (
    <div className={style.mainContainer}>
      <img src={cover} alt={title} />
      <div className={style.info}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.desc}>Інгредієнти: {ingredients}</p>
        <p className={style.desc}>Опис: {desc}</p>
      </div>
      <hr />
      <div className={style.details}>
        <div className={style.price}>
          <span>Категорія</span>
          <h2 className={style.cat}>
            {categoryList.find(({ value }) => value === category)?.name}
          </h2>
        </div>
        <div className={style.price}>
          <span>Ціна зі знижкою</span>
          <h2>${salePrice}</h2>
        </div>
        <div className={style.price}>
          <span>Ціна</span>
          <h2>${price}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCreating;
