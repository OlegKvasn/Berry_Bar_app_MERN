import { useState } from "react";
import style from "./register.module.scss";
//import { useNavigate } from "react-router-dom";
import { newRequest, upload } from "../../lib/utils";
import { FieldErrors, useForm } from "react-hook-form";
import { IUser } from "../../lib/types";

type TFormValues = {
  username: string;
  email: string;
  password: string;
  phone: string;
  img: string;
};

const RegisterHookFormPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, formState, reset, control } =
    useForm<TFormValues>({
      defaultValues: {
        username: "",
        email: "",
        password: "",
        phone: "",
        img: "",
      },
      mode: "onBlur",
      reValidateMode: "onBlur",
    });
  //const navigate = useNavigate();

  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFile(target.files![0]);
  };

  //TODO: Відредагувати BackEnd - users
  const emailValidation = async (value: string) => {
    const data = (await newRequest.get(`/users${value}`)) as IUser;
    return !data || "Користувач з таким E-mail вже зареєстрований";
  };

  const onSubmit = async (data: TFormValues) => {
    console.log(data);
    if (formState.isSubmitSuccessful) {
      // const url = await upload(file);
      // try {
      //   await newRequest.post("/auth/register", { ...values, img: url });
      //   navigate("/");
      // } catch (err) {
      //   console.log(err);
      // }
      // reset();
    }
    // navigate("/products-admin");
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log(errors);
  };

  return (
    <div className={style.mainContainer}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <h1>Реєстрація нового користувача</h1>
        <label htmlFor="username">* Ім'я користувача</label>
        <input
          type="text"
          id="username"
          placeholder="ваше їм'я.."
          {...register("username", {
            required: {
              value: true,
              message: "Їм'я користувача є обов'язковим",
            },
          })}
        />
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
            validate: {
              emailAvailable: (fieldValue) => emailValidation(fieldValue),
            },
          })}
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Придумайте пароль",
            },
          })}
        />
        {/* <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="..."
          onChange={handleChange}
        /> */}
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
        <label htmlFor="img">Аватар</label>
        <input name="img" type="file" onChange={handleUpload} />
        <button
          type="submit"
          disabled={!formState.isDirty || formState.isSubmitting}
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default RegisterHookFormPage;
