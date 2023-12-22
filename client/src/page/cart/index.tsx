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
import Button from "../../UI/button";

const CartPage = () => {
  const cartProducts = useSelector(getCartProducts);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useAppDispatch();
  //const currentUser = getCurrentUser();
  const navigate = useNavigate();

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
        <h1>Кошик</h1>
        <Button type="button" onClick={handleCheckOut}>
          Оформити замовлення
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Назва</th>
            <th>Кількість</th>
            <th>Ціна</th>
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
                  {product.productName}
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
      <h2>{`${totalPrice} грн`}</h2>
    </div>
  );
};

export default CartPage;
