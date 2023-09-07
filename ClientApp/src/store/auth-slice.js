import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
export const authSlide = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      console.log(state.user)
    },
    logoutSuccess: (state) => {
      state.user = undefined;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlide.actions;

export const login = (model) => async (dispatch) => {
  return AuthService.loginAsync(model).then((res) => {
    console.log("chạy vào slice")
    dispatch(loginSuccess(res.data.user));
  });
};

export const logout = () => async (dispatch) => {
  AuthService.logout();
  dispatch(logoutSuccess());
};

export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectUser = (state) => state.auth.user;

export default authSlide.reducer;
