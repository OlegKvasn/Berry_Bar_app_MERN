import { Link, useNavigate } from "react-router-dom";
import style from "./cart.module.scss";
import {
  getCartProducts,
  getTotalPrice,
  getTotalProducts,
} from "../../lib/redux/cart-slice";
import { closeCart, getCartState } from "../../lib/redux/open-cart-slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import CustomButton from "../../UI/button";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { IProductInCart } from "../../lib/types";
import CancelButton from "../../UI/icon-button/cancel";
import AmountButtons from "../../UI/amount-buttons";

const Cart = () => {
  const cartProducts = useSelector(getCartProducts);
  const totalProducts = useSelector(getTotalProducts);
  const totalPrice = useSelector(getTotalPrice);
  const isOpenCart = useSelector(getCartState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCheckOut = () => {
    navigate("/check-out");
    dispatch(closeCart());
  };

  return (
    <aside className={style.cart} data-cart={isOpenCart ? "open" : "close"}>
      <hr />
      <section className={style.mainContent}>
        <article>
          <div className={style.top}>
            <CancelButton type="button" onClick={() => dispatch(closeCart())} />
          </div>
          <h2>{t("cart.cart")}</h2>
          <ul>
            {cartProducts.map((product) => (
              <Item product={product} key={product.productId} />
            ))}
          </ul>
          {totalProducts < 1 ? <p>{t("cart.cart-empty")}</p> : null}
        </article>

        <CustomButton
          type="button"
          onClick={handleCheckOut}
          className={style.checkoutBtn}
        >
          <span className={style.productsAmount}>
            {t("cart.total_products", { count: totalProducts })}
          </span>
          <span>{t("cart.order_btn")}</span>
          <span>{`${totalPrice} ₴`}</span>
        </CustomButton>
      </section>
    </aside>
  );
};

const Item = ({ product }: { product: IProductInCart }) => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  return (
    <li className={style.item}>
      <div className={style.left}>
        <div>
          {product.quantity > 1 ? <span>{`${product.quantity}x `}</span> : null}
          <Link
            to={`/product/${product.productId}`}
            onClick={() =>
              queryClient.invalidateQueries(["product", "reviews"])
            }
            // TODO: fix refetch
          >
            {i18n.language === "en"
              ? product.productNameEn
              : product.productName}
          </Link>
        </div>

        <p>{`${product.productPrice * product.quantity} ₴`}</p>
      </div>
      <div className={style.right}>
        <img
          className={style.productImage}
          src={product.productImage}
          alt={product.productName}
        />
        <AmountButtons product={product} />
      </div>
    </li>
  );
};

export default Cart;
