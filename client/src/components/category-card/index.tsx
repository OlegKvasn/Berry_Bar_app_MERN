import { Link } from "react-router-dom";
import style from "./catCard.module.scss";
import Grid from "../grid";
import { useTranslation } from "react-i18next";

interface CatCard {
  name: string;
  name_en: string;
  img: string;
}

const CatCard = ({ item }: { item: CatCard }) => {
  const { i18n } = useTranslation();
  return (
    <Grid.Item className={style.mainContainer}>
      <Link to={`/products?category=${item.name_en}`}>
        <img src={item.img} alt={item.name} />
        <div className={style.title}>
          <span>{i18n.language === "en" ? item.name_en : item.name}</span>
        </div>
      </Link>
    </Grid.Item>
  );
};

export default CatCard;
