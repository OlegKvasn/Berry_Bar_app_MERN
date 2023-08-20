import style from "./home.module.scss";
import Featured from "../../components/Featured";
import Carousel from "../../UI/Slider";
import CatCard from "../../components/CatCard";
import { cards } from "../../data/fakeData";

const HomePage = () => {
  return (
    <main className={style.mainContainer}>
      <Featured />
      <Carousel slidesToShow={5} slidesToScroll={5}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Carousel>
      <h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </h1>
    </main>
  );
};

export default HomePage;
