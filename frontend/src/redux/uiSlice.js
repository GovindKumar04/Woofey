import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    authModal: null, // null | "login" | "signup"
  },
  reducers: {
    openLogin: (state) => {
      state.authModal = "login";
    },
    openSignup: (state) => {
      state.authModal = "signup";
    },
    closeAuthModal: (state) => {
      state.authModal = null;
    },
  },
});

export const { openLogin, openSignup, closeAuthModal } = uiSlice.actions;
export default uiSlice.reducer;
