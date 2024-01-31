import { Link } from "react-router-dom";
import style from "./productCard.module.scss";
import Grid from "../grid";
import { IProduct } from "../../lib/types";
import { useTranslation } from "react-i18next";
import CustomButton from "../../UI/button";
import { MouseEvent } from "react";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import { addToCart, getCartProducts } from "../../lib/redux/cart-slice";
import { useSelector } from "react-redux";
import AmountButtons from "../../UI/amount-buttons";

const ProductCard = ({ item }: { item: IProduct }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const cartProducts = useSelector(getCartProducts);

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addToCart(item));
  };

  const productInCart = cartProducts.find(
    (product) => product.productId === item._id
  );

  return (
    <Grid.Item>
      <Link to={`/product/${item._id}`}>
        <div className={style.mainContainer}>
          <img src={item.cover} alt={item.title} />
          <div className={style.info}>
            <h3 className={style.title}>
              {i18n.language === "en" ? item?.title_en : item?.title}
            </h3>
            <p className={style.desc}>
              {i18n.language === "en" ? item?.desc_en : item?.desc}
            </p>
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
            <div className={style.star}>
              <img src="./img/heart.png" alt="star" />
              <span>{item.favorite ? item.favorite : ""}</span>
            </div>
            {productInCart ? (
              <AmountButtons product={productInCart} border={true} />
            ) : (
              <CustomButton
                type="button"
                borderRadius={10}
                onClick={handleAddToCart}
                className={style.addBtn}
              >
                <span className={style.btnText}>{t("main.add")}</span>
              </CustomButton>
            )}

            <div className={style.price}>
              {/* <span>{t("product.from")}</span> */}
              <h2>{`${item?.price} ₴`}</h2>
            </div>
          </div>
        </div>
      </Link>
    </Grid.Item>
  );
};

export default ProductCard;
