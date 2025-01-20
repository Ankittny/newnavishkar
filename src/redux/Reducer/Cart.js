
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
const axios = axiosInstance

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return {
        cartItems: [],
        cartCount: 0,
      }; 
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return {
      cartItems: [],
      cartCount: 0,
    }; 
  }
};


const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};


const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const item = action.payload;
    //   state.cartItems.push(item);
    //   state.cartCount += 1;
    //   saveCartToLocalStorage(state); 
    // },


    addToCart: (state, action) => {
      const item = action.payload;
      if (!item.id) {
        console.error("Item must have an id");
        return;
      }
    
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
    
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
    
      state.cartCount = state.cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
    
      // Save the updated cart to localStorage
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.cartCount -= 1;
      saveCartToLocalStorage(state); 
    },
    
    
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item, // Ensure you spread the existing item properties
            quantity: item.quantity + 1, // Increment the quantity
            totalPrice: (item.quantity + 1) * item.price, // Update totalPrice
          };
        }
        return item; // Return unchanged item
      });
    
      // Update cart count
      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state); // Save the updated cart to localStorage
    },
    
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
    
      state.cartItems = state.cartItems.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({
              ...item,
              quantity: item.quantity - 1, // Decrement the quantity
              totalPrice: (item.quantity - 1) * item.price, // Update totalPrice
            });
          } 
          // If quantity is 1, it will not be added to acc, effectively removing it
        } else {
          acc.push(item); // Keep other items unchanged
        }
        return acc;
      }, []);
    
      // Update cart count
      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state); // Save the updated cart to localStorage
    },

    


    clearCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      saveCartToLocalStorage(state); // Clear cart in localStorage
    },

    fetchDataFromApi: (state, action) => {
      const apiCartItems = action.payload; // Data fetched from API
      const localCartItems = state.cartItems; // Data from localStorage

      const mergedCart = [...localCartItems];

      apiCartItems.forEach((apiItem) => {
        const existingItem = mergedCart.find((localItem) => localItem.id === apiItem.id);

        if (existingItem) {
          existingItem.quantity = Math.max(existingItem.quantity, apiItem.quantity);
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        } else {
          mergedCart.push(apiItem);
        }
      });

      state.cartItems = mergedCart;
      state.cartCount = mergedCart.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },

  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, fetchDataFromApi } = cartSlice.actions;


export const fetchCartData = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      dispatch(fetchDataFromApi(response.data));
    }
  } catch (error) {
    console.error("Failed to fetch cart data from API", error);
  }
};

export default cartSlice.reducer;