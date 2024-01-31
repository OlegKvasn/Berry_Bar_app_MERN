import { Link } from "react-router-dom";
import style from "./carousel-card.module.scss";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../lib/types";
import CustomButton from "../../UI/button";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import { addToCart } from "../../lib/redux/cart-slice";
import { MouseEvent } from "react";

const CarouselCard = ({ item }: { item: IProduct }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addToCart(item));
  };

  return (
    <Link to={`/product/${item._id}`}>
      <div className={style.mainContainer}>
        <div className={style.imgContainer}>
          <img src={item.cover} alt={item.title} />
          <div className={style.title}>
            <span className={style.title}>
              {i18n.language === "en" ? item.title_en : item.title}
            </span>
          </div>
        </div>
        <hr />
        <div
          className={style.details}
          onClick={() => console.log("Div clicked")}
        >
          <h2 className={style.price}>{`${item?.price} ₴`}</h2>
          <CustomButton
            type="button"
            borderRadius={10}
            onClick={handleAddToCart}
            className={style.addBtn}
          >
            <span className={style.btnText}>{t("main.add")}</span>
          </CustomButton>
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
