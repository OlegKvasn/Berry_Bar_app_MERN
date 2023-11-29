import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IProduct, IProductInCart } from "../types";
import { RootState } from "./store";

const setLocalStorage = (state: IProductInCart[]) => {
  localStorage.setItem("productCart", JSON.stringify(state));
};

const getInitialState = () => {
  return JSON.parse(
    localStorage.getItem("productCart") || "[]"
  ) as IProductInCart[];
};
const initialState = getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex(
        (product) => product.productId === action.payload._id
      );
      if (productIndex !== -1) {
        state[productIndex].quantity++;
        setLocalStorage(state);
      } else {
        //state.push({ ...action.payload, quantity: 1 });
        state.push({
          productId: action.payload._id,
          productImage: action.payload.cover,
          productName: action.payload.title,
          productPrice: Number(action.payload.price),
          quantity: 1,
        });
        setLocalStorage(state);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIndex = state.findIndex(
        (product) => product.productId === action.payload
      );
      if (state[productIndex].quantity > 1) {
        state[productIndex].quantity--;
        setLocalStorage(state);
      } else {
        setLocalStorage(
          state.filter((product) => product.productId !== action.payload)
        );
        return state.filter((product) => product.productId !== action.payload);
      }
    },
  },
});

export const getCartProducts = (state: RootState) => state.cart;
export const getTotalPrice = (state: RootState) =>
  state.cart.reduce(
    (acc, next) => (acc += next.quantity * next.productPrice),
    0
  );
export const getTotalProducts = (state: RootState) =>
  state.cart.reduce((acc, next) => (acc += next.quantity), 0);

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
