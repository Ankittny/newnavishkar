import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    
    loading: false,
    error: null,
    success: false,
    orderList: [],
    orderDetailsById:{},
    orderDetail:[]
};

export const orderListReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("orderListRequest", (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase("orderListSuccess", (state, action) => {
            state.loading = false;
            state.orderList = action.payload;
            state.success = true;
        })
        .addCase("orderListFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })

        .addCase("orderGetByIdRequest", (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })

        .addCase("orderGetByIdSuccess", (state, action) => {
            state.loading = false;
            state.orderDetailsById = action.payload; // Object containing order details
            state.success = true;
        })

        .addCase("orderGetByIdFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })

        .addCase("orderDetailsByIdRequest", (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })

        .addCase("orderDetailsByIdSuccess", (state, action) => {
            state.loading = false;
            state.orderDetail  = action.payload;
            state.success = true
        })

        .addCase("orderDetailsByIdFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false
        })


});
