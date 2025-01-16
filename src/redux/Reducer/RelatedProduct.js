import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  relatedProd: [],
};

export const relatedProductReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("relatedRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("relatedSuccess", (state, action) => {
      state.loading = false;
      state.relatedProd = action.payload;
      state.success = true;
    })
    .addCase("relatedFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
