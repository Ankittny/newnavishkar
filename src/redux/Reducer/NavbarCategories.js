import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  navbarCategories: [],
};

export const navbarCategoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("navbarCategoryRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("navbarCategorySuccess", (state, action) => {
      state.loading = false;
      state.navbarCategories = action.payload;
      state.success = true;
    })
    .addCase("navbarCategoryFail", (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error message
      state.success = false; // Reset success flag on failure
    });
});