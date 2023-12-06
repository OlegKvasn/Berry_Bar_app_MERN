import { useState } from "react";
import style from "./register.module.scss";
//import { useNavigate } from "react-router-dom";
import { newRequest, upload } from "../../lib/utils";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "../../lib/types";
import { z } from "zod";
import TextField from "@mui/material/TextField";

type TFormValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  img: string;
};

const validationSchema = z.object({
  username: z.string().nonempty("Їм'я користувача є обов'язковим"),
  email: z
    .string()
    .nonempty("E-mail є обов'язковим")
    .email("Неправильний E-mail формат"),
  password: z.string().nonempty("Пароль повинен містити більше 5 символів"),
});

//TODO: Відредагувати BackEnd - users
const emailValidation = async (value: string) => {
  const data = (await newRequest.get(`/users${value}`)) as IUser;
  return !data || "Користувач з таким E-mail вже зареєстрований";
};

const usernameFormField = {
  required: {
    value: true,
    message: "Їм'я користувача є обов'язковим",
  },
};

const emailFormField = {
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Неправильний email формат",
  },
  validate: {
    emailAvailable: (fieldValue: string) => emailValidation(fieldValue),
  },
};

const passwordFormField = {
  minLength: {
    value: 5,
    message: "Пароль повинен містити більше 5 символів",
  },
};

const passwordConfirmationFormField = {
  required: {
    value: true,
    message: "Пароль не співпадає",
  },
  minLength: {
    value: 5,
    message: "Пароль повинен мати більше 5 символів",
  },
};

const phoneFormField = {
  required: {
    value: true,
    message: "Номер телефону є обов'язковим",
  },
  minLength: {
    value: 5,
    message: "Номер телефону повинен містити більше 5 цифр",
  },
};

const RegisterHookFormPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, formState, reset, control } =
    useForm<TFormValues>({
      defaultValues: {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        img: "",
      },
      resolver: zodResolver(validationSchema),
      mode: "onTouched",
      //reValidateMode: "onBlur",
    });
  //const navigate = useNavigate();

  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFile(target.files![0]);
  };

  const onSubmit = async (data: TFormValues) => {
    if (formState.isSubmitSuccessful) {
      // const url = await upload(file);
      // try {
      //   await newRequest.post("/auth/register", { ...values, img: url });
      //   navigate("/");
      // } catch (err) {
      //   console.log(err);
      // }
      // reset();
      console.log(data);
    }
    // navigate("/products-admin");
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
          label="Їм'я користувача"
          variant="outlined"
          {...register("username")}
          error={!!formState.errors.username}
          helperText={formState.errors.username?.message}
        />
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          {...register("email")}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />
        <TextField
          id="password"
          label="Пароль"
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
        />
        <TextField
          id="passwordConfirmation"
          label="Підтвердіть пароль"
          variant="outlined"
          type="password"
          {...register("passwordConfirmation")}
          error={!!formState.errors.passwordConfirmation}
          helperText={formState.errors.passwordConfirmation?.message}
        />
        <TextField
          id="phone"
          label="* Номер телефону"
          variant="outlined"
          type="tel"
          {...register("phone", phoneFormField)}
          error={!!formState.errors.phone}
          helperText={formState.errors.phone?.message}
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
