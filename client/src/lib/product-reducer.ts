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

type ActionType =
  | ChangeInputAction
  | AddImageAction
  | RemoveImageAction
  | AddIngredientAction
  | RemoveIngredientAction;

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

type StateType = typeof INITIAL_STATE;

export const productReducer = (state: StateType, action: ActionType) => {
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

    default:
      return state;
  }
};
