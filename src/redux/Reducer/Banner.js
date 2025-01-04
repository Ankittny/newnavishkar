import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  BannerImage: [],
};

export const bannerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("bannerRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("bannerSuccess", (state, action) => {
      state.loading = false;
      state.BannerImage = action.payload;
      state.success = true;
    })
    .addCase("bannerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
