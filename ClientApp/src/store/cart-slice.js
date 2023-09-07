import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    totalItem: 0,
    totalPayment: 0,
  },
  reducers: {
    addItem: (state, { payload }) => {
      console.log(payload);
      if (state.cart.length === 0) {
        state.cart.push(payload);
      } else {
        if (state.cart.find((item) => item.product.id === payload.product.id)) {
          state.cart = state.cart.map((item) =>
            item.product.id === payload.product.id
              ? {
                  product: item.product,
                  quantity: (item.quantity += 1),
                }
              : item
          );
        } else {
          state.cart.push(payload);
        }
      }
      state.totalItem = state.cart.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0
      );
      state.totalPayment = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.quantity * currentValue.product.price,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    fetchCart: (state) => {
      state.cart = JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      console.log(state.cart);
      state.totalItem = state.cart.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0
      );
      state.totalPayment = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.quantity * currentValue.product.price,
        0
      );
    },

    deleteItem: (state, { payload }) => {
      state.cart = JSON.parse(localStorage.getItem("cart")).filter(
        (item) => item.product.id !== payload
      );
      state.totalItem = state.cart.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0
      );
      state.totalPayment = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.quantity * currentValue.product.price,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decreItem: (state, { payload }) => {
      if (
        JSON.parse(localStorage.getItem("cart")).find(
          (item) => item.product.id === payload && item.quantity === 1
        )
      ) {
        return;
      }
      state.cart = JSON.parse(localStorage.getItem("cart")).map((item) =>
        item.product.id === payload
          ? {
              product: item.product,
              quantity: (item.quantity -= 1),
            }
          : item
      );
      state.totalItem = state.cart.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0
      );
      state.totalPayment = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.quantity * currentValue.product.price,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addItem, fetchCart, decreItem, deleteItem } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectTotalItem = (state) => state.cart.totalItem;
export const selectTotalPayment = (state) => state.cart.totalPayment;

export default cartSlice.reducer;
