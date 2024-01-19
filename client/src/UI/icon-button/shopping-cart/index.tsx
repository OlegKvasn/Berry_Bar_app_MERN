import { useLocation } from "react-router-dom";
import style from "./cart-button.module.scss";
import { BsBag } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getTotalProducts } from "../../../lib/redux/cart-slice";

interface IButton extends React.ComponentProps<"button"> {
  navigationStatus?: boolean;
  className?: string;
}

const CartButton = ({ className, navigationStatus, ...props }: IButton) => {
  const { pathname } = useLocation();
  const totalProducts = useSelector(getTotalProducts);
  return (
    <button
      {...props}
      className={`${style.button} ${className}`}
      data-navbar={navigationStatus || pathname !== "/" ? "active" : "inactive"}
    >
      <BsBag className={style.icon}></BsBag>
      {totalProducts > 0 ? (
        <div className={style.count}>
          <span>{totalProducts}</span>
        </div>
      ) : null}
    </button>
  );
};

export default CartButton;
