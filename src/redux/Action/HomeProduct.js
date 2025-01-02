import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

// Action for fetching home products
export const homeProducts = () => async (dispatch) => {
  try {
    console.log("Hello Home Products");
    dispatch({ type: "homeProductRequest" });
    
    // Fetch data from API
    const { data } = await axios.get("/products/home-categories");
    
    console.log("Home Product Data:", data);
    dispatch({ type: "homeProductSuccess", payload: data });
  } catch (error) {
    console.error("Error fetching home products:", error);
    dispatch({
      type: "homeProductFail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
