"use client";

import { Provider } from "react-redux";
import store from "./store"; // Corrected the store import path

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
