import style from "./featured.module.scss";

const Featured = () => {
  return (
    <>
      <section className={style.mainContainer}>
        <div className={style.left}>
          <h1>
            <i>Бері Бар</i> ресторан піцерія на вул. Княгині Ольги
          </h1>
          <div className={style.search}>
            <div className={style.searchInput}>
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder="Знайди те, що хочеш скуштувати" />
            </div>
            <button>Пошук</button>
          </div>
          <div className={style.popular}>
            <span>Популярне:</span>
            <button>Pizza</button>
            <button>Burger</button>
            <button>Суші</button>
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
