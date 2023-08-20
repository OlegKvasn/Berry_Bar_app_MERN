import style from "./orders.module.scss";

const OrdersPage = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>
        <h1>Замовлення</h1>
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

export default OrdersPage;

// import { useEffect, useState } from "react";
// import { Product } from "../../types/models";

// const OrdersPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const response = await fetch("http://localhost:5000/api/orders/", {
//           method: "GET",
//         });
//         const products = await response.json();
//         setProducts(products);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     loadProducts();
//   }, []);
//   return <div>{JSON.stringify(products)}</div>;
// };

// export default OrdersPage;
