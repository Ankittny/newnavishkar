import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  AddressDetails: [],
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
    })
    .addCase("addressUpdateRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("addressUpdateSuccess", (state, action) => {
      state.loading = false;related-product-card
      state.AddressDetails = action.payload; // Update the address details after updating
      state.success = true;
    })
    .addCase("addressUpdateFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("addressDeleteRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("addressDeleteSuccess", (state, action) => {
      state.loading = false;
      state.AddressDetails = {}; // Clear address details after deleting
      state.success = true;
    })
    .addCase("addressDeleteFail", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })

});