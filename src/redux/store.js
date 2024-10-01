// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducer/Auth"; // Assuming the path is correct
import { productReducer } from "./Reducer/product";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
  },
});

export default store;
