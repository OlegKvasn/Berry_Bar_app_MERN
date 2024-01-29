import style from "./register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../../lib/utils";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import CustomButton from "../../UI/button";
import { AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type TFormValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
};

const RegisterHookFormPage = () => {
  const [responseErrorMessage, setResponseErrorMessage] = useState<
    string | null
  >(null);
  const { t } = useTranslation();

  const validationSchema = z
    .object({
      username: z.string().min(1, { message: t("register.err_username") }),
      email: z
        .string()
        .min(1, { message: t("register.err_email_req") })
        .email(t("register.err_email_wrong")),
      password: z.string().min(5, {
        message: t("register.err_pass", {
          amount: 5,
        }),
      }),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("register.err_pass_confirm"),
      path: ["passwordConfirm"],
    });

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
        let message = t("register.err_unknown");

        if (err instanceof AxiosError) {
          message = err.response?.data.error || t("register.err_server");
        }
        setResponseErrorMessage(message);
      }
    }
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log(errors);
  };

  return (
    <section className={style.mainContainer}>
      <h1>{t("register.reg_title")}</h1>
      <div className={style.title2}>
        <p>{t("register.reg_title_2")}</p>
        <Link to="/login">{t("register.login")}</Link>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          id="username"
          label={t("register.username")}
          variant="outlined"
          {...register("username")}
          error={!!formState.errors.username}
          helperText={formState.errors.username?.message}
        />
        <TextField
          id="email"
          label={t("register.email")}
          variant="outlined"
          type="email"
          {...register("email")}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />
        <TextField
          id="password"
          label={t("register.pass")}
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
        />
        <TextField
          id="passwordConfirmation"
          label={t("register.pass_confirm")}
          variant="outlined"
          type="password"
          {...register("passwordConfirm")}
          error={!!formState.errors.passwordConfirm}
          helperText={formState.errors.passwordConfirm?.message}
        />
        <TextField
          id="phone"
          label={t("register.phone")}
          variant="outlined"
          type="tel"
          {...register("phone")}
          error={!!formState.errors.phone}
          helperText={formState.errors.phone?.message}
        />
        {responseErrorMessage ? (
          <p className={style.error}>
            {responseErrorMessage === "Email already in use"
              ? t("register.err_email_exist")
              : responseErrorMessage}
          </p>
        ) : null}
        <CustomButton type="submit">{t("register.reg_btn")}</CustomButton>
        <p>{t("register.reg_footer")}</p>
      </form>
    </section>
  );
};

export default RegisterHookFormPage;
