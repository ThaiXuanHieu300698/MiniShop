import { createSlice } from "@reduxjs/toolkit";
import { getAsync } from "../helpers/axios-helper";
export const initIProduct = () => {
  return {
    id: 0,
    name: "",
    originalPrice: 0.0,
    price: 0.0,
    description: "",
    brandId: 0,
    categoryIds: [],
    thumbnailImage: null,
  };
};

export const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    product: initIProduct(),
    products: [],
  },
  reducers: {
    initProduct: (state) => {
      state.product = initIProduct();
    },

    fetchProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },

    fetchProductSuccess: (state, { payload }) => {
      state.product = payload;
    },

    fetchProductById: (state, { payload }) => {
      let product = state.products.find((p) => p.id === payload);
      state.product.id = product.id;
      state.product.name = product.name;
      state.product.originalPrice = product.originalPrice;
      state.product.price = product.price;
      state.product.description = product.description;
      state.product.brandId = product.brandId;
      state.product.categoryIds = product.categoryIds;
    },

    setProduct: (state, { payload }) => {
      switch (payload.name) {
        case "name":
          state.product.name = payload.value;
          break;
        case "originalPrice":
          state.product.originalPrice = payload.value;
          break;
        case "price":
          state.product.price = payload.value;
          break;
        case "description":
          state.product.description = payload.value;
          break;
        case "brandId":
          state.product.brandId = payload.value;
          break;
        case "categoryIds":
          state.product.categoryIds = payload.value;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  initProduct,
  fetchProductsSuccess,
  fetchProductSuccess,
  fetchProductById,
  setProduct,
} = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  return getAsync("/api/Products").then((res) => {
    dispatch(fetchProductsSuccess(res.data));
  });
};

export const fetchProduct = (id) => async (dispatch) => {
  return getAsync(`/api/Products/${id}`).then((res) => {
    dispatch(fetchProductSuccess(res.data));
  });
};

export const selectProduct = (state) => state.product.product;
export const selectProducts = (state) => state.product.products;
export const selectLoading = (state) => state.product.loading;

export default productSlice.reducer;
