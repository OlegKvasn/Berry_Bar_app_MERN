import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={style.mainContainer}>
        <span>{`${new Date().getFullYear()} Copyrights`}</span>
      </div>
    </footer>
  );
};

export default Footer;
