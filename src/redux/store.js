// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducer/Auth"; // Assuming the path is correct
import { productReducer } from "./Reducer/product";
import { categoryReducer } from "./Reducer/category";
import { labReducer } from "./Reducer/lab";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    category:categoryReducer,
    lab:labReducer,
  },
});

export default store;
