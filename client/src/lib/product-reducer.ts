export type TState = {
  title: string;
  title_en: string;
  category: string;
  price: string;
  salePrice: string;
  cover: string;
  ingredients: string[];
  ingredients_en: string[];
  desc: string;
  desc_en: string;
  isVegan: boolean;
  isNew: boolean;
  isHot: boolean;
  isDeal: boolean;
};

type ChangeInputAction = {
  type: "CHANGE_INPUT";
  payload: {
    name: string;
    value: string;
  };
};

type ChangeCheckboxAction = {
  type: "CHANGE_CHECKBOX";
  payload: {
    name: string;
    value: boolean;
  };
};

type AddImageAction = {
  type: "ADD_IMAGE";
  payload: {
    cover: string;
    // images: string[];
  };
};

type RemoveImageAction = {
  type: "REMOVE_IMAGE";
  payload: {
    cover: string;
  };
};

type AddIngredientAction = {
  type: "ADD_INGREDIENT";
  payload: string;
};

type RemoveIngredientAction = {
  type: "REMOVE_INGREDIENT";
  payload: string;
};

type AddIngredientEnAction = {
  type: "ADD_INGREDIENT_EN";
  payload: string;
};

type RemoveIngredientEnAction = {
  type: "REMOVE_INGREDIENT_EN";
  payload: string;
};

type ChahgeInitialStateAction = {
  type: "CHANGE_INITIAL_STATE";
  payload: TState;
};

type ActionType =
  | ChangeInputAction
  | ChangeCheckboxAction
  | AddImageAction
  | RemoveImageAction
  | AddIngredientAction
  | RemoveIngredientAction
  | ChahgeInitialStateAction
  | AddIngredientEnAction
  | RemoveIngredientEnAction;

export const INITIAL_STATE = {
  title: "",
  title_en: "",
  category: "pizza",
  price: "",
  salePrice: "",
  cover: "",
  // images: [""],
  ingredients: [""],
  ingredients_en: [""],
  desc: "",
  desc_en: "",
  isVegan: false,
  isNew: false,
  isHot: false,
  isDeal: false,
} satisfies TState;

export const productReducer = (state: TState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "CHANGE_CHECKBOX":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGE":
      return {
        ...state,
        cover: action.payload.cover,
        // images: action.payload.images,
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        cover: "",
      };
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingr) => ingr !== action.payload
        ),
      };
    case "ADD_INGREDIENT_EN":
      return {
        ...state,
        ingredients_en: [...state.ingredients_en, action.payload],
      };
    case "REMOVE_INGREDIENT_EN":
      return {
        ...state,
        ingredients_en: state.ingredients_en.filter(
          (ingr) => ingr !== action.payload
        ),
      };
    case "CHANGE_INITIAL_STATE":
      return {
        title: action.payload.title,
        title_en: action.payload.title_en,
        category: action.payload.category,
        price: action.payload.price,
        salePrice: action.payload.salePrice,
        cover: action.payload.cover,
        ingredients: action.payload.ingredients,
        ingredients_en: action.payload.ingredients_en,
        desc: action.payload.desc,
        desc_en: action.payload.desc_en,
        isVegan: action.payload.isVegan,
        isNew: action.payload.isNew,
        isHot: action.payload.isHot,
        isDeal: action.payload.isDeal,
      };

    default:
      return state;
  }
};
