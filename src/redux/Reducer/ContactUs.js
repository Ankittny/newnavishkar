import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  contactUs: {}, // Will store the API response
};

export const contactReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("contactusRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })

    .addCase("contactusSuccess", (state, action) => {
      state.loading = false;
      state.contactUs = action.payload; // Set the API response data
      state.success = true;
    })

    .addCase("contactusFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
