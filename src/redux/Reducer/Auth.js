import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  successMessage: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false, // Tracks successful operations
  profile_status: false, // Add profile status
  profile_info: {}
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("profileRequest", (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
      state.isError = false;
    })
    .addCase("profileSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.successMessage = "Profile update successful!";
      state.isError = false;
    })
    .addCase("profileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })

     
    .addCase("getProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("getProfileSuccess", (state, action) => {
      state.loading = false;
      state.profile_info = action.payload;
      state.profile_status = true;
    })
    .addCase("getProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    .addCase("loginRequest", (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
      state.isSuccess = false; // Reset success state
    })
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.successMessage = "Login successful!";
      state.isError = false;
      state.isSuccess = true; // Set success state
    })
    .addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false; // Reset success state
    })

    .addCase("sendOtpRequest", (state) => {
      state.loading = true;
      state.successMessage = null;
      state.error = null;
    })
    .addCase("sendOtpSuccess", (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
      state.error = null;
    })
    .addCase("sendOtpFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("verifyOtpRequest", (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    })

    .addCase("verifyOtpSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.profile_status = action.payload.profile_status; // Set profile status from response
      state.successMessage = "OTP verified successfully!";
      state.isError = false;
      state.isSuccess = true;
    })
    .addCase("verifyOtpFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Store the error message
      state.isError = true;
      state.isSuccess = false;
    })

    
    .addCase("logoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("logoutSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isLoggedIn = false;
      state.successMessage = "Logout successful!"; // Added success message for logout
    })
    .addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true; // Mark error state for logout failure
    });
    
});