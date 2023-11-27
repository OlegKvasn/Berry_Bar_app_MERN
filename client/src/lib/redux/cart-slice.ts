import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IProduct, IProductInCart } from "../types";
import { RootState } from "./store";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as IProductInCart[],
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex(
        (product) => product.productId === action.payload._id
      );
      if (productIndex !== -1) {
        state[productIndex].quantity += 1;
      } else {
        //state.push({ ...action.payload, quantity: 1 });
        state.push({
          productId: action.payload._id,
          productImage: action.payload.cover,
          productName: action.payload.title,
          productPrice: Number(action.payload.price),
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIndex = state.findIndex(
        (product) => product.productId === action.payload
      );
      if (state[productIndex].quantity > 1) {
        state[productIndex].quantity -= 1;
      } else {
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

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
