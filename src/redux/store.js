// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducer/Auth"; // Assuming the path is correct
import { categoryReducer } from "./Reducer/category";
import { labReducer } from "./Reducer/lab";
import cartReducer from "./Reducer/Cart"; // Import the cart reducer
import { homeReducer } from "./Reducer/HomeProduct";
import { bannerReducer } from "./Reducer/Banner";
import { navbarCategoriesReducer } from "./Reducer/NavbarCategories";
import { wokrshopReducer } from "./Reducer/Workshop";
import { completeProjectReducer } from "./Reducer/CompleteProject";



const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    lab: labReducer,
    cart: cartReducer, // Add cart reducer
    home: homeReducer,
    banner:bannerReducer,
    navbarCategories :navbarCategoriesReducer,
    workshop:wokrshopReducer,
    completeProject:completeProjectReducer,
    
  },
});

export default store;
