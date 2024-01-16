import style from "./footer.module.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer id="contacts" className={style.footer}>
      <div className={style.container}>
        <div className={style.top}>
          <div className={style.item}>
            <h2>{t("footer.phone")}</h2>
            <span>098 186 0999</span>
          </div>
          <div className={style.item}>
            <h2>{t("footer.address")}</h2>
            <span>{t("footer.address_line_1")}</span>
            <span>{t("footer.address_line_2")}</span>
          </div>
          <div className={style.item}>
            <h2>{t("footer.schedule")}</h2>
            <span>
              {t("footer.schedule_line_1", { from: "8:00", till: "22:00" })}
            </span>
            <span>
              {t("footer.schedule_line_2", { from: "10:00", till: "22:00" })}
            </span>
          </div>
        </div>
        <hr />
        <div className={style.bottom}>
          <div className={style.left}>
            <h2>Berry Bar</h2>
            <span>
              {t("footer.rights", { year: new Date().getFullYear() })}
            </span>
          </div>
          <div className={style.right}>
            <img src="/img/twitter.png" alt="" />
            <img src="/img/facebook.png" alt="" />
            <img src="/img/instagram.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
