import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  successMessage: null,
  isLogdin: false,
  isError: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('registerRequest', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('registerSuccess', (state) => {
      state.loading = false;
      state.isLogdin = true;
      state.success = true;
    })
    .addCase('registerFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    
    .addCase('loginRequest', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('loginSuccess', (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.isLogdin = true;
      state.success = true;
    })
    .addCase('loginFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.isError = true;
    })
    
    .addCase('logoutRequest', (state) => {
      state.loading = true;
    })
    .addCase('logoutSuccess', (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase('logoutFail', (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
});
