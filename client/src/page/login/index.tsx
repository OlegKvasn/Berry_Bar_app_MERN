import { useState } from "react";
import style from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { AxiosError } from "axios";
import TextField from "@mui/material/TextField";
import CustomButton from "../../UI/button";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type TFormValues = {
  email: string;
  password: string;
};

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Введіть ваш E-mail" })
    .email("Неправильний E-mail формат"),
  password: z.string().min(1, { message: "Введіть пароль" }),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [responseErrorMessage, setResponseErrorMessage] = useState<
    string | null
  >(null);

  const { register, handleSubmit, formState } = useForm<TFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (submitData: TFormValues) => {
    if (formState.isSubmitSuccessful) {
      try {
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
        <h1>Вхід</h1>
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
        {responseErrorMessage ? (
          <p className={style.error}>
            {responseErrorMessage === "Wrong password or username"
              ? "Неправильний пароль"
              : responseErrorMessage === "User not found"
              ? "За цим E-mail немає зареєстрованого користувача"
              : responseErrorMessage}
          </p>
        ) : null}
        <CustomButton type="submit">Вхід</CustomButton>
      </form>
    </div>
  );
};

export default LoginPage;
