import { useState } from "react";
import style from "./register.module.scss";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";

const initialValues = {
  username: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  img: "",
  address: "",
};

const RegisterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFile(target.files![0]);
  };

  const nandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await newRequest.post("/auth/register", { ...values, img: url });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.mainContainer}>
      <form onSubmit={nandleSubmit}>
        <h1>Реєстрація нового користувача</h1>
        <label htmlFor="username">Ім'я користувача</label>
        <input
          name="username"
          type="text"
          placeholder="ваше їм'я.."
          onChange={handleChange}
        />
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль</label>
        <input name="password" type="password" onChange={handleChange} />
        {/* <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="..."
          onChange={handleChange}
        /> */}
        <label htmlFor="phone">Номер телефону</label>
        <input
          name="phone"
          type="tel"
          placeholder="..."
          onChange={handleChange}
        />
        <label htmlFor="city">Місто</label>
        <input
          name="city"
          type="text"
          placeholder="Київ"
          onChange={handleChange}
        />
        <label htmlFor="address">Домашня адреса</label>
        <input
          name="address"
          type="text"
          placeholder="..."
          onChange={handleChange}
        />
        <label htmlFor="img">Аватар</label>
        <input name="img" type="file" onChange={handleUpload} />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default RegisterPage;
