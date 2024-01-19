import style from "./loading.module.scss";

const LoadingDots = () => {
  return (
    <section className={style.loading}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  );
};

export default LoadingDots;
