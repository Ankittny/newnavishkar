import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: null,
  productDetail:null,
  error: null,
  success: null,
  isError: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('productRequest', (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    })
    .addCase('productSuccess', (state, action) => {
      state.loading = false;
      state.product = action.payload; 
      state.success = true;
    })
    .addCase('productFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    .addCase('productDetailRequest', (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    })
    .addCase('productDetailSuccess', (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
      state.success = true;
    })
    .addCase('productDetailFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    });
});