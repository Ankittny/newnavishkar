// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducer/Auth"; // Assuming the path is correct

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
