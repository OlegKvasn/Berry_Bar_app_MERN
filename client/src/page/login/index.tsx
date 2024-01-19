import { useState } from "react";
import style from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { AxiosError } from "axios";
import TextField from "@mui/material/TextField";
import CustomButton from "../../UI/button";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";

type TFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [responseErrorMessage, setResponseErrorMessage] = useState<
    string | null
  >(null);
  const { t } = useTranslation();

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("login.err_email_req") })
      .email(t("login.err_email_wrong")),
    password: z.string().min(1, { message: t("login.err_pass") }),
  });

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
        let message = t("login.err_unknown");

        if (err instanceof AxiosError) {
          message = err.response?.data.error || t("login.err_server");
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
        <h1>{t("login.log_title")}</h1>
        <p>{t("login.log_title_2")}</p>
        <TextField
          id="email"
          label={t("login.email")}
          variant="outlined"
          type="email"
          {...register("email")}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />
        <TextField
          id="password"
          label={t("login.pass")}
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
        />
        {responseErrorMessage ? (
          <p className={style.error}>
            {responseErrorMessage === "Wrong password or username"
              ? t("login.err_pass_wrong")
              : responseErrorMessage === "User not found"
              ? t("login.err_user_not_found")
              : responseErrorMessage}
          </p>
        ) : null}
        <CustomButton type="submit">{t("login.log_btn")}</CustomButton>
      </form>
      <hr />
      <div className={style.footer}>
        <p>{t("login.footer")}</p>
        <Link to="/register">{t("login.register")}</Link>
      </div>
    </div>
  );
};

export default LoginPage;
