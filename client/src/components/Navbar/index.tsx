import { Link, NavLink, useLocation } from "react-router-dom";
import style from "./navbar.module.scss";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  const currentUser = {
    id: 1,
    username: "Oleg Kvasn",
    isAdmin: true,
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
          {!currentUser && (
            <li>
              <Link to="/register">Реєстрація</Link>
            </li>
          )}
          {!currentUser && (
            <li>
              <button className={style.button}>
                <NavLink to="/login">Вхід</NavLink>
              </button>
            </li>
          )}
          {currentUser && (
            <li className={style.user} onClick={() => setOpen(!open)}>
              <img
                src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png"
                alt=""
              />
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
                  <Link to="/">Вихід</Link>
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
