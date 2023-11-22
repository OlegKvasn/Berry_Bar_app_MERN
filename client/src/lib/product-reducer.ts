type TState = {
  title: string;
  category: string;
  price: string;
  salePrice: string;
  cover: string;
  ingredients: string[];
  desc: string;
};

type ChangeInputAction = {
  type: "CHANGE_INPUT";
  payload: {
    name: string;
    value: string;
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

type ChahgeInitialStateAction = {
  type: "CHANGE_INITIAL_STATE";
  payload: TState;
};

type ActionType =
  | ChangeInputAction
  | AddImageAction
  | RemoveImageAction
  | AddIngredientAction
  | RemoveIngredientAction
  | ChahgeInitialStateAction;

export const INITIAL_STATE = {
  title: "",
  category: "pizza",
  price: "",
  salePrice: "",
  cover: "",
  // images: [""],
  ingredients: [""],
  desc: "",
};

export const productReducer = (state: TState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_INPUT":
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
    case "CHANGE_INITIAL_STATE":
      return {
        title: action.payload.title,
        category: action.payload.category,
        price: action.payload.price,
        salePrice: action.payload.salePrice,
        cover: action.payload.cover,
        ingredients: action.payload.ingredients,
        desc: action.payload.desc,
      };

    default:
      return state;
  }
};
