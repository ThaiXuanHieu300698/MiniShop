import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app-slice";
import brandReducer from "./brand-slice";
import authReducer from "./auth-slice";
import productReducer from "./product-slice";
import cartReducer from "./cart-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    brand: brandReducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
