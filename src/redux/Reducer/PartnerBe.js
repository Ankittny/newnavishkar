import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  parterBe: {},
};

export const parterBeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("partnerRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })

    .addCase("partnerSuccess", (state, action) => {
      state.loading = false;
      state.parterBe = action.payload;
      state.success = true;
    })

    .addCase("partnerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
