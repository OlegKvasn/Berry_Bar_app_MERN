import { Link } from "react-router-dom";
import style from "./cart.module.scss";

const CartPage = () => {
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
          <tr>
            <td>
              <img
                className={style.productImage}
                src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="some image"
              />
            </td>
            <td>PORK БУРГЕР</td>
            <td>1</td>
            <td>199 грн</td>
            <td>
              <img
                className={style.delete}
                src="/img/delete.png"
                alt="delete"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className={style.productImage}
                src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="some image"
              />
            </td>
            <td>PORK БУРГЕР</td>
            <td>1</td>
            <td>199 грн</td>
            <td>
              <img
                className={style.delete}
                src="/img/delete.png"
                alt="delete"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className={style.productImage}
                src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="some image"
              />
            </td>
            <td>PORK БУРГЕР</td>
            <td>1</td>
            <td>199 грн</td>
            <td>
              <img
                className={style.delete}
                src="/img/delete.png"
                alt="delete"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className={style.productImage}
                src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="some image"
              />
            </td>
            <td>PORK БУРГЕР</td>
            <td>1</td>
            <td>199 грн</td>
            <td>
              <img
                className={style.delete}
                src="/img/delete.png"
                alt="delete"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className={style.productImage}
                src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="some image"
              />
            </td>
            <td>PORK БУРГЕР</td>
            <td>1</td>
            <td>199 грн</td>
            <td>
              <img
                className={style.delete}
                src="/img/delete.png"
                alt="delete"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
