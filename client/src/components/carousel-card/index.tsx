import { Link } from "react-router-dom";
import style from "./carousel-card.module.scss";
import { useTranslation } from "react-i18next";

interface CarouselCard {
  name: string;
  name_en: string;
  img: string;
}

const CarouselCard = ({ item }: { item: CarouselCard }) => {
  const { i18n } = useTranslation();
  return (
    <Link to={`/products?category=${item.name_en}`}>
      <div className={style.mainContainer}>
        <img src={item.img} alt={item.name} />
        <span className={style.title}>
          {i18n.language === "en" ? item.name_en : item.name}
        </span>
      </div>
    </Link>
  );
};

export default CarouselCard;
