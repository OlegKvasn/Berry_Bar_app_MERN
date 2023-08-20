import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.top}>
          <div className={style.item}>
            <h2>Телефон:</h2>
            <span>098 186 0999</span>
          </div>
          <div className={style.item}>
            <h2>Адреса:</h2>
            <span>Петропавлівська Борщагівка</span>
            <span>вул.Княгіні Ольги 65</span>
          </div>
          <div className={style.item}>
            <h2>Графік роботи:</h2>
            <span>пн-пт з 8:00 до 22:00</span>
            <span>сб-нд з 10:00 до 22:00</span>
          </div>
        </div>
        <hr />
        <div className={style.bottom}>
          <div className={style.left}>
            <h2>Berry Bar</h2>
            <span>{`Всі права захищені «Berry Bar» ${new Date().getFullYear()}`}</span>
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
