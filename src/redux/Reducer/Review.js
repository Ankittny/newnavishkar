import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    reviewList: [],
};

export const reviewReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("reviewRequest", (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase("reviewSuccess", (state, action) => {
            state.loading = false;
            state.reviewList = action.payload;
            state.success = true;
        })
        .addCase("reviewFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
});
