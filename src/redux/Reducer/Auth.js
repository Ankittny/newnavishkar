import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    loading: false,
    isAuthenticated: false,
    user: null,
    error:null,
    successMessage: null,
    isLogdin:false,
    isError:false,
}

export const authReducer = createReducer(initialState,{
   
    registerRequest:(state,action) =>{
        state.loading= true;
        state.isAuthenticated= false;
    },

    registerSuccess:(state,action)=>{
        state.loading= false;
        state.isLogdin=true;
        state.success=true;
    },
    registerFail :(state,action)=>{
        state.loading=false;
        state.error= action.payload;
        state.isError= true;
    },

    loginRequest : (state,action)=>{
        state.loading= true;
        state.isAuthenticated= false;
    },
    loginSuccess:(state)=>{
        state.loading= false;
        state.isAuthenticated=true;
        state.isLogdin=true;
        state.success=true;
    },
    loginFail: (state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error= action.payload;
        state.isError= true;
    },
    logoutRequest: (state)=>{
        state.loading = true;
    },
    logoutSuccess: (state)=>{
        state.loading = false;
        // localStorage.removeItem("authAdminToken");
        // localStorage.removeItem("user");
        state.isAuthenticated = false;
        state.user = null;
    },
    logoutFail: (state)=> {
        state.loading = false;
        state.isAuthenticated = true;
    },
})