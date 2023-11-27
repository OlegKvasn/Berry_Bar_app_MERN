import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./countersSlice.ts";
import usersReducer from "./usersSlice.ts";
import cartReducer from "./cart-slice.ts";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    counters: counterReducer,
    users: usersReducer,
    cart: cartReducer,
  },
});
