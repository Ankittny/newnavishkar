import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    success:false,
    innovationEnq:{}
}

export const innovationEnqueryReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("innenqRequest",(state) => {
        state.loading = true;
      state.error = null;
      state.success = false;
    })

    .addCase("innenqSuccess",(state,action) => {
      state.loading = false;
      state.innovationEnq = action.payload;
      state.success = true;
    })
    .addCase("innenqFail",(state,action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
})

