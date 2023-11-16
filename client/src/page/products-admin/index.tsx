import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from "./products-admin.module.scss";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";

const ProductsAdminPage = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["products-admin"],
    queryFn: () =>
      newRequest("/products").then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return newRequest.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products-admin"]);
    },
  });

  return (
    <>
      {isLoading ? (
        "Завантаження"
      ) : error ? (
        "щось пішло не так"
      ) : (
        <div className={style.mainContainer}>
          <div className={style.title}>
            <h1>Список продуктів</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Назва</th>
                <th>Категорія</th>
                <th>Кількість замовлень</th>
                <th>Ціна</th>
                <th>Видалити</th>
              </tr>
            </thead>
            <tbody>
              {currentUser?.isAdmin && (
                <>
                  {data.map((product: IProduct) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          className={style.productImage}
                          src={product.cover}
                          alt={product.title}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.category}</td>
                      <td>{product.sales}</td>
                      <td>{product.price} грн</td>
                      <td>
                        <img
                          className={style.delete}
                          src="/img/delete.png"
                          alt="delete"
                          onClick={() => {
                            mutation.mutate(product._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductsAdminPage;
