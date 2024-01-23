import style from "./home.module.scss";
import Featured from "../../components/featured";
import Carousel from "../../UI/Slider";
import CatCard from "../../components/category-card";
import Grid from "../../components/grid";
import { category } from "../../lib/data";
import CarouselCard from "../../components/carousel-card";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";
import LoadingDots from "../../components/loading";

const HomePage = () => {
  const {
    isLoading: newProductsLoading,
    error: newProductsError,
    data: newProducts,
  } = useQuery({
    queryKey: ["newProducts"],
    queryFn: () =>
      newRequest("/products?new=true").then((res) => {
        return res.data as IProduct[];
      }),
  });

  const {
    isLoading: hotProductsLoading,
    error: hotProductsError,
    data: hotProducts,
  } = useQuery({
    queryKey: ["hotProducts"],
    queryFn: () =>
      newRequest("/products?hot=true").then((res) => {
        return res.data as IProduct[];
      }),
  });

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
      <section>
        <h2>Новинки:</h2>
        {newProductsLoading ? (
          <LoadingDots />
        ) : newProductsError ? (
          "щось пішло не так"
        ) : (
          <Carousel slidesToShow={4} slidesToScroll={4}>
            {newProducts?.map((card) => (
              <CarouselCard item={card} key={card._id} />
            ))}
          </Carousel>
        )}
      </section>
      <section>
        <h2>Популярне:</h2>
        {hotProductsLoading ? (
          <LoadingDots />
        ) : hotProductsError ? (
          "щось пішло не так"
        ) : (
          <Carousel slidesToShow={4} slidesToScroll={4}>
            {hotProducts?.map((card) => (
              <CarouselCard item={card} key={card._id} />
            ))}
          </Carousel>
        )}
      </section>
    </main>
  );
};

export default HomePage;
