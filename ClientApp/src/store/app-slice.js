import { createSlice } from "@reduxjs/toolkit";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    title: "Home",
    alert: {
      open: false,
      message: "",
      level: "",
    },
  },
  reducers: {
    setTitle: (state, { payload }) => {
      document.title = payload;
    },

    showAlert: (state, { payload }) => {
      state.alert.open = payload.open;
      state.alert.message = payload.message;
      state.alert.level = payload.level;
    },
  },
});

export const { setTitle, showAlert } = appSlice.actions;
export const selectAlert = (state) => state.app.alert;
export const selectTitle = (state) => state.app.title;
export default appSlice.reducer;
