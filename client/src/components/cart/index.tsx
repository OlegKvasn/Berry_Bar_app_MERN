import { Link, useNavigate } from "react-router-dom";
import style from "./cart.module.scss";
import {
  getCartProducts,
  getTotalPrice,
  removeFromCart,
} from "../../lib/redux/cart-slice";
import { getCartState } from "../../lib/redux/open-cart-slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import DeleteButton from "../../UI/icon-button/delete";
import CustomButton from "../../UI/button";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const cartProducts = useSelector(getCartProducts);
  const totalPrice = useSelector(getTotalPrice);
  const isOpenCart = useSelector(getCartState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckOut = () => {
    navigate("/check-out");
  };

  return (
    <aside className={style.cart} data-cart={isOpenCart ? "open" : "close"}>
      <h2>{t("cart.cart")}</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t("cart.title")}</th>
            <th>{t("cart.amount")}</th>
            <th>{t("cart.price")}</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
            <tr key={product.productId}>
              <td>
                <img
                  className={style.productImage}
                  src={product.productImage}
                  alt={product.productName}
                />
              </td>
              <td>
                <Link to={`/product/${product.productId}`}>
                  {i18n.language === "en"
                    ? product.productNameEn
                    : product.productName}
                </Link>
              </td>
              <td>{product.quantity}</td>
              <td>{`${product.productPrice} грн`}</td>
              <td className={style.btn}>
                <DeleteButton
                  type="button"
                  onClick={() => handleRemoveFromCart(product.productId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{t("cart.total_price", { amount: totalPrice })}</h2>
      <CustomButton
        type="button"
        onClick={handleCheckOut}
        className={style.checkoutBtn}
      >
        {t("cart.order_btn")}
      </CustomButton>
    </aside>
  );
};

export default Cart;
