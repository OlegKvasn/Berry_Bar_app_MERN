import { useState } from "react";
import style from "./check-out.module.scss";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import Button from "../../UI/button";
import DialogModal from "../../UI/dialog-modal";
//import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  clearCart,
  getCartProducts,
  getTotalPrice,
} from "../../lib/redux/cart-slice";
import { FieldErrors, useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IOrder } from "../../lib/types";
import { useAppDispatch } from "../../lib/redux/store-hooks";
import { AxiosError } from "axios";

type TFormValues = Omit<IOrder, "products" | "orderNumber" | "totalPrice">;

const nameFormField = {
  required: {
    value: true,
    message: "Їм'я є обов'язковим полем",
  },
};

const emailFormField = {
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Неправильний email формат",
  },
};

const phoneFormField = {
  required: {
    value: true,
    message: "Номер телефону є обов'язковим полем",
  },
  minLength: {
    value: 10,
    message: "Невірний номер телефону",
  },
};

const CheckOutPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [mutationErrorMessage, setMutationErrorMessage] = useState<
    string | null
  >(null);
  const currentUser = getCurrentUser();
  const cartProducts = useSelector(getCartProducts);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, watch } = useForm({
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
    } satisfies TFormValues,
    mode: "onTouched",
    //reValidateMode: "onBlur",
  });

  const disableAddress = watch("delivery") === "Самовивіз";

  // const navigate = useNavigate();

  const { mutate: createOrder, status: creationStatus } = useMutation({
    mutationFn: (newOrder: IOrder) => {
      return newRequest.post("/orders", newOrder);
    },
    onSuccess: () => {
      setOpenModal(false);
      dispatch(clearCart());
      // navigate("/products-admin");
    },
    onError: (err) => {
      let message = "Щось пішло не так";

      if (err instanceof AxiosError) {
        message = err.response?.data.error || "Помилка сервера";
      }
      setMutationErrorMessage(message);
    },
  });

  const onSubmit = async (formData: TFormValues) => {
    if (formState.isSubmitSuccessful) {
      const res = await newRequest.get("/orders/last");
      const lastOrder = res.data as IOrder;
      createOrder({
        ...formData,
        userId: currentUser._id || "Unregistered",
        products: cartProducts,
        totalPrice,
        orderNumber: lastOrder.orderNumber + 1,
      });
    }
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log(errors);
  };

  return (
    <main className={style.mainContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <h3>Оформлення замовлення</h3>
        <p>{`Цінна замовлення: ${totalPrice} грн`}</p>
        <label htmlFor="username" className={style.label}>
          * Їм'я користувача
        </label>
        <input
          type="text"
          id="username"
          placeholder="Їм'я"
          {...register("name", nameFormField)}
        />
        <p className={style.error}>{formState.errors.name?.message}</p>
        <label htmlFor="phone" className={style.label}>
          * Номер телефону
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="Номер телефону"
          {...register("phone", phoneFormField)}
        />
        <p className={style.error}>{formState.errors.phone?.message}</p>
        <label htmlFor="email" className={style.label}>
          E-mail
        </label>
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          {...register("email", emailFormField)}
        />
        <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
          <InputLabel id="delivery">Спосіб отримання</InputLabel>
          <Select
            defaultValue="Самовивіз"
            labelId="delivery"
            id="delivery"
            label="Спосіб отримання"
            {...register("delivery")}
          >
            <MenuItem value="Самовивіз">Самовивіз</MenuItem>
            <MenuItem value="Доставка додому">Доставка додому</MenuItem>
          </Select>
        </FormControl>
        {!disableAddress ? (
          <>
            <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
              <InputLabel id="city">Населений пункт</InputLabel>
              <Select
                labelId="city"
                id="city"
                label="Населений пункт"
                {...register("address.city")}
              >
                <MenuItem value="Петропавлівська Борщагівка">
                  Петропавлівська Борщагівка
                </MenuItem>
                <MenuItem value="Софіївська Борщагівка">
                  Софіївська Борщагівка
                </MenuItem>
              </Select>
            </FormControl>
            <div className={style.address}>
              <div>
                <label htmlFor="street" className={style.label}>
                  Вулиця і номер будинку
                </label>
                <input
                  type="text"
                  id="street"
                  {...register("address.street", {
                    //disabled: disableAddress,
                  })}
                />
              </div>
              <div>
                <label htmlFor="apartment" className={style.label}>
                  Квартира
                </label>
                <input
                  type="text"
                  id="apartment"
                  {...register("address.apartment")}
                />
              </div>
              <div>
                <label htmlFor="portal" className={style.label}>
                  Під'їзд
                </label>
                <input
                  type="text"
                  id="portal"
                  {...register("address.portal")}
                />
              </div>
            </div>
          </>
        ) : null}
        <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
          <InputLabel id="paymentMethod">Тип оплати</InputLabel>
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            label="Тип оплати"
            defaultValue="Готівка"
            {...register("paymentMethod")}
          >
            <MenuItem value="Готівка">Готівка</MenuItem>
            <MenuItem value="Оплата картою">Оплата картою</MenuItem>
          </Select>
        </FormControl>
        <label htmlFor="comment" className={style.label}>
          Коментар
        </label>
        <textarea
          id="comment"
          placeholder="Ваш коментар до замовлення"
          cols={30}
          rows={10}
          {...register("comment")}
        />
        <Button
          type="button"
          disabled={!formState.isValid || formState.isSubmitting}
          onClick={() => setOpenModal(true)}
        >
          Оформити замовлення
        </Button>
        <p>* Обов'язкові поля</p>
        <DialogModal
          isOpen={isOpenModal}
          title="Підтвердити замовлення"
          onClose={() => setOpenModal(false)}
        >
          <Button type="submit">
            {creationStatus === "loading" ? "Оформляємо..." : "Підтвердити"}
          </Button>
          <p>{creationStatus === "error" ? mutationErrorMessage : null}</p>
        </DialogModal>
      </form>
    </main>
  );
};

export default CheckOutPage;
