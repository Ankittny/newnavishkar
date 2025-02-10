import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

const loadCartFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return { cartItems: [], cartCount: 0 }; // Prevent SSR error
  }
  try {
    const serializedCart = localStorage.getItem("cart");
    if (!serializedCart) {
      return { cartItems: [], cartCount: 0 };
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return { cartItems: [], cartCount: 0 };
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
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
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },

    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
          : item
      );
      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },

    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * item.price });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      saveCartToLocalStorage(state);
    },

    fetchDataFromApi: (state, action) => {
      const apiCartItems = action.payload;
      state.cartItems = apiCartItems.map((item) => ({
        ...item,
        imageUrl: item.thumbnail_full_url?.path || null,
      }));
      state.cartCount = apiCartItems.reduce((count, item) => count + item.quantity, 0);
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, fetchDataFromApi } =
  cartSlice.actions;

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
