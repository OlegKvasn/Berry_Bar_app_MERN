import React, { useReducer, useState } from "react";
import { category } from "../../lib/data";
import style from "./check-out.module.scss";
import { INITIAL_STATE, productReducer } from "../../lib/product-reducer";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../UI/button";
import DialogModal from "../../UI/dialog-modal";
import ProductCardCreating from "../../components/product-card-creating";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../lib/redux/cart-slice";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type TInitialState = typeof INITIAL_STATE;

type THandleChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

type TFormValues = {
  username: string;
  phone: string;
  email: string;
  comment: string;
};

const CheckOutPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
  const currentUser = getCurrentUser();
  const totalPrice = useSelector(getTotalPrice);
  const { register, handleSubmit, formState, control } = useForm<TFormValues>({
    defaultValues: {
      username: currentUser.username ? currentUser.username : "",
      phone: currentUser.phone ? currentUser.phone : "",
      email: currentUser.email ? currentUser.email : "",
      comment: "",
    },
  });

  const handleChange = ({ target }: THandleChange) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: target.name, value: target.value },
    });
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: (newProduct: TInitialState) => {
      return newRequest.post("/products", newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const onSubmit = (data: TFormValues) => {
    console.log(data);

    // createProductMutation.mutate(state);
    setOpenModal(true);
    // navigate("/products-admin");
  };

  return (
    <main className={style.mainContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Оформлення замовлення</h3>
        <p>{`Цінна замовлення: ${totalPrice} грн`}</p>
        <label htmlFor="username">* Їм'я користувача</label>
        <input
          type="text"
          id="username"
          placeholder="Їм'я користувача"
          {...register("username", {
            required: {
              value: true,
              message: "Їм'я користувача є обов'язковим",
            },
          })}
        />
        <p>{formState.errors.username?.message}</p>
        <label htmlFor="phone">* Номер телефону</label>
        <input
          type="tel"
          id="phone"
          placeholder="Номер телефону"
          {...register("phone", {
            required: {
              value: true,
              message: "Номер телефону є обов'язковим",
            },
          })}
        />
        <p>{formState.errors.phone?.message}</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "неправильний email формат",
            },
          })}
        />
        <p>{formState.errors.email?.message}</p>
        <label htmlFor="comment">Коментар</label>
        <textarea
          id="comment"
          placeholder="Ваш коментар до замовлення"
          cols={30}
          rows={10}
          {...register("comment")}
        />
        <label htmlFor="category">Категорія</label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={state.category}
        >
          {category.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>

        <Button
          type="submit"
          //</form>disabled={
          //state.title.length < 1 ||
          //state.price.length < 1 ||
          //state.cover.length < 1
          //}
        >
          Оформити замовлення
        </Button>
        <p>* Обов'язкові поля</p>
        <DialogModal
          isOpen={isOpenModal}
          title="Підтвердити замовлення"
          onClose={() => setOpenModal(false)}
        >
          <ProductCardCreating
            title={state.title}
            category={state.category}
            cover={state.cover}
            ingredients={state.ingredients}
            desc={state.desc}
            salePrice={state.salePrice}
            price={state.price}
          />
          <Button type="button">Підтвердити</Button>
        </DialogModal>
      </form>
      <DevTool control={control} />
    </main>
  );
};

export default CheckOutPage;
