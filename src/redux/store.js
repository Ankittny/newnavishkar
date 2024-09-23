import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducer/Auth";


const store = configureStore({
    reducer:{
        auth:authReducer,
    }
})