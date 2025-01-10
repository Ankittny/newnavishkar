import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading :false,
    error: null,
    success: false,
    workshop:[],
    worskDetails:[]
}

export const wokrshopReducer = createReducer(initialState ,(builder) =>{
    builder
    .addCase("workshopRequest",(state)=>{
        state.loading =true;
        state.error = null;
        state.success = false;
    })

    .addCase("workshopSuccess",(state,action) =>{
      state.loading = false;
      state.workshop = action.payload;
      state.success = true;
    })

    .addCase("workshopFail",(state,action)=>{
      state.loading = false;
      state.error = action.payload; // Set the error message
      state.success = false; // Reset success flag on failure
    })

    .addCase("workshopDetailsRequest",(state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })

    .addCase("workshopDetailsSuccess",(state,action) => {
      state.loading = false;
      state.worskDetails = action.payload;
      state.success = true;
    })

    .addCase("workshopDetailsError",(state,action) => {
      state.loading = false;
      state.error = action.payload; // Set the error message
      state.success = false; // Reset success flag on failure
    })
})