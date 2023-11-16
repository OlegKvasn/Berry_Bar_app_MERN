import { Link } from "react-router-dom";
import style from "./catCard.module.scss";

interface CatCard {
  id: number;
  title: string;
  desc: string;
  img: string;
}

const CatCard = ({ item }: { item: CatCard }) => {
  return (
    <Link to="/product/112">
      <div className={style.mainContainer}>
        <img src={item.img} alt={item.title} />
        <span className={style.title}>{item.title}</span>
        <span className={style.desc}>{item.desc}</span>
      </div>
    </Link>
  );
};

export default CatCard;
