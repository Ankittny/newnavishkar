import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  config: [],  // Empty array as the initial value, will hold the config data
};

export const configReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("configRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("configSuccess", (state, action) => {
      state.loading = false;
      state.config = action.payload;  // Assign the payload (data) here
      state.success = true;
    })
    .addCase("configFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
