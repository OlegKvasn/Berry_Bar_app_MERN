import { useState } from "react";
import style from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../lib/utils";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [values, setValues] = useState(initialValues);
  // const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const nandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = values.email;
      const password = values.password;
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      // setError(err);
      console.log(err);
    }
  };

  return (
    <div className={style.mainContainer}>
      <form onSubmit={nandleSubmit}>
        <h1>Вхід</h1>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="ваш email"
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль</label>
        <input
          name="password"
          type="password"
          placeholder="..."
          onChange={handleChange}
        />
        <button type="submit">Вхід</button>
      </form>
    </div>
  );
};

export default LoginPage;
