import { Link, NavLink, useLocation } from "react-router-dom";
import style from "./navbar.module.scss";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../lib/utils";
import { category } from "../../lib/data";
import AccountMenu from "../account-menu";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const currentUser = getCurrentUser();
  const { t, i18n } = useTranslation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

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
            <Link to="/products">{t("navigation.menu")}</Link>
          </li>
          <li>
            <a href="#contacts">{t("navigation.contacts")}</a>
          </li>
          <li>
            <Link to="/cart">{t("navigation.cart")}</Link>
          </li>
          {!currentUser.username && (
            <li>
              <Link to="/register">{t("navigation.register")}</Link>
            </li>
          )}
          {!currentUser.username && (
            <li>
              <button className={style.button}>
                <NavLink to="/login">{t("navigation.login")}</NavLink>
              </button>
            </li>
          )}
          {currentUser.username ? <AccountMenu /> : null}
          <button
            disabled={i18n.language === "en"}
            onClick={() => i18n.changeLanguage("en")}
          >
            en
          </button>
          <button
            disabled={i18n.language === "uk"}
            onClick={() => i18n.changeLanguage("uk")}
          >
            ua
          </button>
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
