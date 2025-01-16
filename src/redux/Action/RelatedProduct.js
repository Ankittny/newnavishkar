import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const relatedProductData = (productId) => async (dispatch) => {
  try {
    console.log("Fetching related products...");
    dispatch({ type: "relatedRequest" });

    const { data } = await axios.get(`/products/related-products/${productId}`);
    console.log("Related Product Data:", data);

    // Assuming the API response is an object and the related products are in `data`
    dispatch({ type: "relatedSuccess", payload: data || [] });
  } catch (error) {
    console.error("Error fetching related products:", error);

    dispatch({
      type: "relatedFail",
      payload: error.response?.data?.message || error.message || "Unknown error occurred",
    });
  }
};
