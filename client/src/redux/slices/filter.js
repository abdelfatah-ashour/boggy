import { createSlice } from "@reduxjs/toolkit";

const Filter = createSlice({
  name: "filter",
  initialState: false,
  reducers: {
    DISPLAY: function (state) {
      return (state = true);
    },
    HIDDEN: function (state) {
      return (state = false);
    },
  },
});

export const { DISPLAY, HIDDEN } = Filter.actions;
export const filterReducers = Filter.reducer;
