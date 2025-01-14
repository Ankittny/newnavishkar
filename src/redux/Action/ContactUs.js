import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const contactUsData = (values) => async (dispatch) => {
  try {
   
    dispatch({ type: "contactusRequest" });

    const { data } = await axios.post("/contact-us", values); // Make the API call
    console.log("API Response: ", data);

    // Dispatch the success action with the API response
    dispatch({ type: "contactusSuccess", payload: data });

  } catch (error) {
    console.error("API Error: ", error);

    dispatch({
      type: "contactusFail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // Handle server error message
          : error.message, // Handle generic error message
    });
  }
};
