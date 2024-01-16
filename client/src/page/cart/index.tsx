import { Link, useNavigate } from "react-router-dom";
import style from "./cart.module.scss";
import {
  getCartProducts,
  getTotalPrice,
  removeFromCart,
} from "../../lib/redux/cart-slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import DeleteButton from "../../UI/icon-button/delete";
//import { getCurrentUser } from "../../lib/utils";
import CustomButton from "../../UI/button";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const cartProducts = useSelector(getCartProducts);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useAppDispatch();
  //const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckOut = () => {
    // if (!currentUser._id) {
    //   navigate("/login");
    // } else {
    navigate("/check-out");
    //}
  };

  return (
    <div className={style.cart}>
      <div className={style.title}>
        <h1>{t("cart.cart")}</h1>
        <CustomButton type="button" onClick={handleCheckOut}>
          {t("cart.order_btn")}
        </CustomButton>
      </div>
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
    </div>
  );
};

export default CartPage;
