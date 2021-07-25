import { createSlice } from "@reduxjs/toolkit";

const initAuth = {
  isLogin: false,
  role: false,
  userId: false,
  isUser: false,
  isAdmin: false,
  email: false,
  displayName: false,
};

const auth = createSlice({
  name: "auth",
  initialState: initAuth,
  reducers: {
    loginUser: function (state, { payload }) {
      return (state = {
        ...state,
        isLogin: true,
        role: payload.role,
        userId: payload.userId,
        isUser: true,
        isAdmin: false,
        email: payload.email,
        displayName: payload.displayName,
      });
    },
    loginAdmin: function (state, { payload }) {
      return (state = {
        ...state,
        isLogin: true,
        role: payload.role,
        userId: payload.userId,
        isUser: false,
        isAdmin: true,
        email: payload.email,
        displayName: payload.displayName,
      });
    },
    LOGOUT: function (state, action) {
      return (state = {
        isLogin: false,
        role: false,
        userId: false,
        isUser: false,
        isAdmin: false,
        email: false,
        displayName: false,
      });
    },
  },
});

export const { loginUser, loginAdmin, LOGOUT } = auth.actions;
export const authReducers = auth.reducer;
