import React, { useEffect, useReducer, useState } from "react";
import { category } from "../../lib/data";
import style from "./addProduct.module.scss";
import {
  INITIAL_STATE,
  TState,
  productReducer,
} from "../../lib/product-reducer";
import { baseURL, newRequest, upload } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import CustomButton from "../../UI/button";
import CancelButton from "../../UI/icon-button/cancel";
import DialogModal from "../../UI/dialog-modal";
import ProductCardCreating from "../../components/product-card-creating";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../components/error-modal";
import axios from "axios";
import { IProduct } from "../../lib/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type THandleChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

const AddEditProductPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [ingredient_en, setIngredient_en] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [errorWrongId, setErrorWrongId] = useState(false);
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
  const { id } = useParams();
  const navigate = useNavigate();

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
              title_en: data.title_en,
              category: data.category,
              price: data.price,
              salePrice: data.salePrice || "",
              cover: data.cover,
              ingredients: data.ingredients || [""],
              ingredients_en: data.ingredients_en || [""],
              desc: data.desc || "",
              desc_en: data.desc_en || "",
              isVegan: data.isVegan,
              isNewIncome: data.isNewIncome,
              isHot: data.isHot,
              isDeal: data.isDeal,
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

  const handleChangeCheckbox = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_CHECKBOX",
      payload: { name: target.name, value: target.checked },
    });
  };

  const handleAddIngredient = () => {
    dispatch({
      type: "ADD_INGREDIENT",
      payload: ingredient,
    });
    setIngredient("");
  };

  const handleAddIngredientEn = () => {
    dispatch({
      type: "ADD_INGREDIENT_EN",
      payload: ingredient_en,
    });
    setIngredient_en("");
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

  const createProductMutation = useMutation({
    mutationFn: (newProduct: TState) => {
      return newRequest.post("/products", newProduct);
    },
  });

  const editProductMutation = useMutation({
    mutationFn: (editProduct: TState) => {
      return newRequest.patch(`/products/${id}`, editProduct);
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
    <section className={style.mainContainer}>
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
        <label htmlFor="title_en">* Назва (English version)</label>
        <input
          type="text"
          name="title_en"
          id="title_en"
          placeholder="Назва продукту (Англ)"
          value={state.title_en}
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
          <CustomButton
            type="button"
            onClick={handleUpload}
            disabled={uploaded}
          >
            {uploaded ? "Фото Завантажено" : "Завантажити"}
          </CustomButton>
        </div>
        {state.cover.length > 0 ? (
          <div className={style.addedImage}>
            <Link to={state.cover}>
              <img
                className={style.productImage}
                src={state.cover}
                alt="some image"
              />
            </Link>
            <CancelButton type="button" onClick={removeImage} />
          </div>
        ) : null}
        <fieldset>
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
            <CustomButton type="button" onClick={handleAddIngredient}>
              додати
            </CustomButton>
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
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor="ing_en">Додати Інгредієнти (English version)</label>
          <div className={style.add}>
            <input
              type="text"
              placeholder="Ingredient (in english)"
              name="ing_en"
              id="ing_en"
              onChange={(e) => setIngredient_en(e.target.value)}
              value={ingredient_en}
            />
            <CustomButton type="button" onClick={handleAddIngredientEn}>
              додати
            </CustomButton>
          </div>
          <div className={style.addedIngredients}>
            {state.ingredients_en.map((ing, index) => (
              <React.Fragment key={index}>
                <span>{ing}</span>
                {ing.length > 0 ? (
                  <CancelButton
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_INGREDIENT_EN", payload: ing })
                    }
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        <label htmlFor="desc">Опис</label>
        <textarea
          name="desc"
          id="desc"
          placeholder="Додатковий опис(опціонально)"
          cols={20}
          rows={5}
          value={state.desc}
          onChange={handleChange}
        />
        <label htmlFor="desc_en">Опис (English version)</label>
        <textarea
          name="desc_en"
          id="desc_en"
          placeholder="Додатковий опис(English version)"
          cols={20}
          rows={5}
          value={state.desc_en}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.isVegan}
              name="isVegan"
              onChange={handleChangeCheckbox}
            />
          }
          label="Для вегетаріанців"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.isNewIncome}
              name="isNewIncome"
              onChange={handleChangeCheckbox}
            />
          }
          label="Новинка"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.isHot}
              name="isHot"
              onChange={handleChangeCheckbox}
            />
          }
          label="Топ замовлень"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.isDeal}
              name="isDeal"
              onChange={handleChangeCheckbox}
            />
          }
          label="Діє Знижка"
        />
        <p>
          * Продукт повинен містити Назву (на обох мовах), Ціну та Зображення
        </p>

        <CustomButton
          type="button"
          onClick={() => setOpenModal(true)}
          disabled={
            state.title.length < 1 ||
            state.price.length < 1 ||
            state.cover.length < 1
          }
        >
          {id ? "Редагувати" : " Створити"}
        </CustomButton>
        <DialogModal isOpen={isOpenModal} onClose={() => setOpenModal(false)}>
          <ProductCardCreating
            title={state.title}
            title_en={state.title_en}
            category={state.category}
            cover={state.cover}
            ingredients={state.ingredients}
            ingredients_en={state.ingredients_en}
            desc={state.desc}
            desc_en={state.desc_en}
            salePrice={state.salePrice}
            price={state.price}
            isVegan={state.isVegan}
            isNewIncome={state.isNewIncome}
            isHot={state.isHot}
            isDeal={state.isDeal}
          />
          <CustomButton type="submit">Підтвердити</CustomButton>
        </DialogModal>
      </form>
    </section>
  );
};

export default AddEditProductPage;
