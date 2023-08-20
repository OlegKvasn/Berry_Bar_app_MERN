import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "./navbar.module.scss";
import { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { IUser } from "../../types/models";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  const currentUser: IUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header
      className={style.header}
      data-navbar={active || pathname !== "/" ? "active" : "inactive"}
    >
      <nav className={style.mainContainer}>
        <Link className={style.logo} to="/">
          Berry Bar
        </Link>
        <ul className={style.links}>
          <li>
            <Link to="/products">Меню</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
          <li>
            <Link to="/cart">Корзина</Link>
          </li>
          {!currentUser.username && (
            <li>
              <Link to="/register">Реєстрація</Link>
            </li>
          )}
          {!currentUser.username && (
            <li>
              <button className={style.button}>
                <NavLink to="/login">Вхід</NavLink>
              </button>
            </li>
          )}
          {currentUser.username && (
            <li className={style.user} onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className={style.options}>
                  {currentUser?.isAdmin && (
                    <>
                      <Link to="/add-product">Добавити новий продукт</Link>
                      <Link to="/products">Всі продукти</Link>
                    </>
                  )}
                  <Link to="/orders">Замовлення</Link>
                  <div onClick={handleLogout}>Вихід</div>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className={style.menu}>
            <Link className={style.menuLink} to="/">
              Pizza
            </Link>
            <Link className={style.menuLink} to="/">
              Burger
            </Link>
            <Link className={style.menuLink} to="/">
              Паста
            </Link>
            <Link className={style.menuLink} to="/">
              Салати
            </Link>
            <Link className={style.menuLink} to="/">
              Гриль
            </Link>
          </div>
          {/* <hr /> */}
        </>
      )}
    </header>
  );
};

export default Navbar;
