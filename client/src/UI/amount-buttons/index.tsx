import style from "./amount-buttons.module.scss";
import { addQuantity, removeFromCart } from "../../lib/redux/cart-slice";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import { IProductInCart } from "../../lib/types";
import { BsTrash3Fill } from "react-icons/bs";
import { MouseEvent } from "react";

const AmountButtons = ({
  product,
  border = false,
}: {
  product: IProductInCart;
  border?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeFromCart(product.productId));
  };

  const handleAddQuantity = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addQuantity(product.productId));
  };

  return (
    <div className={style.buttonGroup} data-border={border ? "yes" : "no"}>
      <button
        className={style.button}
        type="button"
        onClick={handleRemoveFromCart}
      >
        {product.quantity > 1 ? (
          <span className={style.btnText}>-</span>
        ) : (
          <BsTrash3Fill className={style.icon}></BsTrash3Fill>
        )}
      </button>
      <span className={style.amount}>{product.quantity}</span>
      <button
        className={style.button}
        type="button"
        onClick={handleAddQuantity}
      >
        <span className={style.btnText}>+</span>
      </button>
    </div>
  );
};

export default AmountButtons;
