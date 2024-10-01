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

export const productReducer = createReducer(initialState,(builder)=> {
    builder
    .addCase('productRequest',(state) => {
        state.loading = true;
        state.isAuthenticated = false;
    })
    .addCase('productSuccess',(state,action)=>{
      state.loading = false;
      state.isLogdin = true;
      state.success = true;
    })
    .addCase('productFail',(state,action)=>{
       state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    .addCase('productDetailRequest',(state)=>{
        state.loading = true;
        state.isAuthenticated = false;
    })
    .addCase('productDetailSuccess',(state)=>{
        state.loading = false;
        state.isLogdin = true;
        state.success = true;
    })
    .addCase('productDetailFail',(state,action)=>{
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
})
