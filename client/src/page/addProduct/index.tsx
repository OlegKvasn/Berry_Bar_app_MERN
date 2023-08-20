import style from "./addProduct.module.scss";

export interface Product {
  price: string;
  cover: string;
}

const AddProductPage = () => {
  return (
    <main className={style.mainContainer}>
      <form className={style.form}>
        <h3>Додати новий продукт</h3>
        <label htmlFor="title">Назва</label>
        <input type="text" name="title" placeholder="Назва продукту" />
        <label htmlFor="category">Назва</label>
        <select name="category" id="category">
          <option value="pizza">Pizza</option>
          <option value="burger">Burger</option>
          <option value="grill">Гриль</option>
          <option value="salad">Салат</option>
        </select>
        <label htmlFor="price">Ціна</label>
        <input type="text" name="price" placeholder="Ціна продукту" />
        <label htmlFor="cover">Титулка</label>
        <input type="file" name="cover" />
        <label htmlFor="images">Зображення</label>
        <input type="file" multiple name="images" />
        <label htmlFor="ingredients">Склад</label>
        <textarea
          name="ingredients"
          placeholder="Що входить в склад(опціонально)"
          cols={30}
          rows={10}
        />
        <label htmlFor="desc">Опис</label>
        <textarea
          name="desc"
          placeholder="Додатковий опис(опціонально)"
          cols={30}
          rows={10}
        />
        <button
          type="submit"
          className={style.button}
          // disabled={   !values.clientName || !values.email || !values.message || !checked}
        >
          Створити
        </button>
      </form>
    </main>
  );
};

export default AddProductPage;
