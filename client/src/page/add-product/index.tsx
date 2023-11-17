import React, { useReducer, useState } from "react";
import { category } from "../../lib/data";
import style from "./addProduct.module.scss";
import { INITIAL_STATE, productReducer } from "../../lib/product-reducer";
import { newRequest, upload } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../UI/button";
import CancelButton from "../../UI/icon-button/cancel";
import DialogModal from "../../UI/dialog-modal";
// import { useNavigate } from "react-router-dom";

type TInitialState = typeof INITIAL_STATE;

type THandleChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

const AddProductPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

  const handleChange = ({ target }: THandleChange) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: target.name, value: target.value },
    });
  };

  const handleAddIngredient = () => {
    dispatch({
      type: "ADD_INGREDIENT",
      payload: ingredient,
    });
    setIngredient("");
  };

  const handleUpload = async () => {
    try {
      const cover = await upload(coverFile);
      // let images = [""];
      // if (files) {
      //   images = await Promise.all(
      //     [...files].map(async (file) => {
      //       const url = await upload(file);
      //       return url;
      //     })
      //   );
      // }
      if (cover) {
        setUploaded(true);
      }
      dispatch({ type: "ADD_IMAGE", payload: { cover } });
    } catch (err) {
      console.log(err);
    }
  };

  const removeImage = () => {
    dispatch({ type: "REMOVE_IMAGE", payload: { cover: "" } });
    setUploaded(false);
  };

  // const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct: TInitialState) => {
      return newRequest.post("/products", newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(state);
    setOpen(false);
    // navigate("/products-admin");
  };

  console.log(state);

  return (
    <main className={style.mainContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3>Додати новий продукт</h3>
        <label htmlFor="title">* Назва</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Назва продукту"
          onChange={handleChange}
        />
        <label htmlFor="category">Категорія</label>
        <select name="category" id="category" onChange={handleChange}>
          {category.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
        <label htmlFor="price">* Ціна</label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Ціна продукту"
          onChange={handleChange}
        />
        <label htmlFor="salePrice">Ціна зі знижкою</label>
        <input
          type="text"
          name="salePrice"
          id="salePrice"
          placeholder="Ціна продукту якщо є знижка"
          onChange={handleChange}
        />
        <label htmlFor="cover">* Зображення</label>
        <div className={style.images}>
          <input
            type="file"
            name="cover"
            id="cover"
            onChange={(e) => setCoverFile(e.target.files![0])}
          />
          {/* 
            <label htmlFor="images">Кілька Зображень</label>
            <input
              type="file"
              multiple
              name="images"
              onChange={(e) => setFiles(e.target.files!)}
            /> */}
          <Button type="button" onClick={handleUpload} disabled={uploaded}>
            {uploaded ? "Фото Завантажено" : "Завантажити"}
          </Button>
        </div>
        {state.cover.length > 0 ? (
          <div className={style.addedImage}>
            <span>{state.cover}</span>
            <CancelButton type="button" onClick={removeImage} />
          </div>
        ) : null}
        <label htmlFor="ing">Додати Інгредієнти</label>
        <div className={style.add}>
          <input
            type="text"
            placeholder="Інгредієнт"
            name="ing"
            id="ing"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
          />
          <Button type="button" onClick={handleAddIngredient}>
            додати
          </Button>
        </div>
        <div className={style.addedIngredients}>
          {state.ingredients.map((ing, index) => (
            <React.Fragment key={index}>
              <span>{ing}</span>
              {ing.length > 0 ? (
                <CancelButton
                  type="button"
                  onClick={() =>
                    dispatch({ type: "REMOVE_INGREDIENT", payload: ing })
                  }
                />
              ) : // <button
              //   onClick={() =>
              //     dispatch({ type: "REMOVE_INGREDIENT", payload: ing })
              //   }
              // >
              //   X
              // </button>
              null}
            </React.Fragment>
          ))}
        </div>
        <label htmlFor="desc">Опис</label>
        <textarea
          name="desc"
          id="desc"
          placeholder="Додатковий опис(опціонально)"
          cols={30}
          rows={10}
          onChange={handleChange}
        />
        <p>* Продукт повинен містити Назву, Ціну та Зображення</p>
        <Button
          type="button"
          onClick={() => setOpen(true)}
          disabled={
            state.title.length < 1 ||
            state.price.length < 1 ||
            state.cover.length < 1
          }
        >
          Створити
        </Button>
        <DialogModal open={isOpen} onClose={() => setOpen(false)}>
          <Button type="submit">Підтвердити</Button>
        </DialogModal>
      </form>
    </main>
  );
};

export default AddProductPage;
