import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    lab: [],
    labDetail: [],
    error: null,
    success: null,
    isError: false,
}

export const labReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("labRequest",(state) =>{
        state.loading =true;
        state.error =null;
        state.isError = false;
    })
    .addCase("labSuccess",(state,action)=>{
        state.loading = false;
        state.lab = action.payload;
        state.success =true;
    })
    .addCase("labFail",(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isError =true;
    })
    .addCase("labDetailRequest",(state)=>{
        state.loading =true;
        state.error = null;
        state.isError =null;
    })
    .addCase("labDetailSuccess",(state,action)=>{
        state.loading = false;
        state.labDetail = action.payload;
        state.success =  true;
    })
    .addCase("labDetailFail",(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isError =true;
    })
})