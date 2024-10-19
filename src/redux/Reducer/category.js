import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  category: [],
  categoryByAgeGroup:[],
  categoryDetail:{},
  filterCategory:[],
  filterSubCategory:[],
  error: null,
  success: null,
  isError: false,
};

export const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("categoryRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    })
    .addCase("categorySuccess", (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("categoryFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    .addCase("categoryByAgeGroupRequest",(state) =>{
      state.loading = true;
      state.error = null;
      state.isError = false;
    })
    .addCase("categoryByAgeGroupSuccess",(state,action)=>{
     state.loading =false;
     state.categoryByAgeGroup = action.payload;
     state.success =true;
    })
    .addCase("categoryByAgeGroupFail",(state,action)=>{
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    .addCase("categoryDetailRequest",(state)=>{
      state.loading = true;
      state.error =null;
      state.isError =false;
    })
    .addCase("categoryDetailSuccess",(state,action)=>{
      state.loading = false;
      state.categoryDetail = action.payload;
      state.success = true;
    })
    .addCase("categoryDetailFail",(state,action)=>{
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    .addCase("filterCategoryRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
      state.success = false; // Reset success
    })
    .addCase("filterCategorySuccess", (state, action) => {
      state.loading = false;
      state.filterCategory = action.payload;
      state.success = true;
    })
    .addCase("filterCategoryFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    })
    
    
});
