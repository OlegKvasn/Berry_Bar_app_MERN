import style from "./home.module.scss";
import Featured from "../../components/featured";
import Carousel from "../../UI/Slider";
import CatCard from "../../components/category-card";
import Grid from "../../components/grid";
import { category } from "../../lib/data";
import CarouselCard from "../../components/carousel-card";

const HomePage = () => {
  return (
    <main className={style.mainContainer}>
      <Featured />
      <section className={style.category}>
        <Grid>
          {category.map((card) => (
            <CatCard item={card} key={card.value} />
          ))}
        </Grid>
      </section>
      <Carousel slidesToShow={5} slidesToScroll={5}>
        {category.map((card) => (
          <CarouselCard item={card} key={card.value} />
        ))}
      </Carousel>
      <Carousel slidesToShow={5} slidesToScroll={5}>
        {category.map((card) => (
          <CarouselCard item={card} key={card.value} />
        ))}
      </Carousel>
    </main>
  );
};

export default HomePage;
