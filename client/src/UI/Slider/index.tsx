import style from "./Carousel.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "./SliderArrow/index.tsx";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  slidesToScroll?: number;
  slidesToShow?: number;
  initialSlide?: number;
  arrows?: boolean;
  dots?: boolean;
  fade?: boolean;
  infinite?: boolean;
  swipeToSlide?: boolean;
  draggable?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
  nextArrow?: JSX.Element;
  prevArrow?: JSX.Element;
}

const Carousel = ({
  children,
  className,
  slidesToShow = 4,
  slidesToScroll = 4,
  initialSlide = 0,
  arrows = true,
  dots = false,
  fade = false,
  infinite = true,
  swipeToSlide = true,
  draggable = false,
  autoplay = false,
  autoplaySpeed = 2000,
  speed = 2000,
}: CarouselProps) => {
  return (
    <section className={style.mainContainer}>
      <Slider
        className={`${style.slider} ${className}`}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        initialSlide={initialSlide}
        arrows={arrows}
        dots={dots}
        fade={fade}
        infinite={infinite}
        swipeToSlide={swipeToSlide}
        draggable={draggable}
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        speed={speed}
        nextArrow={<SliderArrow styles={{ right: "0px" }} type={"next"} />}
        prevArrow={<SliderArrow styles={{ left: "0px" }} type={"previous"} />}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false,
              dots: true,
            },
          },
        ]}
      >
        {children}
      </Slider>
    </section>
  );
};

export default Carousel;
