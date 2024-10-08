import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const products = () => async (dispatch) => {
  try {
    console.log("Hello Product");
    dispatch({ type: "productRequest" });

    const { data } = await axios.get("/api/products");

    if (data) {
      console.log("Response", data);
      dispatch({ type: "productSuccess", payload: data });
    } else {
      dispatch({ type: "productFail", payload: "No data returned" });
    }
  } catch (error) {
    console.error("Error fetching products:", error); 

    dispatch({ type: "productFail", payload: error.message }); 
    
  }
};

export const ProductDetail = (productId) => async (dispatch) => {
  try {
    console.log("Fetching product details for ID:", productId);
    dispatch({ type: "productDetailRequest" });
    const { data } = await axios.get(`/api/product/${productId}`);
    if (data) {
      console.log("Product Details Response", data);
      dispatch({ type: "productDetailSuccess", payload: data });
    } else {
      dispatch({
        type: "productDetailFail",
        payload: "No product details found",
      });
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    dispatch({ type: "productDetailsFail", payload: error.message });
  }
};
