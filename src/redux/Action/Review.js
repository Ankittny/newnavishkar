import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

export const fetchReviews = () => async (dispatch) => {
    try {
        dispatch({ type: "reviewRequest" });

        const { data } = await axios.get("/products/getReviewList");

        if (data.status && Array.isArray(data.data)) {
            dispatch({ type: "reviewSuccess", payload: data.data });
          } else {
            dispatch({ type: "reviewFail", payload: "Invalid response format" });
          }
    } catch (error) {
        dispatch({
            type: "reviewFail",
            payload: error.response?.data?.message || error.message,
        });
    }
};
