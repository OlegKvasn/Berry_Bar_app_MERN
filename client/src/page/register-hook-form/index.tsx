import style from "./register.module.scss";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import CustomButton from "../../UI/button";
import { AxiosError } from "axios";
import { useState } from "react";

type TFormValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
};

const validationSchema = z
  .object({
    username: z.string().min(1, { message: "Їм'я користувача є обов'язковим" }),
    email: z
      .string()
      .min(1, { message: "E-mail є обов'язковим" })
      .email("Неправильний E-mail формат"),
    password: z
      .string()
      .min(5, { message: "Пароль повинен містити більше 5 символів" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Пароль не співпадає",
    path: ["passwordConfirm"],
  });

const RegisterHookFormPage = () => {
  const [responseErrorMessage, setResponseErrorMessage] = useState<
    string | null
  >(null);

  const { register, handleSubmit, formState } = useForm<TFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const onSubmit = async (submitData: TFormValues) => {
    if (formState.isSubmitSuccessful) {
      try {
        await newRequest.post("/auth/register", submitData);
        const email = submitData.email;
        const password = submitData.password;
        const res = await newRequest.post("/auth/login", { email, password });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      } catch (err) {
        let message = "Щось пішло не так";

        if (err instanceof AxiosError) {
          message = err.response?.data.error || "Помилка сервера";
        }
        setResponseErrorMessage(message);
      }
    }
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log(errors);
  };

  return (
    <div className={style.mainContainer}>
      <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <h1>Реєстрація нового користувача</h1>
        <TextField
          id="username"
          label="* Їм'я"
          variant="outlined"
          {...register("username")}
          error={!!formState.errors.username}
          helperText={formState.errors.username?.message}
        />
        <TextField
          id="email"
          label="* E-mail"
          variant="outlined"
          type="email"
          {...register("email")}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />
        <TextField
          id="password"
          label="* Пароль"
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
        />
        <TextField
          id="passwordConfirmation"
          label="* Підтвердіть пароль"
          variant="outlined"
          type="password"
          {...register("passwordConfirm")}
          error={!!formState.errors.passwordConfirm}
          helperText={formState.errors.passwordConfirm?.message}
        />
        <TextField
          id="phone"
          label="Номер телефону"
          variant="outlined"
          type="tel"
          {...register("phone")}
          error={!!formState.errors.phone}
          helperText={formState.errors.phone?.message}
        />
        {responseErrorMessage ? (
          <p className={style.error}>
            {responseErrorMessage === "Email already in use"
              ? "За цим E-mail вже зареєстровано користувача"
              : responseErrorMessage}
          </p>
        ) : null}
        <CustomButton type="submit">Зареєструватися</CustomButton>
        <p>* Обов'язкові поля</p>
      </form>
    </div>
  );
};

export default RegisterHookFormPage;
