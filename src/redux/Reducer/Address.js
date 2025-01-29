import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  AddressDetails: {},
};

export const addressReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addressRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("addressSuccess", (state, action) => {
      state.loading = false;
      state.AddressDetails = action.payload;
      state.success = true;
    })
    .addCase("addressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});