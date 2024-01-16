import { useState } from "react";
import style from "./check-out.module.scss";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import CustomButton from "../../UI/button";
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
import { useTranslation } from "react-i18next";
import { minOrderPrice } from "../../lib/data";

type TFormValues = Omit<IOrder, "products" | "orderNumber" | "totalPrice">;

const CheckOutPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [mutationErrorMessage, setMutationErrorMessage] = useState<
    string | null
  >(null);
  const currentUser = getCurrentUser();
  const cartProducts = useSelector(getCartProducts);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      name: currentUser.username ? currentUser.username : "",
      phone: currentUser.phone ? currentUser.phone : "",
      email: currentUser.email ? currentUser.email : "",
      address: {
        city: "",
        street: "",
        apartment: "",
        portal: "",
      },
      delivery: "self_pickup",
      paymentMethod: "by_cash",
      comment: "",
    } satisfies TFormValues,
    mode: "onTouched",
    //reValidateMode: "onBlur",
  });

  const formFileds = {
    name: {
      required: {
        value: true,
        message: t("check_out.err_username"),
      },
    },
    email: {
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: t("check_out.err_email_wrong"),
      },
    },
    phone: {
      required: {
        value: true,
        message: t("check_out.err_phone"),
      },
      minLength: {
        value: 10,
        message: t("check_out.err_phone_wrong"),
      },
    },
  };

  const disableAddress = watch("delivery") === "self_pickup";

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
      let message = t("check_out.err_unknown");

      if (err instanceof AxiosError) {
        message = err.response?.data.error || t("check_out.err_server");
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
        <h1>{t("check_out.title")}</h1>
        <p>{t("check_out.order_price", { totalPrice })}</p>
        <fieldset className={style.fieldset}>
          <h2>{t("check_out.title_2")}</h2>
          <label htmlFor="username" className={style.label}>
            {t("check_out.username")}
          </label>
          <input
            type="text"
            id="username"
            placeholder={t("check_out.username_ph")}
            {...register("name", formFileds.name)}
          />
          <p className={style.error}>{formState.errors.name?.message}</p>
          <label htmlFor="phone" className={style.label}>
            {t("check_out.phone")}
          </label>
          <input
            type="tel"
            id="phone"
            placeholder={t("check_out.phone_ph")}
            {...register("phone", formFileds.phone)}
          />
          <p className={style.error}>{formState.errors.phone?.message}</p>
          <label htmlFor="email" className={style.label}>
            {t("check_out.email")}
          </label>
          <input
            type="email"
            id="email"
            placeholder={t("check_out.email_ph")}
            {...register("email", formFileds.email)}
          />
        </fieldset>
        <fieldset className={style.fieldset}>
          <h2>{t("check_out.title_3")}</h2>
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <InputLabel id="delivery">{t("check_out.delivery")}</InputLabel>
            <Select
              defaultValue="self_pickup"
              labelId="delivery"
              id="delivery"
              label={t("check_out.delivery")}
              {...register("delivery")}
            >
              <MenuItem value="self_pickup">
                {t("check_out.self_pickup")}
              </MenuItem>
              <MenuItem value="home_delivery">
                {t("check_out.home_delivery")}
              </MenuItem>
            </Select>
          </FormControl>
          {!disableAddress ? (
            <>
              <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
                <InputLabel id="city">{t("check_out.city")}</InputLabel>
                <Select
                  labelId="city"
                  id="city"
                  label={t("check_out.city")}
                  {...register("address.city")}
                >
                  <MenuItem value="petropavlivska_borshchahivka">
                    {t("check_out.petropavlivska_borshchahivka")}
                  </MenuItem>
                  <MenuItem value="sofiivska_borshchahivka">
                    {t("check_out.sofiivska_borshchahivka")}
                  </MenuItem>
                </Select>
              </FormControl>
              <div className={style.address}>
                <div>
                  <label htmlFor="street" className={style.label}>
                    {t("check_out.street")}
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
                    {t("check_out.apartment")}
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    {...register("address.apartment")}
                  />
                </div>
                <div>
                  <label htmlFor="portal" className={style.label}>
                    {t("check_out.portal")}
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
            <InputLabel id="paymentMethod">
              {t("check_out.payment_method")}
            </InputLabel>
            <Select
              labelId="paymentMethod"
              id="paymentMethod"
              label={t("check_out.payment_method")}
              defaultValue="by_cash"
              {...register("paymentMethod")}
            >
              <MenuItem value="by_cash">{t("check_out.by_cash")}</MenuItem>
              <MenuItem value="by_card">{t("check_out.by_card")}</MenuItem>
            </Select>
          </FormControl>
          <label htmlFor="comment" className={style.label}>
            {t("check_out.comment")}
          </label>
          <textarea
            id="comment"
            placeholder={t("check_out.comment_ph")}
            cols={30}
            rows={10}
            {...register("comment")}
          />
        </fieldset>

        <CustomButton
          type="button"
          disabled={
            !formState.isValid ||
            formState.isSubmitting ||
            totalPrice < minOrderPrice
          }
          onClick={() => setOpenModal(true)}
        >
          {t("check_out.order_btn")}
        </CustomButton>
        <p className={style.error}>
          {totalPrice < minOrderPrice
            ? t("check_out.min_order_msg", { minOrderPrice })
            : null}
        </p>
        <p>{t("check_out.footer")}</p>
        <DialogModal
          isOpen={isOpenModal}
          title={t("check_out.order_confirm")}
          onClose={() => setOpenModal(false)}
        >
          <CustomButton type="submit">
            {creationStatus === "loading"
              ? t("check_out.confirm_btn_creating")
              : t("check_out.confirm_btn")}
          </CustomButton>
          <p>{creationStatus === "error" ? mutationErrorMessage : null}</p>
        </DialogModal>
      </form>
    </main>
  );
};

export default CheckOutPage;
