
import { createSlice } from "@reduxjs/toolkit";

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
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems.push(item);
      state.cartCount += 1;
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
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      }

      
      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },

    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
      } else {
        
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
      }

      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      saveCartToLocalStorage(state); // Clear cart in localStorage
    },

  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;




