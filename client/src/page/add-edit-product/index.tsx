import React, { useEffect, useReducer, useState } from "react";
import { category } from "../../lib/data";
import style from "./addProduct.module.scss";
import { INITIAL_STATE, productReducer } from "../../lib/product-reducer";
import { baseURL, newRequest, upload } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../UI/button";
import CancelButton from "../../UI/icon-button/cancel";
import DialogModal from "../../UI/dialog-modal";
import ProductCardCreating from "../../components/product-card-creating";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../components/error-modal";
import axios from "axios";
import { IProduct } from "../../lib/types";

type TInitialState = typeof INITIAL_STATE;

type THandleChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

const AddEditProductPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [errorWrongId, setErrorWrongId] = useState(false);
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProductForEdit = async () => {
        try {
          const res = await axios.get(`${baseURL}products/${id}`);

          const data = res.data as IProduct;
          dispatch({
            type: "CHANGE_INITIAL_STATE",
            payload: {
              title: data.title,
              category: data.category,
              price: data.price,
              salePrice: data.salePrice || "",
              cover: data.cover,
              ingredients: data.ingredients || [""],
              desc: data.desc || "",
            },
          });
        } catch (err) {
          console.log(err);
          setErrorWrongId(true);
        }
      };
      fetchProductForEdit();
    }
  }, [id]);

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

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: (newProduct: TInitialState) => {
      return newRequest.post("/products", newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const editProductMutation = useMutation({
    mutationFn: (editProduct: TInitialState) => {
      return newRequest.patch(`/products/${id}`, editProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (id) {
      e.preventDefault();
      editProductMutation.mutate(state);
      setOpenModal(false);
      navigate("/products-admin");
    } else {
      e.preventDefault();
      createProductMutation.mutate(state);
      setOpenModal(false);
      navigate("/products-admin");
    }
  };

  return (
    <main className={style.mainContainer}>
      {errorWrongId ? (
        <ErrorModal
          errorMessage="Продукту з таким ID не існує"
          navigateUrl="/products-admin"
          navigateText="До списку Продуктів"
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <h3>{id ? "Редагування продукту" : "Додати новий продукт"}</h3>
        <label htmlFor="title">* Назва</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Назва продукту"
          value={state.title}
          onChange={handleChange}
        />
        <label htmlFor="category">Категорія</label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={state.category}
        >
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
          value={state.price}
          onChange={handleChange}
        />
        <label htmlFor="salePrice">Ціна зі знижкою</label>
        <input
          type="text"
          name="salePrice"
          id="salePrice"
          placeholder="Ціна продукту якщо є знижка"
          value={state.salePrice}
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
          value={state.desc}
          onChange={handleChange}
        />
        <p>* Продукт повинен містити Назву, Ціну та Зображення</p>

        <Button
          type="button"
          onClick={() => setOpenModal(true)}
          disabled={
            state.title.length < 1 ||
            state.price.length < 1 ||
            state.cover.length < 1
          }
        >
          {id ? "Редагувати" : " Створити"}
        </Button>
        <DialogModal isOpen={isOpenModal} onClose={() => setOpenModal(false)}>
          <ProductCardCreating
            title={state.title}
            category={state.category}
            cover={state.cover}
            ingredients={state.ingredients}
            desc={state.desc}
            salePrice={state.salePrice}
            price={state.price}
          />
          <Button type="submit">Підтвердити</Button>
        </DialogModal>
      </form>
    </main>
  );
};

export default AddEditProductPage;
