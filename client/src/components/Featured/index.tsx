import { useState } from "react";
import style from "./featured.module.scss";
import { useNavigate } from "react-router-dom";
import { popular } from "../../lib/data";
import { Trans, useTranslation } from "react-i18next";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const hadleSubmit = () => {
    navigate(`/products?search=${input}`);
  };
  return (
    <>
      <section className={style.mainContainer}>
        <div className={style.left}>
          <h1>
            <Trans i18nKey={"featured.line"} components={{ 1: <i></i> }} />
          </h1>
          <div className={style.search}>
            <div className={style.searchInput}>
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder={t("featured.search_placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={hadleSubmit}>{t("featured.search_btn")}</button>
          </div>
          <div className={style.popular}>
            <span>{t("featured.popular_requests")}</span>
            {popular.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  navigate(
                    `/products?search=${
                      i18n.language === "en" ? item.en : item.uk
                    }`
                  )
                }
              >
                {i18n.language === "en" ? item.en : item.uk}
              </button>
            ))}
          </div>
        </div>
        <div className={style.right}>
          <img src="./img/Berry_bar.png" alt="" />
        </div>
      </section>
    </>
  );
};

export default Featured;
