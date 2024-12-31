import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  successMessage: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false, // Add this to the initial state
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("registerRequest", (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
      state.isError = false;
    })
    .addCase("registerSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.successMessage = "Registration successful!";
      state.isError = false;
    })
    .addCase("registerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    
    .addCase("loginRequest", (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
      state.isSuccess = false; // Reset isSuccess
    })
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.successMessage = "Login successful!";
      state.isError = false;
      state.isSuccess = true; // Set isSuccess to true
    })
    .addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false; // Reset isSuccess
    })
    .addCase("logoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("logoutSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isLoggedIn = false;
    })
    .addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});