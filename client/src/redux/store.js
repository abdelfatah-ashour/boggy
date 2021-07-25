import { configureStore } from "@reduxjs/toolkit";
import { filterReducers } from "./slices/filter";
import { cartReducers } from "./slices/Cart";
import { authReducers } from "./slices/auth";
export const store = configureStore({
  reducer: {
    filter: filterReducers,
    cart: cartReducers,
    auth: authReducers,
  },
});
