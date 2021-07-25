import { createSlice } from "@reduxjs/toolkit";

const initCart = [];

const cart = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    allInCart: function (state, { payload }) {
      return (state = payload);
    },
  },
});

export const { allInCart } = cart.actions;
export const cartReducers = cart.reducer;
