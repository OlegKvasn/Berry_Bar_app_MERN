import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type CartState = {
  isOpen: boolean;
};

const initialState: CartState = {
  isOpen: false,
};

export const openCartSlice = createSlice({
  name: "open-cart",
  initialState,
  reducers: {
    openCloseCart: (state) => {
      if (state.isOpen) {
        state.isOpen = false;
      } else {
        state.isOpen = true;
      }
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const getCartState = (state: RootState) => state.openCart.isOpen;

// Action creators are generated for each case reducer function
export const { openCloseCart, closeCart } = openCartSlice.actions;

export default openCartSlice.reducer;
