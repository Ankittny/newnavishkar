import { createReducer } from "@reduxjs/toolkit";


const initialState ={
    loading:false,
    cmlproject:[],
    error:null,
    success:null
}


export const completeProjectReducer = createReducer(initialState,(builder) => {
    builder
    .addCase("completeProjectRequest",(state) => {
        state.loading = true;
        state.error = null;
        state.success =false;
    })

    .addCase("completeProjectSuccess",(state,action) => {
        state.loading = false;
        state.cmlproject = action.payload;
        state.success = true;
    })

    .addCase("completeProjectFail",(state,action)=> {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
})