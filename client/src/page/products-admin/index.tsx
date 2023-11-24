import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from "./products-admin.module.scss";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { IProduct } from "../../lib/types";
import DialogModal from "../../UI/dialog-modal";
import Button from "../../UI/button";
import DeleteButton from "../../UI/icon-button/delete";
import EditButton from "../../UI/icon-button/edit";
import { Link, useNavigate } from "react-router-dom";
import { category } from "../../lib/data";

const ProductsAdminPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
        <section className={style.mainContainer}>
          <div className={style.title}>
            <h1>Список продуктів</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Назва</th>
                <th>Категорія</th>
                <th>Ціна</th>
                <th>Ціна зі знижкою</th>
                <th>Кількість замовлень</th>
                <th>Створено</th>
                <th>Оновлено</th>
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
                      <td>
                        <Link to={`/product/${product._id}`}>
                          {product.title}
                        </Link>
                      </td>
                      <td className={style.cat}>
                        {
                          category.find(
                            ({ value }) => value === product.category
                          )?.name
                        }
                      </td>

                      <td>{product.price} грн</td>
                      <td>
                        {product.salePrice}
                        {product.salePrice ? " грн" : "-"}
                      </td>
                      <td>{product.sales}</td>
                      <td>{product.createdAt.slice(0, 10)}</td>
                      <td>{product.updatedAt.slice(0, 10)}</td>
                      <td className={style.btn}>
                        <EditButton
                          onClick={() =>
                            navigate(`/edit-product/${product._id}`)
                          }
                        />
                      </td>
                      <td className={style.btn}>
                        <DeleteButton
                          type="button"
                          onClick={() => setOpenModal(true)}
                        />
                        <DialogModal
                          isOpen={isOpenModal}
                          onClose={() => setOpenModal(false)}
                        >
                          <p>{`Дійсно видалити продукт?`}</p>
                          <Button
                            type="button"
                            onClick={() => {
                              mutation.mutate(product._id);
                              setOpenModal(false);
                            }}
                          >
                            Підтвердити
                          </Button>
                        </DialogModal>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          <Button
            type="button"
            onClick={() => {
              navigate(`/add-product/`);
            }}
          >
            Добавити Новий Продукт
          </Button>
        </section>
      )}
    </>
  );
};

export default ProductsAdminPage;
