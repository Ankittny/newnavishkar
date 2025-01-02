import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  products: [],
};

export const homeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("homeProductRequest", (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
      state.success = false; // Reset success flag
    })
    .addCase("homeProductSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase("homeProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error message
      state.success = false; // Reset success flag on failure
    });
});
