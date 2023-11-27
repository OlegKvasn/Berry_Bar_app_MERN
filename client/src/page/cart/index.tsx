import { Link } from "react-router-dom";
import style from "./cart.module.scss";
import {
  getCartProducts,
  getTotalPrice,
  removeFromCart,
} from "../../lib/redux/cart-slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/redux/store-hooks";

const CartPage = () => {
  const cartProducts = useSelector(getCartProducts);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className={style.cart}>
      <div className={style.title}>
        <h1>Кошик</h1>
        <Link to="/products">
          <button>Оформити замовлення</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Назва</th>
            <th>Кількість</th>
            <th>Ціна</th>
            <th>Видалити</th>
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
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>{`${product.productPrice} грн`}</td>
              <td>
                <img
                  onClick={() => handleRemoveFromCart(product.productId)}
                  className={style.delete}
                  src="/img/delete.png"
                  alt="delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{`${totalPrice} грн`}</h2>
    </div>
  );
};

export default CartPage;
