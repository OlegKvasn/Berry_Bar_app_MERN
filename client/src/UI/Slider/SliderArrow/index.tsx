import { CSSProperties, MouseEventHandler, useEffect, useRef } from "react";
import style from "./SliderArrow.module.scss";
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
import ArrowLeftIcon from "../../Icons/ArrowLeftIcon";

interface TProps {
  backgroundColor?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  opacity?: number;
  styles?: CSSProperties;
  type?: "next" | "previous";
}

const SliderArrow = ({
  backgroundColor = "gray",
  className,
  onClick,
  opacity = 0.8,
  styles,
  type,
}: TProps) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (arrowRef.current) {
      arrowRef.current.style.setProperty(
        "--slider-arrow-backgroundColor",
        backgroundColor
      );
      arrowRef.current.style.setProperty(
        "--slider-arrow-opacity",
        opacity.toString()
      );
    }
  }, [backgroundColor, opacity]);

  return (
    <div
      className={`${style.mainContainer} ${className}`}
      style={{ ...styles }}
      ref={arrowRef}
      onClick={onClick}
    >
      <div className={style.arrowButton} data-arrow={type}>
        {type === "next" ? (
          <ArrowRightIcon className={style.icon} />
        ) : (
          <ArrowLeftIcon className={style.icon} />
        )}
      </div>
    </div>
  );
};

export default SliderArrow;
