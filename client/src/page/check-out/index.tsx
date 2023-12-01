import { useState } from "react";
import style from "./check-out.module.scss";
import { getCurrentUser } from "../../lib/utils";
//import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../UI/button";
import DialogModal from "../../UI/dialog-modal";
//import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../lib/redux/cart-slice";
import { FieldErrors, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
//import FormControl from "@mui/material/FormControl";
//import Select from "@mui/material/Select";

type TFormValues = {
  name: string;
  phone: string;
  email: string;
  address: {
    city: "Петропавлівська Борщагівка" | "Софіївська Борщагівка";
    street: string;
    apartment: string;
    portal: string;
  };
  delivery: "Самовивіз" | "Доставка додому";
  paymentMethod: "Готівка" | "Оплата картою";
  comment: string;
};

const CheckOutPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const currentUser = getCurrentUser();
  const totalPrice = useSelector(getTotalPrice);
  const { register, handleSubmit, formState, watch, reset, control } =
    useForm<TFormValues>({
      defaultValues: {
        name: currentUser.username ? currentUser.username : "",
        phone: currentUser.phone ? currentUser.phone : "",
        email: currentUser.email ? currentUser.email : "",
        address: {
          city: "Петропавлівська Борщагівка",
          street: "",
          apartment: "",
          portal: "",
        },
        delivery: "Самовивіз",
        paymentMethod: "Готівка",
        comment: "",
      },
      mode: "onBlur",
      reValidateMode: "onBlur",
    });

  const disableAddress = watch("delivery") === "Самовивіз";

  // const navigate = useNavigate();

  //const queryClient = useQueryClient();

  // const createProductMutation = useMutation({
  //   mutationFn: (newProduct: TInitialState) => {
  //     return newRequest.post("/products", newProduct);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["products"]);
  //   },
  // });

  const onSubmit = (data: TFormValues) => {
    console.log(data);

    // createProductMutation.mutate(state);
    setOpenModal(true);
    if (formState.isSubmitSuccessful) {
      reset();
    }
    // navigate("/products-admin");
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log(errors);
  };

  return (
    <main className={style.mainContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <h3>Оформлення замовлення</h3>
        <p>{`Цінна замовлення: ${totalPrice} грн`}</p>
        <label htmlFor="username">* Їм'я користувача</label>
        <input
          type="text"
          id="username"
          placeholder="Їм'я користувача"
          {...register("name", {
            required: {
              value: true,
              message: "Їм'я користувача є обов'язковим",
            },
          })}
        />
        <p>{formState.errors.name?.message}</p>
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
        <label htmlFor="delivery">Спосіб отримання</label>
        <select id="delivery" {...register("delivery")}>
          <option>Самовивіз</option>
          <option>Доставка додому</option>
        </select>
        <p>{formState.errors.email?.message}</p>

        {!disableAddress ? (
          <>
            <label htmlFor="city">Місто</label>
            <select
              id="city"
              {...register("address.city", {
                //disabled: disableAddress,
              })}
            >
              <option>Петропавлівська Борщагівка</option>
              <option>Софіївська Борщагівка</option>
            </select>
            <div className={style.address}>
              <div>
                <label htmlFor="street">Вулиця і номер будинку</label>
                <input
                  type="text"
                  id="street"
                  {...register("address.street", {
                    //disabled: disableAddress,
                  })}
                />
              </div>
              <div>
                <label htmlFor="apartment">Квартира</label>
                <input
                  type="text"
                  id="apartment"
                  {...register("address.apartment")}
                />
              </div>
              <div>
                <label htmlFor="portal">Під'їзд</label>
                <input
                  type="text"
                  id="portal"
                  {...register("address.portal")}
                />
              </div>
            </div>
          </>
        ) : null}
        <label htmlFor="paymentMethod">Спосіб оплати</label>
        <select id="paymentMethod" {...register("paymentMethod")}>
          <option>Готівка</option>
          <option>Оплата картою</option>
        </select>
        {/* <FormControl fullWidth>
          <InputLabel id="paymentMethod">Тип оплати</InputLabel>
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            label="Age"
            {...register("paymentMethod")}
          >
            <MenuItem value="Готівка">Готівка</MenuItem>
            <MenuItem value="Оплата картою">Оплата картою</MenuItem>
          </Select>
        </FormControl> */}
        <label htmlFor="comment">Коментар</label>
        <textarea
          id="comment"
          placeholder="Ваш коментар до замовлення"
          cols={30}
          rows={10}
          {...register("comment")}
        />
        <Button
          type="submit"
          disabled={
            !formState.isDirty || !formState.isValid || formState.isSubmitting
          }
        >
          Оформити замовлення
        </Button>
        <p>* Обов'язкові поля</p>
        <DialogModal
          isOpen={isOpenModal}
          title="Підтвердити замовлення"
          onClose={() => setOpenModal(false)}
        >
          <Button type="button">Підтвердити</Button>
        </DialogModal>
      </form>
      <DevTool control={control} />
    </main>
  );
};

export default CheckOutPage;
