import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "./navbar.module.scss";
import { useEffect, useState } from "react";
import { getCurrentUser, newRequest } from "../../lib/utils";
import { category } from "../../lib/data";

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

  const currentUser = getCurrentUser();

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
            <a href="#contacts">Контакти</a>
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
                      <Link to="/products-admin">Всі продукти</Link>
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
          <section className={style.menu}>
            {category.map((cat) => (
              <Link
                key={cat.value}
                className={style.menuLink}
                to={`/products?category=${cat.value}`}
              >
                {cat.name}
              </Link>
            ))}
          </section>
          {/* <hr /> */}
        </>
      )}
    </header>
  );
};

export default Navbar;
