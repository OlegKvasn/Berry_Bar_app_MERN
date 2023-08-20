import { useState } from "react";
import style from "./login.module.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
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
      const username = values.username;
      const password = values.password;
      const res = await newRequest.post("/auth/login", { username, password });
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
        <label htmlFor="username">Їм'я користувача</label>
        <input
          name="username"
          type="text"
          placeholder="your name..."
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
