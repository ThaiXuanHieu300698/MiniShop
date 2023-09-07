import { createSlice } from "@reduxjs/toolkit";
import { getAsync } from "../helpers/axios-helper";
export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
  },
  reducers: {
    fetchBrandsSuccess: (state, { payload }) => {
      state.brands = payload;
    },
  },
});

export const { fetchBrandsSuccess } = brandSlice.actions;

export const fetchBrands = () => async (dispatch) => {
  return getAsync("/api/Brands").then((res) => {
    dispatch(fetchBrandsSuccess(res.data));
  });
};

export const selectBrands = (state) =>
  state.brand.brands.map((b) => {
    return {
      id: b.id,
      name: b.name,
    };
  });

export default brandSlice.reducer;
